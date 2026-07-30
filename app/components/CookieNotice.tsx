"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const consentStorageKey = "algoways-consent-v2";
const consentEventName = "algoways:consent-change";

type SiteConfig = {
  googleAnalyticsId: string | null;
};

export default function CookieNotice() {
  const [visible, setVisible] = useState(true);
  const [analyticsConfigured, setAnalyticsConfigured] = useState(false);
  const noticeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let animationFrame = 0;
    try {
      const savedChoice = window.localStorage.getItem(consentStorageKey);
      if (savedChoice === "essential" || savedChoice === "analytics") {
        animationFrame = window.requestAnimationFrame(() => setVisible(false));
      }
    } catch {
      // The notice still works for the current visit when storage is unavailable.
    }
    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/site-config", {
      headers: { accept: "application/json" },
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((config: SiteConfig | null) => {
        if (active) {
          setAnalyticsConfigured(Boolean(config?.googleAnalyticsId));
        }
      })
      .catch(() => {
        if (active) setAnalyticsConfigured(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const openPrivacySettings = () => setVisible(true);
    window.addEventListener("algoways:open-privacy", openPrivacySettings);
    return () =>
      window.removeEventListener("algoways:open-privacy", openPrivacySettings);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const root = document.documentElement;
    const notice = noticeRef.current;
    if (!notice) return;

    const updateHeight = () => {
      root.style.setProperty(
        "--cookie-notice-height",
        `${Math.ceil(notice.getBoundingClientRect().height)}px`,
      );
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(notice);
    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
      root.style.removeProperty("--cookie-notice-height");
    };
  }, [visible]);

  function chooseConsent(choice: "essential" | "analytics") {
    try {
      window.localStorage.setItem(consentStorageKey, choice);
    } catch {
      // Dismissing for the current visit is still possible without local storage.
    }
    setVisible(false);
    window.dispatchEvent(new Event(consentEventName));
  }

  if (!visible) return null;

  return (
    <section
      className="cookieNotice"
      ref={noticeRef}
      role="dialog"
      aria-labelledby="cookie-notice-title"
      aria-describedby="cookie-notice-description"
    >
      <div className="cookieNoticeCopy">
        <span className="cookieNoticeEyebrow">PRIVACY / CONSENT</span>
        <h2 id="cookie-notice-title">פרטיות, עוגיות ואנליטיקה</h2>
        <p id="cookie-notice-description">
          האתר משתמש באחסון חיוני לשמירת העדפות נגישות ואבטחה.
          {analyticsConfigured
            ? " באפשרותך לאשר גם Google Analytics למדידה אנונימית ושיפור האתר. אין שימוש בפרסום מותאם אישית."
            : " Google Analytics אינו מופעל כרגע, ולא נעשה שימוש בעוגיות פרסום או בכלי מעקב שיווקיים."}
        </p>
      </div>
      <div className="cookieNoticeActions">
        {analyticsConfigured ? (
          <>
            <button
              type="button"
              onClick={() => chooseConsent("analytics")}
            >
              אישור הכל
            </button>
            <button
              className="cookieNoticeSecondary"
              type="button"
              onClick={() => chooseConsent("essential")}
            >
              רק חיוני
            </button>
          </>
        ) : (
          <button type="button" onClick={() => chooseConsent("essential")}>
            אישור והמשך
          </button>
        )}
        <Link href="/privacy#cookies">למידע נוסף</Link>
      </div>
    </section>
  );
}
