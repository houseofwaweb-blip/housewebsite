"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * ScanReveal — the House Companion "scan-to-result" reveal. Ported from the HoWA
 * product site (ai/[feature]) so the House Companion feature pages animate in the
 * exact same grammar as /ai/garden and /ai/repair: a ~2s blueprint scan, then the
 * photo resolves to colour while the RIGHT-HAND OUTPUT SHEET fills in beat by beat
 * (fields, an optional number that counts up, and a written brief), ending in a
 * disclaimer + Replay.
 *
 * Driven by a per-feature dataset (see companion-catalog.ts) so every route shows
 * the fields it actually returns. Self-contained: CSS + a little React.
 *
 * Beat structure:
 *   0 scanning · 1 field[0] (blueprint still on) · 2 resolve to colour ·
 *   3..(F+1) fields[1..F-1] · (F+2) footer
 */

export type ScanField =
  | { kind: "text"; label: string; value: string }
  | { kind: "chips"; label: string; items: string[] }
  | { kind: "swatches"; label: string; items: { name: string; hex: string; note: string }[] }
  | { kind: "metric"; label: string; lo: number; hi: number; prefix?: string; suffix?: string; note?: string }
  | { kind: "brief"; label: string; lines: string[] };

export type ScanRevealData = {
  productName: string;
  price?: string;
  statusScanning: string;
  statusResolved: string;
  image: string;
  imageAlt: string;
  imageLabel: string;
  /** AI safety: shown beside the result. */
  source?: string;
  confidence?: string;
  scanCaption: string;
  resolveCaption: string;
  finalCaption: string;
  pins?: string[];
  disclaimer: string;
  continueLabel?: string;
  continueHref?: string;
};

const PIN_POS = [
  { top: "24%", left: "16%" },
  { top: "60%", left: "58%" },
  { top: "40%", left: "80%" },
];

function num(n: number, prefix = "", suffix = "") {
  return prefix + Math.round(n).toLocaleString("en-GB") + suffix;
}

export function ScanReveal({ data, fields }: { data: ScanRevealData; fields: ScanField[] }) {
  const F = fields.length;
  const FOOTER = F + 2;

  const [step, setStep] = useState(-1);
  const [runKey, setRunKey] = useState(0);
  const [started, setStarted] = useState(false);
  const [metricP, setMetricP] = useState<Record<number, number>>({});
  const ref = useRef<HTMLDivElement>(null);

  // Beat timings (ms).
  const timings: number[] = [400, 2000, 3600];
  for (let s = 3; s <= F + 1; s++) timings.push(3600 + 1300 * (s - 2));
  timings.push(timings[timings.length - 1] + 1600);

  // field i reveals at this beat (field 0 during the scan, the rest after resolve).
  const beatOf = (i: number) => (i === 0 ? 1 : i + 2);

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
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    setStep(-1);
    setMetricP({});
    const t = timings.map((ms, i) => setTimeout(() => setStep(i), ms));
    return () => t.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, runKey]);

  // Count a metric up once its beat lands.
  useEffect(() => {
    const idx = fields.findIndex((f, i) => f.kind === "metric" && step === beatOf(i));
    if (idx === -1 || metricP[idx] !== undefined) return;
    let raf = 0;
    const start = performance.now();
    const dur = 950;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setMetricP((m) => ({ ...m, [idx]: e }));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, runKey]);

  const shown = (n: number) => step >= n;
  const reveal = (n: number, y = 14) => ({
    opacity: shown(n) ? 1 : 0,
    transform: shown(n) ? "none" : `translateY(${y}px)`,
    transition: "opacity .7s ease, transform .7s ease",
  });
  const blueprint = step < 2;

  const caption = (() => {
    if (step < 0) return "Preparing";
    if (step === 0) return data.scanCaption;
    if (step === 1) return fields[0]?.label ?? data.resolveCaption;
    if (step === 2) return data.resolveCaption;
    if (step >= 3 && step <= F + 1) return fields[step - 2]?.label ?? data.finalCaption;
    return data.finalCaption;
  })();

  return (
    <div ref={ref} className="border border-house-brown/15 bg-house-white">
      <style>{`
        @keyframes howaScan { 0% { transform: translateY(-8%); opacity: 0; } 12% { opacity: 1; } 88% { opacity: 1; } 100% { transform: translateY(108%); opacity: 0; } }
        .scanreveal-line {
          position: absolute; left: 0; right: 0; height: 42px; pointer-events: none;
          background: linear-gradient(to bottom, transparent, rgba(197,169,96,.55), transparent);
          animation: howaScan 2.2s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) { .scanreveal-line { animation: none; opacity: .4; top: 40%; } }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-house-brown/12 bg-house-cream px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden
            className="inline-block h-2 w-2 shrink-0 rounded-full"
            style={{ background: blueprint ? "#c5a960" : "var(--color-house-moss)", boxShadow: blueprint ? "0 0 0 3px rgba(197,169,96,.25)" : "none", transition: "background .4s" }}
          />
          <p className="truncate font-sans text-[11px] uppercase tracking-[0.22em] text-house-brown">
            {data.productName} <span className="text-house-stone/70">·</span>{" "}
            <span className="text-house-moss">{caption}</span>
          </p>
        </div>
        {data.price ? <span className="shrink-0 font-sans text-[12px] uppercase tracking-[0.16em] text-house-brown">{data.price}</span> : null}
      </div>

      {/* Body */}
      <div className="grid lg:grid-cols-2">
        {/* LEFT, the stage */}
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
          <div aria-hidden style={{ position: "absolute", inset: 0, background: "#132a3f", mixBlendMode: "multiply", opacity: blueprint ? 0.5 : 0, transition: "opacity 1.3s ease" }} />
          <div aria-hidden style={{ position: "absolute", inset: 0, opacity: step >= 0 && step < 3 ? 0.4 : 0, transition: "opacity .8s ease", backgroundImage: "repeating-linear-gradient(0deg, rgba(197,169,96,.5) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, rgba(197,169,96,.5) 0 1px, transparent 1px 40px)" }} />
          {blueprint ? <div aria-hidden className="scanreveal-line" /> : null}

          {/* Pins appear as it resolves */}
          {(data.pins ?? []).slice(0, 3).map((p, i) => (
            <span
              key={p}
              className="absolute whitespace-nowrap border border-house-gold/50 bg-house-cream/95 px-2 py-1 font-sans text-[10px] uppercase tracking-[0.16em] text-house-brown"
              style={{ ...PIN_POS[i], ...reveal(2), transitionDelay: `${i * 140}ms` }}
            >
              <span className="mr-1 text-house-moss" aria-hidden>+</span>{p}
            </span>
          ))}

          {/* Status badge */}
          <div className="absolute left-3 top-3 px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.18em]"
            style={{ background: blueprint ? "#132a3f" : "var(--color-house-gold-ink)", color: blueprint ? "#c5a960" : "var(--color-house-brown)", transition: "background .5s, color .5s" }}>
            {blueprint ? data.statusScanning : data.statusResolved}
          </div>
          <div className="absolute bottom-3 right-3 bg-black/35 px-2 py-1 font-sans text-[10px] uppercase tracking-[0.16em] text-house-cream">
            {data.imageLabel}
          </div>
        </div>

        {/* RIGHT, the output sheet filling in */}
        <div className="flex flex-col gap-6 p-6 md:p-8">
          {(data.source || data.confidence) && (
            <div style={reveal(2)} className="flex flex-wrap items-center gap-2.5">
              {data.source ? (
                <span className="border border-house-brown/20 bg-house-cream px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.14em] text-house-brown/70">
                  Source: {data.source}
                </span>
              ) : null}
              {data.confidence ? (
                <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-house-moss">
                  Confidence: {data.confidence}
                </span>
              ) : null}
            </div>
          )}
          {fields.map((f, i) => {
            const beat = beatOf(i);
            const labelEl = (
              <p className="mb-2 font-sans text-[11px] uppercase tracking-[0.22em] text-house-moss">{f.label}</p>
            );
            if (f.kind === "text") {
              return (
                <div key={i} style={reveal(beat)}>
                  {labelEl}
                  <p className="font-sans text-[15px] leading-[1.5] text-house-stone">{f.value}</p>
                </div>
              );
            }
            if (f.kind === "chips") {
              return (
                <div key={i} style={reveal(beat)}>
                  {labelEl}
                  <div className="flex flex-wrap gap-2">
                    {f.items.map((c, j) => (
                      <span key={c} className="border border-house-brown/15 bg-house-cream px-3 py-1.5 font-sans text-[12px] text-house-brown" style={{ ...reveal(beat, 8), transitionDelay: `${j * 90}ms` }}>{c}</span>
                    ))}
                  </div>
                </div>
              );
            }
            if (f.kind === "swatches") {
              return (
                <div key={i} style={reveal(beat)}>
                  {labelEl}
                  <div className="flex flex-wrap gap-4">
                    {f.items.map((p, j) => (
                      <div key={p.name} className="flex flex-col items-start" style={{ ...reveal(beat, 8), transitionDelay: `${j * 110}ms` }}>
                        <span className="h-11 w-11 border border-house-brown/15" style={{ background: p.hex }} aria-hidden />
                        <span className="mt-1.5 font-sans text-[11px] leading-tight text-house-brown">{p.name}</span>
                        <span className="font-sans text-[10px] leading-tight text-house-stone/80">{p.note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            if (f.kind === "metric") {
              const e = metricP[i] ?? 0;
              return (
                <div key={i} style={reveal(beat)}>
                  {labelEl}
                  <p className="font-display text-[clamp(24px,3vw,34px)] leading-none text-house-brown">
                    {num(f.lo * e, f.prefix, f.suffix)} <span className="text-house-stone/60">–</span> {num(f.hi * e, f.prefix, f.suffix)}
                  </p>
                  {f.note ? <p className="mt-1 font-sans text-[12px] text-house-stone">{f.note}</p> : null}
                </div>
              );
            }
            return (
              <div key={i} style={reveal(beat)}>
                {labelEl}
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                  {f.lines.map((line, j) => (
                    <li key={line} className="font-hearth-serif text-[15px] leading-[1.5] text-house-brown" style={{ ...reveal(beat, 6), transitionDelay: `${j * 150}ms` }}>{line}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer, disclaimer + CTAs */}
      <div className="flex flex-col gap-4 border-t border-house-brown/12 bg-house-cream px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8" style={reveal(FOOTER)}>
        <p className="max-w-[54ch] font-sans text-[12px] leading-[1.5] text-house-stone">{data.disclaimer}</p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => setRunKey((k) => k + 1)}
            className="border border-house-brown/25 bg-house-white px-5 py-3 font-sans text-[12px] uppercase tracking-[0.16em] text-house-brown transition-colors hover:border-house-gold"
          >
            Replay
          </button>
          {data.continueLabel && data.continueHref ? (
            <Link href={data.continueHref} className="border border-house-gold-dark bg-house-gold-ink px-6 py-3 font-sans text-[12px] uppercase tracking-[0.16em] text-house-brown no-underline transition-[filter] hover:brightness-110">
              {data.continueLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
