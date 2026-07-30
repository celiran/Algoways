"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const storageKey = "algoways-storage-notice-v1";

export default function CookieNotice() {
  const [visible, setVisible] = useState(true);
  const noticeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let animationFrame = 0;
    try {
      if (window.localStorage.getItem(storageKey) === "accepted") {
        animationFrame = window.requestAnimationFrame(() => setVisible(false));
      }
    } catch {
      // The notice still works for the current visit when storage is unavailable.
    }
    return () => window.cancelAnimationFrame(animationFrame);
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

  function acceptNotice() {
    try {
      window.localStorage.setItem(storageKey, "accepted");
    } catch {
      // Dismissing for the current visit is still possible without local storage.
    }
    setVisible(false);
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
        <span className="cookieNoticeEyebrow">PRIVACY / STORAGE</span>
        <h2 id="cookie-notice-title">עוגיות ואחסון מקומי</h2>
        <p id="cookie-notice-description">
          האתר משתמש באחסון מקומי חיוני לשמירת העדפות הנגישות ולאישור הודעה
          זו. בעמוד יצירת הקשר עשוי להיטען Cloudflare Turnstile למניעת ספאם.
          איננו משתמשים כיום בעוגיות פרסום או בכלי מעקב שיווקיים.
        </p>
      </div>
      <div className="cookieNoticeActions">
        <button type="button" onClick={acceptNotice}>
          אישור והמשך
        </button>
        <Link href="/privacy#cookies">למידע נוסף</Link>
      </div>
    </section>
  );
}
