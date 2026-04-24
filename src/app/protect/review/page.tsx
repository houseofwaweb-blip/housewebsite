import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { StateBadge } from "@/components/primitives/StateBadge";
import { GhostLink } from "@/components/primitives/GhostLink";
import { WaitlistMini } from "@/components/marketing/WaitlistMini";
import { getPageSections, cms } from "@/lib/cms/page-sections";

export const metadata = {
  title: "Protect Review",
  description:
    "A one-day in-person review by House-vetted specialists. Condition survey, evidence pack, and insurance-ready documentation for your home.",
};

export default async function ProtectReviewPage() {
  const sections = await getPageSections("protect-review");
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
              "Know the home before the home needs you.",
            )}
          </h1>
          <p className="font-sans text-[19px] leading-[1.6] text-house-brown/70 mt-6 max-w-[60ch]">
            {cms(
              s("hero"),
              "body",
              "A one-day in-person review by House-vetted specialists. A condition survey, an evidence pack, and insurance-ready documentation \u2014 filed to your HoWA record and ready for whatever comes next.",
            )}
          </p>
          <div className="mt-8 flex items-center gap-4 flex-wrap">
            <StateBadge state="coming">Coming soon</StateBadge>
            <span className="font-sans text-[12px] tracking-[0.08em] text-house-brown/70">
              Opening to HoWA+ members first
            </span>
          </div>
        </div>
      </section>

      {/* What the review covers */}
      <section className="px-[5vw] py-20 bg-white border-t border-house-brown/10">
        <div className="max-w-[1200px] mx-auto">
          <Eyebrow>What the review covers</Eyebrow>
          <h2 className="em-accent font-display font-medium text-[clamp(30px,3.8vw,46px)] leading-[1.12] mt-3 mb-12 max-w-[26ch]">
            {cms(
              s("covers"),
              "headline",
              "Everything the home quietly needs, surfaced in one day.",
            )}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Condition survey",
                body: "A thorough walk-through of the building \u2014 fabric, systems, access, security, damp, drainage. Carried out by House-vetted building surveyors who understand period homes.",
              },
              {
                title: "Evidence pack",
                body: "Photographs, detailed notes, and a prioritised works list. Everything documented, nothing left to memory. Filed to your HoWA record for ongoing reference.",
              },
              {
                title: "Insurance documentation",
                body: "Insurance-ready reports that sit alongside your cover. When the underwriter asks questions, the answers are already prepared and properly evidenced.",
              },
            ].map((item) => (
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
      <section className="px-[5vw] py-20 border-t border-house-brown/10">
        <div className="max-w-[1080px] mx-auto">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="em-accent font-display font-medium text-[clamp(28px,3.6vw,42px)] leading-[1.15] mt-3 mb-10 max-w-[24ch]">
            {cms(s("how"), "headline", "Four steps to a calmer home.")}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                n: "01",
                title: "Book",
                body: "Register interest and we\u2019ll arrange a date. The review fits into a single day \u2014 no disruption, no scaffolding.",
              },
              {
                n: "02",
                title: "Assess",
                body: "Our House-vetted specialist visits the property and conducts a full condition survey. You don\u2019t need to prepare anything.",
              },
              {
                n: "03",
                title: "Report",
                body: "Within a week, your evidence pack and prioritised works list arrive in your HoWA record. Clear, actionable, properly documented.",
              },
              {
                n: "04",
                title: "Act",
                body: "Where the review flags work, we introduce you to vetted specialists. Where it flags risk, it feeds directly into your insurance conversation.",
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

      {/* Waitlist */}
      <section className="px-[5vw] py-20 bg-white border-t border-house-brown/10">
        <div className="max-w-[720px] mx-auto">
          <Eyebrow>Register interest</Eyebrow>
          <h2 className="em-accent font-display font-medium text-[clamp(28px,3.6vw,42px)] leading-[1.15] mt-3 mb-3">
            {cms(
              s("waitlist"),
              "headline",
              "Opening in late 2026.",
            )}
          </h2>
          <p className="font-sans text-[16px] leading-[1.6] text-house-brown/70 mb-8 max-w-[56ch]">
            {cms(
              s("waitlist"),
              "body",
              "Leave your email and we\u2019ll write when the Protect Review opens. HoWA+ members go to the front of the list.",
            )}
          </p>
          <WaitlistMini
            product="protect_review"
            sourcePage="/protect/review"
            placeholder="Your email"
            buttonLabel="Register interest"
            successMessage="Thank you. We'll write when the Protect Review opens."
          />
        </div>
      </section>

      {/* Cross-sell: Insurance */}
      <section className="px-[5vw] py-16 border-t border-house-brown/10">
        <div className="max-w-[1080px] mx-auto grid md:grid-cols-2 gap-14 items-start">
          <div>
            <Eyebrow>Also from Protect</Eyebrow>
            <h3 className="font-display font-medium text-[28px] leading-[1.2] mt-3 mb-3">
              House Approved Insurance
            </h3>
            <p className="font-sans text-[15px] leading-[1.6] text-house-brown/70 mb-5">
              Cover that understands period homes, valuable contents, and the
              things a standard policy quietly excludes. Introduced by the House,
              underwritten by FCA-regulated specialists.
            </p>
            <GhostLink href="/protect/insurance">
              See House Approved Insurance
            </GhostLink>
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
          Prevention is quieter than repair. That&apos;s the point.
        </p>
      </div>
    </article>
  );
}
