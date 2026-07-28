"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * HeroServiceFinder — the service + postcode finder that leads the homepage
 * hero (DIRECTIVE §05 module 02 and §16 acceptance: a first-time visitor,
 * including on mobile, can select a live service and enter a postcode without
 * opening the menu).
 *
 * Only LIVE services are offered here (§04: future categories are not given
 * equal weight). On submit it routes to the service page, carrying the postcode
 * so coverage/price can be resolved there. The persistent header CTA remains
 * "Book a service"; this hero CTA is the service-led "See prices & availability".
 */
const LIVE_SERVICES = [
  { label: "Gardening", slug: "gardening" },
  { label: "Window cleaning", slug: "window-cleaning" },
  { label: "Cleaning", slug: "cleaning" },
  { label: "Gutter cleaning", slug: "gutter-cleaning" },
];

export function HeroServiceFinder() {
  const router = useRouter();
  const [service, setService] = useState("");
  const [postcode, setPostcode] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const pc = postcode.trim();
    const target = service ? `/services/${service}` : "/services";
    router.push(pc ? `${target}?postcode=${encodeURIComponent(pc)}` : target);
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 w-full max-w-[520px]">
      <div className="bg-house-white border border-house-brown/15 p-4 sm:p-5 flex flex-col gap-3">
        <label className="font-sans text-[11px] tracking-[0.22em] uppercase text-house-gold-ink">
          What does your home need?
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            aria-label="Choose a service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="flex-1 min-w-0 h-12 px-3 font-sans text-[15px] text-house-brown bg-house-cream border border-house-brown/20 focus:border-house-gold outline-none"
          >
            <option value="">Choose a service</option>
            {LIVE_SERVICES.map((svc) => (
              <option key={svc.slug} value={svc.slug}>
                {svc.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            inputMode="text"
            autoComplete="postal-code"
            aria-label="Your postcode"
            placeholder="Your postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            className="sm:w-[150px] h-12 px-3 font-sans text-[15px] text-house-brown bg-house-cream border border-house-brown/20 focus:border-house-gold outline-none placeholder:text-house-stone/70"
          />
        </div>
        <button
          type="submit"
          className="h-12 w-full font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown bg-house-gold-ink border border-house-gold-dark transition-[filter] hover:brightness-110"
        >
          See prices &amp; availability
        </button>
      </div>
    </form>
  );
}
