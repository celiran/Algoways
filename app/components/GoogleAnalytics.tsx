"use client";

import { useEffect } from "react";

const consentStorageKey = "algoways-consent-v2";
const consentEventName = "algoways:consent-change";

type SiteConfig = {
  googleAnalyticsId: string | null;
};

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

function hasAnalyticsConsent() {
  try {
    return window.localStorage.getItem(consentStorageKey) === "analytics";
  } catch {
    return false;
  }
}

function loadGoogleAnalytics(measurementId: string) {
  if (
    !/^G-[A-Z0-9]+$/i.test(measurementId) ||
    document.querySelector('script[data-algoways-analytics="true"]')
  ) {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
    measurementId,
  )}`;
  script.dataset.algowaysAnalytics = "true";
  document.head.appendChild(script);
}

export default function GoogleAnalytics() {
  useEffect(() => {
    let measurementId: string | null = null;
    let active = true;

    const applyConsent = () => {
      if (!measurementId) return;
      if (hasAnalyticsConsent()) {
        loadGoogleAnalytics(measurementId);
      } else {
        window.gtag?.("consent", "update", {
          analytics_storage: "denied",
        });
      }
    };

    fetch("/api/site-config", {
      headers: { accept: "application/json" },
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((config: SiteConfig | null) => {
        if (!active) return;
        measurementId = config?.googleAnalyticsId ?? null;
        applyConsent();
      })
      .catch(() => {
        measurementId = null;
      });

    window.addEventListener(consentEventName, applyConsent);
    return () => {
      active = false;
      window.removeEventListener(consentEventName, applyConsent);
    };
  }, []);

  return null;
}
