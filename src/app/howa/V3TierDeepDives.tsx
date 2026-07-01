import Image from "next/image";

/* ──────────────────────────────────────────────────────────────────────
   Tier deep-dives (askhowa handover). Assistant + Housekeeper share a row as
   compact image-over-copy cards; Steward runs full-width beneath in the navy
   register. Ported for the House site: image paths .png -> .webp, CTAs ->
   /howa/coming-soon.
   ────────────────────────────────────────────────────────────────────── */

type Tier = {
  id: string;
  numeral: string;
  name: string;
  price: string;
  title: string;
  body: string;
  plus?: string;
  groupLabel?: string;
  points: string[];
  image: string;
  accent: string;
  card: { title: string; items: string[] };
};

const ASSISTANT: Tier = {
  id: "tier-assistant",
  numeral: "01",
  name: "Assistant",
  price: "Free",
  title: "Awareness for every day.",
  body: "See your home clearly, so you can act with confidence.",
  points: [
    "One Home Record, your address gains a memory",
    "Ask HoWA about your home, garden and documents",
    "Repair, garden and room scans, with the next step",
  ],
  image: "/home-v4/v6-tier-assistant-v2.webp",
  accent: "var(--color-howa-green)",
  card: { title: "Home Health", items: ["91% Optimal", "3 items due soon", "2 risks monitored"] },
};

const HOUSEKEEPER: Tier = {
  id: "tier-housekeeper",
  numeral: "02",
  name: "Housekeeper",
  price: "£16.99/mo",
  title: "Practical care, beautifully run.",
  body: "Keep your home running smoothly with the right people, parts and plans.",
  plus: "Everything in Assistant, plus",
  points: [
    "Full logbook: rooms, assets, warranties, service history",
    "Maintenance calendar and seasonal garden plan",
    "Renewal and warranty reminders that come to you",
  ],
  image: "/home-v4/v6-tier-housekeeper-v2.webp",
  accent: "#b56a5c",
  card: { title: "This week", items: ["Service boiler", "Clean gutters", "Smoke alarms"] },
};

const STEWARD: Tier = {
  id: "tier-steward",
  numeral: "03",
  name: "Steward",
  price: "Premium, by application",
  title: "Protected before failure.",
  body: "The intelligence and control layer, watching for the things that turn into bills and building the evidence that you cared.",
  plus: "Everything above, plus the intelligence layer",
  groupLabel: "On the horizon",
  points: [
    "Home Health Score and risk register",
    "Predictive maintenance, catch failure early",
    "Smart-home control that works above your devices",
  ],
  image: "/home-v4/v6-tier-steward-v2.webp",
  accent: "#c5a960",
  card: { title: "Looking ahead", items: ["Roof refurbishment 2027", "Heating upgrade 2026", "Redecoration 2025"] },
};

export function V3TierDeepDives() {
  return (
    <section id="tiers-detail" className="bg-[#fbfaf5] py-8 scroll-mt-20">
      <div className="mx-auto max-w-[1240px] space-y-8 px-6 sm:px-10">
        {/* Assistant + Housekeeper, side by side */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <TierCard t={ASSISTANT} />
          <TierCard t={HOUSEKEEPER} />
        </div>
        {/* Steward, full width */}
        <TierWide t={STEWARD} />
      </div>
    </section>
  );
}

/* Compact card — image over copy, for the two-up row. */
function TierCard({ t }: { t: Tier }) {
  return (
    <article
      id={t.id}
      className="scroll-mt-24 flex flex-col overflow-hidden rounded-md border border-[color:var(--color-gold)]/20 bg-white shadow-[0_16px_40px_-28px_rgba(40,30,10,0.32)] transition-transform duration-[420ms] ease-[cubic-bezier(0.65,0,0.35,1)] hover:scale-[1.01]"
    >
      <div className="relative aspect-[16/10] w-full">
        <Image src={t.image} alt={`HoWA ${t.name}, the dollhouse.`} fill sizes="(max-width:1024px) 92vw, 46vw" className="object-cover" />
        <div className="absolute left-4 top-1/2 hidden w-[158px] -translate-y-1/2 rounded-md border border-[color:var(--color-gold)]/35 bg-[#faf7f0] px-4 py-3.5 shadow-[0_16px_38px_-16px_rgba(20,15,5,0.5)] sm:block">
          <p className="smallcaps mb-2.5 text-[12px] tracking-[0.16em] text-[color:var(--color-gold-deep)]">{t.card.title}</p>
          <ul className="space-y-2">
            {t.card.items.map((it) => (
              <li key={it} className="flex items-center gap-2 text-[14px] leading-[1.2] text-[color:var(--color-ink-soft)]">
                <CheckGlyph color={t.accent} small /> {it}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <p className="mb-1 font-display text-[19px]" style={{ color: t.accent }}>{t.numeral}</p>
        <h3 className="font-display text-[clamp(22px,1.8vw,28px)] leading-[1.1] tracking-[-0.005em]">HoWA {t.name}</h3>
        <p className="smallcaps mb-3 mt-1 text-[12px] tracking-[0.16em]" style={{ color: t.accent }}>{t.price}</p>
        <p className="mb-3 font-display text-[clamp(19px,1.6vw,24px)] leading-[1.15] text-[color:var(--color-ink)]">{t.title}</p>
        <p className="mb-4 text-[16px] leading-[1.5] text-[color:var(--color-ink-soft)]">{t.body}</p>
        {t.plus && (
          <p className="smallcaps mb-2.5 text-[12px] tracking-[0.16em] text-[color:var(--color-ink-soft)]/65">{t.plus}</p>
        )}
        <ul className="mb-6 space-y-2">
          {t.points.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-[15px] leading-[1.4] text-[color:var(--color-ink-soft)]">
              <span className="mt-1 shrink-0"><CheckGlyph color={t.accent} /></span>
              <span className="flex-1">{p}</span>
            </li>
          ))}
        </ul>
        <a
          href="/howa/coming-soon"
          className="mt-auto inline-flex w-fit items-center gap-2 rounded-md px-6 py-3 text-[16px] text-white transition-colors"
          style={{ background: t.accent }}
        >
          Explore {t.name} <span aria-hidden>→</span>
        </a>
      </div>
    </article>
  );
}

/* Wide card — copy beside image, navy register, for Steward. */
function TierWide({ t }: { t: Tier }) {
  return (
    <article
      id={t.id}
      className="scroll-mt-24 relative overflow-hidden rounded-md border border-[color:var(--color-gold)]/30 bg-[#1d2a40] px-6 py-10 shadow-[0_24px_60px_-30px_rgba(15,22,35,0.7)] transition-transform duration-[420ms] ease-[cubic-bezier(0.65,0,0.35,1)] hover:scale-[1.01] sm:px-10 lg:py-12"
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:order-1 lg:col-span-5">
          <p className="mb-2 font-display text-[21px]" style={{ color: t.accent }}>{t.numeral}</p>
          <h3 className="mb-1 font-display text-[clamp(23px,2vw,32px)] leading-[1.1] tracking-[-0.005em] text-[#f3ede0]">HoWA {t.name}</h3>
          <p className="smallcaps mb-3 text-[12px] tracking-[0.16em]" style={{ color: t.accent }}>{t.price}</p>
          <p className="mb-4 font-display text-[clamp(21px,1.8vw,28px)] leading-[1.15] text-[#f3ede0]">{t.title}</p>
          <p className="mb-5 max-w-[400px] text-[17px] leading-[1.55] text-[#f3ede0]/80">{t.body}</p>
          {t.plus && <p className="smallcaps mb-2.5 text-[12px] tracking-[0.16em] text-[#f3ede0]/55">{t.plus}</p>}
          {t.groupLabel && <p className="smallcaps mb-2.5 text-[12px] tracking-[0.18em]" style={{ color: t.accent }}>{t.groupLabel}</p>}
          <ul className="mb-6 space-y-2">
            {t.points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-[15.5px] leading-[1.4] text-[#f3ede0]/85">
                <span className="mt-1 shrink-0"><CheckGlyph color={t.accent} /></span>
                <span className="flex-1">{p}</span>
              </li>
            ))}
          </ul>
          <a href="/howa/coming-soon" className="inline-flex items-center gap-2 rounded-md bg-[#c5a960] px-6 py-3 text-[16px] text-[#1d2a40] transition-colors hover:bg-[#d4ba78]">
            Apply for Steward <span aria-hidden>→</span>
          </a>
        </div>
        <div className="relative lg:order-2 lg:col-span-7">
          <div className="relative aspect-[4/3] w-full">
            <Image src={t.image} alt={`HoWA ${t.name}, the dollhouse.`} fill sizes="(max-width:1024px) 92vw, 55vw" className="rounded-md object-cover" />
            <div className="absolute left-4 top-1/2 hidden w-[166px] -translate-y-1/2 rounded-md border border-[color:var(--color-gold)]/35 bg-[#faf7f0] px-4 py-4 shadow-[0_16px_38px_-16px_rgba(20,15,5,0.5)] sm:block lg:left-6">
              <p className="smallcaps mb-2.5 text-[12px] tracking-[0.16em] text-[color:var(--color-gold-deep)]">{t.card.title}</p>
              <ul className="space-y-2">
                {t.card.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-[14px] leading-[1.25] text-[color:var(--color-ink-soft)]">
                    <CheckGlyph color={t.accent} small /> {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function CheckGlyph({ color, small }: { color: string; small?: boolean }) {
  const s = small ? 11 : 14;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </svg>
  );
}
