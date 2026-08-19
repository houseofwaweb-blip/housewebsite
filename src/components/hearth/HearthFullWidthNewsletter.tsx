"use client";

import * as React from "react";
import Link from "next/link";
import { submitForm } from "@/components/forms/submitForm";
import { TurnstileField } from "@/components/forms/TurnstileField";
import type { TurnstileInstance } from "@marsidev/react-turnstile";

/**
 * HearthFullWidthNewsletter — per variant-A: full-bleed black band.
 * Jost 11px tracking 0.32em gold kicker, Cormorant h2 with italic accent,
 * italic p, white pill form (input + black button), legal fine print below.
 */
export function HearthFullWidthNewsletter() {
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
      email,
      sourcePage: "/the-hearth",
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
    <section className="bg-house-black text-house-white text-center px-[5vw] py-20 mt-12">
      <span className="block mb-5 font-hearth-sans text-[14px] tracking-[0.32em] uppercase text-house-gold-light">
        Subscribe to The Hearth
      </span>
      <h2 className="font-hearth-serif font-medium text-[clamp(37px,4vw,59px)] leading-[1.08] tracking-[-0.005em] max-w-[720px] mx-auto mb-3.5">
        Seasonal notes on home and garden,{" "}
        <em className="italic font-normal text-house-gold-light">delivered weekly.</em>
      </h2>
      <p className="font-hearth-serif italic text-[21px] leading-[1.5] text-house-white/80 max-w-[520px] mx-auto mb-7">
        A single letter from the editors every Friday. Unsubscribe at any time.
      </p>

      {state === "success" ? (
        <p className="font-hearth-serif italic text-[20px] text-house-gold-light">
          Thank you. The next letter will land on Friday.
        </p>
      ) : (
        <form
          onSubmit={handle}
          className="max-w-[480px] mx-auto flex bg-house-white border border-house-white"
          noValidate
        >
          <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
            <input ref={honeyRef} type="text" tabIndex={-1} autoComplete="off" />
          </div>
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
            disabled={state === "submitting" || (!!siteKey && !turnstileToken)}
            className="shrink-0 bg-house-black text-house-white font-hearth-sans text-[14px] tracking-[0.2em] uppercase px-6 py-[14px] border-0 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {state === "submitting" ? "…" : "Sign up"}
          </button>
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
