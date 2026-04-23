"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { submitForm } from "@/components/forms/submitForm";

/**
 * NewsletterInline — versatile newsletter signup with name + email.
 *
 * All copy props can come from Sanity (via newsletterBlock query) or
 * from hardcoded fallbacks passed by the parent page.
 *
 * Three visual variants: cream, dark, paper.
 */

export interface NewsletterBlockContent {
  placement?: string;
  variant?: "cream" | "dark" | "paper";
  eyebrow?: string;
  headline?: string;
  body?: string;
  namePlaceholder?: string;
  emailPlaceholder?: string;
  buttonLabel?: string;
  successMessage?: string;
  legalNote?: string;
}

interface NewsletterInlineProps extends NewsletterBlockContent {
  sourcePage?: string;
  className?: string;
}

export function NewsletterInline({
  variant = "cream",
  sourcePage = "/",
  eyebrow,
  headline,
  body,
  namePlaceholder = "Your name",
  emailPlaceholder = "your@email.co.uk",
  buttonLabel = "Subscribe",
  successMessage,
  legalNote,
  className,
}: NewsletterInlineProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const honeyRef = React.useRef<HTMLInputElement>(null);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    const result = await submitForm("newsletter", {
      name: name || undefined,
      email,
      sourcePage,
      honey: honeyRef.current?.value ?? "",
      turnstileToken: "",
    });
    setState(result.ok ? "success" : "error");
  };

  const isDark = variant === "dark";
  const isPaper = variant === "paper";

  const defaultEyebrow = eyebrow ?? "The Hearth";
  const defaultHeadline = headline ?? (isDark ? "Seasonal notes on home and garden." : "Stay close to the House.");
  const defaultBody = body ?? (isDark
    ? "A single letter from the editors of The Hearth. Every Friday. Unsubscribe at any time."
    : "A weekly letter from The Hearth: seasonal notes on homes, gardens, design, and the craft of looking after a place properly.");
  const defaultSuccess = successMessage ?? "Welcome to The Hearth. The first letter arrives Friday.";
  const defaultLegal = legalNote ?? "Free \u00b7 GDPR compliant";

  return (
    <div
      className={cn(
        "relative px-[5vw] py-16 overflow-hidden",
        variant === "cream" && "bg-house-cream",
        variant === "dark" && "bg-house-brown text-house-cream",
        variant === "paper" && "bg-howa-paper",
        className,
      )}
    >
      {isPaper && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--house-brown) 1px, transparent 1px), linear-gradient(to bottom, var(--house-brown) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 max-w-[560px] mx-auto text-center">
        <span
          className={cn(
            "block mb-4 font-sans text-[11px] tracking-[0.22em] uppercase",
            isDark ? "text-house-gold-light" : "text-[var(--house-gold-dark)]",
          )}
        >
          {defaultEyebrow}
        </span>

        <h3
          className={cn(
            "font-display italic text-[clamp(24px,3vw,32px)] leading-[1.25] mb-3",
            isDark ? "text-house-cream" : "text-house-brown",
          )}
        >
          {defaultHeadline}
        </h3>

        <p
          className={cn(
            "font-sans text-[14px] leading-[1.6] mb-8",
            isDark ? "text-house-cream/70" : "text-house-brown/70",
          )}
        >
          {defaultBody}
        </p>

        {state === "success" ? (
          <p
            className={cn(
              "font-display italic text-[17px]",
              isDark ? "text-house-gold-light" : "text-[var(--house-gold-dark)]",
            )}
          >
            {defaultSuccess}
          </p>
        ) : (
          <>
            <form
              onSubmit={handle}
              className="max-w-[460px] mx-auto"
              noValidate
            >
              <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                <input ref={honeyRef} type="text" tabIndex={-1} autoComplete="off" />
              </div>

              {/* Name + Email row */}
              <div
                className={cn(
                  "flex flex-col sm:flex-row gap-0",
                  isDark
                    ? "bg-house-white border border-house-white"
                    : "bg-house-white border border-house-brown/15",
                )}
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={namePlaceholder}
                  autoComplete="given-name"
                  aria-label="Your name"
                  className={cn(
                    "bg-transparent border-0 outline-none min-w-0 font-sans text-[14px] px-4 py-3.5 text-house-brown",
                    "placeholder:italic placeholder:font-display placeholder:text-house-brown/35",
                    "sm:w-[38%] sm:border-r border-house-brown/10",
                  )}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={emailPlaceholder}
                  autoComplete="email"
                  aria-label="Your email"
                  className="flex-1 bg-transparent border-0 outline-none min-w-0 font-sans text-[14px] px-4 py-3.5 text-house-brown placeholder:italic placeholder:font-display placeholder:text-house-brown/35"
                />
                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="shrink-0 text-house-cream font-sans text-[11px] tracking-[0.18em] uppercase px-5 py-3.5 border-0 cursor-pointer disabled:opacity-60 transition-colors duration-[var(--t-base)]"
                  style={{ background: "var(--house-gold-dark)" }}
                >
                  {state === "submitting" ? "\u2026" : buttonLabel}
                </button>
              </div>
            </form>

            <p
              className={cn(
                "font-sans text-[10px] tracking-[0.12em] uppercase mt-4",
                isDark ? "text-house-cream/40" : "text-house-brown/40",
              )}
            >
              {defaultLegal} &middot;{" "}
              <Link
                href="/legal/privacy"
                className={cn(
                  "underline underline-offset-[3px]",
                  isDark ? "text-house-cream/55" : "text-house-brown/55",
                )}
              >
                Privacy Policy
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
