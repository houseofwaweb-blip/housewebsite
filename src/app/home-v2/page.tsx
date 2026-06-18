import Image from "next/image";
import Link from "next/link";
import s from "./home-v2.module.css";
import { getPageSections, cms, cmsCards, pick } from "@/lib/cms/page-sections";

/**
 * /home-v2 — House-led homepage variant for approval preview.
 *
 * Keeps the live homepage aesthetic (dollhouse, app card, tier cards,
 * phone trio, intelligence band, pillars, powered-by) but layers in
 * House-brand sections so the page reads as a House page that
 * features HoWA — not a HoWA product page wearing a House logo.
 *
 * Added sections (vs live homepage):
 *   - House Institution band (after stats) — philosophy + 5-discipline nav
 *   - Introducing HoWA band (before tiers) — frames HoWA as flagship product
 *   - "What the House also holds" band (after intelligence) —
 *     Steward Plans + House Approved Insurance + Design Collective
 *
 * Noindex'd until approved. Once approved, swap into src/app/page.tsx.
 */

export const metadata = {
  title: "Homepage — preview · House of Willow Alexander",
  description: "House-led homepage variant. Preview for approval.",
  robots: { index: false, follow: false },
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
    label: "The Hearth",
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

export default async function HomeV2PreviewPage() {
  // Separate Sanity key so previewing this variant doesn't fight with the
  // live homepage's published pageSection docs.
  const sections = await getPageSections("home-v2");
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
            <span className={s.houseBadge}>
              <span aria-hidden="true">✦</span>
              {cms(hero, "eyebrow", "House of Willow Alexander")}
            </span>
            <h1 className={s.heroTitle}>
              {cms(hero, "headline", "Beautiful living,")}<br />
              <em>{cms(hero, "headlineEm", "intelligently stewarded.", "headline")}</em>
            </h1>
            <p className={s.heroSub}>
              {cms(hero, "subheadline", "A modern British institution for homes you mean to keep.")}
            </p>
            <p className={s.heroLede}>
              {cms(
                hero,
                "body",
                "The House holds the standard. HoWA — our flagship product — keeps the record. Design, care, protection, and the things worth keeping, all connected.",
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
          <Image
            src="/brand/howa/howa-black.svg"
            alt="HoWA"
            width={204}
            height={102}
            className={s.statsHowaMark}
            style={{ width: "auto", height: "44px", marginBottom: "18px" }}
          />
          <p className={s.statsLedeLine1}>
            {cms(stats, "headline", "It remembers. It signals. It cares.")}
          </p>
          <p className={s.statsLedeLine2}>
            {cms(stats, "subheadline", "Stewardship starts with listening.")}
          </p>
          <Link href="/howa" className={s.statsCta}>
            {cms(stats, "ctaLabel", "Find out more about HoWA")}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        {stripStats.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* ============================================================
          3a. The Institution — copy LEFT, four pillar cards RIGHT
          ============================================================ */}
      <section className={s.institution}>
        <div className={s.institutionCopy}>
          <span className={s.institutionEy}>The House</span>
          <blockquote className={s.institutionQuote}>
            Ownership is passive. <em>Stewardship is intentional.</em>
          </blockquote>
          <p className={s.institutionBody}>
            House of Willow Alexander is a modern British institution for the
            stewardship of homes. We design, we care, we protect, and we hold
            the standard. Every service through a House-Approved studio,
            every decision filed to a record that belongs to the home.
          </p>
          <div className={s.institutionNav}>
            <Link href="/services">Care</Link>
            <Link href="/protect">Protect</Link>
            <Link href="/design">Design</Link>
            <Link href="/howa/steward">Steward Plans</Link>
            <Link href="/shop">Shop</Link>
          </div>
        </div>
        <div className={s.institutionPillars}>
          {pillarCards.map((p) => (
            <Link key={p.label} href={p.href} className={s.institutionPillar}>
              <div className={s.institutionPillarImage}>
                <Image
                  src={p.image}
                  alt={p.title}
                  width={780}
                  height={975}
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className={s.institutionPillarBody}>
                <p className={s.institutionPillarLabel}>{p.label}</p>
                <h3 className={s.institutionPillarTitle}>{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================================
          4. Introducing HoWA + Three ways in — merged section
          ============================================================ */}
      <section className={s.tiers} id="introducing-howa">
        <header className={s.tiersHead}>
          <p className={s.tiersEy}>Introducing Housekeeper · The flagship product</p>
          <h2 className={s.tiersTitle}>
            {cms(tiers, "headline", "The Living Record")} <em>of your home.</em>
          </h2>
          <p className={s.tiersIntroBody}>
            The House has always done the work — the gardener, the cleaner,
            the designer, the surveyor. HoWA is what holds it all together.
            One product, three ways in.
          </p>
          <p className={s.tiersIntroSignature}>
            £16.99 / month · cancel anytime · coming soon
          </p>
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
          5. Intelligence band — reframed heading
          (OneSystem phone trio cut — app-store placeholders read
          premature pre-launch, and the page already sells HoWA via
          the tiers section above and the intelligence stats below.)
          ============================================================ */}
      <section className={s.intelligence}>
        <div className={s.intelligenceCopy}>
          <header className={s.intelligenceHead}>
            <p className={s.intelligenceEy}>
              {cms(intelligence, "eyebrow", "What the House remembers")}
            </p>
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
          5b. What the House also holds — Steward + Insurance + Design [NEW]
          ============================================================ */}
      <section className={s.alsoHolds}>
        <header className={s.alsoHoldsHead}>
          <p className={s.alsoHoldsEy}>Beyond HoWA</p>
          <h2 className={s.alsoHoldsTitle}>
            What the House also <em>holds.</em>
          </h2>
        </header>
        <div className={s.alsoHoldsGrid}>
          <Link href="/howa/steward" className={`${s.alsoHoldsCard} ${s.alsoHoldsSteward}`}>
            <p className={s.alsoHoldsCardEy}>Steward Plans · Built with you</p>
            <h3 className={s.alsoHoldsCardTitle}>
              Care, on a <em>rhythm.</em>
            </h3>
            <p className={s.alsoHoldsCardBody}>
              Recurring managed care. Gardening, cleaning, windows, gutters
              bundled into a single calendar. One named team, one invoice,
              every visit filed to your HoWA record.
            </p>
            <span className={s.alsoHoldsCardLink}>See Steward →</span>
          </Link>
          <Link href="/protect/insurance" className={s.alsoHoldsCard}>
            <p className={s.alsoHoldsCardEy}>Protect · register interest</p>
            <h3 className={s.alsoHoldsCardTitle}>
              House Approved <em>Insurance.</em>
            </h3>
            <p className={s.alsoHoldsCardBody}>
              Cover that understands period homes, valuable contents, and
              what a standard policy quietly excludes. Introduced by the
              House, underwritten by Provenance (FCA-regulated).
            </p>
            <span className={s.alsoHoldsCardLink}>Register interest →</span>
          </Link>
          <Link href="/design/studios" className={s.alsoHoldsCard}>
            <p className={s.alsoHoldsCardEy}>Design · live now</p>
            <h3 className={s.alsoHoldsCardTitle}>
              The Design <em>Collective.</em>
            </h3>
            <p className={s.alsoHoldsCardBody}>
              Four launch studios: Willow Alexander Gardens, Jessica
              Durling-McMahon, Delve Interiors, House AI. Every project
              carries the House Approved seal.
            </p>
            <span className={s.alsoHoldsCardLink}>Meet the studios →</span>
          </Link>
        </div>
      </section>

      {/* ============================================================
          6. Closing band — trust lines merged in from old Powered-by
          ============================================================ */}
      <section className={s.closing}>
        <div className={s.closingTrust}>
          <p className={s.closingTrustEy}>
            {cms(pillars, "eyebrow", "Powered by House of Willow Alexander")}
          </p>
          <div className={s.closingTrustLines}>
            {PILLAR_LINES.map((line) => {
              const Icon = line.icon;
              return (
                <div key={line.text} className={s.closingTrustLine}>
                  <span className={s.closingTrustIcon}>
                    <Icon />
                  </span>
                  <span className={s.closingTrustText}>{line.text}</span>
                </div>
              );
            })}
          </div>
        </div>
        <p className={s.closingStatement}>
          {cms(closing, "headline", "For homes with soul, proper care should never be left to")}{" "}
          <em>{cms(closing, "headlineEm", "memory alone.", "headline")}</em>
        </p>
        <div className={s.closingCtas}>
          <Link href={cms(closing, "ctaHref", "/howa")} className={s.closingBtnFilled}>
            {cms(closing, "ctaLabel", "Coming soon")}
          </Link>
          <Link href={cms(closing, "cta2Href", "#open-booking-form")} className={s.closingBtnGhost}>
            {cms(closing, "cta2Label", "Book a House Service")}
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
