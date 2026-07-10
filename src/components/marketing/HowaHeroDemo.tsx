"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./HowaPhone.module.css";

/**
 * HoWA hero demo — the askhowa reference hero: a cutaway blueprint house with a
 * floating phone showing the Home Overview (HoWA Score, Living Record, What
 * matters first). The phone is a faithful reproduction of the user-supplied
 * howa-phone-mockup.html: exact palette, cards, SVG icons and the animated
 * score gauge (counts 0 -> 62). Styling lives in HowaPhone.module.css so its
 * radii survive the global border-radius reset.
 */

const CIRC = 197.92; // 2 * PI * 31.5
const TARGET = 62;

function ScoreGauge() {
  const [value, setValue] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setValue(TARGET);
      return;
    }
    let start: number | null = null;
    const dur = 1500;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * TARGET));
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div className={styles.gaugeWrap}>
      <div className={styles.gauge}>
        <svg width="68" height="68">
          <circle cx="34" cy="34" r="31.5" fill="none" stroke="rgba(184,153,104,.22)" strokeWidth="5" />
          <circle
            cx="34"
            cy="34"
            r="31.5"
            fill="none"
            stroke="#b89968"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - value / 100)}
          />
        </svg>
        <span className={`${styles.num} ${styles.serif}`}>{value}</span>
      </div>
      <span className={styles.of100}>of 100</span>
    </div>
  );
}

const ATTENTION = [
  "Boiler service · due in 14 days",
  "Gutter clean · before winter",
  "Smoke alarms · tested OK",
];

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1f3a2b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </svg>
  );
}

function HowaPhone() {
  return (
    <div className={styles.phone}>
      <div className={styles.screen}>
        <div className={styles.notch} />
        <div className={styles.head}>
          <div>
            <p className={`${styles.serif} ${styles.brand}`}>HoWA</p>
            <p className={styles.sub}>Home Overview</p>
          </div>
          <span className={styles.burger} aria-hidden>
            <span />
            <span />
            <span />
          </span>
        </div>

        <div className={styles.cards}>
          {/* HoWA Score */}
          <div className={styles.card}>
            <p className={styles.label}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8a6f3f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" />
              </svg>
              HoWA Score
            </p>
            <p className={styles.dim} style={{ fontSize: 13, marginTop: 4, marginBottom: 14 }}>
              In order, with gaps
            </p>
            <div className={styles.scoreRow}>
              <ScoreGauge />
              <div className={styles.spark}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" src="/howa/phone-spark.webp" />
              </div>
            </div>
          </div>

          {/* Living Record */}
          <div className={styles.card}>
            <div className={styles.recRow}>
              <div>
                <p className={styles.label}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8a6f3f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 19c0-7 6-13 14-13 0 8-6 14-14 13z" />
                    <path d="M5 19c4-4 7-6 11-7" />
                  </svg>
                  Living Record
                </p>
                <p className={styles.dim} style={{ fontSize: 13, marginTop: 4 }}>
                  Updated today
                </p>
                <p className={styles.dim} style={{ fontSize: 13 }}>
                  08:42
                </p>
                <span className={styles.link}>View record &rarr;</span>
              </div>
              <div className={styles.sketch}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" src="/howa/phone-sketch.webp" />
              </div>
            </div>
          </div>

          {/* What matters first */}
          <div className={styles.card}>
            <p className={styles.label} style={{ marginBottom: 8 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8a6f3f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="5" width="14" height="16" rx="2" />
                <path d="M9 5V3h6v2M9 11h6M9 15h4" />
              </svg>
              What matters first
            </p>
            <p style={{ fontSize: 13.5, color: "#1a241d" }}>3 things need attention</p>
            <p style={{ fontSize: 12.5, color: "rgba(58,53,44,.7)", marginBottom: 12 }}>
              HoWA tells you what matters first
            </p>
            <ul className={styles.items}>
              {ATTENTION.map((t) => (
                <li key={t}>
                  <CheckIcon />
                  {t}
                </li>
              ))}
            </ul>
            <span className={styles.link} style={{ marginTop: 0 }}>
              View plan &rarr;
            </span>
          </div>
        </div>

        <div className={styles.tabs}>
          <span className={styles.on}>Home</span>
          <span>Timeline</span>
          <span>Record</span>
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
}

export function HowaHeroDemo() {
  return (
    <div className="relative min-h-[56vh] lg:min-h-[84vh] overflow-hidden bg-house-cream-dark">
      <Image
        src="/howa/hero-house.webp"
        alt="A HoWA home, seen in cutaway, with a live Home Overview"
        fill
        sizes="(min-width:1024px) 50vw, 100vw"
        className="object-cover"
        priority
      />
      {/* Floating phone */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-[8%] lg:translate-x-0 w-[min(300px,72vw)]">
        <HowaPhone />
      </div>
    </div>
  );
}
