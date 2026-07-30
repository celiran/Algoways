import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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
  assert.match(
    html,
    /<title>ALGOWAYS — טכנולוגיה, מסחר ותשתיות לשווקים חכמים<\/title>/,
  );
  assert.match(html, /מחברים בין/);
  assert.match(html, /href="\/contact"/);
  assert.match(html, /האתרים שלנו/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /FAQPage/);
  assert.match(html, /rel="canonical" href="https:\/\/algoways\.co\.il\/"/);
  assert.match(html, /אנחנו עובדים מתוך מומחיות ממוקדת/);
  assert.doesNotMatch(html, /ALGOWAYS \/ OPERATING PRINCIPLES/);
  assert.doesNotMatch(html, /איך אנחנו עובדים/);
  assert.doesNotMatch(html, /googletagmanager\.com/);
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

test("site config exposes only a valid optional Google Analytics ID", async () => {
  const worker = await getWorker();

  const disabledResponse = await worker.fetch(
    new Request("http://localhost/api/site-config"),
    runtimeEnv(),
    executionContext,
  );
  assert.equal(disabledResponse.status, 200);
  assert.deepEqual(await disabledResponse.json(), {
    googleAnalyticsId: null,
  });

  const enabledResponse = await worker.fetch(
    new Request("http://localhost/api/site-config"),
    runtimeEnv({ GOOGLE_ANALYTICS_ID: "g-abc1234567" }),
    executionContext,
  );
  assert.equal(enabledResponse.status, 200);
  assert.deepEqual(await enabledResponse.json(), {
    googleAnalyticsId: "G-ABC1234567",
  });
});

test("shows the complete risk notice beside the copyright area on every page", async () => {
  const worker = await getWorker();
  const routes = [
    "/",
    "/about",
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

test("shows privacy choices on every page and documents optional analytics", async () => {
  const worker = await getWorker();
  const routes = [
    "/",
    "/about",
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
    assert.ok(html.includes("פרטיות, עוגיות ואנליטיקה"), route);
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
  assert.match(privacyHtml, /Google Analytics הוא רכיב אופציונלי/);
  assert.match(privacyHtml, /Cloudflare Turnstile/);
});

test("shows the complete legal navigation on every page", async () => {
  const worker = await getWorker();
  const routes = [
    "/",
    "/about",
    "/contact",
    "/accessibility",
    "/copyright",
    "/privacy",
    "/risk-disclosure",
    "/terms",
  ];
  const requiredLinks = [
    ['href="/"', "דף הבית"],
    ['href="/about"', "אודות"],
    ['href="/risk-disclosure"', "אזהרת סיכון"],
    ['href="/terms"', "תנאי שימוש"],
    ['href="/copyright"', "זכויות יוצרים"],
    ['href="/privacy"', "מדיניות פרטיות"],
    ['href="/accessibility"', "הצהרת נגישות"],
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
    assert.match(html, /class="globalLegalBar"/, route);
    assert.match(html, /מידע משפטי, פרטיות ונגישות/, route);

    for (const [href, label] of requiredLinks) {
      assert.ok(html.includes(href), `${route}: ${href}`);
      assert.ok(html.includes(label), `${route}: ${label}`);
    }
    assert.ok(html.includes("הגדרות פרטיות"), route);
  }
});

test("publishes the technical SEO and AEO discovery files", async () => {
  const worker = await getWorker();
  const sitemapResponse = await worker.fetch(
    new Request("http://localhost/sitemap.xml"),
    runtimeEnv(),
    executionContext,
  );
  const sitemapXml = await sitemapResponse.text();

  assert.equal(sitemapResponse.status, 200);
  assert.match(sitemapXml, /https:\/\/algoways\.co\.il\/about/);
  assert.match(sitemapXml, /https:\/\/algoways\.co\.il\/contact/);

  const robots = await readFile(
    new URL("../public/robots.txt", import.meta.url),
    "utf8",
  );
  const llms = await readFile(
    new URL("../public/llms.txt", import.meta.url),
    "utf8",
  );

  assert.match(robots, /User-agent: OAI-SearchBot/);
  assert.match(robots, /User-agent: PerplexityBot/);
  assert.match(robots, /Sitemap: https:\/\/algoways\.co\.il\/sitemap\.xml/);
  assert.match(llms, /^# ALGOWAYS/m);
  assert.match(llms, /^> ALGOWAYS/m);
  assert.match(llms, /https:\/\/algoways\.co\.il\/about/);
});
