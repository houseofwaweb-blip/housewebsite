import Image from "next/image";
import Link from "next/link";
import s from "./plans.module.css";
import { WaitlistMini } from "@/components/marketing/WaitlistMini";
import { FaqList } from "@/components/marketing/FaqList";
import { MetaViewContent } from "@/components/marketing/MetaViewContent";
import { getPageSections, cms, cmsCards, pick } from "@/lib/cms/page-sections";

/**
 * /howa/plans — Plans & pricing.
 *
 * Section order:
 *   1. Hero — Two ways to be stewarded
 *   2. Stats strip — Two tiers · One record
 *   3. Tier cards — HoWA+ (live) + Steward (coming-soon, navy)
 *   4. Comparison table — full feature row
 *   5. FAQ accordion
 *   6. Closing — write to the House
 */

export const metadata = {
  title: "Plans & Pricing — HoWA+ and Steward",
  description:
    "HoWA+ at £16.99 a month. Steward plans for recurring managed care, coming soon. One record, two ways to be stewarded.",
};

const STAT_COLS = [
  { value: "2", label: "Tiers · One record" },
  { value: "£16.99", label: "HoWA+ per month" },
  { value: "0", label: "Minimum term" },
  { value: "∞", label: "Cancellation rights" },
];

const HOWAPLUS_INCLUSIONS = [
  "10% off all House services — auto-applied at checkout",
  "Full dashboard continuity and task centre with seasonal prompts",
  "Richer document and home logbook history",
  "Priority booking across House services",
  "Full access to The Hearth magazine",
  "Personal carbon offset fund",
  "Saved guides and seasonal reminders",
  "Early access to new HoWA features",
  "Exclusive House events and drops",
];

const STEWARD_INCLUSIONS = [
  "Everything in HoWA+, plus",
  "Access to Steward Plans — bespoke recurring service subscriptions",
  "Smart-home controller with live device integrations",
  "Anomaly alerts and predictive maintenance",
  "Automated seasonal care scheduling",
  "Live utility and energy monitoring",
  "Delegated helper and household permissions",
  "Insurance prefill and risk score integration",
  "Home Protection Review (when live)",
  "Priority HoWA support channel",
];

const COMPARE = [
  { feature: "Living Record entries", free: "Limited", plus: "Unlimited", steward: "Unlimited" },
  { feature: "Service discount", free: "—", plus: "10%", steward: "10%" },
  { feature: "Companion diagnostic", free: "Lite", plus: "Full", steward: "Full" },
  { feature: "Task centre & reminders", free: "—", plus: "Yes", steward: "Yes" },
  { feature: "Priority booking", free: "—", plus: "Yes", steward: "Priority+" },
  { feature: "The Hearth magazine", free: "Excerpts", plus: "Full", steward: "Full" },
  { feature: "Carbon offset fund", free: "—", plus: "Tracked", steward: "Tracked" },
  { feature: "Smart-home controller", free: "—", plus: "—", steward: "Yes" },
  { feature: "Predictive maintenance", free: "—", plus: "—", steward: "Yes" },
  { feature: "Home Protection Review", free: "—", plus: "—", steward: "When live" },
  { feature: "Recurring service plan", free: "—", plus: "—", steward: "Bespoke" },
];

const FAQS = [
  {
    q: "When does HoWA+ go live?",
    a: "HoWA+ opens with the new site. The product app (bookings, records, the Companion) is the surface that unlocks the paid features. If the app isn't live at the moment you try to start, the “Start HoWA” button routes to a waitlist until we're ready.",
  },
  {
    q: "What about Steward plans?",
    a: "Steward is the recurring managed-care layer on top of HoWA+. Register interest and we'll write when it opens. Pricing varies by the services included and the size of the home — we'll build a quote with you.",
  },
  {
    q: "Can I cancel any time?",
    a: "Yes. HoWA+ is month to month and cancels at the next billing date. Anything saved to your living record stays yours — export or keep it in a downgraded free account.",
  },
  {
    q: "Is there a family or household plan?",
    a: "Not at launch. One HoWA+ account covers everyone in one home — additional users can be invited to contribute to the record at no extra cost. A multi-property tier is on the Steward roadmap.",
  },
  {
    q: "What happens to existing House Membership?",
    a: "House Membership is HoWA+ from now on. If you held a legacy membership, it has been converted on like-for-like terms — you don't need to do anything.",
  },
];

export default async function PlansPage() {
  const sections = await getPageSections("howa-plans");
  const hero = sections.get("hero");
  const stats = sections.get("stats");
  const tiers = sections.get("tiers");
  const tierPlus = sections.get("tier-plus");
  const tierSteward = sections.get("tier-steward");
  const compare = sections.get("compare");
  const faq = sections.get("faq");
  const closing = sections.get("closing");

  const statCols = cmsCards(stats, STAT_COLS, (c, base) => ({
    value: pick(c.value ?? c.label, base?.value ?? ""),
    label: pick(c.title ?? c.body, base?.label ?? ""),
  }));
  const plusInclusions = tierPlus?.items ?? HOWAPLUS_INCLUSIONS;
  const stewardInclusions = tierSteward?.items ?? STEWARD_INCLUSIONS;
  const compareRows = cmsCards(compare, COMPARE, (c, base) => ({
    feature: pick(c.title, base?.feature ?? ""),
    free: pick(c.label, base?.free ?? ""),
    plus: pick(c.value, base?.plus ?? ""),
    steward: pick(c.value2, base?.steward ?? ""),
  }));
  const faqItems = cmsCards(faq, FAQS, (c, base) => ({
    q: pick(c.title, base?.q ?? ""),
    a: pick(c.body, base?.a ?? ""),
  }));

  return (
    <div className={s.page}>
      <MetaViewContent
        contentId="howa_plans"
        contentName="HoWA plans &amp; pricing"
        contentCategory="howa_pricing"
        contentType="product"
        value={16.99}
      />
      {/* 1. Hero */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>{cms(hero, "eyebrow", "Plans & Pricing")}</p>
            <h1 className={s.heroTitle}>
              {cms(hero, "headline", "Two ways to be")}{" "}
              <em>{cms(hero, "headlineEm", "stewarded.", "headline")}</em>
            </h1>
            <p className={s.heroLede}>
              {cms(
                hero,
                "body",
                "One platform. Three entitlement levels. Upgrading always preserves the same home record. HoWA+ is the connected continuity and savings layer. Steward is the premium managed-care layer.",
              )}
            </p>
            <div className={s.heroCtas}>
              <Link
                href={cms(hero, "ctaHref", "/api/howa-bounce?source=plans")}
                className={s.btnFilled}
              >
                {cms(hero, "ctaLabel", "Start HoWA+")}
              </Link>
              <Link href={cms(hero, "cta2Href", "#steward")} className={s.btnGhost}>
                {cms(hero, "cta2Label", "See Steward")}
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={s.heroVisual}>
          <Image
            src={cms(hero, "imageUrl", "/home-v4/howa-lander-hero-v4.webp")}
            alt={cms(
              hero,
              "imageAlt",
              "A pink Georgian townhouse with the left half rendered as a hand-drawn elevation — the home, two ways",
            )}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            priority
            style={{ objectFit: "cover", objectPosition: "right center" }}
          />
        </div>
      </section>

      {/* 2. Stats strip */}
      <section className={s.statsStrip}>
        <div className={s.statsLede}>
          <p className={s.statsLedeLine1}>{cms(stats, "headline", "One record. Two tiers.")}</p>
          <p className={s.statsLedeLine2}>
            {cms(stats, "subheadline", "Entitlements are additive. Cancel anytime.")}
          </p>
        </div>
        {statCols.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3. Tier cards */}
      <section className={s.tiers}>
        <header className={s.tiersHead}>
          <p className={s.tiersEy}>{cms(tiers, "eyebrow", "Choose your tier")}</p>
          <h2 className={s.tiersTitle}>
            {cms(tiers, "headline", "One platform.")}{" "}
            <em>{cms(tiers, "headlineEm", "Three valid entitlement levels.", "headline")}</em>
          </h2>
        </header>
        <div className={s.tiersGrid}>
          {/* HoWA+ — terracotta hat */}
          <article className={`${s.tierCard} ${s.tierPlus}`}>
            <div className={s.tierIllustration} aria-hidden="true">
              <Image
                src={cms(tierPlus, "imageUrl", "/home-v4/housekeeper-dollhouse.webp")}
                alt=""
                width={1024}
                height={1228}
                sizes="(min-width: 1024px) 540px, 100vw"
              />
            </div>
            <div className={s.tierContent}>
              <div className={s.tierBadge} data-state="live">
                {cms(tierPlus, "eyebrow", "Live at launch")}
              </div>
              <h3 className={s.tierName}>
                {cms(tierPlus, "headline", "HoWA")}<em>{cms(tierPlus, "headlineEm", "+", "headline")}</em>
              </h3>
              <p className={s.tierTagline}>
                {cms(
                  tierPlus,
                  "subheadline",
                  "The connected membership for a home you mean to keep.",
                )}
              </p>
              <div className={s.tierPrice}>
                <span className={s.tierPriceAmount}>{cms(tierPlus, "body", "£16.99")}</span>
                <span className={s.tierPriceUnit}>{cms(tierPlus, "body2", "/ month")}</span>
              </div>
              <ul className={s.tierIncludes}>
                {plusInclusions.map((inc) => (
                  <li key={inc}>{inc}</li>
                ))}
              </ul>
              <div className={s.tierCtas}>
                <Link
                  href={cms(tierPlus, "ctaHref", "/api/howa-bounce?source=plans-howaplus")}
                  className={s.btnFilled}
                >
                  {cms(tierPlus, "ctaLabel", "Start HoWA+")}
                </Link>
                <Link href={cms(tierPlus, "cta2Href", "/howa/companion")} className={s.tierLink}>
                  {cms(tierPlus, "cta2Label", "See the Companion")} →
                </Link>
              </div>
            </div>
          </article>

          {/* Steward — navy hat + body */}
          <article id="steward" className={`${s.tierCard} ${s.tierSteward}`}>
            <div className={s.tierIllustration} aria-hidden="true">
              <Image
                src={cms(tierSteward, "imageUrl", "/home-v4/steward-dollhouse.webp")}
                alt=""
                width={1024}
                height={1228}
                sizes="(min-width: 1024px) 540px, 100vw"
              />
            </div>
            <div className={s.tierContent}>
              <div className={s.tierBadge} data-state="coming">
                {cms(tierSteward, "eyebrow", "Coming soon")}
              </div>
              <h3 className={s.tierName}>{cms(tierSteward, "headline", "Steward Plans")}</h3>
              <p className={s.tierTagline}>
                {cms(
                  tierSteward,
                  "subheadline",
                  "Recurring managed care. One contact. One invoice.",
                )}
              </p>
              <div className={s.tierPrice}>
                <span className={s.tierPriceAmount}>{cms(tierSteward, "body", "From quote")}</span>
                <span className={s.tierPriceUnit}>{cms(tierSteward, "body2", "/ built with you")}</span>
              </div>
              <ul className={s.tierIncludes}>
                {stewardInclusions.map((inc) => (
                  <li key={inc}>{inc}</li>
                ))}
              </ul>
              <div className={s.tierWaitlist}>
                <WaitlistMini
                  product="steward"
                  sourcePage="/howa/plans"
                  placeholder="Your email"
                  buttonLabel="Register"
                  successMessage="Thank you. We'll write when Steward opens."
                />
              </div>
            </div>
          </article>
        </div>

        <p className={s.tiersFootnote}>
          {cms(
            tiers,
            "body",
            "Prices are VAT-inclusive for UK residents. Cancel any time. The record of your home stays yours either way.",
          )}
        </p>
      </section>

      {/* 4. Comparison table */}
      <section className={s.compare}>
        <header className={s.compareHead}>
          <p className={s.compareEy}>{cms(compare, "eyebrow", "Feature by feature")}</p>
          <h2 className={s.compareTitle}>
            {cms(compare, "headline", "Free.")}{" "}
            <em>{cms(compare, "headlineEm", "HoWA+", "headline")}</em>.{" "}
            {cms(compare, "subheadline", "Steward.")}
          </h2>
        </header>
        <div className={s.compareTable}>
          <div className={s.compareRowHeader}>
            <span />
            <span className={s.compareColLabel}>Free</span>
            <span className={`${s.compareColLabel} ${s.compareColLabelPlus}`}>HoWA+</span>
            <span className={`${s.compareColLabel} ${s.compareColLabelSteward}`}>Steward</span>
          </div>
          {compareRows.map((row) => (
            <div key={row.feature} className={s.compareRow}>
              <span className={s.compareRowFeature}>{row.feature}</span>
              <span className={s.compareRowFree}>{row.free}</span>
              <span className={s.compareRowPlus}>{row.plus}</span>
              <span className={s.compareRowSteward}>{row.steward}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FAQ */}
      <section className={s.faqSection}>
        <div className={s.faqInner}>
          <header className={s.faqHead}>
            <p className={s.faqEy}>{cms(faq, "eyebrow", "Questions")}</p>
            <h2 className={s.faqTitle}>
              {cms(faq, "headline", "What you'd")}{" "}
              <em>{cms(faq, "headlineEm", "probably", "headline")}</em>{" "}
              {cms(faq, "subheadline", "ask.")}
            </h2>
          </header>
          <FaqList items={faqItems} />
        </div>
      </section>

      {/* 6. Closing */}
      <section className={s.closing}>
        <p className={s.closingKicker}>{cms(closing, "eyebrow", "Still wondering?")}</p>
        <p className={s.closingStatement}>
          <em>{cms(closing, "headlineEm", "Write to the House.", "headline")}</em>
        </p>
        <div className={s.closingCtas}>
          <Link href={cms(closing, "ctaHref", "/contact")} className={s.closingBtnFilled}>
            {cms(closing, "ctaLabel", "Contact us")}
          </Link>
        </div>
      </section>
    </div>
  );
}
