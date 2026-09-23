"use client";

import { useState } from "react";
import { buildBookingUrl } from "@/components/booking/postcode";
import { SERVICEOS_SERVICE_ID } from "@/lib/serviceos-links";

/**
 * HeroBookingBar — the horizontal service/postcode/date booking bar that spans
 * the bottom of the homepage hero (amendments §4). Service + postcode open the
 * ServiceOS booking flow via a full-page navigation (the OBF reads the
 * deep-link on load); the date is chosen in the flow. Cream bar, House palette.
 */
const SERVICES = [
  { label: "Gardening", slug: "gardening" },
  { label: "Cleaning", slug: "cleaning" },
  { label: "Window & gutter cleaning", slug: "window-cleaning" },
  { label: "Handyman", slug: "handyman" },
  { label: "Housekeeping", slug: "housekeeping" },
  { label: "Removals", slug: "removals" },
  { label: "Electrical & energy", slug: "energy" },
  { label: "Dog walking & pet care", slug: "pet-care" },
];

const FIELD_LABEL = "font-sans text-[11px] uppercase tracking-[0.16em] text-house-gold-dark";
const FIELD_CTRL = "mt-1 h-11 w-full min-w-0 border border-house-brown/20 bg-house-white px-3 font-sans text-[15px] text-house-brown outline-none focus:border-house-gold";

export function HeroBookingBar({ className = "" }: { className?: string }) {
  const [service, setService] = useState("");
  const [postcode, setPostcode] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    window.location.assign(buildBookingUrl(postcode.trim(), SERVICEOS_SERVICE_ID[service]));
  }

  // No date field: only the service and postcode forward into ServiceOS (the
  // OBF picks the date in-flow), so we don't offer a date we can't carry over.
  return (
    <form onSubmit={onSubmit} className={`bg-house-cream p-3 shadow-[0_18px_50px_-24px_rgba(29,29,27,0.6)] sm:p-4 ${className}`}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_auto] lg:items-end">
        <label className="block">
          <span className={FIELD_LABEL}>What do you need?</span>
          <select aria-label="Choose a service" value={service} onChange={(e) => setService(e.target.value)} className={FIELD_CTRL}>
            <option value="">Choose a service</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.slug}>{s.label}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={FIELD_LABEL}>Postcode</span>
          <input type="text" inputMode="text" autoComplete="postal-code" placeholder="e.g. BR7 5AA" value={postcode} onChange={(e) => setPostcode(e.target.value)} className={`${FIELD_CTRL} placeholder:text-house-stone/70`} />
        </label>
        <button type="submit" className="h-11 whitespace-nowrap bg-house-gold-ink px-6 font-sans text-[13px] uppercase tracking-[0.16em] text-house-ink transition-[filter] hover:brightness-105 sm:col-span-2 lg:col-span-1 lg:mt-0">
          Check availability →
        </button>
      </div>
    </form>
  );
}
