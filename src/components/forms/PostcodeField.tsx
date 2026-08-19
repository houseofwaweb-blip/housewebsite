"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";

/**
 * PostcodeField — a compact "See services near you" postcode entry (spec §6.1
 * mega-menu, §9 services landing, §7.2 forms).
 *
 * On submit it carries the postcode into the target route (default /services)
 * so coverage and pricing resolve there. Postcode context persists via the
 * query string — never sensitive data (spec §25.3). Label stays visible above
 * the field (spec §7.2); placeholder is an example only.
 *
 * Kept House-cream so it reads as navigation punctuation inside the mega-menu,
 * not a coloured block (spec §6.1).
 */

export interface PostcodeFieldProps {
  /** Visible label above the field. */
  label?: string;
  /** Where to route on submit; postcode is appended as ?postcode=. */
  action?: string;
  placeholder?: string;
  ctaLabel?: string;
  /** Optional handler instead of routing (e.g. inline availability check). */
  onSubmitPostcode?: (postcode: string) => void;
  dark?: boolean;
  className?: string;
}

const UK_POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

export function PostcodeField({
  label = "See services near you",
  action = "/services",
  placeholder = "e.g. SW1A 1AA",
  ctaLabel = "See services",
  onSubmitPostcode,
  dark = false,
  className,
}: PostcodeFieldProps) {
  const router = useRouter();
  const inputId = React.useId();
  const [postcode, setPostcode] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const pc = postcode.trim();
    if (!pc) {
      setError("Enter a full UK postcode");
      return;
    }
    if (!UK_POSTCODE.test(pc)) {
      setError("Enter a full UK postcode, for example SW1A 1AA");
      return;
    }
    setError(null);
    if (onSubmitPostcode) {
      onSubmitPostcode(pc);
      return;
    }
    router.push(`${action}?postcode=${encodeURIComponent(pc)}`);
  }

  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-2", className)} noValidate>
      <label
        htmlFor={inputId}
        className={cn(
          "font-sans text-[13px] tracking-[0.2em] uppercase",
          dark ? "text-house-cream/70" : "text-house-brown/60",
        )}
      >
        {label}
      </label>
      <div className="flex items-stretch gap-2">
        <input
          id={inputId}
          type="text"
          inputMode="text"
          autoComplete="postal-code"
          aria-label={label}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          placeholder={placeholder}
          value={postcode}
          onChange={(e) => {
            setPostcode(e.target.value);
            if (error) setError(null);
          }}
          className={cn(
            "flex-1 min-w-0 h-11 px-3 font-sans text-[15px] outline-none",
            "border transition-colors duration-[var(--t-base)]",
            dark
              ? "bg-transparent text-house-cream border-house-cream/30 focus:border-house-gold placeholder:text-house-cream/40"
              : "bg-house-cream-light text-house-brown border-house-brown/20 focus:border-house-gold placeholder:text-house-stone",
          )}
        />
        <button
          type="submit"
          className={cn(
            "h-11 px-4 shrink-0 font-sans text-[13px] tracking-[0.16em] uppercase border no-underline",
            "transition-[filter] duration-[var(--t-base)] hover:brightness-110",
            // Primary House button: brown/ink ground, cream type (spec §7.1).
            "bg-house-brown text-house-cream border-house-brown",
          )}
        >
          {ctaLabel}
        </button>
      </div>
      {error ? (
        <p
          id={`${inputId}-error`}
          role="alert"
          className={cn(
            "font-sans italic text-[16px]",
            dark ? "text-house-cream/80" : "text-error",
          )}
        >
          {error}
        </p>
      ) : null}
    </form>
  );
}
