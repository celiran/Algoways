"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type ContactConfig = {
  configured: boolean;
  turnstileSiteKey: string | null;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

type TurnstileApi = {
  render(
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      theme: "light";
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ): string;
  remove(widgetId: string): void;
  reset(widgetId: string): void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const defaultError =
  "לא הצלחנו לשלוח את ההודעה כרגע. אפשר לנסות שוב או לשלוח מייל ל־support@algoways.co.il.";

export default function ContactForm() {
  const [config, setConfig] = useState<ContactConfig | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileContainer = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/contact", {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Contact configuration is unavailable");
        }
        return (await response.json()) as ContactConfig;
      })
      .then(setConfig)
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setConfig({ configured: false, turnstileSiteKey: null });
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const siteKey = config?.turnstileSiteKey;
    if (!siteKey || !turnstileContainer.current) {
      return;
    }

    let cancelled = false;

    const renderWidget = () => {
      if (
        cancelled ||
        !window.turnstile ||
        !turnstileContainer.current ||
        turnstileWidgetId.current
      ) {
        return;
      }

      turnstileWidgetId.current = window.turnstile.render(
        turnstileContainer.current,
        {
          sitekey: siteKey,
          action: "contact_form",
          theme: "light",
          callback: setTurnstileToken,
          "expired-callback": () => setTurnstileToken(""),
          "error-callback": () => {
            setTurnstileToken("");
            setStatus("error");
            setStatusMessage("אימות האבטחה לא נטען. נסו לרענן את העמוד.");
          },
        },
      );
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-algoways-turnstile="true"]',
    );

    if (existingScript) {
      if (window.turnstile) {
        renderWidget();
      } else {
        existingScript.addEventListener("load", renderWidget, { once: true });
      }
    } else {
      const script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.dataset.algowaysTurnstile = "true";
      script.addEventListener("load", renderWidget, { once: true });
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, [config?.turnstileSiteKey]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!config?.configured) {
      setStatus("error");
      setStatusMessage(
        "הטופס מוכן, אך שליחת המייל עדיין לא חוברה לחשבון Cloudflare.",
      );
      return;
    }

    if (config.turnstileSiteKey && !turnstileToken) {
      setStatus("error");
      setStatusMessage("יש להשלים את אימות האבטחה לפני השליחה.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.get("fullName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
          website: formData.get("website"),
          privacy: formData.get("privacy") === "on",
          turnstileToken,
        }),
      });

      const result = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || defaultError);
      }

      form.reset();
      setStatus("success");
      setStatusMessage("ההודעה נשלחה בהצלחה. נחזור אליכם בהקדם.");
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : defaultError);
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.reset(turnstileWidgetId.current);
        setTurnstileToken("");
      }
    }
  }

  if (status === "success") {
    return (
      <div className="contactSuccess" role="status" aria-live="polite">
        <span aria-hidden="true">✓</span>
        <p className="contactSuccessKicker">MESSAGE RECEIVED / 01</p>
        <h2>תודה, קיבלנו.</h2>
        <p>{statusMessage}</p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setStatusMessage("");
          }}
        >
          שליחת הודעה נוספת
        </button>
      </div>
    );
  }

  const isSubmitting = status === "submitting";
  return (
    <form className="contactForm" onSubmit={handleSubmit}>
      <div className="contactFields">
        <div className="contactField">
          <label htmlFor="fullName">
            שם מלא <span aria-hidden="true">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            minLength={2}
            maxLength={80}
            placeholder="איך לפנות אליכם?"
            required
          />
        </div>

        <div className="contactField">
          <label htmlFor="email">
            כתובת מייל <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={160}
            placeholder="name@example.com"
            dir="ltr"
            required
          />
        </div>

        <div className="contactField">
          <label htmlFor="phone">טלפון</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={30}
            placeholder="לא חובה"
            dir="ltr"
          />
        </div>

        <div className="contactField contactMessageField">
          <label htmlFor="message">
            ההודעה שלכם <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            minLength={10}
            maxLength={3000}
            rows={6}
            placeholder="כתבו לנו בכמה מילים במה נוכל לעזור"
            required
          />
        </div>
      </div>

      <div className="contactHoneypot" aria-hidden="true">
        <label htmlFor="website">אתר</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {config?.turnstileSiteKey ? (
        <section className="contactSecurity" aria-label="אימות אבטחה">
          <div className="contactSecurityHeading">
            <span className="contactSecurityIcon" aria-hidden="true">
              ◇
            </span>
            <p>
              אימות אבטחה
              <span>נדרש כדי למנוע שליחה אוטומטית מבוטים</span>
            </p>
          </div>
          <div ref={turnstileContainer} className="contactTurnstile" />
        </section>
      ) : null}

      <div className="contactFormFooter">
        <label className="contactPrivacy">
          <input name="privacy" type="checkbox" required />
          <span>
            אני מאשר/ת שימוש בפרטים לצורך מענה לפנייה בהתאם ל
            <a href="/privacy">מדיניות הפרטיות</a>.
          </span>
        </label>

        <button
          className="contactSubmit"
          type="submit"
          disabled={isSubmitting || config === null}
        >
          <span>
            {isSubmitting
              ? "שולח..."
              : config === null
                ? "בודק חיבור..."
                : "שליחת הודעה"}
          </span>
          <span aria-hidden="true">↗</span>
        </button>
      </div>

      {status === "error" ? (
        <p className="contactFormStatus isError" role="alert">
          {statusMessage}
        </p>
      ) : (
        <p className="contactFormStatus" aria-live="polite">
          הפרטים יישלחו באופן מאובטח וישמשו רק לצורך מענה לפנייה.
        </p>
      )}
    </form>
  );
}
