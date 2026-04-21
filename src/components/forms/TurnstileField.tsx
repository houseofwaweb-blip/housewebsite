"use client";

import * as React from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

/**
 * Turnstile widget, ref-forwarded so the parent form can reset it after submit.
 * Site key passed in via prop (comes from env in the server component that wraps the form).
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
  if (!siteKey) {
    return (
      <p className="font-sans text-[11px] text-house-brown/50 italic">
        Turnstile not configured — submissions will fall back to honeypot only.
      </p>
    );
  }
  return (
    <Turnstile
      ref={ref}
      siteKey={siteKey}
      onSuccess={onToken}
      onExpire={onExpire}
      options={{ theme, size: "flexible", appearance: "always" }}
    />
  );
});
