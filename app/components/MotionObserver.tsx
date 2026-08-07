"use client";

import { useLayoutEffect } from "react";

type StoredAccessibilitySettings = {
  reduceMotion?: boolean;
};

function prefersLessMotion() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return true;
  }

  try {
    const saved = window.localStorage.getItem("algoways-accessibility");
    if (!saved) return false;

    return Boolean(
      (JSON.parse(saved) as StoredAccessibilitySettings).reduceMotion,
    );
  } catch {
    return false;
  }
}

export default function MotionObserver() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    root.classList.add("motion-ready");

    if (prefersLessMotion()) {
      root.classList.add("motion-reduced");
      targets.forEach((target) => target.classList.add("is-revealed"));
      return () => {
        root.classList.remove("motion-ready", "motion-reduced");
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready", "motion-reduced");
    };
  }, []);

  return null;
}
