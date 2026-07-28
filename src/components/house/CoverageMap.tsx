"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { SERVICE_AREAS } from "@/lib/services-data/sub-services";
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
 * The postcode areas the teams actually cover, taken from the `availableAreas`
 * arrays on the real service data. Kept as a literal rather than derived so the
 * map does not import the whole service catalogue into the client bundle.
 */
const COVERED_AREAS = ["SW", "W", "KT", "TW", "SE", "BR", "DA", "TN"] as const;

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
          covered: COVERED_AREAS.includes(
            areaOf(r.outcode) as (typeof COVERED_AREAS)[number],
          ),
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
          House teams and vetted specialists, out across London and the South East.
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
              </Link>{" "}
              &mdash; we&rsquo;re expanding.
            </span>
          )}
        </p>

        <p className="mt-5 max-w-[42ch] text-[13px] leading-relaxed text-house-stone">
          {SERVICE_AREAS.slice(0, 8).join(", ")} and more.
        </p>
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
