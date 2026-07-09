import Image from "next/image";
import Link from "next/link";
import s from "./plans.module.css";
import { FaqList } from "@/components/marketing/FaqList";
import { V3Matrix } from "../V3Matrix";
import { MetaViewContent } from "@/components/marketing/MetaViewContent";
import { SoftwareApplicationJsonLd } from "@/lib/seo/jsonLd";
import { env } from "@/lib/env";
import { getPageSections, cms, cmsCards, pick } from "@/lib/cms/page-sections";

/**
 * /howa/plans, Plans & pricing.
 *
 * Section order:
 *   1. Hero, Three ways to be stewarded
 *   2. Stats strip, Three tiers · One record
 *   3. Tier cards, Housekeeper (live) + Steward (coming-soon, navy)
 *   4. Comparison table, full feature row
 *   5. FAQ accordion
 *   6. Closing, write to the House
 */

export const metadata = {
  title: "HoWA Plans | Assistant, Housekeeper and Steward",
  description:
    "Assistant free, Housekeeper at £16.99 a month, Steward at £29.99 a month. One record, three depths of care.",
};

const STAT_COLS = [
  { value: "3", label: "Tiers · One record" },
  { value: "£16.99", label: "Housekeeper per month" },
  { value: "0", label: "Minimum term" },
  { value: "∞", label: "Cancellation rights" },
];

const ASSISTANT_INCLUSIONS = [
  "The portrait, instant facts from your address",
  "Ask anything about home, garden and paperwork",
  "Repair, garden and room scans",
  "Quotes, decoded",
  "Your first save, the record begins",
];

const HOWAPLUS_INCLUSIONS = [
  "10% off all House services, auto-applied at checkout",
  "Full Living Record continuity and task centre with seasonal prompts",
  "Richer document and home logbook history",
  "Priority booking across House services",
  "Full access to The Hearth magazine",
  "Personal carbon offset fund",
  "Saved guides and seasonal reminders",
  "Early access to new HoWA features",
  "Exclusive House events and drops",
];

const STEWARD_INCLUSIONS = [
  "Everything in Housekeeper, plus",
  "The HoWA Score, with full drivers and risk register",
  "Proactive protection prompts before failure",
  "Predictive maintenance and anomaly alerts",
  "Sensor and smart-meter interpretation where connected",
  "Evidence packs and the Annual Home Report",
  "Transfer Pack foundations for when you sell",
  "Insurance readiness, evidence not advice",
  "Priority HoWA support channel",
];

const FAQS = [
  {
    q: "When does Housekeeper go live?",
    a: "Housekeeper opens with the new site. HoWA itself (bookings, records, the Assistant) is the surface that unlocks the paid features. If HoWA isn't live at the moment you try to start, the “Start HoWA” button routes to a waitlist until we're ready.",
  },
  {
    q: "What about Steward plans?",
    a: "Steward is the recurring managed-care layer on top of Housekeeper. Register interest and we'll write when it opens. Pricing varies by the services included and the size of the home, we'll build a quote with you.",
  },
  {
    q: "Can I cancel any time?",
    a: "Yes. Housekeeper is month to month and cancels at the next billing date. Anything saved to your living record stays yours, export or keep it in a downgraded free account.",
  },
  {
    q: "Is there a family or household plan?",
    a: "Not at launch. One Housekeeper account covers everyone in one home, additional users can be invited to contribute to the record at no extra cost. A multi-property tier is on the Steward roadmap.",
  },
  {
    q: "What happens to existing House Membership?",
    a: "House Membership is Housekeeper from now on. If you held a legacy membership, it has been converted on like-for-like terms, you don't need to do anything.",
  },
];

export default async function PlansPage() {
  const sections = await getPageSections("howa-plans");
  const hero = sections.get("hero");
  const stats = sections.get("stats");
  const tiers = sections.get("tiers");
  const tierAssistant = sections.get("tier-assistant");
  const tierPlus = sections.get("tier-plus");
  const tierSteward = sections.get("tier-steward");
  const compare = sections.get("compare");
  const faq = sections.get("faq");
  const closing = sections.get("closing");

  const statCols = cmsCards(stats, STAT_COLS, (c, base) => ({
    value: pick(c.value ?? c.label, base?.value ?? ""),
    label: pick(c.title ?? c.body, base?.label ?? ""),
  }));
  const assistantInclusions = tierAssistant?.items ?? ASSISTANT_INCLUSIONS;
  const plusInclusions = tierPlus?.items ?? HOWAPLUS_INCLUSIONS;
  const stewardInclusions = tierSteward?.items ?? STEWARD_INCLUSIONS;
  const faqItems = cmsCards(faq, FAQS, (c, base) => ({
    q: pick(c.title, base?.q ?? ""),
    a: pick(c.body, base?.a ?? ""),
  }));

  return (
    <div className={s.page}>
      <SoftwareApplicationJsonLd
        url={`${env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/howa/plans`}
        monthlyPriceGBP={16.99}
      />
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
              {cms(hero, "headline", "Three ways to be")}{" "}
              <em>{cms(hero, "headlineEm", "stewarded.", "headline")}</em>
            </h1>
            <p className={s.heroLede}>
              {cms(
                hero,
                "body",
                "One platform. Three entitlement levels. Upgrading always preserves the same home record. Assistant is the free way in. Housekeeper is the connected continuity and savings layer. Steward is the premium managed-care layer.",
              )}
            </p>
            <div className={s.heroCtas}>
              <Link
                href={cms(hero, "ctaHref", "/howa/coming-soon")}
                className={s.btnFilled}
              >
                {cms(hero, "ctaLabel", "Join the waitlist")}
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
            src={cms(hero, "imageUrl", "/home-v4/v6-one-record-v3.webp")}
            alt={cms(
              hero,
              "imageAlt",
              "Three phones in the Assistant, Housekeeper and Steward colourways, with the cutaway dollhouse softly behind.",
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
          <p className={s.statsLedeLine1}>{cms(stats, "headline", "One record. Three tiers.")}</p>
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
          {/* Assistant, olive hat — the free tier */}
          <article className={`${s.tierCard} ${s.tierAssistant}`}>
            <div className={s.tierIllustration} aria-hidden="true">
              <Image
                src={cms(tierAssistant, "imageUrl", "/home-v4/assistant-dollhouse.webp")}
                alt=""
                width={1024}
                height={1228}
                sizes="(min-width: 1024px) 400px, 100vw"
              />
            </div>
            <div className={s.tierContent}>
              <div className={s.tierBadge} data-state="live">
                {cms(tierAssistant, "eyebrow", "Free · the way in")}
              </div>
              <h3 className={s.tierName}>{cms(tierAssistant, "headline", "Assistant")}</h3>
              <p className={s.tierTagline}>
                {cms(
                  tierAssistant,
                  "subheadline",
                  "The house, seen. Useful before you've paid a penny.",
                )}
              </p>
              <div className={s.tierPrice}>
                <span className={s.tierPriceAmount}>{cms(tierAssistant, "body", "Free")}</span>
                <span className={s.tierPriceUnit}>{cms(tierAssistant, "body2", "/ start with an address")}</span>
              </div>
              <ul className={s.tierIncludes}>
                {assistantInclusions.map((inc) => (
                  <li key={inc}>{inc}</li>
                ))}
              </ul>
              <div className={s.tierCtas}>
                <Link
                  href={cms(tierAssistant, "ctaHref", "/howa/coming-soon?tier=assistant")}
                  className={s.btnFilled}
                >
                  {cms(tierAssistant, "ctaLabel", "Join the waitlist")}
                </Link>
                <Link href={cms(tierAssistant, "cta2Href", "/howa/how-it-works")} className={s.tierLink}>
                  {cms(tierAssistant, "cta2Label", "See how it works")} →
                </Link>
              </div>
            </div>
          </article>

          {/* Housekeeper, terracotta hat */}
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
                  href={cms(tierPlus, "ctaHref", "/howa/coming-soon?tier=housekeeper")}
                  className={s.btnFilled}
                >
                  {cms(tierPlus, "ctaLabel", "Join the waitlist")}
                </Link>
                <Link href={cms(tierPlus, "cta2Href", "/howa/assistant")} className={s.tierLink}>
                  {cms(tierPlus, "cta2Label", "See the Assistant")} →
                </Link>
              </div>
            </div>
          </article>

          {/* Steward, navy hat + body */}
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
              <div className={s.tierBadge} data-state="live">
                {cms(tierSteward, "eyebrow", "The standard")}
              </div>
              <h3 className={s.tierName}>{cms(tierSteward, "headline", "Steward")}</h3>
              <p className={s.tierTagline}>
                {cms(
                  tierSteward,
                  "subheadline",
                  "Protected before failure.",
                )}
              </p>
              <div className={s.tierPrice}>
                <span className={s.tierPriceAmount}>{cms(tierSteward, "body", "£29.99")}</span>
                <span className={s.tierPriceUnit}>{cms(tierSteward, "body2", "/ month")}</span>
              </div>
              <ul className={s.tierIncludes}>
                {stewardInclusions.map((inc) => (
                  <li key={inc}>{inc}</li>
                ))}
              </ul>
              <div className={s.tierCtas}>
                <Link
                  href={cms(tierSteward, "ctaHref", "/howa/steward")}
                  className={s.btnFilled}
                >
                  {cms(tierSteward, "ctaLabel", "Explore Steward")}
                </Link>
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
            <em>{cms(compare, "headlineEm", "Housekeeper", "headline")}</em>.{" "}
            {cms(compare, "subheadline", "Steward.")}
          </h2>
        </header>
        <div className="mx-auto mb-10 max-w-[860px] lg:mb-12">
          <Image
            src="/home-v4/v6-one-record-feature.webp"
            alt="Three phones in the Assistant, Housekeeper and Steward colourways, showing one continuous home record across the tiers."
            width={1448}
            height={1086}
            sizes="(min-width: 1024px) 860px, 100vw"
            className="h-auto w-full"
          />
        </div>
        <div className="howa-surface">
          <V3Matrix middleLabel="Housekeeper" showTitle={false} />
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
