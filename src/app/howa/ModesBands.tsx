import Image from "next/image";
import Link from "next/link";

/* ──────────────────────────────────────────────────────────────────────
   /howa — the three modes as full-width coloured bands, ported from the
   askhowa.co.uk source (app/v5/ModesBands.tsx). The one place colour lives;
   everything else on the page is off-white. Olive Assistant / terracotta
   Housekeeper / navy Steward, side by side on desktop, stacked on mobile.
   Each band's cutaway house is a single tinted image.

   Adaptations for this project:
   - Image paths .png → .webp (converted on import).
   - "Explore" links repointed to real routes: Steward → /howa/steward,
     Assistant + Housekeeper → /howa/coming-soon (waitlist) until their own
     pages exist. Swap these hrefs when those routes land.
   ────────────────────────────────────────────────────────────────────── */

type Mode = {
  /** Where this mode's "Explore" CTA points. */
  href: string;
  numeral: string;
  name: string;
  tagline: string;
  desc: string;
  points: string[];
  bg: string;
  /** Per-band tinted cutaway house. */
  image: string;
};

const MODES: Mode[] = [
  {
    href: "/howa/coming-soon",
    numeral: "I",
    name: "Assistant",
    tagline: "The house, seen.",
    desc: "Quiet awareness. Thoughtful action.",
    points: ["Repair scan", "Seasonal reminders", "System notifications"],
    bg: "#5f6a49",
    image: "/home-v4/tier-band-assistant.webp",
  },
  {
    href: "/howa/coming-soon",
    numeral: "II",
    name: "Housekeeper",
    tagline: "The house, in order.",
    desc: "Papers, tasks and renewals, all held in one record.",
    points: ["Task management", "Supplier coordination", "Preventive care"],
    bg: "#bd6a52",
    image: "/home-v4/tier-band-housekeeper.webp",
  },
  {
    href: "/howa/steward",
    numeral: "III",
    name: "Steward",
    tagline: "The house, protected before failure.",
    desc: "Foresight. Long-term protection.",
    points: ["Seasonal foresight", "Risk monitoring", "Long-term planning"],
    bg: "#27384c",
    image: "/home-v4/tier-band-steward.webp",
  },
];

export function ModesBands() {
  return (
    <section id="ways" className="relative scroll-mt-20">
      {/* Header pill straddles the hero/bands boundary (half on the hero image) */}
      <span className="absolute z-30 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white border border-[color:var(--color-gold)]/25 shadow-[0_10px_28px_-12px_rgba(60,40,15,0.4)] px-7 py-3 font-italic-display text-[clamp(18px,1.6vw,24px)] text-[color:var(--color-ink)]">
        Three ways HoWA works for your home.
      </span>

      {/* mobile: full-bleed coloured panels in a snap carousel · lg: side-by-side grid */}
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-[#27384c] lg:grid lg:grid-cols-3 lg:gap-0 lg:px-0 lg:py-0 lg:overflow-visible">
        {MODES.map((m) => (
          <article
            key={m.name}
            className="relative overflow-hidden text-[#f3ede0] w-[88%] shrink-0 snap-center rounded-2xl lg:w-auto lg:rounded-none min-h-[420px] lg:min-h-[clamp(440px,42vw,560px)] lg:-ml-px lg:first:ml-0 transition-transform duration-[420ms] ease-[cubic-bezier(0.65,0,0.35,1)] lg:hover:scale-[1.025] lg:hover:z-20"
            style={{ background: m.bg }}
          >
            {/* House image — fills the right side, bleeds to the edge */}
            <div className="absolute inset-y-0 right-0 w-[58%] opacity-95">
              <Image
                src={m.image}
                alt={`${m.name} mode, a cutaway Georgian house.`}
                fill
                sizes="(max-width: 1024px) 60vw, 22vw"
                className="object-cover object-left"
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
                  <span className="font-italic-display">{m.name}</span>
                </h3>
              </div>
              <p className="font-italic-display text-[clamp(18px,1.5vw,23px)] text-[#f3ede0] mb-4">
                {m.tagline}
              </p>
              <p className="text-[16px] leading-[1.5] text-[#f3ede0]/85 mb-6 max-w-[230px]">
                {m.desc}
              </p>
              <ul className="space-y-2 mb-7">
                {m.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-[15.5px] text-[#f3ede0]/90">
                    <CheckGlyph /> {p}
                  </li>
                ))}
              </ul>
              <Link
                href={m.href}
                className="mt-auto inline-flex items-center gap-2 self-start rounded-md border border-[#f3ede0]/45 px-5 py-2.5 text-[15.5px] text-[#f3ede0] hover:bg-[#f3ede0]/10 transition-colors"
              >
                Explore {m.name} <span aria-hidden>→</span>
              </Link>
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
