import Image from "next/image";

/* STEP 06 — the public product ladder, corrected. Steward is £29.99/mo, NOT
   "by application". Price visible in every card. (Brief v2, slides 11 & 28.) */
type Tier = {
  name: string;
  price: string;
  tagline: string;
  points: string[];
  cta: string;
  tierSlug: string;
  accent: string;
  image: string;
  dark?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Assistant", price: "Free", tagline: "The house, seen.", tierSlug: "assistant", accent: "#5f6a49", cta: "Choose Assistant", image: "/home-v4/v6-tier-assistant-v2.webp",
    points: ["Instant address portrait", "Ask HoWA", "Repair, garden & room scans", "Quote and invoice understanding", "First saved home record"],
  },
  {
    name: "Housekeeper", price: "£16.99/mo", tagline: "The house, in order.", tierSlug: "housekeeper", accent: "#b56a5c", cta: "Start Housekeeper", image: "/home-v4/v6-tier-housekeeper-v2.webp",
    points: ["Full logbook", "Paperwork to reminders", "Cost memory", "Seasonal calendar", "Monthly Brief", "Household sharing"],
  },
  {
    name: "Steward", price: "£29.99/mo", tagline: "The house, protected before failure.", tierSlug: "steward", accent: "#c5a960", dark: true, cta: "Start Steward", image: "/home-v4/v6-tier-steward-v2.webp",
    points: ["HoWA Score drivers", "Risk register", "Proactive protection prompts", "Evidence packs", "Annual Home Report", "Transfer Pack foundations"],
  },
];

export function V4Tiers() {
  return (
    <section id="tiers" className="scroll-mt-20 bg-[#fbfaf5] py-16 lg:py-24">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
        <div className="mb-10 max-w-[680px]">
          <p className="smallcaps mb-3 text-[12px] tracking-[0.2em] text-[color:var(--color-gold-deep)]">Tiers</p>
          <h2 className="font-display text-[clamp(28px,3.2vw,46px)] leading-[1.08] tracking-[-0.01em]">
            One record. <span className="font-italic-display text-[#c5a960]">Three depths of care.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {TIERS.map((t) => {
            const dark = !!t.dark;
            return (
              <div
                key={t.name}
                id={`tier-${t.tierSlug}`}
                className={"scroll-mt-24 flex flex-col overflow-hidden rounded-2xl border " + (dark ? "border-[color:var(--color-gold)]/30 bg-[#1d2a40] text-[#f3ede0] shadow-[0_24px_60px_-30px_rgba(15,22,35,0.7)]" : "border-[color:var(--color-gold)]/25 bg-white shadow-[0_16px_40px_-28px_rgba(40,30,10,0.32)]")}
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image src={t.image} alt={`HoWA ${t.name}, the cutaway dollhouse.`} fill sizes="(max-width:768px) 92vw, 380px" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-7">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-[24px] leading-none" style={{ color: t.accent }}>{t.name}</h3>
                  <span className={"font-display text-[20px] " + (dark ? "text-[#f3ede0]" : "text-[color:var(--color-ink)]")}>{t.price}</span>
                </div>
                <p className={"mt-2 font-italic-display text-[18px] " + (dark ? "text-[#f3ede0]/85" : "text-[color:var(--color-ink-soft)]")}>{t.tagline}</p>
                <ul className="mt-5 mb-7 space-y-2.5">
                  {t.points.map((p) => (
                    <li key={p} className={"flex items-start gap-2.5 text-[15px] leading-[1.4] " + (dark ? "text-[#f3ede0]/85" : "text-[color:var(--color-ink-soft)]")}>
                      <span className="mt-0.5 shrink-0"><Tick color={dark ? "#c5a960" : t.accent} /></span>
                      <span className="flex-1">{p}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={t.tierSlug === "steward" ? "/howa/steward" : `/howa/coming-soon?tier=${t.tierSlug}`}
                  className={"mt-auto inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-[15.5px] transition-colors " + (dark ? "bg-[#c5a960] text-[#1d2a40] hover:bg-[#d4ba78]" : "text-white")}
                  style={dark ? undefined : { background: t.accent }}
                >
                  {t.cta} <span aria-hidden>→</span>
                </a>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-[14px] text-[color:var(--color-ink-soft)]/70">
          Larger homes and estates needing human coordination: see <a href="#managed" className="text-[color:var(--color-gold-deep)] underline underline-offset-2">Managed Stewardship</a>, below.
        </p>
      </div>
    </section>
  );
}

function Tick({ color }: { color: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden>
      <circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </svg>
  );
}
