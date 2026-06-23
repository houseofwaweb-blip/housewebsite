import Image from "next/image";
import Link from "next/link";
import s from "./howa-plus-v1.module.css";
import { FaqList } from "@/components/marketing/FaqList";
import { MetaViewContent } from "@/components/marketing/MetaViewContent";
import { getPageSections, cms, cmsCards, pick } from "@/lib/cms/page-sections";

/**
 * /howa/housekeeper, Housekeeper membership page.
 * (Formerly /howa/plus; the "HoWA+" name was retired 2026-06-18. CMS key stays "howa-plus".)
 *
 * Section order:
 *   1. Hero, pink Georgian + blueprint, copy left, image right
 *   2. Stats strip
 *   3. Benefits grid, 6 included with Housekeeper
 *   4. Comparison row, Free vs Housekeeper
 *   5. Intelligence band, what your membership pays for
 *   6. FAQ
 *   7. Closing, Become a member
 */

export const metadata = {
  title: { absolute: "Housekeeper by HoWA | Home logbook and maintenance calendar" },
  description:
    "The connected membership for a home you mean to keep. £16.99 / month. Living Record, full Assistant, member pricing. Cancel anytime.",
};

const STAT_COLS = [
  { value: "£16.99", label: "per month" },
  { value: "10%", label: "off every House Service" },
  { value: "∞", label: "Living Record entries" },
  { value: "0", label: "minimum term" },
];

const BENEFITS = [
  {
    icon: PercentIcon,
    image: "/home-v4/plus-benefit-1.webp",
    title: "10% off every House Service",
    body: "Gardening, cleaning, windows, gutters, design packages, product bundles. Auto-applied at checkout, no codes, no fuss.",
  },
  {
    icon: ClipboardIcon,
    image: "/home-v4/plus-benefit-2.webp",
    title: "Living Record & Task Centre",
    body: "Every service, invoice, certificate and photograph filed to a record that grows with the home. Seasonal prompts surface what matters before it bites.",
    cta: { label: "How it works", href: "/howa/how-it-works" },
  },
  {
    icon: ScanIcon,
    image: "/home-v4/plus-benefit-3.webp",
    title: "Full Assistant Diagnostic",
    body: "Repair scan, instant quote, design moodboards. Capture home type, rooms, priorities, style, budget, saved straight to your record.",
    cta: { label: "See the Assistant", href: "/howa/assistant" },
  },
  {
    icon: BookIcon,
    image: "/home-v4/plus-benefit-4.webp",
    title: "Home Logbook & Documents",
    body: "Paint colours, appliance details, contractor notes, the home logbook every trade can reference. Saved guides and reminders you can action or defer.",
  },
  {
    icon: HearthIcon,
    image: "/home-v4/plus-benefit-5.webp",
    title: "Priority Booking & The Hearth",
    body: "Priority across all House services and approved partners. Full editorial access to The Hearth, long-form writing on homes, gardens, and the craft of looking after a place.",
    cta: { label: "Browse the Hearth", href: "/the-hearth" },
  },
  {
    icon: LeafIcon,
    image: "/home-v4/plus-benefit-6.webp",
    title: "Carbon Fund & Early Access",
    body: "A personal carbon offset fund tracked against your household. Early access to new HoWA features, House events and drops, and Protection Review introductions.",
  },
];

const COMPARE = [
  { feature: "Living Record entries", free: "Limited", plus: "Unlimited" },
  { feature: "Service discount", free: "—", plus: "10% on everything" },
  { feature: "Assistant diagnostic", free: "Lite", plus: "Full" },
  { feature: "Task centre & reminders", free: "—", plus: "Yes" },
  { feature: "Priority booking", free: "—", plus: "Yes" },
  { feature: "The Hearth magazine", free: "Excerpts", plus: "Full access" },
  { feature: "Carbon offset fund", free: "—", plus: "Tracked" },
  { feature: "Cancel anytime", free: "—", plus: "Yes" },
];

const INTELLIGENCE_STATS = [
  { title: "First-year savings", highlight: "£840", subAfter: " typical" },
  { title: "Issues caught", subAfter: "before they cost you" },
  { title: "Record at handover", highlight: "+£18,000", subAfter: " sale uplift" },
  { title: "No long-term", subAfter: "commitment" },
];

const FAQS = [
  {
    q: "Can I cancel anytime?",
    a: "Yes. There's no minimum term. Cancel from your account and your record stays accessible in read-only mode for 12 months.",
  },
  {
    q: "Does Housekeeper replace my insurance?",
    a: "No. Housekeeper is a stewardship membership, not insurance. It does pair beautifully with a Provenance home protection review, we can introduce you.",
  },
  {
    q: "What if my home doesn't fit a category?",
    a: "We've built HoWA to flex. Leasehold flats, listed cottages, mews houses, all welcome. Your concierge tailors the standard to your property.",
  },
  {
    q: "Where does my data live?",
    a: "In the UK, encrypted at rest, owned by you. We don't sell, share, or train models on your home record.",
  },
  {
    q: "Do I have to use the booked services?",
    a: "Never. HoWA surfaces what needs doing and recommends trusted partners, but you stay in control of who comes to your home.",
  },
  {
    q: "What happens if I move?",
    a: "Your record moves with you. You can also hand it to the new owner as part of the sale, adding £18,000 of average value in our pilot.",
  },
];

export default async function HowaPlusV1PreviewPage() {
  const sections = await getPageSections("howa-plus");
  const hero = sections.get("hero");
  const stats = sections.get("stats");
  const benefits = sections.get("benefits");
  const compare = sections.get("compare");
  const intelligence = sections.get("intelligence");
  const faq = sections.get("faq");
  const closing = sections.get("closing");

  const statCols = cmsCards(stats, STAT_COLS, (c, base) => ({
    value: pick(c.value ?? c.label, base?.value ?? ""),
    label: pick(c.title ?? c.body, base?.label ?? ""),
  }));
  const benefitCards = cmsCards(benefits, BENEFITS, (c, base) => ({
    icon: base?.icon ?? PercentIcon,
    image: base?.image ?? "/home-v4/plus-benefit-1.webp",
    title: pick(c.title, base?.title ?? ""),
    body: pick(c.body, base?.body ?? ""),
    cta:
      c.ctaLabel && c.ctaHref
        ? { label: c.ctaLabel, href: c.ctaHref }
        : base?.cta,
  }));
  const compareRows = cmsCards(compare, COMPARE, (c, base) => ({
    feature: pick(c.title, base?.feature ?? ""),
    free: pick(c.value, base?.free ?? ""),
    plus: pick(c.value2, base?.plus ?? ""),
  }));
  const intelligenceStats = cmsCards(intelligence, INTELLIGENCE_STATS, (c, base) => ({
    title: pick(c.title, base?.title ?? ""),
    highlight: pick(c.value, base?.highlight),
    subAfter: pick(c.body ?? c.value2, base?.subAfter ?? ""),
  }));
  const faqItems = cmsCards(faq, FAQS, (c, base) => ({
    q: pick(c.title, base?.q ?? ""),
    a: pick(c.body, base?.a ?? ""),
  }));

  return (
    <div className={s.page}>
      <MetaViewContent
        contentId="howa_plus"
        contentName="Housekeeper membership"
        contentCategory="howa_membership"
        value={16.99}
      />
      {/* 1. Hero */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>{cms(hero, "eyebrow", "Housekeeper by HoWA · £16.99 / month")}</p>
            <h1 className={s.heroTitle}>
              {cms(hero, "headline", "The connected membership")}<br />
              <em>{cms(hero, "headlineEm", "for a home you mean to keep.", "headline")}</em>
            </h1>
            <p className={s.heroLede}>
              {cms(
                hero,
                "body",
                "The Living Record, full Assistant, member pricing, and a place that grows with the home. Cancel anytime.",
              )}
            </p>
            <div className={s.heroCtas}>
              <Link href={cms(hero, "ctaHref", "/howa/coming-soon?tier=housekeeper")} className={s.btnFilled}>
                {cms(hero, "ctaLabel", "Join the waitlist")}
              </Link>
              <Link href={cms(hero, "cta2Href", "/howa/how-it-works")} className={s.btnGhost}>
                {cms(hero, "cta2Label", "See how it works")}
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={s.heroVisual}>
          {/* Floating UI card over the empty terracotta wall, askhowa style */}
          <div className="hidden lg:block absolute left-[8%] top-[14%] z-10 w-[232px] bg-[#faf7f0] border border-[color:var(--color-gold)]/35 shadow-[0_22px_50px_-18px_rgba(40,25,15,0.55)] px-5 py-4">
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[color:var(--color-gold-deep)] mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b56a5c]" aria-hidden /> In the membership
            </p>
            <ul className="space-y-2.5">
              {["Full logbook", "Maintenance & garden calendar", "Renewal & warranty reminders"].map((f) => (
                <li key={f} className="flex items-start gap-2.5 font-sans text-[13.5px] leading-[1.35] text-[color:var(--color-ink)]/85">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b56a5c" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="mt-px shrink-0" aria-hidden>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8.5 12.5l2.5 2.5 4.5-5" />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.heroVisualFrame}>
            <Image
              src={cms(hero, "imageUrl", "/home-v4/plus-hero.webp")}
              alt={cms(
                hero,
                "imageAlt",
                "The HoWA Housekeeper dollhouse, a terracotta-toned cutaway Georgian home on a single-colour ground.",
              )}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              priority
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </div>
      </section>

      {/* 2. Stats strip */}
      <section className={s.statsStrip}>
        <div className={s.statsLede}>
          <p className={s.statsLedeLine1}>{cms(stats, "headline", "One membership.")}</p>
          <p className={s.statsLedeLine2}>
            {cms(stats, "subheadline", "The whole house, looked after.")}
          </p>
        </div>
        {statCols.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3. Benefits grid, 3×2 editorial */}
      <section className={s.benefits}>
        <header className={s.benefitsHead}>
          <p className={s.benefitsEy}>{cms(benefits, "eyebrow", "What's included.")}</p>
          <h2 className={s.benefitsTitle}>
            {cms(benefits, "headline", "Everything that turns a house")}{" "}
            <em>{cms(benefits, "headlineEm", "into a home you trust.", "headline")}</em>
          </h2>
        </header>
        <div className={s.benefitsGrid}>
          {benefitCards.map((b) => {
            const Icon = b.icon;
            return (
              <article key={b.title} className={s.benefitCard}>
                <div className={s.benefitImage}>
                  <Image
                    src={b.image}
                    alt=""
                    width={1200}
                    height={900}
                    sizes="(min-width: 1024px) 33vw, 90vw"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  <span className={s.benefitIcon} aria-hidden="true">
                    <Icon />
                  </span>
                </div>
                <div className={s.benefitBody}>
                  <h3 className={s.benefitTitle}>{b.title}</h3>
                  <p className={s.benefitText}>{b.body}</p>
                  {b.cta ? (
                    <Link href={b.cta.href} className={s.benefitCta}>
                      {b.cta.label} →
                    </Link>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 4. Comparison, Free vs Housekeeper */}
      <section className={s.compareSection}>
        <header className={s.compareHead}>
          <h2 className={s.compareTitle}>
            {cms(compare, "headline", "Free, or")} <em>{cms(compare, "headlineEm", "Housekeeper", "headline")}</em>.
          </h2>
        </header>
        <div className={s.compareTable}>
          <div className={s.compareRowHeader}>
            <span />
            <span className={s.compareColLabel}>Free</span>
            <span className={`${s.compareColLabel} ${s.compareColLabelPlus}`}>Housekeeper</span>
          </div>
          {compareRows.map((row) => (
            <div key={row.feature} className={s.compareRow}>
              <span className={s.compareRowFeature}>{row.feature}</span>
              <span className={s.compareRowFree}>{row.free}</span>
              <span className={s.compareRowPlus}>{row.plus}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Intelligence band */}
      <section className={s.intelligence}>
        <div className={s.intelligenceCopy}>
          <header className={s.intelligenceHead}>
            <span className={s.intelligenceIcon} aria-hidden="true">
              <CalendarIcon />
            </span>
            <h2 className={s.intelligenceTitle}>
              {cms(intelligence, "headline", "What a membership pays for,")}{" "}
              <em>{cms(intelligence, "headlineEm", "per year.", "headline")}</em>
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
            src={cms(intelligence, "imageUrl", "/home-v4/plus-intelligence.webp")}
            alt={cms(
              intelligence,
              "imageAlt",
              "A warm dusk-lit London townhouse interior, what intelligent stewardship protects",
            )}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      {/* 7. FAQ */}
      <section className={s.faqSection}>
        <div className={s.faqCopy}>
          <header className={s.faqHead}>
            <p className={s.faqEy}>{cms(faq, "eyebrow", "Before you join.")}</p>
            <h2 className={s.faqTitle}>{cms(faq, "headline", "Questions, answered.")}</h2>
          </header>
          <FaqList items={faqItems} />
        </div>
        <div className={s.faqVisual}>
          <div className={s.faqVisualFrame}>
            <Image
              src={cms(faq, "imageUrl", "/home-v4/howa-lander-faq-v2.webp")}
              alt={cms(faq, "imageAlt", "")}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              style={{ objectFit: "contain", objectPosition: "right center" }}
            />
          </div>
        </div>
      </section>

      {/* 8. Closing band */}
      <section className={s.closing}>
        <p className={s.closingKicker}>
          {cms(closing, "eyebrow", "Housekeeper · £16.99 / month · Cancel anytime.")}
        </p>
        <p className={s.closingStatement}>
          <em>{cms(closing, "headlineEm", "A home you mean to keep.", "headline")}</em>
        </p>
        <div className={s.closingCtas}>
          <Link href={cms(closing, "ctaHref", "/api/howa-bounce")} className={s.closingBtnFilled}>
            {cms(closing, "ctaLabel", "Join the waitlist")}
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ----------------------------------------------------------------
   Inline SVG icons
---------------------------------------------------------------- */
function PercentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  );
}
function ClipboardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
      <rect x="6" y="4" width="12" height="18" rx="1" />
      <rect x="9" y="2" width="6" height="3" rx="1" />
      <path d="M9 11 L11 13 L15 9" />
      <path d="M9 17 H15" />
    </svg>
  );
}
function ScanIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
      <path d="M4 8 V5 a1 1 0 0 1 1 -1 H8" />
      <path d="M20 8 V5 a1 1 0 0 0 -1 -1 H16" />
      <path d="M4 16 V19 a1 1 0 0 0 1 1 H8" />
      <path d="M20 16 V19 a1 1 0 0 1 -1 1 H16" />
      <path d="M3 12 H21" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
      <path d="M4 4 H10 a3 3 0 0 1 3 3 V21 a2 2 0 0 0 -2 -2 H4 Z" />
      <path d="M20 4 H14 a3 3 0 0 0 -3 3 V21 a2 2 0 0 1 2 -2 H20 Z" />
    </svg>
  );
}
function HearthIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
      <path d="M4 21 V8 L12 3 L20 8 V21 Z" />
      <rect x="9" y="13" width="6" height="8" />
      <path d="M8 11 H16" />
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
    </svg>
  );
}
