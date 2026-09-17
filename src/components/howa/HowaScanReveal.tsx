"use client";

import { useEffect, useRef, useState } from "react";

/**
 * HowaScanReveal — the "AI Design · Powered by HoWA" scan-to-design animation.
 *
 * A React rebuild of the locked reference (AI-DESIGN-ANIMATION-DEMO.html +
 * AI-DESIGN-ANIMATION-HANDOVER.md). NOT "a gold scan line over a photo": the scan
 * line is only beat 0. The point is the right-hand OUTPUT SHEET that fills in beat
 * by beat — dimensions, zones, a real colour/material palette, an indicative budget
 * that counts up, and a written brief — every beat mapping to a real deliverable,
 * with a visible SAMPLE disclaimer. Interior/Garden toggle replays with that data.
 *
 * Self-contained: no libraries. CSS transitions/keyframes, one inline SVG,
 * requestAnimationFrame for the count-up, and an IntersectionObserver to start on
 * scroll-in. Honours prefers-reduced-motion.
 */

// Palette — House/HoWA brand tokens. The navy + gold pair carries the "blueprint
// scan" look (keep them); the rest are the House surface tones.
const GOLD = "#c5a960";
const GOLD_DARK = "#7a6229";
const NAVY = "#132a3f";
const BROWN = "#30231c";
const STONE = "#6a6458";
const WHITE = "#faf8f4";
const CREAM = "#f5f0e8";
const CREAM_DARK = "#ebe4d6";
const MOSS = "#5a6b4a";
const LINE = "rgba(48,35,28,0.15)";

const SERIF = "var(--font-cormorant), Georgia, serif";

type Discipline = "Interior" | "Garden";
type SampleData = {
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

const DATA: Record<Discipline, SampleData> = {
  Interior: {
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
    continueLabel: "Continue with House design →",
    continueHref: "/design/interiors",
  },
  Garden: {
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
    continueLabel: "Continue with House gardens →",
    continueHref: "/design/gardens",
  },
};

const CAPTIONS = ["Scanning the space", "Mapping dimensions", "A first direction", "Zoning the space", "Material palette", "Indicative budget", "The brief", "Your first design output"];
const TIMINGS = [400, 2000, 3600, 4900, 6100, 7300, 8600, 10200];
const ZONE_POS = [
  { top: "24%", left: "16%" },
  { top: "60%", left: "58%" },
  { top: "40%", left: "80%" },
];
const gbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");

export function HowaScanReveal() {
  const [discipline, setDiscipline] = useState<Discipline>("Interior");
  const [step, setStep] = useState(-1);
  const [started, setStarted] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const [budget, setBudget] = useState({ lo: 0, hi: 0 });
  const rootRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  const d = DATA[discipline];
  const bp = step < 2; // blueprint "scanning" look gates on this

  // Start on scroll-in (once).
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Beat timers — re-run on start, discipline change or replay.
  useEffect(() => {
    if (!started) return;
    setStep(-1);
    setBudget({ lo: 0, hi: 0 });
    const timers = TIMINGS.map((t, i) => setTimeout(() => setStep(i), t));
    return () => timers.forEach(clearTimeout);
  }, [started, discipline, runKey]);

  // Budget count-up — runs once when the budget beat lands.
  useEffect(() => {
    if (step !== 5) return;
    cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    const dur = 950;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setBudget({ lo: d.budgetLo * e, hi: d.budgetHi * e });
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [step, d.budgetLo, d.budgetHi]);

  const field = (show: boolean, extra: React.CSSProperties = {}): React.CSSProperties => ({
    opacity: show ? 1 : 0,
    transform: show ? "none" : "translateY(14px)",
    transition: "opacity .7s ease, transform .7s ease",
    ...extra,
  });

  const tab = (active: boolean): React.CSSProperties => ({
    fontSize: 12,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    padding: "12px 20px",
    border: `1px solid ${active ? GOLD_DARK : "rgba(48,35,28,.2)"}`,
    background: active ? GOLD : WHITE,
    color: active ? BROWN : STONE,
    cursor: "pointer",
    transition: ".2s",
  });

  return (
    <div ref={rootRef} className="w-full">
      <style>{`
        @keyframes howaScan { 0%{transform:translateY(-8%);opacity:0} 12%{opacity:1} 88%{opacity:1} 100%{transform:translateY(108%);opacity:0} }
        .howa-scanline{ position:absolute; left:0; right:0; height:42px; pointer-events:none;
          background:linear-gradient(to bottom, transparent, rgba(197,169,96,.55), transparent);
          animation: howaScan 2.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce){ .howa-scanline{ animation:none; opacity:.4; top:40%; } }
      `}</style>

      {/* Discipline toggle */}
      <div role="tablist" aria-label="Discipline" className="mb-6 flex gap-2">
        {(["Interior", "Garden"] as Discipline[]).map((disc) => (
          <button
            key={disc}
            role="tab"
            aria-selected={discipline === disc}
            onClick={() => { setDiscipline(disc); setStarted(true); setRunKey((k) => k + 1); }}
            style={tab(discipline === disc)}
            className="font-sans"
          >
            {disc} design
          </button>
        ))}
      </div>

      {/* Card */}
      <div style={{ border: `1px solid ${LINE}`, background: WHITE }}>
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-5 py-4" style={{ borderBottom: `1px solid rgba(48,35,28,.12)`, background: CREAM }}>
          <span className="flex min-w-0 items-center gap-2 font-sans text-[11px] uppercase tracking-[0.22em]">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: bp ? GOLD : MOSS, boxShadow: bp ? "0 0 0 3px rgba(197,169,96,.25)" : "none", transition: "background .4s" }} />
            <span className="truncate" style={{ color: BROWN }}>
              {d.productName} · <span style={{ color: GOLD }}>{step >= 0 ? CAPTIONS[Math.min(step, 7)] : "Preparing"}</span>
            </span>
          </span>
          <span className="shrink-0 font-sans text-[12px] uppercase tracking-[0.16em]" style={{ color: BROWN }}>{d.price}</span>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 min-[900px]:grid-cols-2">
          {/* LEFT stage */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 3", background: CREAM_DARK }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={d.image}
              alt={d.imageAlt}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ filter: bp ? "grayscale(1) contrast(1.08) brightness(.95)" : "none", transition: "filter 1.3s ease" }}
            />
            {/* blueprint wash */}
            <div className="pointer-events-none absolute inset-0" style={{ background: NAVY, mixBlendMode: "multiply", opacity: bp ? 0.5 : 0, transition: "opacity 1.3s ease" }} />
            {/* gold survey grid */}
            <div className="pointer-events-none absolute inset-0" style={{ opacity: step >= 0 && step < 3 ? 0.4 : 0, transition: "opacity .8s ease", backgroundImage: "repeating-linear-gradient(0deg,rgba(197,169,96,.5) 0 1px,transparent 1px 40px),repeating-linear-gradient(90deg,rgba(197,169,96,.5) 0 1px,transparent 1px 40px)" }} />
            {/* scan line */}
            {bp && <div className="howa-scanline" />}
            {/* dimension lines */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="none">
              <g stroke={GOLD} strokeWidth={1.4} fill="none" pathLength={1} style={{ strokeDasharray: 1, strokeDashoffset: step >= 1 ? 0 : 1, transition: "stroke-dashoffset 1s ease" }}>
                <path d="M60 250 H340" /><path d="M60 244 V256" /><path d="M340 244 V256" />
                <path d="M46 70 V250" /><path d="M40 70 H52" /><path d="M40 250 H52" />
              </g>
              <g fill={CREAM} fontFamily="sans-serif" fontSize={11} letterSpacing={1} style={{ opacity: step >= 1 ? 1 : 0, transition: "opacity .5s ease .5s" }}>
                <rect x={176} y={236} width={48} height={16} fill={NAVY} opacity={0.8} />
                <text x={200} y={247} textAnchor="middle">{d.dimW}</text>
                <rect x={20} y={152} width={46} height={16} fill={NAVY} opacity={0.8} />
                <text x={43} y={163} textAnchor="middle">{d.dimH}</text>
              </g>
            </svg>
            {/* zone pins */}
            {d.zones.slice(0, 3).map((z, i) => (
              <span key={z} className="absolute font-sans text-[10px] uppercase tracking-[0.16em] whitespace-nowrap" style={{ top: ZONE_POS[i].top, left: ZONE_POS[i].left, color: BROWN, background: "rgba(245,240,232,.95)", padding: "4px 8px", border: "1px solid rgba(197,169,96,.5)", opacity: step >= 3 ? 1 : 0, transform: step >= 3 ? "none" : "translateY(14px)", transition: "opacity .7s ease, transform .7s ease", transitionDelay: `${i * 140}ms` }}>
                <b className="mr-1 font-normal" style={{ color: GOLD }}>+</b>{z}
              </span>
            ))}
            {/* status badge */}
            <span className="absolute left-3 top-3 font-sans text-[10px] uppercase tracking-[0.18em]" style={{ padding: "4px 10px", background: bp ? NAVY : GOLD, color: bp ? GOLD : BROWN, transition: "background .5s, color .5s" }}>{bp ? "HoWA · scanning" : "First direction"}</span>
            {/* room label */}
            <span className="absolute bottom-3 right-3 font-sans text-[10px] uppercase tracking-[0.16em]" style={{ color: WHITE, background: "rgba(0,0,0,.35)", padding: "4px 8px" }}>{d.roomLabel}</span>
          </div>

          {/* RIGHT output sheet */}
          <div className="flex flex-col gap-6 px-6 py-7">
            <div style={field(step >= 1)}>
              <p className="mb-2 font-sans text-[11px] uppercase tracking-[0.22em]" style={{ color: GOLD_DARK }}>The space, mapped</p>
              <p className="font-sans text-[14px]" style={{ color: STONE }}>{d.dimW} · {d.dimH}</p>
            </div>
            <div style={field(step >= 3)}>
              <p className="mb-2 font-sans text-[11px] uppercase tracking-[0.22em]" style={{ color: GOLD_DARK }}>Layout &amp; zones</p>
              <div className="flex flex-wrap gap-2">
                {d.zones.map((z) => (
                  <span key={z} className="font-sans text-[12px]" style={{ border: `1px solid ${LINE}`, background: CREAM, padding: "6px 12px", color: BROWN }}>{z}</span>
                ))}
              </div>
            </div>
            <div style={field(step >= 4)}>
              <p className="mb-2 font-sans text-[11px] uppercase tracking-[0.22em]" style={{ color: GOLD_DARK }}>Palette &amp; materials</p>
              <div className="flex flex-wrap gap-4">
                {d.palette.map((p, i) => (
                  <div key={p.name} className="flex flex-col items-start" style={{ opacity: step >= 4 ? 1 : 0, transform: step >= 4 ? "none" : "translateY(8px)", transition: "opacity .7s ease, transform .7s ease", transitionDelay: `${i * 110}ms` }}>
                    <i className="block h-11 w-11" style={{ background: p.hex, border: `1px solid ${LINE}` }} />
                    <span className="mt-1.5 font-sans text-[11px] leading-tight" style={{ color: BROWN }}>{p.name}</span>
                    <span className="font-sans text-[10px] leading-tight" style={{ color: STONE }}>{p.note}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={field(step >= 5)}>
              <p className="mb-2 font-sans text-[11px] uppercase tracking-[0.22em]" style={{ color: GOLD_DARK }}>Indicative budget</p>
              <p className="font-display text-[clamp(24px,3vw,34px)] leading-none" style={{ color: BROWN }}>
                {gbp(budget.lo)} <span style={{ color: "rgba(106,100,88,.6)" }}>–</span> {gbp(budget.hi)}
              </p>
              <p className="mt-1.5 font-sans text-[14px]" style={{ color: STONE }}>A range for the full commission, not a quote.</p>
            </div>
            <div style={field(step >= 6)}>
              <p className="mb-2 font-sans text-[11px] uppercase tracking-[0.22em]" style={{ color: GOLD_DARK }}>The structured brief</p>
              <ul className="flex list-none flex-col gap-2 p-0">
                {d.brief.map((b, i) => (
                  <li key={i} style={{ fontFamily: SERIF, fontSize: 16, lineHeight: 1.5, color: BROWN, opacity: step >= 6 ? 1 : 0, transform: step >= 6 ? "none" : "translateY(6px)", transition: "opacity .7s ease, transform .7s ease", transitionDelay: `${i * 160}ms` }}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4 px-6 py-6 min-[760px]:flex-row min-[760px]:items-center min-[760px]:justify-between" style={{ borderTop: `1px solid rgba(48,35,28,.12)`, background: CREAM, ...field(step >= 7) }}>
          <p className="max-w-[52ch] font-sans text-[12px] leading-[1.5]" style={{ color: STONE }}>A sample first direction, not a final design. It is not a technical drawing set, planning advice or a final quotation.</p>
          <div className="flex gap-3">
            <button onClick={() => { setStarted(true); setRunKey((k) => k + 1); }} className="font-sans text-[12px] uppercase tracking-[0.16em]" style={{ padding: "12px 20px", border: "1px solid rgba(48,35,28,.25)", background: WHITE, color: BROWN, cursor: "pointer" }}>Replay</button>
            <a href={d.continueHref} className="font-sans text-[12px] uppercase tracking-[0.16em] no-underline" style={{ padding: "12px 20px", border: `1px solid ${GOLD_DARK}`, background: GOLD, color: BROWN }}>{d.continueLabel}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
