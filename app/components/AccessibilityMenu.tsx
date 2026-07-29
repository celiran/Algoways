"use client";

import { useEffect, useRef, useState } from "react";

type AccessibilitySettings = {
  fontSize: "normal" | "large" | "larger";
  contrast: boolean;
  grayscale: boolean;
  links: boolean;
  reduceMotion: boolean;
};

const defaultSettings: AccessibilitySettings = {
  fontSize: "normal",
  contrast: false,
  grayscale: false,
  links: false,
  reduceMotion: false,
};

const fontLabels = {
  normal: "גודל טקסט רגיל",
  large: "טקסט מוגדל",
  larger: "טקסט מוגדל מאוד",
};

function applySettings(settings: AccessibilitySettings) {
  const root = document.documentElement;
  root.dataset.fontSize = settings.fontSize;
  root.classList.toggle("a11y-high-contrast", settings.contrast);
  root.classList.toggle("a11y-grayscale", settings.grayscale);
  root.classList.toggle("a11y-highlight-links", settings.links);
  root.classList.toggle("a11y-reduce-motion", settings.reduceMotion);
}

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] =
    useState<AccessibilitySettings>(defaultSettings);
  const [announcement, setAnnouncement] = useState("");
  const widgetRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("algoways-accessibility");
      if (saved) {
        const parsed = {
          ...defaultSettings,
          ...(JSON.parse(saved) as Partial<AccessibilitySettings>),
        };
        setSettings(parsed);
        applySettings(parsed);
      }
    } catch {
      applySettings(defaultSettings);
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    let animationFrame = 0;

    const updatePosition = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const widget = widgetRef.current;
        const notice = document.querySelector<HTMLElement>(".legacyNotice");
        const footerBottom =
          document.querySelector<HTMLElement>(".footerBottom");
        if (!widget) return;

        const defaultBottom = window.innerWidth <= 680 ? 82 : 96;
        const protectedTop = [notice, footerBottom]
          .map((element) => element?.getBoundingClientRect().top)
          .filter(
            (top): top is number =>
              top !== undefined && top < window.innerHeight,
          )
          .reduce<number | undefined>(
            (nearest, top) =>
              nearest === undefined ? top : Math.min(nearest, top),
            undefined,
          );
        const pageEndClearance =
          protectedTop !== undefined
            ? window.innerHeight - protectedTop + 12
            : 0;

        widget.style.setProperty(
          "--accessibility-bottom",
          `${Math.max(defaultBottom, pageEndClearance)}px`,
        );
      });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  function closeMenu() {
    setOpen(false);
    window.requestAnimationFrame(() => launcherRef.current?.focus());
  }

  function update(
    next: AccessibilitySettings,
    announcementText: string,
  ) {
    setSettings(next);
    applySettings(next);
    window.localStorage.setItem(
      "algoways-accessibility",
      JSON.stringify(next),
    );
    setAnnouncement(announcementText);
  }

  function cycleFontSize() {
    const nextSize =
      settings.fontSize === "normal"
        ? "large"
        : settings.fontSize === "large"
          ? "larger"
          : "normal";
    update(
      { ...settings, fontSize: nextSize },
      `גודל הטקסט שונה: ${fontLabels[nextSize]}`,
    );
  }

  function toggle(
    key: "contrast" | "grayscale" | "links" | "reduceMotion",
    label: string,
  ) {
    const enabled = !settings[key];
    update(
      { ...settings, [key]: enabled },
      `${label} ${enabled ? "הופעל" : "כובה"}`,
    );
  }

  function reset() {
    update(defaultSettings, "הגדרות הנגישות אופסו");
  }

  return (
    <div className="accessibilityWidget" ref={widgetRef}>
      {open && (
        <div
          className="accessibilityPanel"
          id="accessibility-panel"
          aria-label="אפשרויות נגישות"
        >
          <div className="accessibilityPanelHeader">
            <div>
              <span>ALGOWAYS</span>
              <h2>אפשרויות נגישות</h2>
            </div>
            <button
              type="button"
              className="accessibilityClose"
              onClick={closeMenu}
              aria-label="סגירת תפריט הנגישות"
              ref={closeButtonRef}
            >
              ×
            </button>
          </div>

          <div className="accessibilityControls">
            <button type="button" onClick={cycleFontSize}>
              <span className="accessibilityControlIcon" aria-hidden="true">
                א+
              </span>
              <span>{fontLabels[settings.fontSize]}</span>
            </button>
            <button
              type="button"
              aria-pressed={settings.contrast}
              onClick={() => toggle("contrast", "ניגודיות גבוהה")}
            >
              <span className="accessibilityControlIcon" aria-hidden="true">
                ◐
              </span>
              <span>ניגודיות גבוהה</span>
            </button>
            <button
              type="button"
              aria-pressed={settings.grayscale}
              onClick={() => toggle("grayscale", "גווני אפור")}
            >
              <span className="accessibilityControlIcon" aria-hidden="true">
                ◑
              </span>
              <span>גווני אפור</span>
            </button>
            <button
              type="button"
              aria-pressed={settings.links}
              onClick={() => toggle("links", "הדגשת קישורים")}
            >
              <span className="accessibilityControlIcon" aria-hidden="true">
                __
              </span>
              <span>הדגשת קישורים</span>
            </button>
            <button
              type="button"
              aria-pressed={settings.reduceMotion}
              onClick={() => toggle("reduceMotion", "עצירת אנימציות")}
            >
              <span className="accessibilityControlIcon" aria-hidden="true">
                ||
              </span>
              <span>עצירת אנימציות</span>
            </button>
          </div>

          <div className="accessibilityPanelFooter">
            <button type="button" onClick={reset}>
              איפוס הגדרות
            </button>
            <a href="/accessibility">הצהרת נגישות</a>
          </div>
        </div>
      )}

      <button
        type="button"
        className="accessibilityLauncher"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls="accessibility-panel"
        ref={launcherRef}
      >
        <span className="accessibilitySymbol" aria-hidden="true">
          ♿
        </span>
        <span>נגישות</span>
      </button>
      <span className="srOnly" aria-live="polite">
        {announcement}
      </span>
    </div>
  );
}
