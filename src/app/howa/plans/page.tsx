import Image from "next/image";
import Link from "next/link";
import s from "./plans.module.css";
import { WaitlistMini } from "@/components/marketing/WaitlistMini";
import { FaqList } from "@/components/marketing/FaqList";

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

export default function PlansPage() {
  return (
    <div className={s.page}>
      {/* 1. Hero */}
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <div className={s.heroCopyInner}>
            <p className={s.heroEy}>Plans &amp; Pricing</p>
            <h1 className={s.heroTitle}>
              Two ways to be <em>stewarded.</em>
            </h1>
            <p className={s.heroLede}>
              One platform. Three entitlement levels. Upgrading always preserves
              the same home record. HoWA+ is the connected continuity and
              savings layer. Steward is the premium managed-care layer.
            </p>
            <div className={s.heroCtas}>
              <Link
                href="/api/howa-bounce?source=plans"
                className={s.btnFilled}
              >
                Start HoWA+
              </Link>
              <Link href="#steward" className={s.btnGhost}>
                See Steward
                <span aria-hidden="true" className={s.btnArrow}>→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={s.heroVisual}>
          <Image
            src="/home-v4/howa-lander-hero-v4.png"
            alt="A pink Georgian townhouse with the left half rendered as a hand-drawn elevation — the home, two ways"
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
          <p className={s.statsLedeLine1}>One record. Two tiers.</p>
          <p className={s.statsLedeLine2}>Entitlements are additive. Cancel anytime.</p>
        </div>
        {STAT_COLS.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <span className={s.statValue}>{stat.value}</span>
            <span className={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 3. Tier cards */}
      <section className={s.tiers}>
        <header className={s.tiersHead}>
          <p className={s.tiersEy}>Choose your tier</p>
          <h2 className={s.tiersTitle}>
            One platform. <em>Three valid entitlement levels.</em>
          </h2>
        </header>
        <div className={s.tiersGrid}>
          {/* HoWA+ — terracotta hat */}
          <article className={`${s.tierCard} ${s.tierPlus}`}>
            <div className={s.tierIllustration} aria-hidden="true">
              <Image
                src="/home-v4/housekeeper-dollhouse.png"
                alt=""
                width={1024}
                height={1228}
                sizes="(min-width: 1024px) 540px, 100vw"
              />
            </div>
            <div className={s.tierContent}>
              <div className={s.tierBadge} data-state="live">Live at launch</div>
              <h3 className={s.tierName}>
                HoWA<em>+</em>
              </h3>
              <p className={s.tierTagline}>
                The connected membership for a home you mean to keep.
              </p>
              <div className={s.tierPrice}>
                <span className={s.tierPriceAmount}>£16.99</span>
                <span className={s.tierPriceUnit}>/ month</span>
              </div>
              <ul className={s.tierIncludes}>
                {HOWAPLUS_INCLUSIONS.map((inc) => (
                  <li key={inc}>{inc}</li>
                ))}
              </ul>
              <div className={s.tierCtas}>
                <Link
                  href="/api/howa-bounce?source=plans-howaplus"
                  className={s.btnFilled}
                >
                  Start HoWA+
                </Link>
                <Link href="/howa/companion" className={s.tierLink}>
                  See the Companion →
                </Link>
              </div>
            </div>
          </article>

          {/* Steward — navy hat + body */}
          <article id="steward" className={`${s.tierCard} ${s.tierSteward}`}>
            <div className={s.tierIllustration} aria-hidden="true">
              <Image
                src="/home-v4/steward-dollhouse.png"
                alt=""
                width={1024}
                height={1228}
                sizes="(min-width: 1024px) 540px, 100vw"
              />
            </div>
            <div className={s.tierContent}>
              <div className={s.tierBadge} data-state="coming">Coming soon</div>
              <h3 className={s.tierName}>Steward Plans</h3>
              <p className={s.tierTagline}>
                Recurring managed care. One contact. One invoice.
              </p>
              <div className={s.tierPrice}>
                <span className={s.tierPriceAmount}>From quote</span>
                <span className={s.tierPriceUnit}>/ built with you</span>
              </div>
              <ul className={s.tierIncludes}>
                {STEWARD_INCLUSIONS.map((inc) => (
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
          Prices are VAT-inclusive for UK residents. Cancel any time. The
          record of your home stays yours either way.
        </p>
      </section>

      {/* 4. Comparison table */}
      <section className={s.compare}>
        <header className={s.compareHead}>
          <p className={s.compareEy}>Feature by feature</p>
          <h2 className={s.compareTitle}>
            Free. <em>HoWA+</em>. Steward.
          </h2>
        </header>
        <div className={s.compareTable}>
          <div className={s.compareRowHeader}>
            <span />
            <span className={s.compareColLabel}>Free</span>
            <span className={`${s.compareColLabel} ${s.compareColLabelPlus}`}>HoWA+</span>
            <span className={`${s.compareColLabel} ${s.compareColLabelSteward}`}>Steward</span>
          </div>
          {COMPARE.map((row) => (
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
            <p className={s.faqEy}>Questions</p>
            <h2 className={s.faqTitle}>
              What you'd <em>probably</em> ask.
            </h2>
          </header>
          <FaqList items={FAQS} />
        </div>
      </section>

      {/* 6. Closing */}
      <section className={s.closing}>
        <p className={s.closingKicker}>Still wondering?</p>
        <p className={s.closingStatement}>
          <em>Write to the House.</em>
        </p>
        <div className={s.closingCtas}>
          <Link href="/contact" className={s.closingBtnFilled}>
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
}
