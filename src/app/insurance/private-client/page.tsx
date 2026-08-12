import type { Metadata } from "next";
import Image from "next/image";
import { env } from "@/lib/env";
import { InsuranceEnquiryForm } from "@/components/insurance/InsuranceEnquiryForm";
import { CoverCards } from "@/components/insurance/CoverCards";
import { insuranceOg } from "@/lib/insurance/og";

/**
 * A2 · /insurance/private-client, the single most important conversion surface.
 * Built for one person: someone with a house worth insuring properly who has
 * never been asked a question about it. No advice language, no urgency; every
 * factual claim pending Provenance sign-off.
 */
export const metadata: Metadata = {
  title: "Private client insurance, high-value homes",
  description: "Advised, arranged insurance for high-value and period homes: a named specialist, a policy built around the house, one estate on one renewal date. Introduced by the House, arranged by Provenance.",
  ...insuranceOg("private-client", "Private client insurance, high-value homes"),
};

const PROCESS = [
  { n: "01", h: "Send your current documents", p: "Your existing schedule is enough to begin. Nothing is asked of you that you do not already have." },
  { n: "02", h: "A specialist reviews and benchmarks", p: "Provenance reviews the cover, checks it against the rebuild reality of your home, and benchmarks the premium." },
  { n: "03", h: "The market is searched", p: "The right specialist markets are approached, rather than a single comparison table." },
  { n: "04", h: "Claims handled on your behalf", p: "If the day comes, Provenance manages the claim for you, from first notification to settlement." },
];

const FAQ = [
  { q: "What does it cost to talk?", p: "Nothing. The introduction and the review are free; you only ever pay a premium if you decide to place cover." },
  { q: "Does it have to be everything at once?", p: "No. You can start with the house and add the rest over time, or move a single risk that a standard insurer has struggled with." },
  { q: "What happens to my existing policy?", p: "It stays exactly as it is until you choose otherwise. Nothing is cancelled without your say-so." },
  { q: "When should I start?", p: "The unhurried window is roughly 15 to 25 days before renewal. Earlier than that and you are quoting too soon; later and it is a rush." },
];

export default function PrivateClient() {
  const turnstileSiteKey = env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  return (
    <div className="bg-house-cream text-house-brown">
      {/* Hero + form (form above the fold on mobile) */}
      <section className="px-[5vw] pt-20 pb-12">
        <div className="mx-auto grid max-w-[1080px] gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="font-sans text-[12px] tracking-[0.28em] uppercase text-[color:var(--ins-ink)]">Insurance · Private client</p>
            <h1 className="mt-4 font-display text-[clamp(32px,5vw,58px)] leading-[1.04] text-house-black">
              A house worth insuring properly deserves to be asked about.
            </h1>
            <p className="mt-6 max-w-[54ch] font-sans text-[18px] leading-[1.62] text-house-stone">
              Advised means three things: a named specialist, a real conversation about the house, and a policy built around it rather than around a comparison engine. One estate, one renewal date.
            </p>
            <p className="mt-5 max-w-[48ch] font-display text-[clamp(18px,2vw,24px)] leading-[1.3] text-house-brown">
              Insurance built around you. Structured properly, managed personally.
            </p>
          </div>
          <div className="border border-house-brown/15 bg-house-white p-7">
            <h2 className="font-display text-[24px] leading-tight text-house-black">Speak to a specialist</h2>
            <p className="mt-2 mb-6 font-sans text-[15px] leading-[1.55] text-house-stone">Five details, and a specialist will call. Nothing about sums insured or your current insurer.</p>
            <InsuranceEnquiryForm enquiryType="private-client" turnstileSiteKey={turnstileSiteKey} sourcePage="/insurance/private-client" />
          </div>
        </div>
      </section>

      {/* What can be placed */}
      <section className="border-t border-house-brown/10 px-[5vw] py-12">
        <div className="mx-auto max-w-[1180px]">
          <h2 className="font-display text-[clamp(22px,2.8vw,34px)] leading-[1.12] text-house-black">One lifestyle policy, one renewal date.</h2>
          <p className="mb-9 mt-4 max-w-[60ch] font-sans text-[17px] leading-[1.7] text-house-brown/85">
            Provenance's proposition treats the estate as one thing rather than a folder of separate policies. Each of these can sit within it:
          </p>
          <CoverCards />
        </div>
      </section>

      {/* The specialist difference — green-tinted band (no "record the House holds") */}
      <section className="px-[5vw] py-12" style={{ background: "var(--color-house-cream-dark)" }}>
        <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="max-w-[600px]">
            <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-[color:var(--ins-ink)]">The difference the House brings</p>
            <h2 className="mt-3 font-display text-[clamp(22px,2.8vw,34px)] leading-[1.12] text-house-black">A policy built on the house, not a form.</h2>
            <p className="mt-4 font-sans text-[17px] leading-[1.7] text-house-brown/85">
              A specialist can only insure a home as well as it is described. That is why the House introduces you to one who takes the time: the lime mortar, the rewire, the chimney lining, the things worth scheduling. Describing those properly is the difference between a home a specialist can price with confidence and one they have to guess at. And because a specialist relationship is ongoing, sums insured and reinstatement costs are reviewed every renewal, not only when a claim forces the question.
            </p>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/insurance/private-client.webp"
              alt="A sage-green period country house at sunset, its windows and portico draped in wisteria above a cottage garden of foxgloves and hydrangeas, a home a specialist can describe in full."
              fill
              sizes="(min-width: 1120px) 480px, 90vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </div>
      </section>

      {/* Underinsurance evidence — dark burgundy anchor */}
      <section className="px-[5vw] py-14 text-house-cream" style={{ background: "var(--ins-accent)" }}>
        <div className="mx-auto max-w-[880px]">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { s: "70%", l: "of UK properties insured below rebuild cost" },
              { s: "66%", l: "the average level they are insured at" },
              { s: "40%", l: "rise in rebuild costs, 2020 to 2024" },
            ].map((e) => (
              <div key={e.l}>
                <p className="font-display text-[clamp(28px,3.4vw,44px)] leading-none text-house-gold-light">{e.s}</p>
                <p className="mt-2 font-sans text-[14px] leading-[1.5] text-house-cream/75">{e.l}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 font-sans text-[11.5px] text-house-cream/55">Figures indicative and pending Provenance compliance sign-off.</p>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-house-brown/10 px-[5vw] py-12">
        <div className="mx-auto max-w-[880px]">
          <h2 className="mb-8 font-display text-[clamp(22px,2.8vw,34px)] leading-[1.12] text-house-black">How it works, in four steps.</h2>
          <ol className="grid list-none gap-x-8 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((s) => (
              <li key={s.n} className="border-t border-house-brown/15 pt-4">
                <span className="font-display text-[20px] text-[color:var(--ins-ink)]">{s.n}</span>
                <h3 className="mt-1 font-sans text-[15px] font-semibold text-house-brown">{s.h}</h3>
                <p className="mt-2 font-sans text-[15px] leading-[1.55] text-house-brown/85">{s.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-house-brown/10 px-[5vw] py-12">
        <div className="mx-auto max-w-[760px]">
          <h2 className="mb-6 font-display text-[clamp(22px,2.8vw,34px)] leading-[1.12] text-house-black">Before you get in touch.</h2>
          <dl className="space-y-6">
            {FAQ.map((f) => (
              <div key={f.q} className="border-t border-house-brown/12 pt-5">
                <dt className="font-sans text-[16px] font-semibold text-house-brown">{f.q}</dt>
                <dd className="mt-2 font-sans text-[16px] leading-[1.65] text-house-brown/85">{f.p}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Enquiry repeated at foot */}
      <section id="enquire" className="scroll-mt-20 border-t border-house-brown/10 px-[5vw] py-14" style={{ background: "var(--color-house-cream-dark)" }}>
        <div className="mx-auto max-w-[620px]">
          <p className="font-sans text-[12px] tracking-[0.28em] uppercase text-[color:var(--ins-ink)]">Speak to a specialist</p>
          <h2 className="mt-3 mb-8 font-display text-[clamp(24px,3vw,38px)] leading-[1.1] text-house-black">A conversation about the house.</h2>
          <InsuranceEnquiryForm enquiryType="private-client" turnstileSiteKey={turnstileSiteKey} sourcePage="/insurance/private-client" />
        </div>
      </section>
    </div>
  );
}
