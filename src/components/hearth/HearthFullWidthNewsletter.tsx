"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { submitForm } from "@/components/forms/submitForm";
import { TurnstileField } from "@/components/forms/TurnstileField";
import type { TurnstileInstance } from "@marsidev/react-turnstile";

/**
 * HearthFullWidthNewsletter — per variant-A: full-bleed black band.
 * Jost 11px tracking 0.32em gold kicker, Cormorant h2 with italic accent,
 * italic p, white pill form (input + black button), legal fine print below.
 *
 * Reused by /the-hearth (default `sourcePage`/anchor) and the standalone
 * /newsletter landing page (passes sourcePage="/newsletter" + className to
 * drop the magazine top-margin). The default `id="subscribe"` is what makes
 * /the-hearth#subscribe jump straight to the form.
 */
export function HearthFullWidthNewsletter({
  sourcePage = "/the-hearth",
  id = "subscribe",
  className,
  collectName = false,
}: {
  sourcePage?: string;
  id?: string;
  className?: string;
  /** Show an optional first-name field (feeds Klaviyo first_name). Off by
   *  default to keep the Hearth magazine band a compact email-only pill;
   *  the standalone /newsletter page turns it on. */
  collectName?: boolean;
} = {}) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const honeyRef = React.useRef<HTMLInputElement>(null);
  const turnstileRef = React.useRef<TurnstileInstance | null>(null);
  const [turnstileToken, setTurnstileToken] = React.useState("");
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    const result = await submitForm("newsletter", {
      name: collectName && name.trim() ? name.trim() : undefined,
      email,
      sourcePage,
      honey: honeyRef.current?.value ?? "",
      turnstileToken: turnstileToken || (siteKey ? "" : "no-turnstile"),
    });
    if (result.ok) {
      setState("success");
      return;
    }
    setState("error");
    turnstileRef.current?.reset();
    setTurnstileToken("");
  };

  return (
    <section id={id} className={cn("bg-house-black text-house-white text-center px-[5vw] py-20 mt-12", className)}>
      <span className="block mb-5 font-hearth-sans text-[14px] tracking-[0.32em] uppercase text-house-gold-light">
        Subscribe to The Hearth
      </span>
      <h2 className="font-hearth-serif font-medium text-[clamp(37px,4vw,59px)] leading-[1.08] tracking-[-0.005em] max-w-[720px] mx-auto mb-3.5">
        Seasonal notes on{" "}
        <em className="italic font-normal text-house-gold-light">home and garden.</em>
      </h2>
      <p className="font-hearth-serif italic text-[21px] leading-[1.5] text-house-white/80 max-w-[520px] mx-auto mb-7">
        A single letter from the editors. Unsubscribe at any time.
      </p>

      {state === "success" ? (
        <p className="font-hearth-serif italic text-[20px] text-house-gold-light">
          You&rsquo;re subscribed. Welcome to The Hearth.
        </p>
      ) : (
        <form
          onSubmit={handle}
          className={collectName
            ? "max-w-[480px] mx-auto flex flex-col gap-3"
            : "max-w-[480px] mx-auto flex bg-house-white border border-house-white"}
          noValidate
        >
          <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
            <input ref={honeyRef} type="text" tabIndex={-1} autoComplete="off" />
          </div>
          {collectName && (
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="given-name"
              aria-label="Your name"
              className="bg-house-white border border-house-white outline-none font-hearth-sans text-[18px] px-[18px] py-[14px] text-house-black placeholder:italic placeholder:font-hearth-serif placeholder:text-house-stone"
            />
          )}
          <div className={collectName ? "flex bg-house-white border border-house-white" : "contents"}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.co.uk"
            autoComplete="email"
            aria-label="Your email"
            className="flex-1 bg-transparent border-0 outline-none min-w-0 font-hearth-sans text-[18px] px-[18px] py-[14px] text-house-black placeholder:italic placeholder:font-hearth-serif placeholder:text-house-stone"
          />
          <button
            type="submit"
            disabled={state === "submitting" || (!!siteKey && !turnstileToken) || (collectName && !name.trim())}
            className="shrink-0 bg-house-black text-house-white font-hearth-sans text-[14px] tracking-[0.2em] uppercase px-6 py-[14px] border-0 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {state === "submitting" ? "…" : "Sign up"}
          </button>
          </div>
        </form>
      )}

      {state !== "success" ? (
        <div className="flex justify-center mt-4">
          <TurnstileField
            ref={turnstileRef}
            siteKey={siteKey}
            onToken={setTurnstileToken}
            onExpire={() => setTurnstileToken("")}
          />
        </div>
      ) : null}
      {state === "error" ? (
        <p role="alert" className="font-hearth-sans text-[16px] text-house-gold-light mt-3">
          Something went wrong. Please try again.
        </p>
      ) : null}

      <p className="font-hearth-sans text-[14px] tracking-[0.14em] uppercase text-house-white/45 mt-[18px]">
        Free · GDPR compliant · read more in our{" "}
        <Link
          href="/legal/privacy"
          className="text-house-white/70 underline underline-offset-[3px]"
        >
          Privacy Policy
        </Link>
      </p>
    </section>
  );
}
