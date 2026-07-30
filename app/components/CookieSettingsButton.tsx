"use client";

export default function CookieSettingsButton() {
  return (
    <button
      className="cookieSettingsButton"
      type="button"
      onClick={() => window.dispatchEvent(new Event("algoways:open-privacy"))}
    >
      הגדרות פרטיות
    </button>
  );
}
