import Image from "next/image";
import Link from "next/link";
import s from "./home-v4a.module.css";
import { OneSystem } from "./OneSystem";
import { getPageSections, cms, cmsCards, pick } from "@/lib/cms/page-sections";

/**
 * Homepage — high-fidelity build of the locked design.
 *
 * Section order:
 *   1. Hero — split layout, cream copy + Georgian house
 *   2. Stats strip
 *   3. Three ways to access it — three tier cards
 *   4. One system. In your hands. — phone trio + app store buttons
 *   5. Intelligence that makes a real difference — dark olive band
 *   6. Four pillar cards
 *   7. Closing band — dark brown statement + CTAs
 */

export const metadata = {
  title: "House of Willow Alexander — The Home Operating System",
  description:
    "Home stewardship powered by HoWA. The Living Record, intelligent care, and the House standards behind every service.",
};

const TIERS = [
  {
    slug: "assistant",
    numeral: "I.",
    label: "HoWA Assistant",
    name: "The house, alive.",
    features: [
      "Notices what matters",
      "Tracks changes in real time",
      "Surfaces subtle signals",
    ],
    href: "/howa#assistant",
  },
  {
    slug: "housekeeper",
    numeral: "II.",
    label: "HoWA Housekeeper",
    name: "The house, in order.",
    features: [
      "Tasks orchestrated",
      "Services aligned",
      "Nothing slips",
    ],
    href: "/howa#housekeeper",
  },
  {
    slug: "steward",
    numeral: "III.",
    label: "HoWA Steward",
    name: "The house, understood.",
    features: [
      "Predicts risk",
      "Optimises systems",
      "Protects long-term value",
    ],
    href: "/howa/steward",
  },
];

const INTELLIGENCE_STATS = [
  { title: "Boiler failure predicted", highlight: "14", subAfter: " days early" },
  { title: "Service booked", subAfter: "automatically" },
  { title: "Cost reduced", highlight: "by 42%" },
  { title: "No disruption", subAfter: "to your home" },
];

const PILLARS = [
  {
    label: "Design & Care",
    title: "Expert care for every aspect of home",
    // design-portrait.webp is portrait 1023×1537 — matches the 2:3 frame
    // of pillars 2/3/4. The old pillar-1.webp was landscape 1168×784 and
    // didn't fill the tile the way the others did.
    image: "/home-v4/design-portrait.webp",
    href: "/design",
  },
  {
    label: "Marketplace",
    title: "Curated essentials for home and hearth",
    image: "/home-v4/pillar-2.webp",
    href: "/shop",
  },
  {
    label: "Journal",
    title: "Stories, guidance, and timeless inspiration",
    image: "/home-v4/pillar-3.webp",
    href: "/the-hearth",
  },
  {
    label: "The House",
    title: "The standard we hold ourselves to.",
    image: "/home-v4/pillar-4.webp",
    href: "/the-house",
  },
];

const PILLAR_LINES = [
  { icon: HomeIcon, text: "House-vetted partners only — every studio carries the seal." },
  { icon: ShieldIcon, text: "Held in your record — every decision and document, kept." },
  { icon: LeafIcon, text: "Carbon-neutral by default — sustainability tracked, not claimed." },
  { icon: AwardIcon, text: "House Approved — the standard, openly published." },
];

const STRIP_STATS = [
  { value: "91%", label: "House Health Optimal" },
  { value: "12", label: "Tasks Completed This Week" },
  { value: "08", label: "Systems Monitored" },
  { value: "0", label: "Issues Detected" },
];

export default async function HomeV4aPreviewPage() {
  const sections = await getPageSections("homepage");
  const hero = sections.get("hero");
  const stats = sections.get("stats");
  const tiers = sections.get("tiers");
  const intelligence = sections.get("intelligence");
  const pillars = sections.get("pillars");
  const closing = sections.get("closing");

  const tierCards = cmsCards(tiers, TIERS, (c, base) => ({
    slug: base?.slug ?? "",
    numeral: pick(c.label, base?.numeral ?? ""),
    label: pick(c.value, base?.label ?? ""),
    name: pick(c.title, base?.name ?? ""),
    features: base?.features ?? [],
    href: pick(c.ctaHref, base?.href ?? "#"),
  }));
  const stripStats = cmsCards(stats, STRIP_STATS, (c, base) => ({
    value: pick(c.value ?? c.label, base?.value ?? ""),
    label: pick(c.title ?? c.body, base?.label ?? ""),
  }));
  const intelligenceStats = cmsCards(intelligence, INTELLIGENCE_STATS, (c, base) => ({
    title: pick(c.title, base?.title ?? ""),
    highlight: pick(c.value, base?.highlight),
    subAfter: pick(c.body ?? c.value2, base?.subAfter ?? ""),
  }));
  const pillarCards = cmsCards(pillars, PILLARS, (c, base) => ({
    label: pick(c.label, base?.label ?? ""),
    title: pick(c.title, base?.title ?? ""),
    image: base?.image ?? "",
    href: pick(c.ctaHref, base?.href ?? "#"),
  }));

  return (
    <div className={s.page}>
      {/* ============================================================
          1. Hero
          ============================================================ */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>{cms(hero, "eyebrow", "The Home Operating System")}</p>
            <h1 className={s.heroTitle}>
              {cms(hero, "headline", "The Home")}<br />
              <em>{cms(hero, "headlineEm", "Operating System", "headline")}</em>
            </h1>
            <p className={s.heroSub}>
              {cms(hero, "subheadline", "Your home, finally understood.")}
            </p>
            <p className={s.heroLede}>
              {cms(
                hero,
                "body",
                "HoWA observes, learns, and acts — so nothing is missed, delayed, or forgotten.",
              )}
            </p>
            <div className={s.heroCtas}>
              <Link href={cms(hero, "ctaHref", "/howa")} className={s.btnFilled}>
                {cms(hero, "ctaLabel", "Coming soon")}
              </Link>
              <Link href={cms(hero, "cta2Href", "/howa/how-it-works")} className={s.btnGhost}>
                {cms(hero, "cta2Label", "See how it works")}
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </Link>
            </div>
          </div>
        </div>

        <div className={s.heroVisual}>
          <div className={s.heroVisualFrame}>
            <Image
              src="/home-v4/hero-georgian-london.webp"
              alt="A refined sage-green Georgian London townhouse with a classical portico entrance, urn planters and a hedge-lined front garden"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              style={{ objectFit: "cover" }}
            />
            <aside className={s.heroSideCard} aria-label="HoWA app preview">
              <div className={s.appBrand}>
                <Image
                  src="/brand/howa/howa-black.svg"
                  alt="HoWA"
                  width={204}
                  height={102}
                  className={s.appBrandLogo}
                />
              </div>
              <header className={s.appHeader}>
                <span className={s.appHeaderLeft}>
                  <span className={s.appDot} aria-hidden="true" />
                  <span className={s.appHeaderTitle}>Today, in your home</span>
                </span>
                <span className={s.appHeaderDate}>Thu · 09:00</span>
              </header>

              <div className={s.appHero}>
                <p className={s.appHeroLabel}>House Health</p>
                <div className={s.appHeroRow}>
                  <PieScore value={91} />
                  <p className={s.appHeroScore}>
                    91<span className={s.appHeroScoreUnit}>/100</span>
                  </p>
                </div>
                <p className={s.appHeroSub}>All systems in good order</p>
              </div>

              <ul className={s.appList}>
                <li className={s.appRow}>
                  <span className={`${s.appStatus} ${s.appStatusOk}`} aria-hidden="true" />
                  <span className={s.appRowLabel}>Roof</span>
                  <span className={s.appRowValue}>Good order</span>
                </li>
                <li className={s.appRow}>
                  <span className={`${s.appStatus} ${s.appStatusAttn}`} aria-hidden="true" />
                  <span className={s.appRowLabel}>Boiler</span>
                  <span className={s.appRowValue}>14 days</span>
                </li>
                <li className={s.appRow}>
                  <span className={`${s.appStatus} ${s.appStatusOk}`} aria-hidden="true" />
                  <span className={s.appRowLabel}>Garden</span>
                  <span className={s.appRowValue}>Thursday</span>
                </li>
                <li className={s.appRow}>
                  <span className={`${s.appStatus} ${s.appStatusOk}`} aria-hidden="true" />
                  <span className={s.appRowLabel}>Cleaning</span>
                  <span className={s.appRowValue}>Tomorrow</span>
                </li>
                <li className={s.appRow}>
                  <span className={`${s.appStatus} ${s.appStatusOk}`} aria-hidden="true" />
                  <span className={s.appRowLabel}>Insurance</span>
                  <span className={s.appRowValue}>42 days</span>
                </li>
              </ul>

              <footer className={s.appFooter}>
                <Link href="/howa/coming-soon" className={s.appFooterCta}>
                  Coming soon →
                </Link>
              </footer>
            </aside>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. Stats strip
          ============================================================ */}
      <section className={s.statsStrip}>
        <div className={s.statsPlantWrap} aria-hidden="true">
          <Image
            src="/home-v4/homepage-plant.webp"
            alt=""
            width={1000}
            height={1200}
            className={s.statsPlant}
          />
        </div>
        <div className={s.statsLede}>
          <p className={s.statsLedeLine1}>
            {cms(stats, "headline", "It remembers. It signals. It cares.")}
          </p>
          <p className={s.statsLedeLine2}>
            {cms(stats, "subheadline", "Stewardship starts with listening.")}
          </p>
        </div>
        {stripStats.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* ============================================================
          3. Three ways to access it
          ============================================================ */}
      <section className={s.tiers}>
        <header className={s.tiersHead}>
          <h2 className={s.tiersTitle}>{cms(tiers, "headline", "Three ways to access it.")}</h2>
        </header>
        <div className={s.tierGrid}>
          {tierCards.map((tier) => (
            <Link
              key={tier.slug}
              href={tier.href}
              className={`${s.tierCard} ${s[tier.slug]}`}
            >
              <div className={s.tierBg} aria-hidden="true" />
              <div className={s.tierOverlay}>
                <header className={s.tierTop}>
                  <p className={s.tierMeta}>
                    {tier.numeral} {tier.label}
                  </p>
                  <h3 className={s.tierTagline}>{tier.name}</h3>
                </header>
                <footer className={s.tierFoot}>
                  <ul className={s.tierFeatures}>
                    {tier.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <span className={s.tierLearn}>Learn more →</span>
                </footer>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================================
          4. One system. In your hands.
          ============================================================ */}
      <OneSystem />

      {/* ============================================================
          5. Intelligence that makes a real difference — dark band
          ============================================================ */}
      <section className={s.intelligence}>
        <div className={s.intelligenceCopy}>
          <header className={s.intelligenceHead}>
            <span className={s.intelligenceIcon} aria-hidden="true">
              <CalendarIcon />
            </span>
            <h2 className={s.intelligenceTitle}>
              {cms(intelligence, "headline", "Intelligence that")}<br />
              <em>{cms(intelligence, "headlineEm", "makes a real difference.", "headline")}</em>
            </h2>
          </header>
          <div className={s.intelligenceStats}>
            {intelligenceStats.map((stat, i) => (
              <div key={stat.title} className={s.iStat}>
                <p className={s.iStatTitle}>{stat.title}</p>
                <p className={s.iStatSub}>
                  {stat.highlight ? (
                    <span className={s.iStatHighlight}>{stat.highlight}</span>
                  ) : null}
                  {stat.subAfter}
                </p>
                {i < intelligenceStats.length - 1 ? (
                  <span aria-hidden="true" className={s.iStatArrow}>→</span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div className={s.intelligenceImage}>
          <Image
            src={cms(intelligence, "imageUrl", "/home-v4/pillar-1.webp")}
            alt={cms(intelligence, "imageAlt", "A warm parlour interior, marble fireplace and flowers")}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      {/* ============================================================
          6. Four pillar cards
          ============================================================ */}
      <section className={s.pillars}>
        <div className={s.pillarsGrid}>
          {pillarCards.map((p) => (
            <Link key={p.label} href={p.href} className={s.pillarCard}>
              <div className={s.pillarImage}>
                <Image
                  src={p.image}
                  alt={p.title}
                  width={780}
                  height={975}
                  sizes="(min-width: 1024px) 24vw, 90vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className={s.pillarBody}>
                <p className={s.pillarLabel}>{p.label}</p>
                <h3 className={s.pillarTitle}>{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>

        <div className={s.poweredBy}>
          <p className={s.poweredByEy}>{cms(pillars, "eyebrow", "Every service. Every standard.")}</p>
          <h2 className={s.poweredByTitle}>
            {cms(pillars, "headline", "Powered by House of Willow Alexander.")}
          </h2>
          <div className={s.pillarsBelow}>
            {PILLAR_LINES.map((line) => {
              const Icon = line.icon;
              return (
                <div key={line.text} className={s.pillarLine}>
                  <span className={s.pillarLineIcon}>
                    <Icon />
                  </span>
                  <span className={s.pillarLineText}>{line.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          7. Closing band
          ============================================================ */}
      <section className={s.closing}>
        <p className={s.closingStatement}>
          {cms(closing, "headline", "For homes with soul, proper care should never be left to")}{" "}
          <em>{cms(closing, "headlineEm", "memory alone.", "headline")}</em>
        </p>
        <div className={s.closingCtas}>
          <Link href={cms(closing, "ctaHref", "/howa")} className={s.closingBtnFilled}>
            {cms(closing, "ctaLabel", "Coming soon")}
          </Link>
          <Link href={cms(closing, "cta2Href", "#open-booking-form")} className={s.closingBtnGhost}>
            {cms(closing, "cta2Label", "Book with HoWA")}
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ----------------------------------------------------------------
   Inline SVG icons — no extra deps. Sized via parent class.
---------------------------------------------------------------- */

function PieScore({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <svg viewBox="0 0 36 36" width="64" height="64" aria-hidden="true" className="shrink-0">
      <circle
        cx="18"
        cy="18"
        r="15.5"
        fill="none"
        stroke="rgba(48,35,28,0.12)"
        strokeWidth="3.5"
      />
      <circle
        cx="18"
        cy="18"
        r="15.5"
        fill="none"
        stroke="var(--color-house-gold-dark)"
        strokeWidth="3.5"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray={`${pct} 100`}
        transform="rotate(-90 18 18)"
      />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="6" width="24" height="22" rx="1" />
      <path d="M4 12 L28 12" />
      <path d="M10 3 L10 9" />
      <path d="M22 3 L22 9" />
      <circle cx="11" cy="18" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="16" cy="18" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="21" cy="18" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="11" cy="23" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="16" cy="23" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
      <path d="M3 11 L12 4 L21 11 V20 a1 1 0 0 1 -1 1 H4 a1 1 0 0 1 -1 -1 Z" />
      <path d="M9 21 V13 H15 V21" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
      <path d="M12 3 L20 6 V12 C20 16, 16 20, 12 22 C8 20, 4 16, 4 12 V6 Z" />
      <path d="M9 12 L11 14 L15 10" />
    </svg>
  );
}
function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
      <path d="M5 21 C 5 12, 12 5, 21 5 C 21 14, 14 21, 5 21 Z" />
      <path d="M5 21 L 14 12" />
    </svg>
  );
}
function AwardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
      <circle cx="12" cy="9" r="6" />
      <path d="M9 14 L7 22 L12 19 L17 22 L15 14" />
    </svg>
  );
}
