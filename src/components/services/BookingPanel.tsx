"use client";

import { useState } from "react";
import { buildBookingUrl } from "@/components/booking/postcode";
import { SERVICEOS_SERVICE_ID } from "@/lib/serviceos-links";

/**
 * BookingPanel — the right-hand above-the-fold panel from rebuild spec §10.
 *
 * Shared by both service page templates (ServiceDetail category pages and the
 * lighter SingleServiceDetail leaf pages) so the above-the-fold booking action
 * is identical wherever a service is shown: service preselected, postcode, next
 * available / date, a primary CTA, a phone alternative and a "Powered by HoWA"
 * footer.
 *
 * Some services cannot honestly return an instant price from a postcode alone
 * (§10 service-specific art and content). For those the panel shows the real
 * intake instead of a false instant price: Repairs asks for the task and a
 * photograph or two; Removals begins with the move details and a quote. The
 * CTA still routes to the same booking flow; this is messaging, not a new
 * engine. We never call this a "survey": that wording is reserved for design
 * commissions.
 */

const PHONE_DISPLAY = "0800 047 8738";
const PHONE_HREF = "tel:08000478738";

interface Intake {
  /** Small eyebrow above the note. */
  label: string;
  /** One or two sentences explaining why we ask before pricing. */
  body: string;
  /** CTA label for this intake path. */
  cta: string;
  /** Hide the "next available / date" control (no instant slot to show). */
  hideTiming?: boolean;
}

const INTAKE: Record<string, Intake> = {
  handyman: {
    label: "First, the details",
    body: "Describe the task and add a photograph or two. Small jobs are priced from what actually needs doing, so you get a real figure rather than a false instant price.",
    cta: "Describe the job",
  },
  removals: {
    label: "First, the move details",
    body: "Start with the move details, where from, where to, floors, access and rough room count. A move is priced on a quote, never a false instant number.",
    cta: "Get a quote",
    hideTiming: true,
  },
};

export function BookingPanel({
  serviceName,
  slug,
  accent,
  mode = "book",
  fromPrice,
}: {
  serviceName: string;
  slug: string;
  /** CSS colour value (a `--service-*` token or a data-layer colour). */
  accent: string;
  mode?: "book" | "quote";
  /** "from" price shown under the panel title, where one is commercially true. */
  fromPrice?: string;
}) {
  const [postcode, setPostcode] = useState("");
  const intake = INTAKE[slug];
  const quote = mode === "quote";
  const showTiming = !quote && !intake?.hideTiming;

  const primaryLabel = intake
    ? intake.cta
    : quote
      ? "Get a quote"
      : "See times and prices";

  const enquiryMode = quote || intake?.hideTiming;
  const title = enquiryMode ? "Get a quote." : "See times and prices.";
  const eyebrow = enquiryMode ? "Get a quote" : "Book this service";

  return (
    <aside className="lg:col-span-5 lg:sticky lg:top-24">
      <div className="border border-house-brown/15 bg-house-cream-light p-[clamp(24px,2.4vw,34px)]">
        <p className="mb-1 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">
          {eyebrow}
        </p>
        <h2 className="mb-2 font-hearth-serif text-[clamp(22px,2.4vw,28px)] leading-tight text-house-brown">
          {title}
        </h2>
        {fromPrice ? (
          <p className="mb-5 font-sans text-[14px] text-house-brown/70">{fromPrice}</p>
        ) : (
          <div className="mb-5" />
        )}

        <div className="grid gap-4">
          <div>
            <label className="mb-1.5 block font-sans text-[12px] tracking-[0.12em] uppercase text-house-brown/70">
              Service
            </label>
            <div className="flex items-center gap-3 border border-house-brown/15 bg-house-cream px-4 py-3">
              <span aria-hidden className="inline-block h-3 w-3 shrink-0" style={{ background: accent }} />
              <span className="font-sans text-[15px] text-house-brown">{serviceName}</span>
            </div>
          </div>

          <div>
            <label
              htmlFor={`svc-postcode-${slug}`}
              className="mb-1.5 block font-sans text-[12px] tracking-[0.12em] uppercase text-house-brown/70"
            >
              Your postcode
            </label>
            <input
              id={`svc-postcode-${slug}`}
              name="postcode"
              type="text"
              inputMode="text"
              autoComplete="postal-code"
              placeholder="e.g. SW1A 1AA"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              className="w-full border border-house-brown/25 bg-house-white px-4 py-3 font-sans text-[15px] text-house-brown placeholder:text-house-brown/40 focus:border-house-gold focus:outline-none"
            />
          </div>

          {showTiming ? (
            <div>
              <label
                htmlFor={`svc-timing-${slug}`}
                className="mb-1.5 block font-sans text-[12px] tracking-[0.12em] uppercase text-house-brown/70"
              >
                When
              </label>
              <select
                id={`svc-timing-${slug}`}
                name="timing"
                defaultValue="next"
                className="w-full border border-house-brown/25 bg-house-white px-4 py-3 font-sans text-[15px] text-house-brown focus:border-house-gold focus:outline-none"
              >
                <option value="next">Next available</option>
                <option value="date">Choose a date</option>
              </select>
            </div>
          ) : null}

          {intake ? (
            <div className="border border-house-brown/15 bg-house-cream px-4 py-3.5">
              <p className="mb-1 font-sans text-[11px] tracking-[0.16em] uppercase text-house-gold-ink">
                {intake.label}
              </p>
              <p className="font-sans text-[13px] leading-[1.55] text-house-brown/75">
                {intake.body}
              </p>
            </div>
          ) : null}

          {/* Plain <a>, NOT next/link: the ServiceOS OBF only reads its URL
              params on a full page load, so this must be a real navigation. A
              client-side Link lands on the homepage without re-initialising the
              widget, so nothing opens (the "took me to the homepage and did
              nothing" bug). */}
          <a
            href={buildBookingUrl(postcode, SERVICEOS_SERVICE_ID[slug])}
            className="inline-flex w-full items-center justify-center gap-2.5 border border-house-brown bg-house-brown px-6 py-3.5 font-sans text-[12px] uppercase tracking-[0.22em] font-medium text-house-cream no-underline transition-colors hover:bg-house-brown/90"
          >
            {primaryLabel}
          </a>
        </div>

        <p className="mt-4 font-sans text-[14px] leading-[1.5] text-house-brown/70">
          Prefer to talk?{" "}
          <a href={PHONE_HREF} className="text-house-gold-ink underline underline-offset-[3px] hover:text-house-brown">
            Call {PHONE_DISPLAY}
          </a>{" "}
          or{" "}
          <a href="#service-enquiry" className="text-house-gold-ink underline underline-offset-[3px] hover:text-house-brown">
            request a callback
          </a>
          .
        </p>

        <p className="mt-5 border-t border-house-brown/12 pt-4 font-sans text-[12px] tracking-[0.14em] uppercase text-house-brown/55">
          Powered by HoWA
        </p>
      </div>
    </aside>
  );
}
