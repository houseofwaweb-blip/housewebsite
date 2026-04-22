import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { StateBadge } from "@/components/primitives/StateBadge";
import { GhostLink } from "@/components/primitives/GhostLink";
import { WaitlistMini } from "@/components/marketing/WaitlistMini";

export const metadata = {
  title: "HoWA Steward",
  description:
    "Managed home care by the House. Recurring Steward Plans, dedicated contact, quarterly reviews, one invoice. Coming soon.",
};

const FEATURES = [
  {
    numeral: "I.",
    title: "Steward Plans",
    body: "Gardening, cleaning, windows, gutters — bundled into one managed schedule. The House coordinates the partners, tracks every visit, and adjusts the rhythm to the season.",
  },
  {
    numeral: "II.",
    title: "Dedicated contact",
    body: "A named person at the House who knows your home. One call or message, not a call centre. They coordinate across all services and trades.",
  },
  {
    numeral: "III.",
    title: "Quarterly reviews",
    body: "Every three months, your contact reviews the home record: what's been done, what's due, what's changed. Priorities are adjusted, the plan is updated.",
  },
  {
    numeral: "IV.",
    title: "One invoice",
    body: "All services, all trades, all care — one predictable monthly invoice. No chasing individual suppliers. No spreadsheets.",
  },
];

export default function StewardPage() {
  return (
    <article className="text-house-brown">
      {/* Hero — blueprint mode */}
      <section
        className="bg-[#151e2b] text-house-cream px-[5vw] pt-[12vh] pb-20"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent 0 39px, rgba(184,148,62,0.06) 39px 40px), repeating-linear-gradient(90deg, transparent 0 39px, rgba(184,148,62,0.06) 39px 40px)",
        }}
      >
        <div className="max-w-[880px] mx-auto">
          <span className="block font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold-light mb-3">
            HoWA Steward
          </span>
          <h1 className="font-sans font-normal text-[clamp(44px,6vw,76px)] leading-[1.05] tracking-[-0.01em]">
            The home, <em className="italic font-light text-house-gold-light">managed.</em>
          </h1>
          <p className="font-sans text-[19px] leading-[1.6] text-house-cream/65 mt-6 max-w-[60ch]">
            Everything in HoWA+, plus managed recurring care. A dedicated House contact, quarterly reviews, and one monthly invoice across all services. The home gets better every season. You don&apos;t think about it.
          </p>
          <div className="mt-8">
            <StateBadge state="coming">Coming soon</StateBadge>
          </div>
        </div>
      </section>

      {/* What Steward means */}
      <section className="bg-house-white px-[5vw] py-20">
        <div className="max-w-[1100px] mx-auto">
          <Eyebrow colour="teal">What Steward means</Eyebrow>
          <h2 className="font-sans font-normal text-[clamp(28px,3.4vw,40px)] leading-[1.12] tracking-[-0.01em] text-house-brown mt-3 mb-12">
            Care that runs itself.
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {FEATURES.map((f) => (
              <div key={f.numeral} className="flex flex-col gap-3 border-t border-house-gold pt-5">
                <span className="font-display italic text-[12px] tracking-[0.18em] uppercase text-house-gold">
                  {f.numeral}
                </span>
                <h3 className="font-sans font-medium text-[20px] leading-[1.2] text-house-brown">
                  {f.title}
                </h3>
                <p className="font-sans text-[14px] leading-[1.6] text-house-stone">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example plan */}
      <section className="px-[5vw] py-16 border-t border-house-brown/8" style={{ background: "var(--howa-paper, #f4efe4)" }}>
        <div className="max-w-[720px] mx-auto">
          <Eyebrow colour="teal">Example</Eyebrow>
          <h2 className="font-sans font-normal text-[clamp(24px,3vw,34px)] leading-[1.15] text-house-brown mt-3 mb-8">
            What a Steward Plan looks like.
          </h2>
          <div className="bg-house-white border border-house-brown/10 p-8">
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <span className="block font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold mb-1">
                  Home & Garden+ · Comprehensive
                </span>
                <span className="font-sans font-medium text-[18px] text-house-brown">
                  4-bed detached, Oxfordshire
                </span>
              </div>
              <StateBadge state="coming">Example</StateBadge>
            </div>
            <ul className="space-y-2 mb-6">
              {[
                "Seasonal garden care (fortnightly, Mar–Oct)",
                "Weekly domestic cleaning (3 hours)",
                "External window cleaning (monthly)",
                "Gutter clear (bi-annual, spring + autumn)",
                "Quarterly deep clean (4 hours)",
              ].map((item) => (
                <li key={item} className="font-sans text-[14px] text-house-stone pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-house-gold">
                  {item}
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-house-brown/8">
              <span className="font-sans text-[13px] text-house-stone">
                Plans are built with you. Typical range:{" "}
                <span className="font-medium text-house-brown">from £300/month</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* HoWA+ vs Steward */}
      <section className="bg-house-white px-[5vw] py-16 border-t border-house-brown/8">
        <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <span className="block font-sans text-[10px] tracking-[0.22em] uppercase text-howa-teal mb-2">
              HoWA+
            </span>
            <h3 className="font-sans font-medium text-[22px] text-house-brown mb-3">
              Self-service stewardship.
            </h3>
            <p className="font-sans text-[15px] leading-[1.6] text-house-stone">
              You see the record, the recommendations, and the connections. You decide what to book and when. HoWA+ gives you the tools and the member pricing. You drive.
            </p>
            <div className="mt-4">
              <GhostLink href="/howa/plus">See HoWA+ →</GhostLink>
            </div>
          </div>
          <div>
            <span className="block font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold mb-2">
              Steward
            </span>
            <h3 className="font-sans font-medium text-[22px] text-house-brown mb-3">
              Managed stewardship.
            </h3>
            <p className="font-sans text-[15px] leading-[1.6] text-house-stone">
              The House sees the record, schedules the services, and ensures everything runs. Your dedicated contact handles the coordination. You don&apos;t think about it.
            </p>
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section className="bg-howa-navy text-house-cream px-[5vw] py-20">
        <div className="max-w-[640px] mx-auto">
          <span className="block font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold-light mb-3">
            Register for early access
          </span>
          <h2 className="font-sans font-normal text-[clamp(24px,3vw,36px)] leading-[1.15] text-house-cream mb-3">
            We&apos;re starting with waitlist customers.
          </h2>
          <p className="font-sans text-[15px] leading-[1.6] text-house-cream/65 mb-8">
            Steward capacity is limited by geography and team size. We&apos;re onboarding waitlist members first to set honest capacity before opening broadly.
          </p>
          <WaitlistMini
            product="steward"
            sourcePage="/howa/steward"
            placeholder="Your email"
            buttonLabel="Register interest"
            successMessage="Thank you. We'll write when Steward opens in your area."
          />
        </div>
      </section>

      {/* Tagline */}
      <div className="text-center border-t border-house-brown/10 bg-house-cream px-5 py-6">
        <p className="font-display italic text-[14px] text-house-stone tracking-[0.04em]">
          Ownership is passive. Stewardship is intentional.
        </p>
      </div>
    </article>
  );
}
