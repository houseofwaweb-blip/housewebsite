"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { submitForm } from "@/components/forms/submitForm";
import type { NewsletterInterest } from "@/lib/forms/schemas";

/**
 * Interest chips offered on the form. Order is deliberate — start with the
 * widest editorial bucket, narrow as you go right. Keep in sync with
 * lib/klaviyo/SURFACE_TO_INTEREST (which decides what Klaviyo segments
 * each chip pushes the profile into).
 *
 * Handyman is intentionally omitted: it's a deferred service per
 * CLAUDE.md, so we don't want to invite signups we can't fulfil.
 */
const INTERESTS: ReadonlyArray<{
  id: NewsletterInterest;
  label: string;
  hint: string;
}> = [
  { id: "the-house", label: "The House", hint: "Editorial, gardens, design, recipes" },
  { id: "services", label: "Home services", hint: "Cleaning, gardening, window cleaning" },
  { id: "garden-design", label: "Garden design", hint: "Studios + project work" },
  { id: "interior-design", label: "Interior design", hint: "Studios + project work" },
];

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
  const [interests, setInterests] = React.useState<NewsletterInterest[]>([]);
  const [state, setState] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const honeyRef = React.useRef<HTMLInputElement>(null);

  const toggleInterest = (id: NewsletterInterest) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    const result = await submitForm("newsletter", {
      name: name || undefined,
      email,
      interests,
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
  const splitImage = isDark ? "/home/hero-georgian.webp" : "/partners/hero.webp";

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

                {/* Interests — chip group. Optional; empty array still subscribes,
                    just without segment tagging. Drives Klaviyo's existing
                    interest segments via the `interest` profile property. */}
                <fieldset className="mb-5">
                  <legend
                    className={cn(
                      "font-sans text-[11px] tracking-[0.18em] uppercase mb-2",
                      isDark ? "text-house-cream/55" : "text-house-brown/50",
                    )}
                  >
                    What interests you?
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {INTERESTS.map((it) => {
                      const active = interests.includes(it.id);
                      return (
                        <button
                          key={it.id}
                          type="button"
                          onClick={() => toggleInterest(it.id)}
                          aria-pressed={active}
                          title={it.hint}
                          className={cn(
                            "font-sans text-[12px] tracking-[0.04em] px-3 py-2 border cursor-pointer transition-colors duration-[var(--t-base)] select-none",
                            active
                              ? isDark
                                ? "bg-house-gold-light text-house-brown border-house-gold-light"
                                : "bg-house-brown text-house-cream border-house-brown"
                              : isDark
                                ? "bg-transparent text-house-cream/85 border-house-cream/30 hover:border-house-cream/60"
                                : "bg-transparent text-house-brown/80 border-house-brown/20 hover:border-house-brown/45",
                          )}
                        >
                          {it.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

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
                  "font-sans text-[11px] tracking-[0.12em] uppercase mt-4",
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
