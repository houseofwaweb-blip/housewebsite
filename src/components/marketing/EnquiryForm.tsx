"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { submitForm } from "@/components/forms/submitForm";
import { TurnstileField } from "@/components/forms/TurnstileField";
import type { TurnstileInstance } from "@marsidev/react-turnstile";

/**
 * EnquiryForm — the House's "get in touch / book a service" form.
 *
 * Posts to the `consultation` form type (name, email, phone, postcode,
 * serviceType, notes), so every enquiry lands in Supabase + Klaviyo and fires
 * the Schedule conversion. The `serviceType` select is the "which service are
 * you interested in" field; pass `defaultService` to prefill it (used on the
 * individual service pages). serviceType "general" covers a plain contact.
 *
 * This is the embedded enquiry/lead form. The instant online booking flow is a
 * separate ServiceOS modal opened via href="#open-booking-form".
 */

type ServiceType =
  | "general"
  | "gardening"
  | "window-cleaning"
  | "cleaning"
  | "gutter-cleaning"
  | "design-gardens"
  | "design-interiors"
  | "steward"
  | "protect";

const SERVICE_OPTIONS: ReadonlyArray<{ value: ServiceType; label: string }> = [
  { value: "general", label: "General enquiry" },
  { value: "gardening", label: "Gardening" },
  { value: "window-cleaning", label: "Window cleaning" },
  { value: "cleaning", label: "Cleaning" },
  { value: "gutter-cleaning", label: "Gutter cleaning" },
  { value: "design-gardens", label: "Garden design" },
  { value: "design-interiors", label: "Interior design" },
  { value: "steward", label: "Steward (managed care)" },
  { value: "protect", label: "Protect / home protection" },
];

export interface EnquiryFormProps {
  /** Any service slug; coerced to a known option, else "general". */
  defaultService?: string;
  sourcePage?: string;
  variant?: "cream" | "dark";
  eyebrow?: string;
  headline?: string;
  body?: string;
  buttonLabel?: string;
  successMessage?: string;
  className?: string;
}

export function EnquiryForm({
  defaultService = "general",
  sourcePage = "/",
  variant = "cream",
  eyebrow = "Get in touch",
  headline = "Tell us about your home.",
  body = "Send us a note or ask about a service. We read everything and reply personally, usually within one working day.",
  buttonLabel = "Send enquiry",
  successMessage = "Thank you. Your enquiry is with the House, we will be in touch shortly.",
  className,
}: EnquiryFormProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [postcode, setPostcode] = React.useState("");
  const initialService = (SERVICE_OPTIONS.some((o) => o.value === defaultService)
    ? defaultService
    : "general") as ServiceType;
  const [serviceType, setServiceType] = React.useState<ServiceType>(initialService);
  const [notes, setNotes] = React.useState("");
  const [state, setState] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = React.useState("");
  const router = useRouter();
  const honeyRef = React.useRef<HTMLInputElement>(null);
  const turnstileRef = React.useRef<TurnstileInstance | null>(null);
  const [turnstileToken, setTurnstileToken] = React.useState("");
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

  const isDark = variant === "dark";

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    setError("");
    const result = await submitForm("consultation", {
      name,
      email,
      phone: phone || undefined,
      postcode: postcode || undefined,
      serviceType,
      notes: notes || undefined,
      sourcePage,
      honey: honeyRef.current?.value ?? "",
      // Real Turnstile token when the widget is configured; the "no-turnstile"
      // sentinel only matters in dev where TURNSTILE_SECRET_KEY is unset.
      turnstileToken: turnstileToken || (siteKey ? "" : "no-turnstile"),
    });
    if (result.ok) {
      router.push("/thank-you");
      return;
    }
    setState("error");
    setError(result.error);
    turnstileRef.current?.reset();
    setTurnstileToken("");
  };

  const field = cn(
    "w-full border outline-none font-sans text-[15px] px-4 py-3.5 text-house-brown",
    "placeholder:italic placeholder:font-display placeholder:text-house-brown/35",
    isDark ? "bg-house-white border-house-white" : "bg-house-white border-house-brown/15 focus:border-house-gold",
  );

  return (
    <div
      className={cn(
        "px-[5vw] py-[clamp(48px,6vw,88px)]",
        isDark ? "bg-house-brown text-house-cream" : "bg-house-cream text-house-brown",
        className,
      )}
    >
      <div className="mx-auto grid max-w-[1080px] items-start gap-[clamp(28px,4vw,64px)] md:grid-cols-2">
        {/* Copy */}
        <div>
          <p className={cn("mb-4 font-sans text-[12px] tracking-[0.3em] uppercase", isDark ? "text-house-gold-light" : "text-house-gold-ink")}>
            {eyebrow}
          </p>
          <h2 className={cn("font-display text-[clamp(28px,3.2vw,44px)] leading-[1.08] mb-4", isDark ? "text-house-cream" : "text-house-brown")}>
            {headline}
          </h2>
          <p className={cn("font-sans text-[16px] leading-[1.7] max-w-[44ch]", isDark ? "text-house-cream/70" : "text-house-stone")}>
            {body}
          </p>
          <p className={cn("font-sans text-[15px] mt-6", isDark ? "text-house-cream/60" : "text-house-stone")}>
            Prefer to book online?{" "}
            <a href="#open-booking-form" className={cn("underline underline-offset-[3px]", isDark ? "text-house-gold-light" : "text-house-gold-ink")}>
              Book through HoWA
            </a>
            .
          </p>
        </div>

        {/* Form */}
        <div>
          {state === "success" ? (
            <p className={cn("font-display italic text-[19px] leading-[1.5]", isDark ? "text-house-gold-light" : "text-house-gold-ink")}>
              {successMessage}
            </p>
          ) : (
            <form onSubmit={handle} className="flex flex-col gap-3" noValidate>
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <input ref={honeyRef} type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" aria-label="Your name" className={field} />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.co.uk" autoComplete="email" aria-label="Your email" className={field} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)" autoComplete="tel" aria-label="Phone" className={field} />
                <input type="text" value={postcode} onChange={(e) => setPostcode(e.target.value)} placeholder="Postcode (optional)" autoComplete="postal-code" aria-label="Postcode" className={field} />
              </div>

              <label className="sr-only" htmlFor="enquiry-service">Service of interest</label>
              <select
                id="enquiry-service"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value as ServiceType)}
                aria-label="Service of interest"
                className={cn(field, "cursor-pointer appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat")}
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8' fill='none' stroke='%2330231c'%3E%3Cpath d='M1 1l5 5 5-5'/%3E%3C/svg%3E\")" }}
              >
                {SERVICE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>

              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="How can we help? Tell us a little about your home." aria-label="Your message" rows={4} className={cn(field, "resize-y")} />

              <div className="mt-1">
                <TurnstileField
                  ref={turnstileRef}
                  siteKey={siteKey}
                  theme={isDark ? "dark" : "light"}
                  onToken={setTurnstileToken}
                  onExpire={() => setTurnstileToken("")}
                />
              </div>

              {state === "error" ? (
                <p className="font-sans text-[15px] text-[#8b3a3a]" role="alert">{error}</p>
              ) : null}

              <button
                type="submit"
                disabled={state === "submitting" || (!!siteKey && !turnstileToken)}
                className="w-full font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown border-0 px-5 py-4 cursor-pointer disabled:opacity-60 transition-colors"
                style={{ background: "var(--color-house-gold-ink)" }}
              >
                {state === "submitting" ? "Sending…" : buttonLabel}
              </button>

              <p className={cn("font-sans text-[12px] tracking-[0.1em] uppercase mt-1", isDark ? "text-house-cream/40" : "text-house-brown/40")}>
                We reply personally &middot;{" "}
                <Link href="/legal/privacy" className="underline underline-offset-[3px]">Privacy Policy</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
