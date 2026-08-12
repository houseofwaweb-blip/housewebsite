"use client";

import * as React from "react";
import { submitForm } from "@/components/forms/submitForm";
import { TurnstileField } from "@/components/forms/TurnstileField";
import type { TurnstileInstance } from "@marsidev/react-turnstile";

/**
 * MiniNewsletter — compact email capture for the homepage magazine module.
 * Submits through the shared newsletter endpoint (Turnstile-verified), the same
 * pipeline as NewsletterInline, but sized for a small sidebar box on a dark
 * ground. Renders a success line in place on completion.
 */
export function MiniNewsletter({ sourcePage = "/" }: { sourcePage?: string }) {
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [token, setToken] = React.useState("");
  const turnstileRef = React.useRef<TurnstileInstance | null>(null);
  const honeyRef = React.useRef<HTMLInputElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    const result = await submitForm("newsletter", {
      email,
      sourcePage,
      honey: honeyRef.current?.value ?? "",
      turnstileToken: token || (siteKey ? "" : "no-turnstile"),
    });
    if (result.ok) {
      setState("success");
      return;
    }
    setState("error");
    turnstileRef.current?.reset();
    setToken("");
  };

  if (state === "success") {
    return <p className="font-sans text-[13px] leading-[1.5] text-house-cream/85">Welcome. The first note arrives Friday.</p>;
  }

  return (
    <form onSubmit={handle} noValidate>
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <input ref={honeyRef} type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          aria-label="Your email address"
          className="min-w-0 flex-1 border border-house-cream/20 bg-house-cream/95 px-3 py-2.5 font-sans text-[14px] text-house-brown outline-none placeholder:text-house-stone"
        />
        <button
          type="submit"
          disabled={state === "submitting" || (!!siteKey && !token)}
          className="whitespace-nowrap border border-house-cream bg-house-cream px-4 py-2.5 font-sans text-[11px] tracking-[0.14em] uppercase text-[color:var(--house-green-deep)] transition-[filter] hover:brightness-95 disabled:opacity-60"
        >
          {state === "submitting" ? "…" : "Join"}
        </button>
      </div>
      <div className="mt-2">
        <TurnstileField ref={turnstileRef} siteKey={siteKey} theme="dark" onToken={setToken} onExpire={() => setToken("")} />
      </div>
      {state === "error" ? (
        <p role="alert" className="mt-2 font-sans text-[12px] text-house-cream/80">Something went wrong. Please try again.</p>
      ) : null}
    </form>
  );
}
