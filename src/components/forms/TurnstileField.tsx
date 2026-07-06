"use client";

import * as React from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

/**
 * Turnstile widget, ref-forwarded so the parent form can reset it after submit.
 * Site key passed in via prop (comes from env in the server component that wraps the form).
 *
 * Lazy-loaded: the ~400KB Cloudflare Turnstile script only loads once this
 * field is near the viewport. Forms sit below the fold, so this keeps the
 * script off the initial page load entirely (a passive Lighthouse run / a
 * bounce never downloads it) while still mounting well before the visitor
 * scrolls down and reaches the submit button. A min-height placeholder keeps
 * the layout stable so there's no shift when the widget appears.
 */
export interface TurnstileFieldProps {
  siteKey: string;
  theme?: "light" | "dark" | "auto";
  onToken: (token: string) => void;
  onExpire?: () => void;
}

export const TurnstileField = React.forwardRef<
  TurnstileInstance | null,
  TurnstileFieldProps
>(function TurnstileField({ siteKey, theme = "light", onToken, onExpire }, ref) {
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    if (active || !siteKey) return;
    const el = wrapRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          io.disconnect();
        }
      },
      // Load a little before the field is actually visible, so it's ready.
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [active, siteKey]);

  if (!siteKey) {
    return (
      <p className={`font-sans text-[12px] italic ${theme === "dark" ? "text-white/45" : "text-house-brown/50"}`}>
        Turnstile not configured, submissions will fall back to honeypot only.
      </p>
    );
  }

  return (
    <div ref={wrapRef} style={{ minHeight: 65 }}>
      {active ? (
        <Turnstile
          ref={ref}
          siteKey={siteKey}
          onSuccess={onToken}
          onExpire={onExpire}
          options={{ theme, size: "flexible", appearance: "always" }}
        />
      ) : null}
    </div>
  );
});
