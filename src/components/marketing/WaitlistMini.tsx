"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { submitForm } from "@/components/forms/submitForm";
import { TurnstileField } from "@/components/forms/TurnstileField";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import type { WaitlistInterestInput } from "@/lib/forms/schemas";

/**
 * WaitlistMini — compact inline register-interest (name + email + verify).
 *
 * Used on low-friction surfaces (protect, insurance, local service pages).
 * Turnstile is required in production, so the widget is rendered inline; the
 * button stays disabled until the challenge is solved. On submit: swap in a
 * moss-green success panel.
 */
export interface WaitlistMiniProps {
  product: WaitlistInterestInput["product"];
  sourcePage?: string;
  namePlaceholder?: string;
  placeholder?: string;
  buttonLabel?: string;
  successMessage?: string;
  className?: string;
}

export function WaitlistMini({
  product,
  sourcePage,
  namePlaceholder = "Your name",
  placeholder = "Your email",
  buttonLabel = "Notify me",
  successMessage = "You're on the list. We'll write when it opens.",
  className,
}: WaitlistMiniProps) {
  const [firstName, setFirstName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = React.useState<string | null>(null);
  const honeyRef = React.useRef<HTMLInputElement>(null);
  const turnstileRef = React.useRef<TurnstileInstance | null>(null);
  const [turnstileToken, setTurnstileToken] = React.useState("");
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    setError(null);
    const result = await submitForm("waitlist", {
      email,
      firstName,
      product,
      sourcePage,
      honey: honeyRef.current?.value ?? "",
      turnstileToken: turnstileToken || (siteKey ? "" : "no-turnstile"),
    });
    if (result.ok) {
      setState("success");
      return;
    }
    setState("error");
    setError(result.error);
    turnstileRef.current?.reset();
    setTurnstileToken("");
  };

  if (state === "success") {
    return (
      <div
        role="status"
        className={cn(
          "bg-success text-white px-5 py-4 font-sans italic text-[16px]",
          "[animation:howa-slide-up_var(--t-slow)_var(--ease-out)]",
          className,
        )}
      >
        {successMessage}
      </div>
    );
  }

  const field = cn(
    "w-full bg-house-white border border-house-brown/15 outline-none px-4 py-3",
    "font-sans text-[15px] text-house-brown",
    "focus:border-house-gold transition-colors",
    "placeholder:font-display placeholder:italic placeholder:text-house-stone",
  );

  return (
    <form
      onSubmit={handle}
      className={cn("flex flex-col gap-2.5 bg-house-cream border border-house-brown/15 p-3", className)}
    >
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <input ref={honeyRef} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <input
        type="text"
        required
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder={namePlaceholder}
        autoComplete="name"
        aria-label={namePlaceholder}
        className={field}
      />
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        autoComplete="email"
        aria-label={placeholder}
        aria-invalid={error ? true : undefined}
        className={field}
      />

      <TurnstileField
        ref={turnstileRef}
        siteKey={siteKey}
        onToken={setTurnstileToken}
        onExpire={() => setTurnstileToken("")}
      />

      <button
        type="submit"
        disabled={state === "submitting" || (!!siteKey && !turnstileToken)}
        className={cn(
          "bg-house-gold-ink text-house-brown px-5 py-3.5",
          "font-sans text-[12px] tracking-[0.2em] uppercase",
          "transition-[filter] duration-[var(--t-slow)] ease-out hover:brightness-105",
          "disabled:opacity-60 disabled:cursor-not-allowed",
        )}
      >
        {state === "submitting" ? "…" : buttonLabel}
      </button>

      {error ? (
        <p role="alert" className="font-sans text-[14px] text-error">
          {error}
        </p>
      ) : null}
    </form>
  );
}
