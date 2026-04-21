import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { StateBadge } from "@/components/primitives/StateBadge";
import { Accordion } from "@/components/primitives/Accordion";
import { WaitlistMini } from "@/components/marketing/WaitlistMini";
import { GhostLink } from "@/components/primitives/GhostLink";
import { env } from "@/lib/env";

/**
 * /insurance — House Approved Insurance.
 *
 * NOT "Provenance". This is the House's own insurance introduction service.
 * We are an introducer, not a broker — referrals go to FCA-regulated partners.
 * The House Approved seal means we have vetted the underwriter relationship
 * the same way we vet designers and service providers.
 *
 * The page is register-interest at launch (no live quoting). Structure is
 * designed to convert visitors into leads and build the waitlist.
 */

export const metadata = {
  title: "House Approved Insurance",
  description:
    "Insurance introduced by the House of Willow Alexander. Cover that understands period homes, collections, and the things a standard policy misses.",
};

const WHAT_WE_COVER = [
  {
    title: "The home itself",
    body: "Period features, listed fabric, outbuildings, annexes, and non-standard construction. Cover written for the building you actually own, not a cookie-cutter assumption.",
  },
  {
    title: "Contents & collections",
    body: "Fine art, antiques, wine, watches, jewellery, libraries. Valued properly, insured individually where it matters, with agreed-value clauses.",
  },
  {
    title: "Liability & legal",
    body: "Employer's liability for household staff, public liability for the property, legal expenses. One policy, one renewal.",
  },
  {
    title: "Gardens & grounds",
    body: "Mature planting, sculptures, external lighting, garden structures. The things that took years to establish and a single storm to damage.",
  },
];

const WHY_HOUSE_APPROVED = [
  {
    numeral: "I.",
    title: "A conversation, not a comparison site.",
    body: "You speak to a named underwriter who understands the home. No call-centre queue, no algorithm.",
  },
  {
    numeral: "II.",
    title: "Cover that fits the property.",
    body: "Period features, non-standard construction, heritage constraints. Your policy reflects how the house was built, not what a database guesses.",
  },
  {
    numeral: "III.",
    title: "Claims support via the House.",
    body: "If something happens, we help. We coordinate with your insurer, introduce loss adjusters, and make sure the claim doesn't stall.",
  },
  {
    numeral: "IV.",
    title: "Filed in HoWA.",
    body: "Your policy details, renewal dates, and valuation schedule live in your HoWA record. One less thing to remember, one more thing properly kept.",
  },
];

const FAQ_ITEMS = [
  {
    id: "fca",
    summary: "Are you an insurance broker?",
    body: (
      <p>
        No. The House acts as an introducer. We connect you with FCA-authorised
        partners who specialise in high-net-worth home cover. We don&apos;t
        advise on, arrange, or conduct regulated insurance activity.
      </p>
    ),
  },
  {
    id: "who",
    summary: "Who underwrites the policies?",
    body: (
      <p>
        Our House Approved insurance partners are FCA-regulated specialists in
        heritage homes and valuable contents. We name them at the point of
        introduction — not before — because the right underwriter depends on
        your home.
      </p>
    ),
  },
  {
    id: "cost",
    summary: "What does it cost?",
    body: (
      <p>
        Premiums depend on the property, its contents, and the level of cover.
        A typical London period house with collections might sit between
        £3,000 and £12,000 per year. You&apos;ll receive a firm quote from the
        underwriter before committing to anything.
      </p>
    ),
  },
  {
    id: "existing",
    summary: "Can you review my existing policy?",
    body: (
      <p>
        Yes. Register interest and we&apos;ll arrange a review alongside the
        introduction. Many clients find their current policy undervalues
        period features or excludes items they assumed were covered.
      </p>
    ),
  },
  {
    id: "claims",
    summary: "What happens if I need to make a claim?",
    body: (
      <p>
        The claim is handled by the insurer, but the House stays with you
        throughout. We help coordinate access, introduce vetted loss adjusters,
        and follow up until the matter resolves. You don&apos;t disappear into a
        queue.
      </p>
    ),
  },
  {
    id: "howa",
    summary: "How does this link to HoWA?",
    body: (
      <p>
        Your policy summary, renewal dates, and valuation schedule are filed
        in your HoWA home record. When a Protect Review flags something
        insurable, it routes straight to the insurance workflow.
      </p>
    ),
  },
];

export default function InsurancePage() {
  return (
    <article className="bg-house-cream text-house-brown">
      {/* Hero */}
      <section className="px-[5vw] pt-[12vh] pb-16">
        <div className="max-w-[880px] mx-auto">
          <Eyebrow>Protect · Insurance</Eyebrow>
          <h1 className="em-accent font-display font-medium text-[clamp(44px,6vw,80px)] leading-[1.05] tracking-[-0.01em] mt-4">
            House Approved <em>Insurance</em>.
          </h1>
          <p className="font-sans text-[19px] leading-[1.6] text-house-brown/75 mt-6 max-w-[62ch]">
            Cover that understands period homes, valuable contents, and the
            things a standard high-street policy quietly excludes. Introduced
            by the House, underwritten by FCA-regulated specialists we&apos;ve
            vetted to the same standard as every partner who carries the House
            Approved seal.
          </p>
          <div className="mt-8 flex items-center gap-4 flex-wrap">
            <StateBadge state="interest">Register interest</StateBadge>
            <span className="font-sans text-[12px] tracking-[0.08em] text-house-stone">
              Opening to HoWA+ members first
            </span>
          </div>
        </div>
      </section>

      {/* What we cover — 4-tile grid */}
      <section className="px-[5vw] py-20 bg-white border-t border-house-brown/10">
        <div className="max-w-[1200px] mx-auto">
          <Eyebrow>What we cover</Eyebrow>
          <h2 className="em-accent font-display font-medium text-[clamp(30px,3.8vw,46px)] leading-[1.12] mt-3 mb-12 max-w-[24ch]">
            Everything the home <em>actually holds</em>.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {WHAT_WE_COVER.map((item) => (
              <div
                key={item.title}
                className="bg-house-cream border border-house-brown/10 p-8"
              >
                <h3 className="font-display font-medium text-[24px] leading-[1.2] text-house-brown mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-[15px] leading-[1.6] text-house-stone">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why House Approved — 4-column value props */}
      <section className="px-[5vw] py-20 border-t border-house-brown/10">
        <div className="max-w-[1200px] mx-auto">
          <Eyebrow>Why House Approved</Eyebrow>
          <h2 className="em-accent font-display font-medium text-[clamp(30px,3.8vw,46px)] leading-[1.12] mt-3 mb-12 max-w-[26ch]">
            Not a comparison site. A <em>relationship</em>.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY_HOUSE_APPROVED.map((v) => (
              <div key={v.numeral} className="flex flex-col gap-3 border-t border-house-gold pt-5">
                <span className="font-display italic text-[12px] tracking-[0.18em] uppercase text-house-gold">
                  {v.numeral}
                </span>
                <h3 className="font-display font-medium text-[20px] leading-[1.2] text-house-brown">
                  {v.title}
                </h3>
                <p className="font-sans text-[14px] leading-[1.6] text-house-stone">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — House → insurer flow */}
      <section className="px-[5vw] py-20 bg-white border-t border-house-brown/10">
        <div className="max-w-[960px] mx-auto">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="em-accent font-display font-medium text-[clamp(28px,3.6vw,42px)] leading-[1.15] mt-3 mb-10 max-w-[24ch]">
            Three steps to <em>proper cover</em>.
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                n: "01",
                title: "Register interest",
                body: "Fill in the form below. We'll ask about the property, its contents, and any specific concerns. Takes two minutes.",
              },
              {
                n: "02",
                title: "Matched introduction",
                body: "We introduce you to a House Approved underwriter suited to your home and its contents. You speak directly to them.",
              },
              {
                n: "03",
                title: "Cover, filed in HoWA",
                body: "Once the policy is in place, the summary, renewal date, and valuation schedule land in your HoWA record. One less thing to track.",
              },
            ].map((step) => (
              <div key={step.n} className="flex flex-col gap-3 border-t border-house-gold pt-5">
                <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold">
                  {step.n}
                </span>
                <h3 className="font-display font-medium text-[22px] leading-[1.2]">
                  {step.title}
                </h3>
                <p className="font-sans text-[15px] leading-[1.6] text-house-stone">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Register interest form */}
      <section className="px-[5vw] py-20 bg-howa-navy text-house-cream">
        <div className="max-w-[720px] mx-auto">
          <span className="block mb-4 font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold-light">
            House Approved Insurance · Register interest
          </span>
          <h2 className="font-sans font-normal text-[clamp(28px,3.4vw,40px)] leading-[1.15] tracking-[-0.01em] text-house-cream mb-3">
            Opening to HoWA+ members first.
          </h2>
          <p className="font-sans text-[15px] leading-[1.6] text-house-cream/70 mb-8 max-w-[56ch]">
            Leave your email and we&apos;ll write when introductions open.
            Existing HoWA+ members go to the front of the list.
          </p>
          <WaitlistMini
            product="insurance"
            sourcePage="/insurance"
            placeholder="Your email"
            buttonLabel="Register interest"
            successMessage="Thank you. We'll write when insurance introductions open."
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-house-white px-[5vw] py-[72px] border-t border-house-brown/10">
        <div className="max-w-[760px] mx-auto">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="em-accent font-display font-medium text-[clamp(28px,3.6vw,42px)] leading-[1.15] mt-3 mb-8">
            About House Approved <em>Insurance</em>.
          </h2>
          <Accordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* Trust + Protect Review cross-sell */}
      <section className="px-[5vw] py-16 border-t border-house-brown/10">
        <div className="max-w-[1080px] mx-auto grid md:grid-cols-2 gap-14 items-start">
          <div>
            <Eyebrow>Also from Protect</Eyebrow>
            <h3 className="font-display font-medium text-[28px] leading-[1.2] mt-3 mb-3">
              Protect Review
            </h3>
            <p className="font-sans text-[15px] leading-[1.6] text-house-stone mb-5">
              A one-day in-person review of the property by House-vetted
              specialists. Condition survey, evidence pack, and a prioritised
              works list — all filed to HoWA and ready for the insurance
              conversation.
            </p>
            <GhostLink href="/protect#review">See Protect Review</GhostLink>
          </div>
          <div>
            <Eyebrow>Connected via HoWA</Eyebrow>
            <h3 className="font-display font-medium text-[28px] leading-[1.2] mt-3 mb-3">
              The living record
            </h3>
            <p className="font-sans text-[15px] leading-[1.6] text-house-stone mb-5">
              Your Protect Review evidence feeds directly into the insurance
              introduction. One conversation, one record, no starting from
              scratch.
            </p>
            <GhostLink href="/howa">See HoWA</GhostLink>
          </div>
        </div>
      </section>

      {/* FCA notice */}
      <section className="px-[5vw] py-10 bg-house-brown text-house-cream">
        <div className="max-w-[880px] mx-auto">
          <p className="font-sans text-[12px] leading-[1.6] text-house-cream/70">
            House of Willow Alexander acts as an introducer for insurance
            products. We do not advise on, arrange, or conduct regulated
            insurance activity. Introductions are passed to FCA-authorised
            partners for any subsequent discussion, quotation, or contract.
            See our{" "}
            <Link
              href="/legal/privacy"
              className="text-house-cream underline decoration-house-gold-light underline-offset-4"
            >
              privacy page
            </Link>{" "}
            for how your details are handled.
          </p>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-house-cream px-[5vw] py-[72px] text-center">
        <p className="mx-auto max-w-[600px] mb-7 font-display italic text-[22px] leading-[1.35] text-house-brown">
          Insurance that knows the difference between a sash window and a
          UPVC frame. That&apos;s the point.
        </p>
        <Link
          href="#register"
          className="inline-block px-[30px] py-[15px] font-sans text-[13px] tracking-[0.16em] uppercase no-underline bg-house-gold text-white border border-house-gold transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
        >
          Register interest
        </Link>
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
