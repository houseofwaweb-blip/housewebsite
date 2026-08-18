"use client";

import { useState } from "react";
import { buildBookingUrl } from "@/components/booking/postcode";
import { SERVICEOS_SERVICE_ID } from "@/lib/serviceos-links";

/**
 * HeroServiceFinder — the service + postcode finder that leads the homepage
 * hero (DIRECTIVE §05 module 02 and §16 acceptance: a first-time visitor,
 * including on mobile, can select a live service and enter a postcode without
 * opening the menu).
 *
 * The options mirror the advertised catalogue (the /services ServiceGrid tiles
 * and spec §2.1's individual service brands), so the finder and the catalogue
 * agree — never a shorter "bookable" subset than the site advertises. Per spec
 * §10, gutter clearing is a sub-service of Window Cleaners, not a separate
 * top-level brand, so it folds into the window-cleaning option rather than
 * appearing on its own. On submit it opens the ServiceOS booking platform with
 * the chosen service preselected (and the postcode carried in the URL), via a
 * full-page navigation so the OBF re-initialises and reads the deep-link. The
 * persistent header CTA remains "Book a service"; this hero CTA is the
 * service-led "See prices & availability".
 */
const LIVE_SERVICES = [
  { label: "Gardening", slug: "gardening" },
  { label: "Window & gutter cleaning", slug: "window-cleaning" },
  { label: "Cleaning", slug: "cleaning" },
  { label: "Housekeeping", slug: "housekeeping" },
  { label: "Repairs & handyman", slug: "handyman" },
  { label: "Removals", slug: "removals" },
  { label: "Electrical & energy", slug: "energy" },
  { label: "Dog walking & pet care", slug: "pet-care" },
];

export function HeroServiceFinder() {
  const [service, setService] = useState("");
  const [postcode, setPostcode] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Open the booking platform (service preselected) with a FULL navigation,
    // not router.push: the ServiceOS OBF only reads its deep-link on a real page
    // load. A client-side push would land on the homepage without opening it.
    window.location.assign(
      buildBookingUrl(postcode.trim(), SERVICEOS_SERVICE_ID[service]),
    );
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
        {/* Primary House button (spec §7.1): brown/ink ground, cream type,
            matching the header "Book a service" CTA. Gold is ceremonial only,
            never a generic transactional CTA colour. */}
        <button
          type="submit"
          className="h-12 w-full font-sans text-[12px] tracking-[0.18em] uppercase text-house-cream bg-house-brown border border-house-brown transition-[filter] hover:brightness-125"
        >
          See prices &amp; availability
        </button>
      </div>
    </form>
  );
}
