"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { submitForm } from "@/components/forms/submitForm";

/**
 * NewsletterInline — split-layout newsletter signup.
 *
 * Variant A "The Split": image left, form + editorial copy right.
 * Three visual modes: cream (light pages), dark (brown band), paper (parchment).
 *
 * All copy props can come from Sanity (via newsletterBlock query) or
 * from hardcoded fallbacks passed by the parent page.
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
  const defaultHeadline = headline ?? "Seasonal notes on home and garden.";
  const defaultBody = body ?? "A single letter from the editors. Every Friday. The craft of looking after a place properly, written for people who care about where they live.";
  const defaultSuccess = successMessage ?? "Welcome to The Hearth. The first letter arrives Friday.";
  const defaultLegal = legalNote ?? "Free \u00b7 GDPR compliant";

  // Image for split layout (cream/paper use the drawing room, dark uses Georgian terrace)
  const splitImage = isDark ? "/home/hero-georgian.png" : "/partners/hero.png";

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        variant === "cream" && "bg-house-cream",
        variant === "dark" && "bg-house-brown text-house-cream",
        variant === "paper" && "bg-howa-paper",
        className,
      )}
    >
      {/* Tracing lines for paper variant */}
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

      {/* Split layout: image left, form right */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
        {/* Left — image */}
        <div className="relative hidden md:block min-h-[400px]">
          <Image
            src={splitImage}
            alt="A room in the House"
            fill
            sizes="50vw"
            className="object-cover"
          />
          {/* Gradient fade into the form side */}
          <div
            className="absolute inset-0"
            style={{
              background: isDark
                ? "linear-gradient(90deg, transparent 60%, var(--house-brown) 100%)"
                : variant === "paper"
                  ? "linear-gradient(90deg, transparent 60%, var(--howa-paper) 100%)"
                  : "linear-gradient(90deg, transparent 60%, var(--house-cream) 100%)",
            }}
          />
        </div>

        {/* Right — form + copy */}
        <div className="flex flex-col justify-center px-[5vw] md:px-12 lg:px-16 py-16 md:py-20">
          {/* Gold rule */}
          <div
            className="w-10 h-px mb-5"
            style={{ background: isDark ? "var(--house-gold-light)" : "var(--house-gold-dark)" }}
          />

          <span
            className={cn(
              "block mb-5 font-sans text-[11px] tracking-[0.22em] uppercase",
              isDark ? "text-house-gold-light" : "text-[var(--house-gold-dark)]",
            )}
          >
            {defaultEyebrow}
          </span>

          <h3
            className={cn(
              "font-display italic text-[clamp(28px,3vw,38px)] leading-[1.15] mb-4",
              isDark ? "text-house-cream" : "text-house-brown",
            )}
          >
            {defaultHeadline}
          </h3>

          <p
            className={cn(
              "font-sans text-[15px] leading-[1.65] mb-8 max-w-[400px]",
              isDark ? "text-house-cream/70" : "text-house-brown/70",
            )}
          >
            {defaultBody}
          </p>

          {state === "success" ? (
            <p
              className={cn(
                "font-display italic text-[18px]",
                isDark ? "text-house-gold-light" : "text-[var(--house-gold-dark)]",
              )}
            >
              {defaultSuccess}
            </p>
          ) : (
            <>
              <form onSubmit={handle} className="max-w-[400px]" noValidate>
                <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                  <input ref={honeyRef} type="text" tabIndex={-1} autoComplete="off" />
                </div>

                {/* Name + Email — stacked with gap */}
                <div className="flex flex-col gap-3 mb-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={namePlaceholder}
                    autoComplete="given-name"
                    aria-label="Your name"
                    className={cn(
                      "border outline-none font-sans text-[14px] px-4 py-3.5 text-house-brown w-full",
                      "placeholder:italic placeholder:font-display placeholder:text-house-brown/35",
                      isDark
                        ? "bg-house-white border-house-white"
                        : "bg-house-white border-house-brown/12",
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
                    className={cn(
                      "border outline-none font-sans text-[14px] px-4 py-3.5 text-house-brown w-full",
                      "placeholder:italic placeholder:font-display placeholder:text-house-brown/35",
                      isDark
                        ? "bg-house-white border-house-white"
                        : "bg-house-white border-house-brown/12",
                    )}
                  />
                </div>

                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="w-full text-house-cream font-sans text-[11px] tracking-[0.18em] uppercase px-5 py-3.5 border-0 cursor-pointer disabled:opacity-60 transition-colors duration-[var(--t-base)]"
                  style={{ background: "var(--house-gold-dark)" }}
                >
                  {state === "submitting" ? "\u2026" : buttonLabel}
                </button>
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
    </div>
  );
}
