"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { submitForm } from "@/components/forms/submitForm";
import type { WaitlistInterestInput } from "@/lib/forms/schemas";

/**
 * WaitlistMini — compact inline register-interest, one row, cream box.
 * Spec: /ux/09-interactions/playground.html (forms section → mini waitlist).
 *
 * Differs from WaitlistForm (full page): no Turnstile widget, honeypot-only.
 * Use only in low-friction surfaces (footer, sidebar, inline prompt).
 * For higher-risk surfaces use WaitlistForm (adds Turnstile).
 *
 * On submit: swap in a moss-green success panel that slides up + fades in.
 */
export interface WaitlistMiniProps {
  product: WaitlistInterestInput["product"];
  sourcePage?: string;
  placeholder?: string;
  buttonLabel?: string;
  successMessage?: string;
  className?: string;
}

export function WaitlistMini({
  product,
  sourcePage,
  placeholder = "Your email",
  buttonLabel = "Notify me",
  successMessage = "You're on the list. We'll write when it opens.",
  className,
}: WaitlistMiniProps) {
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = React.useState<string | null>(null);
  const honeyRef = React.useRef<HTMLInputElement>(null);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    setError(null);
    const result = await submitForm("waitlist", {
      email,
      product,
      sourcePage,
      honey: honeyRef.current?.value ?? "",
      // Low-friction — no Turnstile on the mini. The /api route falls back
      // to honeypot-only in dev; production should use WaitlistForm for
      // high-value surfaces so Turnstile kicks in.
      turnstileToken: "",
    });
    if (result.ok) {
      setState("success");
    } else {
      setState("error");
      setError(result.error);
    }
  };

  if (state === "success") {
    return (
      <div
        role="status"
        className={cn(
          "bg-success text-white px-5 py-4",
          "font-sans italic text-[15px]",
          "[animation:howa-slide-up_var(--t-slow)_var(--ease-out)]",
          className,
        )}
      >
        {successMessage}
      </div>
    );
  }

  return (
    <form
      onSubmit={handle}
      className={cn(
        "group/wl flex items-stretch gap-0 bg-house-cream border border-house-brown/15 p-2.5",
        "focus-within:border-house-brown transition-colors duration-[var(--t-slow)]",
        className,
      )}
    >
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <input ref={honeyRef} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        autoComplete="email"
        aria-label={placeholder}
        aria-invalid={error ? true : undefined}
        className={cn(
          "flex-1 bg-transparent border-0 outline-none min-w-0 px-3",
          "font-sans text-[13px] text-house-brown",
          "border-b border-house-brown/20 focus:border-house-gold transition-colors",
          "duration-slow ease-out",
          "placeholder:font-display placeholder:italic placeholder:text-[14px] placeholder:text-house-stone",
        )}
      />

      <button
        type="submit"
        disabled={state === "submitting"}
        className={cn(
          "shrink-0 bg-house-brown text-house-cream px-3.5 py-2",
          "font-sans text-[11px] tracking-[0.2em] uppercase",
          "transition-[background-color,letter-spacing,padding] duration-[var(--t-slow)] ease-out",
          "hover:bg-house-gold hover:tracking-[0.22em] hover:px-4",
          "disabled:opacity-60 disabled:cursor-not-allowed",
        )}
      >
        {state === "submitting" ? "…" : buttonLabel}
      </button>

      {error ? (
        <p role="alert" className="absolute -bottom-6 left-0 font-display italic text-[12px] text-error">
          {error}
        </p>
      ) : null}
    </form>
  );
}
