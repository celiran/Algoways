import assert from "node:assert/strict";
import test from "node:test";

async function getWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

function runtimeEnv(overrides = {}) {
  return {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
    ...overrides,
  };
}

const executionContext = {
  waitUntil() {},
  passThroughOnException() {},
};

const riskTitle = "אזהרת סיכון והבהרה משפטית";
const riskText =
  "אין לראות בתוכן הטקסט באתר זה המלצה לרכישה/מכירה של ניירות ערך ספציפיים ו/או תחליף לייעוץ פיננסי שקול המותאם לצרכיו של המשקיע. האתר אינו אחראי לתוכן המתפרסם על ידי הגולשים. תגובות הגולשים המתפרסמות בתגובות הינן דעותיהם האישיות של המגיבים בלבד ובאחריותם הבלעדית. כל העושה שימוש במידע המתפרסם באתר זה עושה זאת על אחריותו בלבד.";

test("server-renders the ALGOWAYS homepage", async () => {
  const worker = await getWorker();
  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    runtimeEnv(),
    executionContext,
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>ALGOWAYS — Technology Behind Smarter Markets<\/title>/);
  assert.match(html, /מחברים בין/);
  assert.match(html, /href="\/contact"/);
  assert.match(html, /האתרים שלנו/);
});

test("server-renders the short contact form", async () => {
  const worker = await getWorker();
  const response = await worker.fetch(
    new Request("http://localhost/contact", {
      headers: { accept: "text/html" },
    }),
    runtimeEnv(),
    executionContext,
  );

  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>יצירת קשר \| ALGOWAYS<\/title>/);
  assert.match(html, /name="fullName"/);
  assert.match(html, /name="email"/);
  assert.match(html, /name="phone"/);
  assert.match(html, /name="message"/);
  assert.match(html, /name="privacy"/);
  assert.doesNotMatch(html, /name="subject"/);
});

test("contact API reports an unconfigured Cloudflare email binding safely", async () => {
  const worker = await getWorker();
  const configResponse = await worker.fetch(
    new Request("http://localhost/api/contact", {
      headers: { accept: "application/json" },
    }),
    runtimeEnv(),
    executionContext,
  );

  assert.equal(configResponse.status, 200);
  assert.deepEqual(await configResponse.json(), {
    configured: false,
    turnstileSiteKey: null,
  });

  const submitResponse = await worker.fetch(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        fullName: "ישראל ישראלי",
        email: "israel@example.com",
        message: "זוהי הודעת בדיקה תקינה.",
        privacy: true,
      }),
    }),
    runtimeEnv(),
    executionContext,
  );

  assert.equal(submitResponse.status, 503);
  const result = await submitResponse.json();
  assert.equal(result.success, false);
});

test("shows the complete risk notice beside the copyright area on every page", async () => {
  const worker = await getWorker();
  const routes = [
    "/",
    "/contact",
    "/accessibility",
    "/copyright",
    "/privacy",
    "/risk-disclosure",
    "/terms",
  ];

  for (const route of routes) {
    const response = await worker.fetch(
      new Request(`http://localhost${route}`, {
        headers: { accept: "text/html" },
      }),
      runtimeEnv(),
      executionContext,
    );
    const html = (await response.text()).replace(/\s+/g, " ");

    assert.equal(response.status, 200, route);
    assert.ok(html.includes(riskTitle), route);
    assert.ok(html.includes(riskText), route);
  }
});

test("shows the storage notice on every page and documents the actual usage", async () => {
  const worker = await getWorker();
  const routes = [
    "/",
    "/contact",
    "/accessibility",
    "/copyright",
    "/privacy",
    "/risk-disclosure",
    "/terms",
  ];

  for (const route of routes) {
    const response = await worker.fetch(
      new Request(`http://localhost${route}`, {
        headers: { accept: "text/html" },
      }),
      runtimeEnv(),
      executionContext,
    );
    const html = (await response.text()).replace(/\s+/g, " ");

    assert.equal(response.status, 200, route);
    assert.ok(html.includes("עוגיות ואחסון מקומי"), route);
    assert.ok(html.includes("אישור והמשך"), route);
    assert.ok(html.includes('href="/privacy#cookies"'), route);
  }

  const privacyResponse = await worker.fetch(
    new Request("http://localhost/privacy", {
      headers: { accept: "text/html" },
    }),
    runtimeEnv(),
    executionContext,
  );
  const privacyHtml = (await privacyResponse.text()).replace(/\s+/g, " ");

  assert.match(privacyHtml, /id="cookies"/);
  assert.match(privacyHtml, /אינו שומר עוגיות שיווקיות מטעמו/);
  assert.match(privacyHtml, /Cloudflare Turnstile/);
});
