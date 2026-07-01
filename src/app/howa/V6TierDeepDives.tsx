import Image from "next/image";
import Link from "next/link";
import s from "./howa.module.css";

/* ──────────────────────────────────────────────────────────────────────
   /howa — the three tier deep-dives (framed, alternating), ported from the
   askhowa.co.uk source (app/v6/V6TierDeepDives.tsx). Assistant and
   Housekeeper sit in the warm register; Steward activates the HoWA
   navy/blueprint register — a more serious instrument. Honest about Live
   now vs Coming; Steward's (all Phase 3) sit under "On the horizon" so
   "by application" reads exclusive, not unbuilt. The insurance line stays
   readiness, not advice, with the compliance note.

   Adaptations for this project:
   - Image paths .png → .webp (converted on import).
   - CTA href /waitlist → /howa/coming-soon (this site's waitlist route).
   - Wrapped with the "One app. Three modes." heading + id="modes".
   ────────────────────────────────────────────────────────────────────── */

const hand = { className: "handwriting" };

type Point = { t: string; coming?: boolean };
type Tier = {
  id: string;
  numeral: string;
  name: string;
  price: string;
  title: string;
  body: string;
  plus?: string;
  groupLabel?: string;
  horizon?: boolean;
  points: Point[];
  fine?: string;
  image: string;
  imageRight: boolean;
  note: string;
  accent: string;
  dark?: boolean;
  card: { title: string; items: string[] };
};

const TIERS: Tier[] = [
  {
    id: "tier-assistant",
    numeral: "01",
    name: "Assistant",
    price: "Free",
    title: "Awareness for every day.",
    body: "HoWA Assistant helps you see your home clearly, so you can act with confidence.",
    points: [
      { t: "One Home Record, your address starts to have a memory" },
      { t: "Ask HoWA, questions about your home, garden and documents" },
      { t: "Repair, garden and room scans, with urgency and next step" },
      { t: "Document upload and your first saved home record" },
    ],
    image: "/home-v4/v6-tier-assistant.webp",
    imageRight: true,
    note: "Everything you need to know, right when you need it.",
    accent: "var(--color-howa-green)",
    card: { title: "Home Health", items: ["91% Optimal", "3 items due soon", "2 risks monitored"] },
  },
  {
    id: "tier-housekeeper",
    numeral: "02",
    name: "Housekeeper",
    price: "£16.99/mo",
    title: "Practical care, beautifully run.",
    body: "HoWA Housekeeper keeps your home running smoothly with the right people, parts and plans.",
    plus: "Everything in Assistant, plus",
    points: [
      { t: "Full logbook, rooms, assets, warranties, service history" },
      { t: "Maintenance calendar and seasonal garden plan" },
      { t: "Renewal and warranty reminders that come to you" },
      { t: "Document intelligence, reads dates and suppliers from uploads", coming: true },
      { t: "Invoice and cost memory, household sharing, permissioned" },
      { t: "Member pricing and priority booking on House services" },
    ],
    image: "/home-v4/v6-tier-housekeeper.webp",
    imageRight: false,
    note: "The right care at the right time, from people you can trust.",
    accent: "#bd6a52",
    card: { title: "This week", items: ["Service boiler", "Clean gutters", "Smoke alarms"] },
  },
  {
    id: "tier-steward",
    numeral: "03",
    name: "Steward",
    price: "Premium, by application",
    title: "Protected before failure.",
    body: "HoWA Steward adds the intelligence and control layer, watching for the things that turn into bills and building the evidence that you cared for your home.",
    plus: "Everything above, plus the intelligence and control layer",
    groupLabel: "On the horizon",
    horizon: true,
    points: [
      { t: "Home Health Score and risk register", coming: true },
      { t: "Predictive maintenance, catch failure early", coming: true },
      { t: "Smart-home control that works above your devices: heating, lighting, security, irrigation", coming: true },
      { t: "Leak detection and water-prevention, with evidence", coming: true },
      { t: "Insurance readiness, prefill and evidence, not advice", coming: true },
      { t: "Annual Home Report and Home Transfer Pack", coming: true },
      { t: "Steward Plans, managed care, £300 to £1,040 a month", coming: true },
    ],
    fine: "HoWA prepares evidence and prefills your details for renewal. It does not give insurance advice or arrange cover.",
    image: "/home-v4/v6-tier-steward.webp",
    imageRight: true,
    note: "Plan today. Protect tomorrow. Preserve always.",
    accent: "#c5a960",
    dark: true,
    card: { title: "Looking ahead", items: ["Roof refurbishment 2027", "Heating upgrade 2026", "Redecoration 2025"] },
  },
];

export function V6TierDeepDives() {
  return (
    <section id="modes" className="bg-[#f4f1e9] pt-16 lg:pt-20 pb-8 scroll-mt-28">
      <header className={s.modesHead} style={{ textAlign: "center" }}>
        <h2 className={s.modesTitle}>One record. <em>Three depths of care.</em></h2>
      </header>

      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 space-y-8 mt-12 lg:mt-16">
        {TIERS.map((t) => {
          const dark = !!t.dark;
          return (
            <article
              key={t.id}
              id={t.id}
              className={
                "scroll-mt-24 relative rounded-md border px-6 sm:px-10 py-10 lg:py-12 overflow-hidden will-change-transform [backface-visibility:hidden] transition-transform duration-[420ms] ease-[cubic-bezier(0.65,0,0.35,1)] hover:scale-[1.02] " +
                (dark
                  ? "bg-[#27384c] border-[color:var(--color-gold)]/30 shadow-[0_24px_60px_-30px_rgba(15,22,35,0.7)]"
                  : "bg-white/40 border-[color:var(--color-gold)]/20 shadow-[0_16px_40px_-28px_rgba(40,30,10,0.32)]")
              }
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Copy */}
                <div className={"lg:col-span-5 " + (t.imageRight ? "lg:order-1" : "lg:order-2")}>
                  <p className="font-display text-[21px] mb-2" style={{ color: t.accent }}>
                    {t.numeral}
                  </p>
                  <h3 className={"font-display text-[clamp(23px,2vw,32px)] leading-[1.1] tracking-[-0.005em] mb-1 " + (dark ? "text-[#f3ede0]" : "")}>
                    HoWA {t.name}
                  </h3>
                  <p className="smallcaps text-[12px] tracking-[0.16em] mb-3" style={{ color: t.accent }}>
                    {t.price}
                  </p>
                  <p className={"font-display text-[clamp(21px,1.8vw,28px)] leading-[1.15] mb-4 " + (dark ? "text-[#f3ede0]" : "text-[color:var(--color-ink)]")}>
                    {t.title}
                  </p>
                  <p className={"text-[17px] leading-[1.55] mb-5 max-w-[400px] " + (dark ? "text-[#f3ede0]/80" : "text-[color:var(--color-ink-soft)]")}>
                    {t.body}
                  </p>
                  {t.plus && (
                    <p className={"smallcaps text-[12px] tracking-[0.16em] mb-3 " + (dark ? "text-[#f3ede0]/55" : "text-[color:var(--color-ink-soft)]/65")}>
                      {t.plus}
                    </p>
                  )}
                  {t.groupLabel && (
                    <p className="smallcaps text-[12px] tracking-[0.18em] mb-2.5" style={{ color: t.accent }}>
                      {t.groupLabel}
                    </p>
                  )}
                  <ul className="space-y-2 mb-4">
                    {t.points.map((p) => (
                      <li key={p.t} className={"flex items-start gap-2.5 text-[16px] leading-[1.4] " + (dark ? "text-[#f3ede0]/85" : "text-[color:var(--color-ink-soft)]")}>
                        <span className="mt-1 shrink-0">
                          <CheckGlyph color={t.accent} />
                        </span>
                        <span className="flex-1">{p.t}</span>
                        {!t.horizon && p.coming && <ComingTag dark={dark} />}
                      </li>
                    ))}
                  </ul>
                  {t.fine && (
                    <p className={"text-[15px] leading-[1.45] mb-6 max-w-[390px] " + (dark ? "text-[#f3ede0]/45" : "text-[color:var(--color-ink-soft)]/55")}>
                      {t.fine}
                    </p>
                  )}
                  <Link
                    href="/howa/coming-soon"
                    className={"inline-flex items-center gap-2 rounded-md px-6 py-3 text-[16px] transition-colors " + (dark ? "bg-[#c5a960] text-[#27384c] hover:bg-[#d4ba78]" : "text-white")}
                    style={dark ? undefined : { background: t.accent }}
                  >
                    {dark ? "Apply for Steward" : `Explore ${t.name}`} <span aria-hidden>→</span>
                  </Link>
                </div>

                {/* Image + floating card + note */}
                <div className={"lg:col-span-7 relative " + (t.imageRight ? "lg:order-2" : "lg:order-1")}>
                  <div className="relative w-full aspect-[4/3]">
                    <Image src={t.image} alt={`HoWA ${t.name}, the dollhouse.`} fill sizes="(max-width:1024px) 92vw, 55vw" className="object-cover rounded-md" />
                    {/* floating UI card — sits over the empty colour field beside the
                        house, so nothing in the cutaway gets covered */}
                    <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 left-4 lg:left-6 w-[166px] rounded-md bg-[#faf7f0] border border-[color:var(--color-gold)]/35 shadow-[0_16px_38px_-16px_rgba(20,15,5,0.5)] px-4 py-4">
                      <p className="smallcaps text-[12px] tracking-[0.16em] text-[color:var(--color-gold-deep)] mb-2.5">{t.card.title}</p>
                      <ul className="space-y-2">
                        {t.card.items.map((it) => (
                          <li key={it} className="flex items-center gap-2 text-[15px] leading-[1.25] text-[color:var(--color-ink-soft)]">
                            <CheckGlyph color={t.accent} small /> {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* handwritten note — in flow below the image so nothing is covered */}
                  <p className={`${hand.className} mt-2 text-[20px] leading-[1.2] ` + (dark ? "text-[#c5a960] " : "text-[color:var(--color-ink-soft)]/80 ") + (t.imageRight ? "text-right" : "text-left")}>
                    {t.note}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ComingTag({ dark }: { dark?: boolean }) {
  return (
    <span className={"shrink-0 mt-0.5 smallcaps text-[12px] tracking-[0.14em] rounded-full px-2 py-0.5 " + (dark ? "border border-[#f3ede0]/25 text-[#f3ede0]/55" : "border border-[color:var(--color-ink)]/15 text-[color:var(--color-ink-soft)]/60")}>
      Coming
    </span>
  );
}

function CheckGlyph({ color, small }: { color: string; small?: boolean }) {
  const sz = small ? 11 : 14;
  return (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </svg>
  );
}
