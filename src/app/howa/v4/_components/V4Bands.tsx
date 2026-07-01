import Image from "next/image";
import type { CSSProperties } from "react";

/* ──────────────────────────────────────────────────────────────────────
   /v5 — the three modes as full-width coloured bands (the one place colour
   lives; everything else on the page is off-white). Olive Assistant /
   terracotta Housekeeper / navy Steward, side by side on desktop, stacked
   on mobile. All text/numerals/checklists/buttons are HTML; each band's
   cutaway house is a single image (placeholder for now — swap per band).
   ────────────────────────────────────────────────────────────────────── */

type Mode = {
  /** Anchor of this mode's own deep-dive section below. */
  href: string;
  numeral: string;
  name: string;
  price: string;
  tagline: string;
  desc: string;
  points: string[];
  bg: string;
  /** Placeholder house image — replace with the per-band tinted cutaway. */
  image: string;
  /** Optional per-image tweak (e.g. scale a house that's framed bigger). */
  imgStyle?: CSSProperties;
  /** Optional accent colour (name + button), e.g. gold on the Steward band. */
  accent?: string;
};

const MODES: Mode[] = [
  {
    href: "#tier-assistant",
    numeral: "I",
    name: "Assistant",
    price: "Free",
    tagline: "The house, seen.",
    desc: "Awareness, and what to do about it.",
    points: ["Instant address portrait", "Ask HoWA", "Repair, garden & room scans"],
    bg: "#5f6a49",
    image: "/home-v4/tier-band-assistant-v2.webp",
  },
  {
    href: "#tier-housekeeper",
    numeral: "II",
    name: "Housekeeper",
    price: "£16.99/mo",
    tagline: "The house, in order.",
    desc: "Papers, tasks and renewals, all held in one record.",
    points: ["Full logbook", "Maintenance & garden calendar", "Renewal & warranty reminders"],
    bg: "#b56a5c",
    image: "/home-v4/tier-band-housekeeper-v3.webp",
  },
  {
    href: "/howa/steward",
    numeral: "III",
    name: "Steward",
    price: "£29.99/mo",
    tagline: "The house, protected before failure.",
    desc: "Risk read early, so the house is protected before things go wrong.",
    points: ["HoWA Score & risk register", "Predictive maintenance", "Sensor & smart-meter interpretation"],
    bg: "#1d2a40",
    image: "/home-v4/tier-band-steward-v2.webp",
    accent: "#c5a960",
  },
];

export function V4Bands() {
  return (
    <section id="modes" className="relative scroll-mt-20">
      {/* Header pill straddles the hero/bands boundary (half on the hero image) */}
      <span className="absolute z-30 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white border border-[color:var(--color-gold)]/25 shadow-[0_10px_28px_-12px_rgba(60,40,15,0.4)] px-7 py-3 font-italic-display text-[clamp(18px,1.6vw,24px)] text-[color:var(--color-ink)]">
        Three ways HoWA works for your home.
      </span>

      <div className="flex snap-x snap-mandatory overflow-x-auto bg-[#1d2a40] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-3 lg:overflow-visible">
        {MODES.map((m) => (
          <article
            key={m.name}
            className="relative overflow-hidden text-[#f3ede0] w-[88%] shrink-0 snap-center lg:w-auto min-h-[420px] lg:min-h-[clamp(440px,42vw,560px)] lg:-ml-px lg:first:ml-0 transition-transform duration-[420ms] ease-[cubic-bezier(0.65,0,0.35,1)] hover:scale-[1.025] hover:z-20"
            style={{ background: m.bg }}
          >
            {/* House image — fills the right side, bleeds to the edge */}
            <div className="absolute inset-y-0 right-0 w-[58%] opacity-95" style={{ background: m.bg }}>
              <Image
                src={m.image}
                alt={`${m.name} mode, a cutaway Georgian house.`}
                fill
                sizes="(max-width: 1024px) 60vw, 22vw"
                className="object-cover object-left"
                style={m.imgStyle}
              />
              {/* Fade the image's left edge into the band colour */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: `linear-gradient(to right, ${m.bg} 0%, ${m.bg}00 45%)` }}
              />
            </div>

            {/* Copy */}
            <div className="relative z-10 h-full flex flex-col px-7 lg:px-8 py-9 lg:py-11 max-w-[62%]">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-italic-display text-[27px] text-[#f3ede0]/70 leading-none">
                  {m.numeral}.
                </span>
                <h3 className="font-display text-[clamp(23px,1.8vw,30px)] leading-[1.05]">
                  HoWA{" "}
                  <span className="font-italic-display" style={m.accent ? { color: m.accent } : undefined}>{m.name}</span>
                </h3>
              </div>
              <p className="smallcaps text-[12px] tracking-[0.16em] text-[#f3ede0]/65 mb-3 -mt-1">{m.price}</p>
              <p className="font-italic-display text-[clamp(18px,1.5vw,23px)] text-[#f3ede0] mb-4">
                {m.tagline}
              </p>
              <p className="text-[16px] leading-[1.5] text-[#f3ede0]/95 mb-6 max-w-[230px]">
                {m.desc}
              </p>
              <ul className="space-y-2 mb-7">
                {m.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-[15.5px] text-[#f3ede0]">
                    <CheckGlyph /> {p}
                  </li>
                ))}
              </ul>
              <a
                href={m.href}
                className={
                  "mt-auto inline-flex items-center gap-2 self-start rounded-md px-5 py-2.5 text-[15.5px] transition-colors " +
                  (m.accent
                    ? "bg-[#c5a960] text-[#1d2a40] hover:bg-[#d4ba78]"
                    : "border border-[#f3ede0]/45 text-[#f3ede0] hover:bg-[#f3ede0]/10")
                }
              >
                Explore {m.name} <span aria-hidden>→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CheckGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#f3ede0]/70 shrink-0" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </svg>
  );
}
