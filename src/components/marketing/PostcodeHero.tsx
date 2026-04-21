"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * PostcodeHero — large italic postcode input + integrated submit button.
 * Spec: /ux/09-interactions/playground.html (forms section → postcode).
 *
 * Box: 2px brown border. Focus-within shifts the border to gold.
 * Submit button (right): brown bg, cream text, opens letter-spacing on hover,
 * grows a gold underline from left, arrow slides 6px right.
 *
 * Parent wires `onSubmit` — this component doesn't own Supabase calls.
 */
export interface PostcodeHeroProps {
  label?: string;
  placeholder?: string;
  buttonLabel?: string;
  onSubmit: (postcode: string) => void | Promise<void>;
  className?: string;
}

const POSTCODE_RE = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/;

export function PostcodeHero({
  label = "Your postcode",
  placeholder = "e.g. SW1A 1AA",
  buttonLabel = "Check coverage",
  onSubmit,
  className,
}: PostcodeHeroProps) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalised = value.trim().toUpperCase();
    if (!POSTCODE_RE.test(normalised)) {
      setError("Please enter a valid UK postcode.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit(normalised);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handle} className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor="postcode-hero"
        className="font-sans text-[11px] tracking-[0.22em] uppercase text-house-brown/70"
      >
        {label}
      </label>

      <div
        className={cn(
          "flex items-stretch border-2 border-house-brown transition-colors",
          "duration-slow ease-out",
          "focus-within:border-house-gold",
          error && "!border-error",
        )}
      >
        <input
          id="postcode-hero"
          type="text"
          inputMode="text"
          autoComplete="postal-code"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "postcode-hero-error" : undefined}
          className={cn(
            "flex-1 bg-transparent border-0 outline-none min-w-0",
            "px-5 py-4 uppercase tracking-[0.08em]",
            "font-display text-[24px] text-house-brown",
            "placeholder:font-display placeholder:italic placeholder:text-[18px] placeholder:tracking-normal placeholder:normal-case placeholder:text-house-brown/50",
            "placeholder:transition-[opacity] placeholder:duration-[var(--t-slow)] placeholder:ease-out",
            "focus:placeholder:opacity-20",
          )}
        />

        <button
          type="submit"
          disabled={submitting}
          className={cn(
            "group relative shrink-0 inline-flex items-center gap-2",
            "bg-house-brown text-house-cream px-6 py-3.5",
            "font-sans text-[11px] tracking-[0.18em] uppercase",
            "transition-[color,letter-spacing] duration-[var(--t-slow)] ease-out",
            "hover:text-house-gold-light hover:tracking-[0.22em]",
            "disabled:opacity-60 disabled:cursor-not-allowed",
          )}
        >
          <span>{submitting ? "Checking" : buttonLabel}</span>
          <span
            aria-hidden="true"
            className="inline-block transition-all duration-[var(--t-slow)] ease-out group-hover:translate-x-1.5"
          >
            →
          </span>
          {/* Gold underline — scaleX 0→1 from left on hover */}
          <span
            aria-hidden="true"
            className="absolute left-0 bottom-0 h-[2px] w-full bg-house-gold origin-left scale-x-0 transition-all duration-[var(--t-slow)] ease-out group-hover:scale-x-100"
          />
        </button>
      </div>

      {error ? (
        <p
          id="postcode-hero-error"
          role="alert"
          className="font-sans italic text-[13px] text-error"
        >
          {error}
        </p>
      ) : null}
    </form>
  );
}
