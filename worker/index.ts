/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  EMAIL?: {
    send(message: {
      to: string;
      from: string;
      subject: string;
      text: string;
      replyTo?: string;
    }): Promise<{ messageId: string }>;
  };
  CONTACT_DESTINATION_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  GOOGLE_ANALYTICS_ID?: string;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

type ContactPayload = {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  website?: unknown;
  privacy?: unknown;
  turnstileToken?: unknown;
};

function json(data: unknown, status = 200): Response {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function cleanText(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

async function handleContactRequest(
  request: Request,
  env: Env,
): Promise<Response> {
  const emailConfigured = Boolean(
    env.EMAIL && env.CONTACT_DESTINATION_EMAIL && env.CONTACT_FROM_EMAIL,
  );
  const turnstileConfigured = Boolean(
    env.TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET_KEY,
  );
  const turnstilePartiallyConfigured = Boolean(
    env.TURNSTILE_SITE_KEY || env.TURNSTILE_SECRET_KEY,
  ) && !turnstileConfigured;

  if (request.method === "GET") {
    return json({
      configured: emailConfigured && !turnstilePartiallyConfigured,
      turnstileSiteKey: turnstileConfigured ? env.TURNSTILE_SITE_KEY : null,
    });
  }

  if (request.method !== "POST") {
    return json(
      { success: false, message: "שיטת הבקשה אינה נתמכת." },
      405,
    );
  }

  if (!emailConfigured || turnstilePartiallyConfigured) {
    return json(
      {
        success: false,
        message: "שליחת המייל עדיין לא הוגדרה ב־Cloudflare.",
      },
      503,
    );
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json(
      { success: false, message: "פורמט הבקשה אינו נתמך." },
      415,
    );
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 25_000) {
    return json({ success: false, message: "ההודעה ארוכה מדי." }, 413);
  }

  let payload: ContactPayload;
  try {
    const rawBody = await request.text();
    if (rawBody.length > 25_000) {
      return json({ success: false, message: "ההודעה ארוכה מדי." }, 413);
    }
    payload = JSON.parse(rawBody) as ContactPayload;
  } catch {
    return json({ success: false, message: "לא ניתן לקרוא את הבקשה." }, 400);
  }

  // A filled honeypot is treated as a successful submission without sending.
  if (cleanText(payload.website, 200)) {
    return json({ success: true });
  }

  const fullName = cleanText(payload.fullName, 80);
  const email = cleanText(payload.email, 160).toLowerCase();
  const phone = cleanText(payload.phone, 30);
  const message = cleanText(payload.message, 3000);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    fullName.length < 2 ||
    !emailPattern.test(email) ||
    message.length < 10 ||
    payload.privacy !== true
  ) {
    return json(
      {
        success: false,
        message: "יש להשלים שם, כתובת מייל, הודעה ואישור מדיניות פרטיות.",
      },
      400,
    );
  }

  if (turnstileConfigured) {
    const token = cleanText(payload.turnstileToken, 2048);
    if (!token) {
      return json(
        { success: false, message: "יש להשלים את אימות האבטחה." },
        400,
      );
    }

    const verificationBody = new FormData();
    verificationBody.set("secret", env.TURNSTILE_SECRET_KEY!);
    verificationBody.set("response", token);
    const remoteIp = request.headers.get("CF-Connecting-IP");
    if (remoteIp) {
      verificationBody.set("remoteip", remoteIp);
    }

    const verificationResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: verificationBody },
    );
    const verification = (await verificationResponse.json()) as {
      success?: boolean;
      action?: string;
    };

    if (!verification.success || verification.action !== "contact_form") {
      return json(
        {
          success: false,
          message: "אימות האבטחה נכשל. רעננו את האימות ונסו שוב.",
        },
        400,
      );
    }
  }

  try {
    await env.EMAIL!.send({
      to: env.CONTACT_DESTINATION_EMAIL!,
      from: env.CONTACT_FROM_EMAIL!,
      replyTo: email,
      subject: `פנייה חדשה מאתר ALGOWAYS — ${fullName}`,
      text: [
        "פנייה חדשה מטופס יצירת הקשר באתר ALGOWAYS",
        "",
        `שם: ${fullName}`,
        `מייל: ${email}`,
        `טלפון: ${phone || "לא נמסר"}`,
        "",
        "הודעה:",
        message,
      ].join("\n"),
    });

    return json({ success: true });
  } catch {
    return json(
      {
        success: false,
        message: "לא הצלחנו לשלוח את ההודעה כרגע. נסו שוב בעוד כמה דקות.",
      },
      502,
    );
  }
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    if (url.pathname === "/api/contact") {
      return handleContactRequest(request, env);
    }

    if (url.pathname === "/api/site-config") {
      if (request.method !== "GET") {
        return json({ message: "שיטת הבקשה אינה נתמכת." }, 405);
      }
      const analyticsId = cleanText(env.GOOGLE_ANALYTICS_ID, 32);
      return json({
        googleAnalyticsId: /^G-[A-Z0-9]+$/i.test(analyticsId)
          ? analyticsId.toUpperCase()
          : null,
      });
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
