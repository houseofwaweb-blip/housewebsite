"use client";

import * as React from "react";
import styles from "./BookingRail.module.css";
import { SERVICEOS_SERVICE_ID } from "@/lib/serviceos-links";
import { buildBookingUrl } from "@/components/booking/postcode";

/**
 * BookingRail — homepage §3 "What needs doing?" (Aug-17 rebuild, L558–582).
 *
 * Presentation-first: the rail is the House-styled entry point; SEE TIMES &
 * PRICES opens the existing ServiceOS booking modal (any anchor with
 * href="#open-booking-form", intercepted by <BookingWidget/>). Selected
 * service + postcode ride along as data-* attributes for the flow to read.
 *
 * Trust line + colour chips per spec. Colour is navigation punctuation only.
 */

type Svc = { label: string; value: string; color: string };

/**
 * The four high-demand defaults (spec §3, L562–569). "All services" is offered
 * as the fifth choice rather than overloading the rail with every service.
 */
const SERVICES: Svc[] = [
  { label: "Gardeners", value: "gardeners", color: "var(--service-gardeners)" },
  { label: "Housekeeping", value: "housekeeping", color: "var(--service-housekeeping)" },
  { label: "Cleaners", value: "cleaners", color: "var(--service-cleaners)" },
  { label: "Repairs", value: "repairs", color: "var(--service-handyman)" },
];

const ALL_SERVICES: Svc = { label: "All services", value: "all", color: "var(--house-brown)" };
const CHIPS: Svc[] = [...SERVICES, ALL_SERVICES];

type Timing = "next" | "date";

export function BookingRail() {
  const [service, setService] = React.useState("");
  const [postcode, setPostcode] = React.useState("");
  const [timing, setTiming] = React.useState<Timing>("next");
  const [date, setDate] = React.useState("");

  return (
    <section className={styles.rail} aria-label="Book a service">
      <div className={styles.inner}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>Book the House</p>
          <h2 className={styles.title}>What needs doing?</h2>
          <p className={styles.sub}>
            Choose a service and enter your postcode to see times and prices
            for your address.
          </p>
        </div>

        <div className={styles.chips} role="group" aria-label="Popular services">
          {CHIPS.map((s) => (
            <button
              key={s.value}
              type="button"
              aria-pressed={service === s.value}
              onClick={() => setService(service === s.value ? "" : s.value)}
              className={styles.chip}
              style={{ ["--chip-color" as string]: s.color }}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className={styles.fields}>
          <label className={styles.field}>
            <span className={styles.label}>I&rsquo;m looking for</span>
            <select
              className={styles.select}
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value="">Select a service</option>
              {SERVICES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
              <option value="all">All services</option>
            </select>
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Postcode</span>
            <input
              className={styles.input}
              type="text"
              inputMode="text"
              autoComplete="postal-code"
              placeholder="Enter postcode"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.toUpperCase())}
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>When</span>
            <select
              className={styles.select}
              value={timing}
              onChange={(e) => setTiming(e.target.value as Timing)}
            >
              <option value="next">Next available</option>
              <option value="date">Choose a date</option>
            </select>
          </label>

          {timing === "date" ? (
            <label className={styles.field}>
              <span className={styles.label}>Date</span>
              <input
                className={styles.input}
                type="date"
                value={date}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
          ) : null}

          {/* ServiceOS deep-link: opens the booking modal preselected to the
              chosen service (?book=1&service_id=N). Not the in-page
              #open-booking-form trigger, so it must navigate for ServiceOS to
              read the service_id from the URL. */}
          <a
            href={buildBookingUrl(postcode, SERVICEOS_SERVICE_ID[service])}
            className={styles.submit}
            data-ga-event="booking_intent"
            data-ga-cta="See times and prices"
          >
            See times &amp; prices
          </a>
        </div>
      </div>

      <p className={styles.trust}>Serving London and Kent · House-vetted · clear pricing · remembered by HoWA</p>
    </section>
  );
}
