import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { StateBadge } from "@/components/primitives/StateBadge";
import { GhostLink } from "@/components/primitives/GhostLink";
import { WaitlistMini } from "@/components/marketing/WaitlistMini";
import { getPageSections, cms } from "@/lib/cms/page-sections";

export const metadata = {
  title: "House Approved Insurance",
  description:
    "Insurance introduced by the House of Willow Alexander. Cover that understands period homes, collections, and the things a standard policy misses.",
};

const WHAT_PROVENANCE_OFFERS = [
  {
    title: "A named underwriter",
    body: "You speak to someone who understands the home. Not a call-centre queue, not an algorithm. A named specialist matched to your property type and its contents.",
  },
  {
    title: "Period home cover",
    body: "Period features, listed fabric, outbuildings, non-standard construction, heritage constraints. Your policy reflects how the house was built, not what a database guesses.",
  },
  {
    title: "Contents and collections",
    body: "Fine art, antiques, wine, watches, jewellery, libraries. Valued properly, insured individually where it matters, with agreed-value clauses.",
  },
  {
    title: "Claims support via the House",
    body: "If something happens, the House stays with you. We coordinate with your insurer, introduce vetted loss adjusters, and follow up until the matter resolves.",
  },
];

export default async function ProtectInsurancePage() {
  const sections = await getPageSections("protect-insurance");
  const s = (name: string) => sections.get(name);

  return (
    <article className="bg-house-cream text-house-brown">
      {/* Hero */}
      <section className="px-[5vw] pt-[12vh] pb-16">
        <div className="max-w-[880px] mx-auto">
          <Eyebrow>Protect</Eyebrow>
          <h1 className="em-accent font-display font-medium text-[clamp(44px,6vw,80px)] leading-[1.05] tracking-[-0.01em] mt-4">
            {cms(
              s("hero"),
              "headline",
              "Carefully protecting the things that matter.",
            )}
          </h1>
          <p className="font-sans text-[19px] leading-[1.6] text-house-brown/70 mt-6 max-w-[62ch]">
            {cms(
              s("hero"),
              "body",
              "Cover that understands period homes, valuable contents, and the things a standard high-street policy quietly excludes. Introduced by the House, underwritten by FCA-regulated specialists we\u2019ve vetted to the same standard as every partner who carries the House Approved seal.",
            )}
          </p>
          <div className="mt-8 flex items-center gap-4 flex-wrap">
            <StateBadge state="interest">Register interest</StateBadge>
            <span className="font-sans text-[12px] tracking-[0.08em] text-house-brown/70">
              Opening to HoWA+ members first
            </span>
          </div>
        </div>
      </section>

      {/* Trust intro */}
      <section className="px-[5vw] py-20 bg-white border-t border-house-brown/10">
        <div className="max-w-[880px] mx-auto">
          <Eyebrow>A thoughtful approach</Eyebrow>
          <h2 className="em-accent font-display font-medium text-[clamp(30px,3.8vw,46px)] leading-[1.12] mt-3 mb-6 max-w-[26ch]">
            {cms(
              s("approach"),
              "headline",
              "Insurance as part of a wider ecosystem of care.",
            )}
          </h2>
          <p className="font-sans text-[17px] leading-[1.7] text-house-brown/70 max-w-[58ch]">
            {cms(
              s("approach"),
              "body",
              "Most insurance is sold in isolation \u2014 policies stacked, renewed blindly, rarely revisited. The House approach is different. Insurance here is designed as part of a connected relationship with the home: how it\u2019s lived in, maintained, and looked after over time.",
            )}
          </p>
          <ul className="flex flex-col gap-2 mt-6">
            {[
              "Not more paperwork.",
              "Not more panic.",
              "Just quieter reassurance, when it\u2019s needed.",
            ].map((line) => (
              <li
                key={line}
                className="relative pl-5 font-sans italic text-[15px] leading-[1.55] text-house-brown/70 before:content-['\u2014'] before:absolute before:left-0 before:text-house-gold"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What Provenance offers */}
      <section className="px-[5vw] py-20 border-t border-house-brown/10">
        <div className="max-w-[1200px] mx-auto">
          <Eyebrow>What the House offers</Eyebrow>
          <h2 className="em-accent font-display font-medium text-[clamp(30px,3.8vw,46px)] leading-[1.12] mt-3 mb-12 max-w-[26ch]">
            {cms(
              s("offers"),
              "headline",
              "A conversation, not a comparison site.",
            )}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {WHAT_PROVENANCE_OFFERS.map((item) => (
              <div
                key={item.title}
                className="bg-house-cream border border-house-brown/10 p-8"
              >
                <h3 className="font-display font-medium text-[24px] leading-[1.2] text-house-brown mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-[15px] leading-[1.6] text-house-brown/70">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-[5vw] py-20 bg-white border-t border-house-brown/10">
        <div className="max-w-[960px] mx-auto">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="em-accent font-display font-medium text-[clamp(28px,3.6vw,42px)] leading-[1.15] mt-3 mb-10 max-w-[24ch]">
            {cms(s("how"), "headline", "Three steps to proper cover.")}
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                n: "01",
                title: "Register interest",
                body: "Fill in the form below. We\u2019ll ask about the property, its contents, and any specific concerns. Takes two minutes.",
              },
              {
                n: "02",
                title: "Matched introduction",
                body: "We introduce you to a House Approved underwriter suited to your home. You speak directly to a named specialist, not a comparison engine.",
              },
              {
                n: "03",
                title: "Cover, filed in HoWA",
                body: "Once the policy is in place, the summary, renewal date, and valuation schedule land in your HoWA record. One less thing to track.",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="flex flex-col gap-3 border-t border-house-gold pt-5"
              >
                <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-gold-dark">
                  {step.n}
                </span>
                <h3 className="font-display font-medium text-[22px] leading-[1.2]">
                  {step.title}
                </h3>
                <p className="font-sans text-[15px] leading-[1.6] text-house-brown/70">
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
            House Approved Insurance
          </span>
          <h2 className="font-sans font-normal text-[clamp(28px,3.4vw,40px)] leading-[1.15] tracking-[-0.01em] text-house-cream mb-3">
            {cms(
              s("waitlist"),
              "headline",
              "Opening to HoWA+ members first.",
            )}
          </h2>
          <p className="font-sans text-[15px] leading-[1.6] text-house-cream/70 mb-8 max-w-[56ch]">
            {cms(
              s("waitlist"),
              "body",
              "Leave your email and we\u2019ll write when introductions open. Existing HoWA+ members go to the front of the list.",
            )}
          </p>
          <WaitlistMini
            product="insurance"
            sourcePage="/protect/insurance"
            placeholder="Your email"
            buttonLabel="Register interest"
            successMessage="Thank you. We'll write when insurance introductions open."
          />
        </div>
      </section>

      {/* FCA compliance notice */}
      <section className="px-[5vw] py-10 bg-house-brown text-house-cream">
        <div className="max-w-[880px] mx-auto">
          <p className="font-sans text-[12px] leading-[1.6] text-house-cream/75">
            HoWA acts as an introducer only. Insurance products arranged via
            Provenance Insurance Brokers, authorised and regulated by the FCA.
            We do not advise on, arrange, or conduct regulated insurance
            activity. Introductions are passed to FCA-authorised partners for
            any subsequent discussion, quotation, or contract. See our{" "}
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

      {/* Cross-sell: Protect Review */}
      <section className="px-[5vw] py-16 border-t border-house-brown/10">
        <div className="max-w-[1080px] mx-auto grid md:grid-cols-2 gap-14 items-start">
          <div>
            <Eyebrow>Also from Protect</Eyebrow>
            <h3 className="font-display font-medium text-[28px] leading-[1.2] mt-3 mb-3">
              Protect Review
            </h3>
            <p className="font-sans text-[15px] leading-[1.6] text-house-brown/70 mb-5">
              A one-day in-person review of the property by House-vetted
              specialists. Condition survey, evidence pack, and a prioritised
              works list \u2014 all filed to HoWA and ready for the insurance
              conversation.
            </p>
            <GhostLink href="/protect/review">See Protect Review</GhostLink>
          </div>
          <div>
            <Eyebrow>Connected via HoWA</Eyebrow>
            <h3 className="font-display font-medium text-[28px] leading-[1.2] mt-3 mb-3">
              The living record
            </h3>
            <p className="font-sans text-[15px] leading-[1.6] text-house-brown/70 mb-5">
              Your Protect Review evidence feeds directly into the insurance
              introduction. One conversation, one record, no starting from
              scratch.
            </p>
            <GhostLink href="/howa">See HoWA</GhostLink>
          </div>
        </div>
      </section>

      {/* Tagline */}
      <div className="text-center border-t border-house-brown/10 bg-house-cream px-5 py-6">
        <p className="font-display italic text-[14px] text-house-brown/70 tracking-[0.04em]">
          Ownership is passive. Stewardship is intentional.
        </p>
      </div>
    </article>
  );
}
