import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { StateBadge } from "@/components/primitives/StateBadge";
import { Accordion } from "@/components/primitives/Accordion";
import { GhostLink } from "@/components/primitives/GhostLink";
import { WaitlistMini } from "@/components/marketing/WaitlistMini";
import { ComparisonTable } from "@/components/marketing/ComparisonTable";
import { getPageSections, cms } from "@/lib/cms/page-sections";

/**
 * /howa/plans — pricing page.
 * Spec: PLAN.md §9 (Commercial decisions locked 2026-04-15).
 *
 *   HoWA+       £16.99 / month   — live at launch (subject to HOWA_APP_LIVE)
 *   Steward     coming soon       — waitlist
 *
 * House Membership is HoWA+ (no separate product). Protect Review is
 * coming-soon and lives on /protect, not here.
 */

export const metadata = {
  title: "Plans & Pricing",
  description:
    "HoWA+ at £16.99 a month. Steward plans for recurring managed care, coming soon.",
};

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

const FAQ_ITEMS = [
  {
    id: "one",
    summary: "When does HoWA+ go live?",
    body: (
      <p>
        HoWA+ opens with the new site. The product app (bookings, records, the
        Companion) is the surface that unlocks the paid features. If the app
        isn&apos;t live at the moment you try to start, the &ldquo;Start HoWA&rdquo;
        button routes to a waitlist until we&apos;re ready.
      </p>
    ),
  },
  {
    id: "two",
    summary: "What about Steward plans?",
    body: (
      <p>
        Steward is the recurring managed-care layer on top of HoWA+. Register
        interest and we&apos;ll write when it opens. Pricing varies by the
        services included and the size of the home — we&apos;ll build a quote
        with you.
      </p>
    ),
  },
  {
    id: "three",
    summary: "Can I cancel any time?",
    body: (
      <p>
        Yes. HoWA+ is month to month and cancels at the next billing date.
        Anything saved to your living record stays yours — export or keep it in
        a downgraded free account.
      </p>
    ),
  },
  {
    id: "four",
    summary: "Is there a family or household plan?",
    body: (
      <p>
        Not at launch. One HoWA+ account covers everyone in one home —
        additional users can be invited to contribute to the record at no
        extra cost. A multi-property tier is on the Steward roadmap.
      </p>
    ),
  },
  {
    id: "five",
    summary: "What happens to existing House Membership?",
    body: (
      <p>
        House Membership is HoWA+ from now on. If you held a legacy
        membership, it has been converted on like-for-like terms — you
        don&apos;t need to do anything.
      </p>
    ),
  },
];

export default async function PlansPage() {
  const sections = await getPageSections("howa-plans");
  const s = (name: string) => sections.get(name);

  return (
    <article className="bg-house-cream text-house-brown">
      {/* Header */}
      <section className="px-[5vw] pt-[12vh] pb-10">
        <div className="max-w-[880px] mx-auto text-center">
          <Eyebrow>Plans & Pricing</Eyebrow>
          <h1 className="em-accent font-display font-medium text-[clamp(44px,6vw,80px)] leading-[1.05] tracking-[-0.01em] mt-4">
            {cms(s("hero"), "headline", "Two ways to be")} <em>{cms(s("hero"), "headlineEm", "stewarded")}</em>.
          </h1>
          <p className="font-sans text-[19px] leading-[1.6] text-house-brown/70 max-w-[58ch] mx-auto mt-6">
            {cms(s("hero"), "body", "One platform. Three entitlement levels. Upgrading always preserves the same home record. HoWA+ is the paid continuity and savings layer. Steward is the premium control and managed-care layer. Entitlements are additive. The highest valid entitlement governs what the system can do.")}
          </p>
        </div>
      </section>

      {/* Tier cards */}
      <section className="px-[5vw] pb-20">
        <div className="max-w-[1080px] mx-auto grid md:grid-cols-2 gap-6">
          {/* HoWA+ */}
          <div className="relative bg-white border border-house-brown/10 p-9 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <StateBadge state="live">Live at launch</StateBadge>
            </div>
            <h2 className="em-accent font-display font-medium text-[34px] leading-[1.15] mb-2">
              HoWA<em>+</em>
            </h2>
            <p className="font-sans italic text-[17px] text-house-brown/70 leading-[1.5] mb-6">
              The connected membership for a home you mean to keep.
            </p>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-display font-medium text-[44px] leading-none">£16.99</span>
              <span className="font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown/70">
                / month
              </span>
            </div>
            <ul className="flex flex-col gap-2 mb-8">
              {HOWAPLUS_INCLUSIONS.map((inc) => (
                <li
                  key={inc}
                  className="relative pl-5 font-sans text-[16px] leading-[1.55] text-house-brown/90 before:content-['—'] before:absolute before:left-0 before:text-[var(--house-gold-dark)]"
                >
                  {inc}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-3">
              <Link
                href="/api/howa-bounce?source=plans-howaplus"
                className="inline-block text-center font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-[var(--house-gold-dark)] border border-[var(--house-gold-dark)] px-6 py-3.5 no-underline transition-colors duration-[var(--t-slow)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
              >
                Start HoWA+
              </Link>
              <GhostLink href="/howa/companion">See how the Companion works</GhostLink>
            </div>
          </div>

          {/* Steward */}
          <div className="relative bg-howa-navy text-house-cream border border-house-gold/30 p-9 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <StateBadge state="coming">Coming soon</StateBadge>
            </div>
            <h2 className="em-accent font-sans font-normal text-[32px] leading-[1.15] tracking-[-0.01em] mb-2">
              Steward Plans
            </h2>
            <p className="font-sans italic text-[17px] text-house-cream/75 leading-[1.5] mb-6">
              Recurring managed care, one contact, one invoice.
            </p>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-display font-medium text-[32px] leading-none text-house-cream">
                From quote
              </span>
              <span className="font-sans text-[12px] tracking-[0.18em] uppercase text-house-cream/55">
                / built with you
              </span>
            </div>
            <ul className="flex flex-col gap-2 mb-8">
              {STEWARD_INCLUSIONS.map((inc) => (
                <li
                  key={inc}
                  className="relative pl-5 font-sans text-[15px] leading-[1.55] text-house-cream/85 before:content-['—'] before:absolute before:left-0 before:text-[var(--house-gold-dark)]-light"
                >
                  {inc}
                </li>
              ))}
            </ul>
            <div className="mt-auto">
              <WaitlistMini
                product="steward"
                sourcePage="/howa/plans"
                placeholder="Your email"
                buttonLabel="Register"
                successMessage="Thank you. We'll write when Steward opens."
              />
            </div>
          </div>
        </div>

        <p className="max-w-[640px] mx-auto text-center mt-10 font-sans italic text-[14px] text-house-brown/70">
          Prices are VAT-inclusive for UK residents. Cancel any time. The record
          of your home stays yours either way.
        </p>
      </section>

      {/* Comparison table */}
      <section className="px-[5vw] py-16 bg-white border-t border-house-brown/10">
        <div className="max-w-[960px] mx-auto">
          <Eyebrow colour="teal">Compare</Eyebrow>
          <h2 className="font-sans font-normal text-[clamp(24px,3vw,36px)] leading-[1.15] text-house-brown mt-3 mb-10">
            Feature by feature.
          </h2>
          <ComparisonTable />
          <div className="text-center mt-8">
            <GhostLink href="/howa/plus">See everything in HoWA+ →</GhostLink>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-[5vw] py-20 bg-white border-t border-house-brown/10">
        <div className="max-w-[760px] mx-auto">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="em-accent font-display font-medium text-[clamp(30px,4vw,44px)] leading-[1.15] mt-4 mb-10">
            What you&apos;d <em>probably</em> ask.
          </h2>
          <Accordion items={FAQ_ITEMS} />
          <p className="mt-8 font-sans italic text-[14px] text-house-brown/70 text-center">
            Still wondering?{" "}
            <Link
              href="/contact"
              className="text-house-brown underline decoration-house-gold underline-offset-4"
            >
              Write to the House
            </Link>
            .
          </p>
        </div>
      </section>
    </article>
  );
}
