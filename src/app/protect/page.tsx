import type { Metadata } from "next";
import Link from "next/link";
import { PROVENANCE } from "@/lib/insurance/config";
import { insuranceOg } from "@/lib/insurance/og";

/**
 * /protect — the boundary page (spec F3). Preserved deliberately: it has
 * existing rankings and it carries the House's boundary statement. It must never
 * describe the House as advising on, comparing or arranging insurance; it only
 * introduces. Routes on to the /insurance hub and how-this-works.
 *
 * NB: the original live-site opening copy was not held in this repo (it lived on
 * the production site). This reconstruction keeps the mandated boundary sentence
 * verbatim; swap in the exact original wording if you have it.
 */
export const metadata: Metadata = {
  title: "Protect — how the House protects what it knows",
  description:
    "House of Willow Alexander does not advise on, compare or arrange insurance. It introduces you to Provenance, a specialist broker regulated by the FCA, who do.",
  ...insuranceOg("protect", "The House protects what it knows"),
};

export default function Protect() {
  return (
    <div className="bg-house-cream text-house-brown">
      {/* The boundary statement, stated first and plainly. */}
      <section className="px-[5vw] pt-20 pb-12">
        <div className="mx-auto max-w-[820px]">
          <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-[color:var(--ins-ink)]">The House · Protect</p>
          <h1 className="mt-4 font-display text-[clamp(32px,5vw,60px)] leading-[1.04] text-house-black">
            The House protects what it knows.
          </h1>
          <p className="mt-6 max-w-[60ch] font-sans text-[19px] leading-[1.6] text-house-stone">
            House of Willow Alexander does not advise on, compare or arrange insurance. It introduces you to a specialist who does, and hands over what it already knows about your home so the cover can be built around it.
          </p>
        </div>
      </section>

      {/* Who arranges it, badged. */}
      <section className="border-t border-house-brown/10 px-[5vw] py-12" style={{ background: "var(--color-house-cream-dark)" }}>
        <div className="mx-auto max-w-[820px]">
          <p className="font-sans text-[12px] tracking-[0.28em] uppercase text-[color:var(--ins-ink)]">Who arranges it</p>
          <p className="mt-4 max-w-[62ch] font-sans text-[17px] leading-[1.7] text-house-brown/85">
            Cover is arranged and administered by {PROVENANCE.legalName}, authorised and regulated by the Financial Conduct Authority (FRN {PROVENANCE.frn}), part of the {PROVENANCE.group} group and owned in turn by {PROVENANCE.backer}, whose profits go to charitable causes. The House acts solely as an introducer.
          </p>
        </div>
      </section>

      {/* Onward routes. */}
      <section className="px-[5vw] py-14">
        <div className="mx-auto grid max-w-[980px] gap-6 sm:grid-cols-2">
          <Link href="/insurance" className="group flex flex-col justify-between border border-house-brown/15 bg-house-white p-8 no-underline">
            <div>
              <h2 className="font-display text-[clamp(22px,2.6vw,30px)] leading-[1.1] text-house-black group-hover:text-[color:var(--ins-ink)]">Insurance from the House</h2>
              <p className="mt-3 font-sans text-[15px] leading-[1.6] text-house-stone">Advised cover for homes worth insuring properly, and everyday cover for everything that does not need a conversation.</p>
            </div>
            <span className="mt-6 font-sans text-[12px] tracking-[0.16em] uppercase text-[color:var(--ins-ink)]">Explore insurance →</span>
          </Link>
          <Link href="/insurance/how-this-works" className="group flex flex-col justify-between border border-house-brown/15 bg-house-white p-8 no-underline">
            <div>
              <h2 className="font-display text-[clamp(22px,2.6vw,30px)] leading-[1.1] text-house-black group-hover:text-[color:var(--ins-ink)]">How this works, and how we are paid</h2>
              <p className="mt-3 font-sans text-[15px] leading-[1.6] text-house-stone">The arrangement with Provenance, and the share of commission the House receives, explained in plain language.</p>
            </div>
            <span className="mt-6 font-sans text-[12px] tracking-[0.16em] uppercase text-[color:var(--ins-ink)]">Read how it works →</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
