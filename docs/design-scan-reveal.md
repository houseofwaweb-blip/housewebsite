# The Design Scan Reveal — build package

The "watch a scan become a design" experience that demonstrates the £400 HoWA
First Design (doc §10 "See a sample output"). This document is a complete,
self-contained record: what it is, how it works, all the code, how it's wired,
and how to reuse it.

---

## 1. What it is

When a customer clicks **See a sample output**, they land on a piece that plays
out in timed beats: a room/garden photo is **scanned** (blueprint look, gold scan
line), its **dimensions draw themselves**, the image **resolves into full colour**
(the "first direction"), **zones** label themselves, a **palette** slides in, an
**indicative budget counts up**, and a **structured brief** writes itself. It then
settles into a finished "first design output" with the honest scope disclaimer.

Every beat maps to a real deliverable from the doc, so it *shows* the product
rather than decorating it. The brand hook: the *intelligence* half uses a navy
blueprint look, then **resolves into the House editorial world** (cream, Didot,
warm) — literally "HoWA is the intelligence, the House is the design".

## 2. Where it lives

| File | Role |
| --- | --- |
| `src/components/design/SampleDesignReveal.tsx` | The reveal itself (the animation engine). Reusable, data-driven. |
| `src/components/design/SampleDesignShowcase.tsx` | Interior/Garden toggle + the two datasets. |
| `src/app/design/sample/page.tsx` | The `/design/sample` page that frames it. |

Entry points (all point at the same component):
- `/design/sample` — dedicated page.
- `/design` — the reveal is embedded live (section `id="sample"`).
- Homepage "Design through the House" module — a **See a sample design →** button.
- `/design/interiors` and `/design/gardens` — a **See a sample output →** link.

## 3. Dependencies

**None.** Pure React 19 + CSS + inline SVG. No animation library, **no network
calls**, no external assets beyond the example photos already in the project, and
**no CSP change** (unlike the coverage map, this makes no `fetch`). It is a client
component (`"use client"`) because it uses `useState`/`useEffect`/
`IntersectionObserver`/`requestAnimationFrame`.

Styling uses the project's Tailwind house tokens (`house-brown`, `house-cream`,
`house-gold-ink`, …) and CSS variables (`--color-house-*`, `--font-sans`,
`--font-display`, `--font-hearth-serif`). To lift it into another codebase, remap
those to your own tokens (see §8).

---

## 4. How it works

### The beat state machine
A single `step` state (`-1` → `7`) drives everything. A `TIMINGS` array holds the
millisecond offset for each beat; on start, one `setTimeout` per beat advances
`step`. Visuals key off `step` (via inline styles), so there is one source of truth
and the whole thing is trivially replayable (bump `runKey`).

```
step  beat
 0    Scanning        (blueprint image + navy wash + gold grid + scan line)
 1    Mapping         (SVG dimension lines draw; labels fade in)
 2    First direction (image resolves grayscale → full colour)
 3    Zoning          (zone pins fade in over the image; zone chips on the sheet)
 4    Palette         (swatches stagger in)
 5    Budget          (number counts up to the range)
 6    Brief           (lines fade in one by one)
 7    Settled         (disclaimer + Replay + Continue CTA)
```

### Trigger on scroll (IntersectionObserver)
The sequence starts only when the piece scrolls into view (`threshold: 0.35`), so
it plays *as you reach it*, not on page load. Fires once; **Replay** re-runs it.

### The `reveal()` helper
A tiny helper returns `{opacity, transform, transition}` based on whether `step`
has reached a threshold. Every "fills in" element uses it, with an optional
`transitionDelay` for staggering (palette swatches, brief lines, zone pins).

### The visual techniques (the "stage")
All on one `<img>` with stacked overlays:
- **Blueprint → colour "bloom":** the image's CSS `filter` transitions from
  `grayscale(1) contrast(1.08) brightness(.95)` (scan) to `none` (full colour) over
  1.3s when `step >= 2`. Same asset, two states — it reads as "the scan *became*
  this".
- **Navy wash:** a `#132a3f` layer with `mix-blend-mode: multiply`, opacity 0.5
  during scan → 0 after, for the blueprint tint.
- **Gold survey grid:** a `repeating-linear-gradient` overlay, visible during scan.
- **Scan line:** a CSS `@keyframes` bar sweeping top→bottom (injected via a
  `<style>` tag), shown only during the scan phase.
- **Dimension lines:** inline `<svg>` paths drawn with the `stroke-dashoffset`
  trick (`pathLength={1}`, `strokeDasharray: 1`, offset `1 → 0`) so the measurement
  lines *draw themselves*; labels fade in with a delay.
- **Zone pins:** absolutely-positioned labels over the image, staggered.

### The "output sheet" (right column)
Dimensions → zones → palette → budget → brief, each in a `reveal()`-wrapped block,
so the sheet visibly fills in as the beats fire.

### Budget count-up + the gotcha
The budget animates with `requestAnimationFrame` and an ease-out cubic. **Important
bug we fixed:** the effect must be keyed on the **boolean** `countBudget = step >= 5`,
**not** on `step`. Keyed on `step`, the later beats (6, 7) re-run the effect and
restart the count two more times ("spins three times"). Keyed on the boolean, it
flips false→true once and stays true, so it runs exactly once.

### Reduced motion
`@media (prefers-reduced-motion: reduce)` stops the scan-line animation. (The beat
reveals still fire but are short/opacity-based.)

---

## 5. Full code

### `src/components/design/SampleDesignReveal.tsx`

```tsx
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
```

### `src/components/design/SampleDesignShowcase.tsx`

```tsx
"use client";

import { useState } from "react";
import { SampleDesignReveal, type SampleData } from "./SampleDesignReveal";

/**
 * SampleDesignShowcase — the Interior / Garden toggle around the reveal. The
 * reveal is keyed by discipline so switching remounts it and replays the
 * animation from the top.
 */
const INTERIOR: SampleData = {
  discipline: "Interior",
  productName: "HoWA First Interior Design",
  price: "£400",
  roomLabel: "A living room · London",
  image: "/design/interiors/project-living-room.webp",
  imageAlt: "A living room being read for a first design direction",
  dimW: "4.2m wide",
  dimH: "2.6m ceiling",
  zones: ["Conversation", "Reading nook", "Media wall"],
  palette: [
    { name: "Clay", hex: "#b7a08b", note: "Plaster paint" },
    { name: "Oak", hex: "#9c7a4e", note: "Natural" },
    { name: "Flax", hex: "#d8cdb8", note: "Linen" },
    { name: "Aged brass", hex: "#a8894f", note: "Fittings" },
    { name: "Ink", hex: "#2c3038", note: "Accent" },
  ],
  budgetLo: 9000,
  budgetHi: 13500,
  brief: [
    "A calm, plaster-toned scheme that lets the room's light do the work.",
    "Furniture re-planned around conversation, with a quiet reading nook by the window.",
    "Natural oak, flax linen and aged brass: warm, and made to wear well.",
    "A media wall built into joinery, not bolted on.",
  ],
  continueLabel: "Continue with Delve →",
  continueHref: "/design/interiors",
};

const GARDEN: SampleData = {
  discipline: "Garden",
  productName: "HoWA First Garden Design",
  price: "£400",
  roomLabel: "A garden · South London",
  image: "/design/gardens/full-design.webp",
  imageAlt: "A garden being read for a first concept and indicative budget",
  dimW: "9m wide",
  dimH: "14m deep",
  zones: ["Terrace dining", "Lawn", "Deep borders"],
  palette: [
    { name: "Sandstone", hex: "#c9bba3", note: "Sawn paving" },
    { name: "Corten", hex: "#8a5a3b", note: "Steel edging" },
    { name: "Yew", hex: "#3b4a34", note: "Structure" },
    { name: "Birch", hex: "#d9d2c4", note: "Multi-stem" },
    { name: "Lavender", hex: "#7e7ba6", note: "Planting" },
  ],
  budgetLo: 12000,
  budgetHi: 28000,
  brief: [
    "A calm, low-maintenance garden that works from the terrace to the back boundary.",
    "A sandstone terrace for dining, a clean lawn, and deep borders for year-round structure.",
    "Naturalistic planting in yew, grasses and lavender, held with corten edging.",
    "Built to mature well and ask little to stay right.",
  ],
  continueLabel: "Continue with Willow Alexander →",
  continueHref: "/design/gardens",
};

export function SampleDesignShowcase() {
  const [discipline, setDiscipline] = useState<"Interior" | "Garden">("Interior");
  const data = discipline === "Interior" ? INTERIOR : GARDEN;

  return (
    <div>
      <div className="flex gap-2 mb-6" role="tablist" aria-label="Sample design discipline">
        {(["Interior", "Garden"] as const).map((d) => {
          const active = d === discipline;
          return (
            <button
              key={d}
              role="tab"
              aria-selected={active}
              type="button"
              onClick={() => setDiscipline(d)}
              className={`font-sans text-[12px] tracking-[0.16em] uppercase px-5 py-3 border transition-colors ${
                active
                  ? "text-house-brown bg-house-gold-ink border-house-gold-dark"
                  : "text-house-stone bg-house-white border-house-brown/20 hover:border-house-gold"
              }`}
            >
              {d} design
            </button>
          );
        })}
      </div>

      <SampleDesignReveal key={discipline} data={data} />
    </div>
  );
}
```

### `src/app/design/sample/page.tsx`

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { SampleDesignShowcase } from "@/components/design/SampleDesignShowcase";

/**
 * /design/sample — "See a sample output" (DIRECTIVE §10). A worked example of
 * what the £400 HoWA First Design delivers, shown as a live reveal.
 */
export const metadata: Metadata = {
  title: "A sample first design output",
  description:
    "See what the HoWA First Design delivers: a mapped space, a first direction, a palette, an indicative budget range and a structured brief, before you commission a human studio.",
};

export default function DesignSamplePage() {
  return (
    <div className="bg-house-cream text-house-brown">
      <section className="px-[5vw] pt-[clamp(48px,7vw,104px)] pb-[clamp(28px,4vw,48px)]">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink mb-4">
            HoWA First Design
          </p>
          <h1 className="font-display text-[clamp(32px,5vw,58px)] leading-[1.05] text-house-brown">
            Watch a scan <em>become a design.</em>
          </h1>
          <p className="font-sans text-[17px] leading-[1.65] text-house-stone mt-6 max-w-[620px] mx-auto">
            Scan your room or garden, and HoWA returns a first design in minutes:
            the space mapped, a first direction, a palette, an indicative budget
            and a written brief. Here is a worked example, start to finish.
          </p>
        </div>
      </section>

      <section className="px-[5vw] pb-[clamp(48px,7vw,104px)]">
        <div className="mx-auto max-w-[1120px]">
          <SampleDesignShowcase />
        </div>
      </section>

      <section className="px-[5vw] py-[clamp(40px,5vw,72px)] bg-house-white border-t border-house-brown/10">
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="font-display text-[clamp(24px,3vw,38px)] leading-[1.1] text-house-brown mb-4">
            Then the real design <em>begins.</em>
          </h2>
          <p className="font-sans text-[15px] leading-[1.6] text-house-stone mb-8 max-w-[560px] mx-auto">
            Your first design and its brief carry straight to Delve Interiors or
            Willow Alexander Gardens, so you never repeat yourself and the real
            work begins from a shared picture.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/design/interiors" className="font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown bg-house-gold-ink border border-house-gold-dark px-7 py-4 no-underline transition-[filter] hover:brightness-110">
              Start my interior design
            </Link>
            <Link href="/design/gardens" className="font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown border border-house-brown/25 bg-house-white px-7 py-4 no-underline transition-colors hover:border-house-gold">
              Start my garden design
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

## 6. Wiring (entry points)

**Embed live on the Design hub** — `src/app/design/page.tsx`, imports
`SampleDesignShowcase` and renders a section `id="sample"`:

```tsx
import { SampleDesignShowcase } from "@/components/design/SampleDesignShowcase";

// …between the "routes" and "seal" sections:
<section id="sample" className="px-[5vw] py-[clamp(56px,7vw,104px)]" style={{ background: "var(--color-house-white)" }}>
  <div className="mx-auto max-w-[1120px]">
    {/* heading… */}
    <SampleDesignShowcase />
  </div>
</section>
```

**Homepage** — the "Design through the House" module links to it:

```tsx
<Link href="/design/sample" className="… bg-house-gold-ink …">See a sample design →</Link>
```

**Interior / Garden pages** — a text link under the Designer doorway CTA:

```tsx
<Link href="/design/sample" style={{ /* gold underline link */ }}>See a sample output →</Link>
```

---

## 7. How to adapt / reuse

- **Change the content:** everything is in the two `SampleData` objects in
  `SampleDesignShowcase.tsx` — image, dimensions, zones, palette (`hex` + `name` +
  `note`), `budgetLo`/`budgetHi`, the `brief` lines, and the continue CTA.
- **Change the pacing:** edit the `TIMINGS` array in `SampleDesignReveal.tsx`
  (ms offsets per beat). Keep budget's beat (index 5) far enough from the next so
  the count finishes.
- **Add a third discipline:** add another `SampleData` object and a toggle button;
  the reveal is already generic.
- **Move the pins:** `ZONE_POS` holds up to three `{top,left}` positions.
- **Lift into another codebase:** replace the Tailwind `house-*` classes and the
  `--color-house-*` / `--font-*` CSS variables with your own tokens. The mechanics
  (state machine, IntersectionObserver, SVG draw, count-up, staggered reveals) are
  framework-agnostic React and carry over unchanged. It has no other dependencies.

## 8. Notes / gotchas

- **`"use client"` is required** — it uses browser APIs. It is safe to render from
  a Server Component (the page and the Design hub both do).
- **Budget count-up must key on the boolean**, not `step` (see §4) or it re-spins.
- **No CSP change needed** — it makes no network requests (contrast the coverage
  map, which needs `api.postcodes.io` in `src/proxy.ts`).
- **Honesty:** it is labelled a sample and carries the doc's scope disclaimer
  ("not a technical drawing set, planning advice or a final quotation"). Keep that.
- **Example photos** are existing project assets
  (`/design/interiors/project-living-room.webp`, `/design/gardens/full-design.webp`).
  Swap for a dedicated "plain room" shot if you want the before/after contrast to
  read even more strongly.
```
