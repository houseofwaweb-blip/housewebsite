import type { Metadata } from "next";
import Image from "next/image";
import { env } from "@/lib/env";
import { InsuranceEnquiryForm } from "@/components/insurance/InsuranceEnquiryForm";
import { CoverCards } from "@/components/insurance/CoverCards";
import { InsuranceTrustStrip } from "@/components/insurance/InsuranceTrustStrip";
import { ProvenanceLockup } from "@/components/insurance/ProvenanceLockup";
import { insuranceOg } from "@/lib/insurance/og";

/**
 * A2 · /insurance/private-client, the single most important conversion surface.
 * Built for one person: someone with a house worth insuring properly who has
 * never been asked a question about it. No advice language, no urgency; every
 * factual claim pending Provenance sign-off.
 */
export const metadata: Metadata = {
  title: "Private client & estate insurance, high-value homes",
  description: "Advised private-client insurance through Provenance for high-value, period and more complex homes, assets and estates. Introduced by the House.",
  ...insuranceOg("private-client", "Private client & estate insurance, high-value homes"),
};

const PROCESS = [
  { n: "01", h: "Send your current documents", p: "Your current schedule gives Provenance a useful starting point for the review." },
  { n: "02", h: "A specialist reviews the cover", p: "Provenance reviews the existing arrangements, the property and the assets that need protecting, then considers the available market." },
  { n: "03", h: "The market is searched", p: "Relevant specialist insurers can then be approached for terms suited to the risk." },
  { n: "04", h: "Claims handled on your behalf", p: "If the day comes, Provenance manages the claim for you, from first notification to settlement." },
];

const FAQ = [
  { q: "What does it cost to talk?", p: "Nothing. The introduction and the review are free; you only ever pay a premium if you decide to place cover." },
  { q: "Does it have to be everything at once?", p: "No. You can begin with the home or another specific risk and discuss whether it makes sense to bring more of the estate into the same relationship later." },
  { q: "What happens to my existing policy?", p: "It stays exactly as it is until you choose otherwise. Nothing is cancelled without your say-so." },
  { q: "When should I start?", p: "Start with enough time to review the existing cover and any alternatives before renewal. There is no benefit in leaving a specialist review until the final few days." },
];

export default function PrivateClient() {
  const turnstileSiteKey = env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  return (
    <div className="bg-house-cream text-house-brown">
      {/* Hero — editorial: the estate as one considered whole */}
      <section className="px-[5vw] pt-20 pb-12">
        <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="font-sans text-[14px] tracking-[0.28em] uppercase text-[color:var(--ins-ink)]">Insurance · Private client & estate</p>
            <h1 className="mt-4 font-display text-[clamp(35px,5vw,61px)] leading-[1.04] text-house-black">
              Private-client insurance for the home, its contents
              and the wider estate.
            </h1>
            <p className="mt-6 max-w-[54ch] font-sans text-[21px] leading-[1.62] text-house-stone">
              Provenance provides an advised service for private clients with more complex insurance needs, bringing the home, vehicles, collections and other assets into one broker relationship where appropriate.
            </p>
            <p className="mt-5 max-w-[48ch] font-display text-[clamp(21px,2vw,27px)] leading-[1.3] text-house-brown">
              A named broker. A detailed review. Cover arranged around the risks you actually have.
            </p>
            <div className="mt-8">
              <a href="#enquire" className="inline-flex items-center justify-center whitespace-nowrap border border-[color:var(--ins-dark)] bg-[var(--ins-accent)] px-7 py-3.5 font-sans text-[14px] tracking-[0.16em] uppercase text-[color:var(--ins-on)] no-underline transition-[filter] hover:brightness-110">
                Speak to a specialist
              </a>
            </div>
            <ProvenanceLockup className="mt-6" />
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/insurance/private-client-hero.webp"
              alt="A dark study desk laid with the pieces of one estate: a leather-bound Private Client estate volume, a framed manor-house portrait, a model stone house, a classic sports car, a tray of watch, cufflinks and jewellery, a dog collar, a compass and a confidential cover schedule."
              fill
              sizes="(min-width: 1120px) 520px, 90vw"
              priority
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </div>
      </section>

      {/* Speak to a specialist — the conversion surface, on its own */}
      <section id="enquire" className="scroll-mt-24 px-[5vw] pb-14">
        <div className="mx-auto max-w-[680px] border border-house-brown/15 bg-house-white p-7 sm:p-9">
          <h2 className="font-display text-[29px] leading-tight text-house-black">Speak to a specialist</h2>
          <p className="mt-2 mb-6 font-sans text-[18px] leading-[1.55] text-house-stone">Leave a few details and a Provenance specialist will contact you to begin the review.</p>
          <InsuranceEnquiryForm enquiryType="private-client" turnstileSiteKey={turnstileSiteKey} sourcePage="/insurance/private-client" />
        </div>
      </section>

      {/* Trust strip — dark green band */}
      <InsuranceTrustStrip />

      {/* What can be placed */}
      <section className="px-[5vw] py-12">
        <div className="mx-auto max-w-[1180px]">
          <h2 className="font-display text-[clamp(25px,2.8vw,37px)] leading-[1.12] text-house-black">One broker across the wider estate.</h2>
          <p className="mb-9 mt-4 max-w-[60ch] font-sans text-[20px] leading-[1.7] text-house-brown/85">
            Provenance’s private-client approach can bring several assets into one broker relationship, and in some cases one lifestyle policy and renewal date. The exact structure depends on the risks and insurer.
          </p>
          <ProvenanceLockup className="mb-9" />
          <CoverCards />
        </div>
      </section>

      {/* The specialist difference — green-tinted band (no "record the House holds") */}
      <section className="px-[5vw] py-12" style={{ background: "var(--color-house-cream-dark)" }}>
        <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="max-w-[600px]">
            <p className="font-sans text-[14px] tracking-[0.24em] uppercase text-[color:var(--ins-ink)]">Why use a private-client broker</p>
            <h2 className="mt-3 font-display text-[clamp(25px,2.8vw,37px)] leading-[1.12] text-house-black">The detail of the home matters.</h2>
            <p className="mt-4 font-sans text-[20px] leading-[1.7] text-house-brown/85">
              Period fabric, previous works, rebuild cost, valuable contents and other assets can all change the insurance requirement. Provenance’s Private Client service is advised, so a broker can assess those details, recommend suitable cover and review it again at renewal.
            </p>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/insurance/private-client-difference.webp"
              alt="A grand Jacobean stone manor house on a gravel drive with a green Aston Martin, a Range Rover, a saloon car and a wooden classic speedboat on a trailer, the house, cars and boat a single estate policy can hold together."
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
              { s: "Rebuild", l: "The cost to rebuild a home is not its market value, and for period or altered homes the gap can be wide." },
              { s: "Contents", l: "Valuables above the single-item limit need scheduling, or a claim can fall short." },
              { s: "Renewal", l: "Rebuild costs and the value of contents can change over time, so the cover should be reviewed at renewal." },
            ].map((e) => (
              <div key={e.s}>
                <p className="font-display text-[clamp(27px,2.8vw,39px)] leading-[1.1] text-house-gold-light">{e.s}</p>
                <p className="mt-2 font-sans text-[17px] leading-[1.5] text-house-cream/75">{e.l}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-[60ch] font-sans text-[19px] leading-[1.6] text-house-cream/85">
            Listed, high-value and altered homes can be especially difficult to insure accurately because rebuild costs may not track market value or general inflation. A specialist review can help establish a more appropriate figure.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-house-brown/10 px-[5vw] py-12">
        <div className="mx-auto max-w-[880px]">
          <h2 className="mb-8 font-display text-[clamp(25px,2.8vw,37px)] leading-[1.12] text-house-black">How it works, in four steps.</h2>
          <ol className="grid list-none gap-x-8 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((s) => (
              <li key={s.n} className="border-t border-house-brown/15 pt-4">
                <span className="font-display text-[23px] text-[color:var(--ins-ink)]">{s.n}</span>
                <h3 className="mt-1 font-sans text-[18px] font-semibold text-house-brown">{s.h}</h3>
                <p className="mt-2 font-sans text-[18px] leading-[1.55] text-house-brown/85">{s.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-house-brown/10 px-[5vw] py-12">
        <div className="mx-auto max-w-[760px]">
          <h2 className="mb-6 font-display text-[clamp(25px,2.8vw,37px)] leading-[1.12] text-house-black">Before you get in touch.</h2>
          <dl className="space-y-6">
            {FAQ.map((f) => (
              <div key={f.q} className="border-t border-house-brown/12 pt-5">
                <dt className="font-sans text-[19px] font-semibold text-house-brown">{f.q}</dt>
                <dd className="mt-2 font-sans text-[19px] leading-[1.65] text-house-brown/85">{f.p}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Enquiry repeated at foot */}
      <section id="enquire" className="scroll-mt-20 border-t border-house-brown/10 px-[5vw] py-14" style={{ background: "var(--color-house-cream-dark)" }}>
        <div className="mx-auto max-w-[620px]">
          <p className="font-sans text-[14px] tracking-[0.28em] uppercase text-[color:var(--ins-ink)]">Speak to a specialist</p>
          <h2 className="mt-3 mb-8 font-display text-[clamp(27px,3vw,41px)] leading-[1.1] text-house-black">Start with the home and what needs protecting.</h2>
          <InsuranceEnquiryForm enquiryType="private-client" turnstileSiteKey={turnstileSiteKey} sourcePage="/insurance/private-client" />
        </div>
      </section>
    </div>
  );
}
