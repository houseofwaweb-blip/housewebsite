"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import styles from "./CoverageMap.module.css";

/**
 * Coverage map + postcode checker (DIRECTIVE §08 — service pages must show
 * coverage and let a customer check their postcode before booking).
 *
 * Leaflet touches `window` at import time, so the canvas can only ever load in
 * the browser. ssr:false is not optional here.
 */
const MapCanvas = dynamic(() => import("./MapCanvas"), {
  ssr: false,
  loading: () => <div className={styles.canvas} aria-hidden="true" />,
});

/**
 * The postcode areas the teams cover in FULL, set to match the drawn coverage
 * boundary (London across to north-west Kent):
 *   - CR (Croydon) is inside the line and was previously, wrongly, excluded.
 *   - KT (Kingston) and TW (Twickenham) sit WEST of the line, so they are out.
 * Any district in these areas counts as covered.
 */
const COVERED_AREAS = ["SW", "W", "SE", "CR", "BR", "DA"] as const;

/**
 * Areas the boundary only clips, so they are covered at DISTRICT level, not for
 * the whole area. TN is the case that matters: the patch reaches Sevenoaks
 * (TN13/14/15) and Westerham (TN16), but NOT Edenbridge (TN8), Tonbridge
 * (TN9-11) or Tunbridge Wells (TN1-4). A postcode whose area appears here is
 * covered only if its outcode is listed.
 */
const COVERED_DISTRICTS = ["TN13", "TN14", "TN15", "TN16"] as const;

/** True if the outcode falls inside the patch, area- or district-level. */
function isCovered(outcode: string): boolean {
  const oc = outcode.toUpperCase();
  const area = areaOf(oc);
  // A part-covered area (e.g. TN) is decided by its specific districts.
  if (COVERED_DISTRICTS.some((d) => areaOf(d) === area)) {
    return (COVERED_DISTRICTS as readonly string[]).includes(oc);
  }
  return (COVERED_AREAS as readonly string[]).includes(area);
}

type Lookup =
  | { state: "idle" }
  | { state: "checking" }
  | { state: "unknown" }
  | {
      state: "found";
      lat: number;
      lng: number;
      outcode: string;
      district: string;
      covered: boolean;
    };

/** "DA14 5DT" → "DA". postcodes.io gives us the outcode already. */
function areaOf(outcode: string): string {
  return outcode.match(/^[A-Z]+/)?.[0] ?? "";
}

export function CoverageMap() {
  const [postcode, setPostcode] = useState("");
  const [lookup, setLookup] = useState<Lookup>({ state: "idle" });

  const trimmed = postcode.trim();

  useEffect(() => {
    // Too short to be a postcode — don't bother the API.
    if (trimmed.length < 5) {
      setLookup({ state: "idle" });
      return;
    }

    const controller = new AbortController();
    setLookup({ state: "checking" });

    // Debounced 500ms so we don't fire on every keystroke.
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.postcodes.io/postcodes/${encodeURIComponent(trimmed)}`,
          { signal: controller.signal },
        );

        // postcodes.io answers 404 for a well-formed but non-existent postcode.
        if (!res.ok) {
          setLookup({ state: "unknown" });
          return;
        }

        const body = await res.json();
        const r = body?.result;
        if (!r) {
          setLookup({ state: "unknown" });
          return;
        }

        setLookup({
          state: "found",
          lat: r.latitude,
          lng: r.longitude,
          outcode: r.outcode,
          district: r.admin_district ?? r.region ?? "",
          covered: isCovered(r.outcode),
        });
      } catch (err) {
        // An aborted request is the debounce doing its job, not a failure.
        if ((err as Error)?.name !== "AbortError") setLookup({ state: "unknown" });
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [trimmed]);

  const pin = useMemo(
    () =>
      lookup.state === "found"
        ? { lat: lookup.lat, lng: lookup.lng, label: lookup.outcode }
        : null,
    [lookup],
  );

  return (
    <div className="grid gap-8 border border-house-brown/12 bg-house-white p-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
      <div>
        <h3 className="font-display text-[26px] leading-[1.1] text-house-black">
          Where we work
        </h3>
        <p className="mt-3 max-w-[38ch] text-[14px] leading-relaxed text-house-stone">
          House teams and vetted specialists, out across London and Kent.
        </p>

        <label
          htmlFor="coverage-postcode"
          className="mt-6 block font-sans text-[11px] uppercase tracking-[0.16em] text-house-gold-dark"
        >
          Is your home in the patch?
        </label>
        <input
          id="coverage-postcode"
          name="postcode"
          autoComplete="postal-code"
          spellCheck={false}
          value={postcode}
          onChange={(e) => setPostcode(e.target.value.toUpperCase())}
          placeholder="Enter your postcode"
          className="mt-2 w-full max-w-[260px] border border-house-brown/20 bg-house-cream px-4 py-3 font-sans text-[14px] text-house-brown outline-none transition placeholder:text-house-stone/60 focus:border-house-gold-dark"
        />

        {/* Announced politely so a screen reader hears the verdict change. */}
        <p aria-live="polite" className="mt-3 min-h-[20px] text-[13px] leading-relaxed">
          {lookup.state === "checking" && (
            <span className="text-house-stone">Checking&hellip;</span>
          )}
          {lookup.state === "unknown" && (
            <span className="text-house-stone">
              We couldn&rsquo;t find that postcode.
            </span>
          )}
          {lookup.state === "found" && lookup.covered && (
            <span className="text-house-moss">
              Yes, {lookup.outcode} is in the patch.
              {lookup.district ? ` We work across ${lookup.district}.` : ""}
            </span>
          )}
          {lookup.state === "found" && !lookup.covered && (
            <span className="text-house-brown">
              {lookup.outcode} sits outside the patch today.{" "}
              <Link
                href="/contact"
                className="text-house-gold-dark underline underline-offset-4"
              >
                Write to us
              </Link>
              , we&rsquo;re expanding.
            </span>
          )}
        </p>

        <div className="mt-5 max-w-[44ch] space-y-1.5 text-[13px] leading-relaxed text-house-stone">
          <p>
            <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-house-gold-dark">London</span>
            {" "}across Greater London, north and south of the river.
          </p>
          <p>
            <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-house-gold-dark">Kent</span>
            {" "}and out into the wider county.
          </p>
        </div>
        <a
          href="#open-booking-form"
          className="mt-4 inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-[0.14em] text-house-gold-dark transition hover:text-house-gold"
        >
          Book a service &rarr;
        </a>
      </div>

      <MapCanvas pin={pin} />
    </div>
  );
}
