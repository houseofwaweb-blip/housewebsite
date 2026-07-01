"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* The hero phone — the LIVE phone's proportions and cards (gauge + trend,
   living record + sketch, next best action), with only the content changed to
   the brief's UI: HoWA Score 62 "In order, with gaps" (not Home Health 91%
   Optimal). Animated score. (Brief v2, slides 6, 14, 16.) */
export function V4HeroPhone() {
  return (
    <div className="mx-auto w-[clamp(284px,21.5vw,338px)]">
      <div className="rounded-[46px] bg-gradient-to-b from-[#2b2b2d] to-[#0d0d0f] p-[10px] shadow-[0_46px_92px_-28px_rgba(20,15,5,0.64)]">
        <div className="relative overflow-hidden rounded-[37px] bg-[#ece6d8]">
          {/* Dynamic Island — small, dark, reads as a modern phone */}
          <div className="absolute left-1/2 top-[9px] z-10 h-[18px] w-[64px] -translate-x-1/2 rounded-full bg-[#0d0d0f]" />

          {/* header */}
          <div className="flex items-center justify-between px-4 pt-[38px] pb-3">
            <div>
              <p className="font-display text-[17px] leading-none text-[#1d2a40]">HoWA</p>
              <p className="mt-1 text-[12px] text-[#1d2a40]/55">Home Overview</p>
            </div>
            <span className="flex flex-col gap-[3px]" aria-hidden>
              <span className="block h-px w-[18px] bg-[#1d2a40]/45" />
              <span className="block h-px w-[18px] bg-[#1d2a40]/45" />
              <span className="block h-px w-[18px] bg-[#1d2a40]/45" />
            </span>
          </div>

          <div className="space-y-2.5 px-3 pb-3">
            <ScoreCard />
            <RecordCard />
            <ActionCard />
          </div>

          {/* tab bar */}
          <div className="flex items-center justify-around border-t border-[#1d2a40]/10 bg-[#ece6d8] py-3">
            {["Home", "Timeline", "Record", "Profile"].map((t, i) => (
              <span key={t} className={"text-[12px] tracking-[0.04em] " + (i === 0 ? "font-semibold text-[#1f3a2b]" : "text-[#1d2a40]/45")}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-[#f3ede0]/95 backdrop-blur-[2px] border border-[#b89968]/30 shadow-[0_12px_34px_-16px_rgba(60,40,15,0.45)] px-5 py-4">
      {children}
    </div>
  );
}

/* HoWA Score 62 · In order, with gaps */
function ScoreCard() {
  return (
    <Card>
      <p className="text-[12px] uppercase tracking-[0.18em] text-[#1a241d] flex items-center gap-1.5">
        <ShieldGlyph /> HoWA Score
      </p>
      <p className="text-[14px] text-[#3a352c]/75 mt-1 mb-3.5">In order, with gaps</p>
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col items-center shrink-0">
          <ScoreGauge value={62} size={68} />
          <span className="text-[12px] uppercase tracking-[0.16em] text-[#8a6f3f] mt-1.5">of 100</span>
        </div>
        <div className="relative h-[78px] flex-1 max-w-[200px]">
          <Image src="/home-v4/card-graph.webp" alt="" fill sizes="200px" className="object-contain object-right" />
        </div>
      </div>
    </Card>
  );
}

/* Living Record */
function RecordCard() {
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] uppercase tracking-[0.18em] text-[#1a241d] flex items-center gap-1.5">
            <LeafGlyph /> Living Record
          </p>
          <p className="text-[14px] text-[#3a352c]/75 mt-1">Updated today</p>
          <p className="text-[14px] text-[#3a352c]/75">08:42</p>
          <a href="#demo" className="inline-flex items-center gap-1 text-[14px] text-[#8a6f3f] mt-3 hover:text-[#6f5832] transition-colors">View record →</a>
        </div>
        <div className="relative w-[124px] h-[104px] shrink-0 opacity-90">
          <Image src="/home-v4/card-house-sketch-v3.webp" alt="" fill sizes="124px" className="object-contain" />
        </div>
      </div>
    </Card>
  );
}

/* What matters first */
function ActionCard() {
  const items = ["Boiler service · due in 14 days", "Gutter clean · before winter", "Smoke alarms · tested OK"];
  return (
    <Card>
      <p className="text-[12px] uppercase tracking-[0.18em] text-[#1a241d] flex items-center gap-1.5 mb-2">
        <ClipboardGlyph /> What matters first
      </p>
      <p className="text-[14px] text-[#1a241d]">3 things need attention</p>
      <p className="text-[14px] text-[#3a352c]/70 mb-3">HoWA tells you what matters first</p>
      <ul className="space-y-1.5 mb-3">
        {items.map((t) => (
          <li key={t} className="flex items-center gap-2 text-[14px] text-[#3a352c]">
            <CheckGlyph /> {t}
          </li>
        ))}
      </ul>
      <a href="#tiers" className="inline-flex items-center gap-1 text-[14px] text-[#8a6f3f] hover:text-[#6f5832] transition-colors">View plan →</a>
    </Card>
  );
}

/* score ring — counts up to value on scroll-in; number with no % (the score
   is "62", not "62%") */
function ScoreGauge({ value = 62, size = 68, stroke = 5 }: { value?: number; size?: number; stroke?: number }) {
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(value); return; }
    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / 1500, 1);
            setShown(Math.round((1 - Math.pow(1 - t, 3)) * value));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      }
    }, { threshold: 0.4 });
    obs.observe(node);
    return () => obs.disconnect();
  }, [value]);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - shown / 100);
  return (
    <div ref={ref} className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(184,153,104,0.22)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#b89968" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-[20px] leading-none text-[#1a241d] tabular-nums">{shown}</span>
      </div>
    </div>
  );
}

const glyph = { fill: "none", stroke: "#8a6f3f", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
function ShieldGlyph() { return <svg width="13" height="13" viewBox="0 0 24 24" {...glyph} aria-hidden><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" /></svg>; }
function LeafGlyph() { return <svg width="13" height="13" viewBox="0 0 24 24" {...glyph} aria-hidden><path d="M5 19c0-7 6-13 14-13 0 8-6 14-14 13z" /><path d="M5 19c4-4 7-6 11-7" /></svg>; }
function ClipboardGlyph() { return <svg width="13" height="13" viewBox="0 0 24 24" {...glyph} aria-hidden><rect x="5" y="5" width="14" height="16" rx="2" /><path d="M9 5V3h6v2M9 11h6M9 15h4" /></svg>; }
function CheckGlyph() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1f3a2b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.5 2.5 4.5-5" /></svg>; }
