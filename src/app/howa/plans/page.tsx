import Link from "next/link";
import Image from "next/image";
import { MetaViewContent } from "@/components/marketing/MetaViewContent";
import { SoftwareApplicationJsonLd } from "@/lib/seo/jsonLd";
import { env } from "@/lib/env";
import { MobileCarousel } from "@/components/primitives/MobileCarousel";

/**
 * /howa/plans — built from the Plans handover (Sept HoWA review v2, Step 14).
 * One product, three levels of care: HoWA (Free) / HoWA+ (£16.99) / HoWA Steward
 * (£29.99). Warm, calm, House canvas — not a hard pricing grid.
 *
 * Two rules: (1) same product, more help — never "a different app" per tier;
 * (2) release honesty — where a figure isn't confirmed the table says "Shown at
 * sign-up". CTAs go to early access (/howa/coming-soon); checkout is not live.
 */

const SAGE = "#6E7764";
const CLAY = "#B97866";
const MIDNIGHT = "#102A39";

export const metadata = {
  title: { absolute: "HoWA Plans | House of Willow Alexander" },
  description:
    "Choose how much help you want with your home. HoWA is free, HoWA+ is £16.99 a month, HoWA Steward is £29.99 a month. One home, understood and looked after more deeply as you go.",
};

// Card + table content is drawn from the approved feature comparison
// (HoWA_Membership_Features_Website.docx / Technical Entitlement Specification,
// Aug 2026). Findings 04/05: state the real Free entitlement, describe Plus and
// Steward through confirmed capabilities, and leave usage quantities, seat
// numbers, support guarantees and the annual review off the page until confirmed.
const PLANS = [
  {
    name: "HoWA",
    tagline: "Know your home",
    price: "Free",
    image: "/howa/plans/plan-howa.webp",
    accent: SAGE,
    solid: true,
    features: ["Home Record and HoWA Score", "Household profiles, invitations and access", "Ask HoWA — basic answers", "Documents, receipts and warranties", "Service bookings and history"],
  },
  {
    name: "HoWA+",
    tagline: "Keep it organised",
    price: "£16.99/month",
    image: "/howa/plans/plan-plus.webp",
    accent: CLAY,
    solid: false,
    features: ["Everything in HoWA, plus:", "Ask HoWA — personalised answers", "Smart email and document reading", "Intelligent capture and Household Memory", "Personalised recommendations"],
  },
  {
    name: "HoWA Steward",
    tagline: "Stay ahead",
    price: "£29.99/month",
    image: "/howa/plans/plan-steward.webp",
    accent: MIDNIGHT,
    solid: false,
    features: ["Everything in HoWA+, plus:", "Premium support", "10% off the House shop and House services", "Faster response across House and approved partners", "Proactive prompts, predictive maintenance and coordinated approved work"],
  },
];

const BRIEF = [
  { t: "A letter to review", b: "A home-insurance renewal arrived on 9 September. The date found in the letter is ready for you to confirm." },
  { t: "A renewal remembered", b: "The policy renews on 1 October. Once confirmed, the reminder stays linked to the original letter." },
  { t: "A question answered with its source", b: "Ask when the boiler was last serviced and open the service record behind the answer." },
  { t: "A task shared", b: "A garden task for 11 September can be kept in the Home Plan and shared with the household where supported." },
  { t: "Costs brought into view", b: "See the bills and recurring costs HoWA has information for, together with their source and time period." },
  { t: "Completed work kept", b: "When supported work is completed, keep the relevant record, invoice or warranty with the asset it belongs to." },
];

// Rows confirmed live in the approved feature comparison. Graded cells use the
// document's own wording; "✓" / "—" mark included / not on that plan.
const TABLE_ROWS = [
  { label: "Price", cells: ["Free", "£16.99 per month", "£29.99 per month"] },
  { label: "Home Record", cells: ["✓", "✓", "✓"] },
  { label: "HoWA Score", cells: ["✓", "✓", "✓"] },
  { label: "Household profiles, invitations and access", cells: ["✓", "✓", "✓"] },
  { label: "Documents, receipts and warranties", cells: ["✓", "✓", "✓"] },
  { label: "Service bookings and history", cells: ["✓", "✓", "✓"] },
  { label: "Ask HoWA", cells: ["Basic answers", "Personalised answers", "Personalised answers and proactive prompts"] },
  { label: "Calendar, tasks, reminders and routines", cells: ["Basic", "Enhanced", "Enhanced"] },
  { label: "Smart email and document reading", cells: ["—", "✓", "✓"] },
  { label: "Intelligent capture", cells: ["Basic capture", "✓", "✓"] },
  { label: "Learned Household Memory", cells: ["Saved preferences only", "✓", "✓"] },
  { label: "Personalised recommendations", cells: ["—", "✓", "✓"] },
  { label: "Predictive maintenance prompts", cells: ["—", "Limited", "✓"] },
  { label: "Appliance and asset lifespan tracking", cells: ["—", "—", "✓"] },
  { label: "Future home-cost forecasts", cells: ["—", "—", "✓"] },
  { label: "Service coordination", cells: ["Book yourself", "Recommendations", "Coordinate approved work and track completion"] },
  { label: "Smart-home actions", cells: ["View", "Limited", "Control where supported"] },
  { label: "Garden photo scan and care plan", cells: ["Initial scan and plan", "Ongoing seasonal reminders and history", "Plus garden-risk tracking"] },
  { label: "Repair-photo guidance", cells: ["Likely issue, urgency and indicative cost", "Warranty-aware guidance and repair history", "Plus recurring-fault tracking"] },
  { label: "Room and garden design inspiration", cells: ["First design direction", "Saved briefs, versions and project history", "Everything in HoWA+"] },
  { label: "Premium support", cells: ["—", "—", "✓"] },
  { label: "10% off the House shop and House services", cells: ["—", "—", "✓"] },
  { label: "Faster response across House and approved partners", cells: ["—", "—", "✓"] },
  { label: "Availability", cells: ["Early access", "Early access", "Early access"] },
];

const EARLY_ACCESS = "/howa/coming-soon";

export default function PlansPage() {
  return (
    <main className="howa-surface relative overflow-x-hidden bg-house-cream text-house-brown">
      <SoftwareApplicationJsonLd url={`${env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/howa/plans`} />
      <MetaViewContent contentId="howa_plans" contentName="HoWA plans" contentCategory="howa_marketing" />

      {/* Hero */}
      <section className="border-b border-house-brown/10 bg-[#f6efe7]">
        <div className="mx-auto max-w-[1000px] px-[5vw] py-[clamp(48px,7vw,96px)] text-center">
          <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-dark">Plans</p>
          <h1 className="mx-auto mt-4 max-w-[18ch] font-display text-[clamp(34px,5vw,72px)] leading-[1.02]">
            Choose how much help you want with your home.
          </h1>
          <p className="mx-auto mt-6 max-w-[56ch] font-sans text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-house-brown/80">
            Start with the essentials, then add more organisation, reminders and
            support as your home needs it.
          </p>
        </div>
      </section>

      {/* Plan cards */}
      <section className="mx-auto max-w-[1240px] px-[5vw] py-[clamp(48px,6vw,88px)]">
        <MobileCarousel ariaLabel="Plans" gridClassName="lg:grid-cols-3 sm:gap-6">
          {PLANS.map((p) => (
            <div key={p.name} className="flex flex-col border border-house-brown/12 bg-house-cream">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image src={p.image} alt={`The HoWA house in the ${p.name} colourway`} fill sizes="(max-width: 1024px) 100vw, 400px" className="object-cover" />
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1.5" style={{ background: p.accent }} />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h2 className="font-display text-[26px] leading-tight">{p.name}</h2>
                <p className="mt-1 font-sans text-[15px]" style={{ color: p.accent }}>{p.tagline}</p>
                <p className="mt-3 font-sans text-[19px] font-semibold text-house-brown">{p.price}</p>
                <ul className="mt-5 flex flex-1 flex-col gap-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5 font-sans text-[15px] leading-[1.45] text-house-brown/80">
                      <span aria-hidden="true" className="text-house-gold-ink">·</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={EARLY_ACCESS}
                  className={
                    p.solid
                      ? "mt-7 inline-block w-full whitespace-nowrap text-center font-sans text-[12px] tracking-[0.16em] uppercase text-house-cream bg-house-brown border border-house-brown px-6 py-3 no-underline transition-[filter] duration-[var(--t-slow)] ease-out hover:brightness-125"
                      : "mt-7 inline-block w-full whitespace-nowrap text-center font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown border border-house-brown/40 px-6 py-3 no-underline transition-colors duration-[var(--t-base)] hover:border-house-brown"
                  }
                >
                  Join early access
                </Link>
              </div>
            </div>
          ))}
        </MobileCarousel>
      </section>

      {/* Monthly Home Brief */}
      <section className="border-y border-house-brown/10 bg-[#f6efe7]">
        <div className="mx-auto max-w-[1240px] px-[5vw] py-[clamp(48px,6vw,88px)]">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-14">
            <div>
              <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-dark">Month by month</p>
              <h2 className="mt-4 max-w-[24ch] font-display text-[clamp(28px,3.6vw,46px)] leading-[1.08]">See what HoWA keeps track of.</h2>
              <p className="mt-5 max-w-[62ch] font-sans text-[17px] leading-[1.6] text-house-brown/80">
                The value is in the things that keep coming back: a letter to review, a
                date to remember, a question to answer and useful work to keep with the
                home.
              </p>
            </div>
            <figure className="relative m-0 aspect-[16/9] w-full overflow-hidden bg-[#f1ebe5]">
              <Image src="/howa/new/proof-score.webp" alt="The HoWA Score beside the house: a boiler service due, with energy and insurance in view" fill sizes="(max-width: 1024px) 100vw, 460px" className="object-contain" />
            </figure>
          </div>

          <div className="mt-8 border border-house-brown/15 bg-house-cream">
            <div className="flex items-center justify-between border-b border-house-brown/12 px-6 py-4">
              <p className="flex items-center gap-3 font-display text-[19px]">
                <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center bg-house-brown text-[13px] font-semibold text-house-cream">H</span>
                Monthly Home Brief · 14 Elm Grove
              </p>
              <p className="font-sans text-[13px] text-house-brown/55">September 2026</p>
            </div>
            <div className="grid gap-px bg-house-brown/12 sm:grid-cols-2 lg:grid-cols-3">
              {BRIEF.map((m) => (
                <div key={m.t} className="bg-house-cream p-6">
                  <h3 className="font-display text-[19px] leading-tight">{m.t}</h3>
                  <p className="mt-2 font-sans text-[14px] leading-[1.5] text-house-brown/75">{m.b}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 font-sans text-[13px] italic text-house-brown/55">
            Illustrative sample for 14 Elm Grove. What appears in a Home Brief
            depends on the features and information available to your home.
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="mx-auto max-w-[1240px] px-[5vw] py-[clamp(48px,6vw,88px)]">
        <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-dark">Compare plans</p>
        <h2 className="mt-4 max-w-[26ch] font-display text-[clamp(28px,3.6vw,46px)] leading-[1.08]">The same home. More help when you need it.</h2>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-house-brown/20">
                <th className="py-4 pr-4 font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown/55">What you get</th>
                {PLANS.map((p) => (
                  <th key={p.name} className="py-4 pl-4 align-bottom">
                    <span className="block font-display text-[20px] text-house-brown">{p.name}</span>
                    <span className="block font-sans text-[14px] text-house-brown/60">{p.price}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row) => (
                <tr key={row.label} className="border-b border-house-brown/10 align-top">
                  <th scope="row" className="py-4 pr-4 font-sans text-[15px] font-semibold text-house-brown">{row.label}</th>
                  {row.cells.map((c, i) => (
                    <td key={i} className="py-4 pl-4 font-sans text-[14px] leading-[1.5] text-house-brown/80">{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-[70ch] font-sans text-[13px] leading-[1.55] text-house-brown/55">
          Each paid plan includes everything in the plan below it. Connected
          features depend on supported integrations and the permissions you grant.
          Physical services are booked and priced separately under the
          provider&rsquo;s own terms.
        </p>
      </section>

      {/* Lifestyle band */}
      <section className="border-y border-house-brown/10 bg-[#f6efe7]">
        <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-[5vw] py-[clamp(48px,6vw,88px)] lg:grid-cols-2">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image src="/howa/new/life-reading.webp" alt="Someone reading with their dog in a calm, well-kept living room" fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" />
          </div>
          <div className="max-w-[46ch]">
            <h2 className="font-display text-[clamp(26px,3vw,40px)] leading-[1.1]">The same home, more useful over time.</h2>
            <p className="mt-5 font-sans text-[17px] leading-[1.6] text-house-brown/80">
              Whichever plan you choose, the useful information you keep should stay
              connected to the same home and household rather than starting again
              each month.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-house-brown text-house-cream">
        <div className="mx-auto max-w-[1000px] px-[5vw] py-[clamp(52px,7vw,96px)] text-center">
          <h2 className="mx-auto max-w-[20ch] font-display text-[clamp(30px,4vw,52px)] leading-[1.05]">Start with the home you have.</h2>
          <p className="mx-auto mt-5 max-w-[56ch] font-sans text-[17px] leading-[1.6] text-house-cream/80">
            Join early access and we will tell you when you can begin. Compare the
            plans now to see the level of help each is designed to offer.
          </p>
          <Link href={EARLY_ACCESS} className="mt-8 inline-block whitespace-nowrap px-8 py-3 text-center font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown bg-house-cream border border-house-cream no-underline transition-[filter] duration-[var(--t-slow)] ease-out hover:brightness-95">
            Join early access
          </Link>
        </div>
      </section>
    </main>
  );
}
