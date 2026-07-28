"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * SampleDesignReveal — the "watch the scan become a design" experience for
 * DIRECTIVE §10 "See a sample output". It dramatises exactly what the £400 HoWA
 * First Design delivers: the space is scanned, mapped, resolved into a first
 * direction, zoned, given a palette, an indicative budget and a written brief.
 *
 * Every beat maps to a real doc deliverable, so it is truthful, not decoration.
 * It is clearly a SAMPLE and carries the doc's scope disclaimer. Self-contained:
 * CSS + SVG + a little React, no libraries.
 */

export type SampleData = {
  discipline: "Interior" | "Garden";
  productName: string;
  price: string;
  roomLabel: string;
  image: string;
  imageAlt: string;
  dimW: string;
  dimH: string;
  zones: string[];
  palette: { name: string; hex: string; note: string }[];
  budgetLo: number;
  budgetHi: number;
  brief: string[];
  continueLabel: string;
  continueHref: string;
};

const CAPTIONS = [
  "Scanning the space",
  "Mapping dimensions",
  "A first direction",
  "Zoning the space",
  "Material palette",
  "Indicative budget",
  "The brief",
  "Your first design output",
];

// Milliseconds from start at which each beat fires.
const TIMINGS = [400, 2000, 3600, 4900, 6100, 7300, 8600, 10200];

// Fixed positions for up to three zone pins over the image.
const ZONE_POS = [
  { top: "24%", left: "16%" },
  { top: "60%", left: "58%" },
  { top: "40%", left: "80%" },
];

function gbp(n: number) {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

export function SampleDesignReveal({ data }: { data: SampleData }) {
  const [step, setStep] = useState(-1);
  const [runKey, setRunKey] = useState(0);
  const [started, setStarted] = useState(false);
  const [budget, setBudget] = useState({ lo: 0, hi: 0 });
  const ref = useRef<HTMLDivElement>(null);

  // Start when the piece scrolls into view (once).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Drive the beat sequence.
  useEffect(() => {
    if (!started) return;
    setStep(-1);
    setBudget({ lo: 0, hi: 0 });
    const timers = TIMINGS.map((t, i) => setTimeout(() => setStep(i), t));
    return () => timers.forEach(clearTimeout);
  }, [started, runKey]);

  // Count the budget up once, when its beat arrives. Keyed on the boolean
  // (step >= 5), not on `step` itself — otherwise the later beats (6, 7) would
  // re-run this effect and restart the count two more times.
  const countBudget = step >= 5;
  useEffect(() => {
    if (!countBudget) return;
    let raf = 0;
    const start = performance.now();
    const dur = 950;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const ease = 1 - Math.pow(1 - p, 3);
      setBudget({ lo: data.budgetLo * ease, hi: data.budgetHi * ease });
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [countBudget, runKey, data.budgetLo, data.budgetHi]);

  const shown = (n: number) => step >= n;
  const reveal = (n: number, y = 14) => ({
    opacity: shown(n) ? 1 : 0,
    transform: shown(n) ? "none" : `translateY(${y}px)`,
    transition: "opacity .7s ease, transform .7s ease",
  });
  const blueprint = step < 2;

  return (
    <div ref={ref} className="border border-house-brown/15 bg-house-white">
      <style>{`
        @keyframes howaScan {
          0% { transform: translateY(-8%); opacity: 0; }
          12% { opacity: 1; }
          88% { opacity: 1; }
          100% { transform: translateY(108%); opacity: 0; }
        }
        .howa-scanline {
          position: absolute; left: 0; right: 0; height: 42px;
          background: linear-gradient(to bottom, transparent, rgba(197,169,96,.55), transparent);
          animation: howaScan 2.2s ease-in-out infinite;
          pointer-events: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .howa-scanline { animation: none; opacity: .4; top: 40%; }
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-house-brown/12 bg-house-cream">
        <div className="flex items-center gap-3 min-w-0">
          <span
            aria-hidden
            className="inline-block w-2 h-2 rounded-full shrink-0"
            style={{ background: blueprint ? "#c5a960" : "var(--color-house-moss)", boxShadow: blueprint ? "0 0 0 3px rgba(197,169,96,.25)" : "none", transition: "background .4s" }}
          />
          <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-house-brown truncate">
            {data.productName} <span className="text-house-stone/70">·</span>{" "}
            <span className="text-house-gold-ink">{step >= 0 ? CAPTIONS[Math.min(step, 7)] : "Preparing"}</span>
          </p>
        </div>
        <span className="font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown shrink-0">{data.price}</span>
      </div>

      {/* Body */}
      <div className="grid lg:grid-cols-2">
        {/* LEFT — the room stage */}
        <div className="relative aspect-[4/3] overflow-hidden bg-house-cream-dark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.image}
            alt={data.imageAlt}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              filter: blueprint ? "grayscale(1) contrast(1.08) brightness(.95)" : "none",
              transition: "filter 1.3s ease",
            }}
          />
          {/* Navy blueprint wash */}
          <div aria-hidden style={{ position: "absolute", inset: 0, background: "#132a3f", mixBlendMode: "multiply", opacity: blueprint ? 0.5 : 0, transition: "opacity 1.3s ease" }} />
          {/* Gold survey grid */}
          <div aria-hidden style={{ position: "absolute", inset: 0, opacity: step >= 0 && step < 3 ? 0.4 : 0, transition: "opacity .8s ease", backgroundImage: "repeating-linear-gradient(0deg, rgba(197,169,96,.5) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, rgba(197,169,96,.5) 0 1px, transparent 1px 40px)" }} />
          {/* Scan line */}
          {blueprint ? <div aria-hidden className="howa-scanline" /> : null}

          {/* Dimension annotations */}
          <svg viewBox="0 0 400 300" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
            <g stroke="#c5a960" strokeWidth={1.4} fill="none" style={{ transition: "stroke-dashoffset 1s ease", strokeDasharray: 1, strokeDashoffset: step >= 1 ? 0 : 1 }} pathLength={1}>
              {/* width line */}
              <path d="M60 250 H340" />
              <path d="M60 244 V256" />
              <path d="M340 244 V256" />
              {/* height line */}
              <path d="M46 70 V250" />
              <path d="M40 70 H52" />
              <path d="M40 250 H52" />
            </g>
            <g fill="var(--color-house-cream)" fontFamily="var(--font-sans)" fontSize="11" letterSpacing="1" style={{ opacity: step >= 1 ? 1 : 0, transition: "opacity .5s ease .5s" }}>
              <rect x="176" y="236" width="48" height="16" fill="#132a3f" opacity="0.8" />
              <text x="200" y="247" textAnchor="middle">{data.dimW}</text>
              <rect x="20" y="152" width="46" height="16" fill="#132a3f" opacity="0.8" />
              <text x="43" y="163" textAnchor="middle">{data.dimH}</text>
            </g>
          </svg>

          {/* Zone pins */}
          {data.zones.slice(0, 3).map((z, i) => (
            <span
              key={z}
              className="absolute font-sans text-[10px] tracking-[0.16em] uppercase text-house-brown bg-house-cream/95 px-2 py-1 border border-house-gold/50 whitespace-nowrap"
              style={{ ...ZONE_POS[i], ...reveal(3), transitionDelay: `${i * 140}ms` }}
            >
              <span className="text-house-gold-ink mr-1" aria-hidden>+</span>{z}
            </span>
          ))}

          {/* Status badge */}
          <div className="absolute top-3 left-3 font-sans text-[10px] tracking-[0.18em] uppercase px-2.5 py-1"
            style={{ background: blueprint ? "#132a3f" : "var(--color-house-gold-ink)", color: blueprint ? "#c5a960" : "var(--color-house-brown)", transition: "background .5s, color .5s" }}>
            {blueprint ? "HoWA · scanning" : "First direction"}
          </div>
          <div className="absolute bottom-3 right-3 font-sans text-[10px] tracking-[0.16em] uppercase text-house-cream bg-black/35 px-2 py-1">
            {data.roomLabel}
          </div>
        </div>

        {/* RIGHT — the output sheet filling in */}
        <div className="p-6 md:p-8 flex flex-col gap-6">
          {/* Dimensions */}
          <div style={reveal(1)}>
            <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-house-gold-ink mb-1.5">The space, mapped</p>
            <p className="font-sans text-[14px] text-house-stone">{data.dimW} · {data.dimH}</p>
          </div>

          {/* Zones */}
          <div style={reveal(3)}>
            <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-house-gold-ink mb-2">Layout &amp; zones</p>
            <div className="flex flex-wrap gap-2">
              {data.zones.map((z) => (
                <span key={z} className="font-sans text-[12px] text-house-brown border border-house-brown/15 bg-house-cream px-3 py-1.5">{z}</span>
              ))}
            </div>
          </div>

          {/* Palette */}
          <div style={reveal(4)}>
            <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-house-gold-ink mb-2.5">Palette &amp; materials</p>
            <div className="flex flex-wrap gap-4">
              {data.palette.map((p, i) => (
                <div key={p.name} className="flex flex-col items-start" style={{ ...reveal(4, 8), transitionDelay: `${i * 110}ms` }}>
                  <span className="w-11 h-11 border border-house-brown/15" style={{ background: p.hex }} aria-hidden />
                  <span className="font-sans text-[11px] text-house-brown mt-1.5 leading-tight">{p.name}</span>
                  <span className="font-sans text-[10px] text-house-stone/80 leading-tight">{p.note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div style={reveal(5)}>
            <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-house-gold-ink mb-1.5">Indicative budget</p>
            <p className="font-display text-[clamp(24px,3vw,34px)] leading-none text-house-brown">
              {gbp(budget.lo)} <span className="text-house-stone/60">–</span> {gbp(budget.hi)}
            </p>
            <p className="font-sans text-[12px] text-house-stone mt-1">A range for the full commission, not a quote.</p>
          </div>

          {/* Brief */}
          <div style={reveal(6)}>
            <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-house-gold-ink mb-2">The structured brief</p>
            <ul className="flex flex-col gap-2 list-none p-0 m-0">
              {data.brief.map((line, i) => (
                <li key={line} className="font-hearth-serif text-[15px] leading-[1.5] text-house-brown" style={{ ...reveal(6, 6), transitionDelay: `${i * 160}ms` }}>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer — disclaimer + CTAs */}
      <div className="px-6 md:px-8 py-6 border-t border-house-brown/12 bg-house-cream flex flex-col gap-4 md:flex-row md:items-center md:justify-between" style={reveal(7)}>
        <p className="font-sans text-[12px] leading-[1.5] text-house-stone max-w-[52ch]">
          A sample first direction, not a final design. It is not a technical
          drawing set, planning advice or a final quotation.
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setRunKey((k) => k + 1)}
            className="font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown border border-house-brown/25 bg-house-white px-5 py-3 transition-colors hover:border-house-gold"
          >
            Replay
          </button>
          <Link
            href={data.continueHref}
            className="font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown bg-house-gold-ink border border-house-gold-dark px-6 py-3 no-underline transition-[filter] hover:brightness-110"
          >
            {data.continueLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
