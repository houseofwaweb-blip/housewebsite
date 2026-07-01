"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* ──────────────────────────────────────────────────────────────────────
   /howa — "Everything for your home, in one place." — ported from the
   askhowa.co.uk source (app/v6/V6Features.tsx). Tabbed feature showcase:
   left column heading + points + CTA, right column tabs + the active
   house+phone image + a handwritten note.

   Adaptations for this project:
   - Image paths .png → .webp (converted on import).
   - CTA href /waitlist → /howa/coming-soon.
   ────────────────────────────────────────────────────────────────────── */

const hand = { className: "handwriting" };

const FEATURES = [
  { tab: "Home", img: "/home-v4/v6-feature-home.webp", note: "Your whole home, in one calm view." },
  { tab: "Care", img: "/home-v4/v6-feature-care.webp", note: "Every season, the garden cared for." },
  { tab: "Documents", img: "/home-v4/v6-feature-documents.webp", note: "Every paper, found in a moment." },
  { tab: "Tasks", img: "/home-v4/v6-feature-tasks.webp", note: "The right thing, at the right time." },
  { tab: "House Health", img: "/home-v4/v6-feature-health.webp", note: "How your home is doing, always." },
];

const POINTS = [
  "One record, bound to your address",
  "All rooms, systems and assets mapped",
  "Documents, plans and manuals stored",
  "Tasks and timelines, all in view",
  "Decisions today, remembered tomorrow",
];

export function V6Features() {
  const [active, setActive] = useState(0);
  const f = FEATURES[active];
  return (
    <section id="features" className="bg-[#f4f1e9] py-16 lg:py-20 scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="font-display text-[clamp(29px,2.8vw,42px)] leading-[1.05] tracking-[-0.01em] mb-6">
            Everything for your home,
            <br />
            <span className="font-italic-display text-[#c5a960]">in one place.</span>
          </h2>
          <ul className="space-y-2.5 mb-7">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-[16.5px] text-[color:var(--color-ink-soft)]">
                <Tick /> {p}
              </li>
            ))}
          </ul>
          <Link href="/howa/coming-soon" className="inline-flex items-center gap-2 rounded-md bg-[color:var(--color-howa-green)] px-6 py-3 text-[16px] text-white hover:bg-[color:var(--color-howa-green-deep)] transition-colors">
            See it in action <span aria-hidden>→</span>
          </Link>
        </div>
        <div>
          {/* tabs */}
          <div className="flex flex-wrap gap-x-5 gap-y-1 mb-5 border-b border-[color:var(--color-ink)]/12">
            {FEATURES.map((feat, i) => (
              <button
                key={feat.tab}
                type="button"
                onClick={() => setActive(i)}
                className={
                  "relative text-[16px] pb-3 transition-colors " +
                  (i === active ? "text-[color:var(--color-ink)]" : "text-[color:var(--color-ink-soft)]/60 hover:text-[color:var(--color-ink)]")
                }
              >
                {feat.tab}
                {i === active && <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-[color:var(--color-howa-green)]" />}
              </button>
            ))}
          </div>
          <div key={`img-${active}`} className="relative w-full aspect-[4/3] features-fade">
            <Image src={f.img} alt={`HoWA ${f.tab} feature`} fill sizes="(max-width:1024px) 92vw, 48vw" className="object-contain" />
          </div>
          <p key={`note-${active}`} className={`${hand.className} features-fade mt-2 text-right text-[20px] leading-[1.2] text-[color:var(--color-ink-soft)]/80`}>
            {f.note}
          </p>
        </div>
      </div>
    </section>
  );
}

function Tick() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-howa-green)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </svg>
  );
}
