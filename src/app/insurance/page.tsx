import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { env } from "@/lib/env";
import { RenewalReminderForm } from "@/components/insurance/RenewalReminderForm";
import { InsuranceDisclosure } from "@/components/insurance/InsuranceDisclosure";
import { CoverFinder } from "@/components/insurance/CoverFinder";
import { ProvenanceLockup } from "@/components/insurance/ProvenanceLockup";
import { WhyHouseCover } from "@/components/insurance/WhyHouseCover";
import { WhatMayBeCovered } from "@/components/insurance/WhatMayBeCovered";
import { ClaimsHelpBand } from "@/components/insurance/ClaimsHelp";
import { InsuranceCtaBand } from "@/components/insurance/InsuranceCtaBand";
import { Accordion } from "@/components/primitives/Accordion";
import { PROVENANCE } from "@/lib/insurance/config";
import { insuranceOg } from "@/lib/insurance/og";

/**
 * A1 · /insurance, the hub. Orientation and routing. Two doors: advised
 * private client (the lead) and everyday cover (enquiry-led). The argument once.
 * No product list above the fold. No comparison language. No urgency. HoWA
 * appears nowhere. Renewal-reminder capture as a tertiary CTA.
 */
export const metadata: Metadata = {
  title: "Insurance from the House",
  description:
    "Insurance introduced by House of Willow Alexander and arranged by Provenance, from home and personal cover to private-client and specialist risks.",
  ...insuranceOg("insurance", "Insurance from the House"),
};

export default function InsuranceHub() {
  const turnstileSiteKey = env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  return (
    <div className="bg-house-cream text-house-brown">
      {/* Hero, split: proposition left, the House's world right */}
      <section className="px-[5vw] pt-20 pb-14">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-sans text-[14px] tracking-[0.3em] uppercase text-[color:var(--ins-ink)]">The House · Insurance</p>
            <h1 className="mt-4 font-display text-[clamp(39px,6vw,75px)] leading-[1.02] text-house-black">
              Cover for the house. <em className="italic">And everyone who lives in it.</em>
            </h1>
            <p className="mt-6 max-w-[52ch] font-sans text-[22px] leading-[1.6] text-house-stone">
              From buildings and contents to private-client and specialist cover, the House helps you find the right route. The House makes the introduction and Provenance arranges the insurance.
            </p>
            <div className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:max-w-[460px]">
                <Link href="/insurance/private-client" className="inline-flex w-full items-center justify-center whitespace-nowrap border border-[color:var(--ins-dark)] bg-[var(--ins-accent)] px-7 py-3.5 font-sans text-[14px] tracking-[0.16em] uppercase text-[color:var(--ins-on)] no-underline transition-[filter] hover:brightness-110 sm:flex-1">
                  Speak to a specialist
                </Link>
                <Link href="/insurance/everyday" className="inline-flex w-full items-center justify-center whitespace-nowrap border border-house-brown/30 px-7 py-3.5 font-sans text-[14px] tracking-[0.16em] uppercase text-house-brown no-underline transition-colors hover:border-[color:var(--ins-ink)] sm:flex-1">
                  Everyday cover
                </Link>
              </div>
              <ProvenanceLockup className="mt-2" />
            </div>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/insurance/hub-hero.webp"
              alt="A cream Georgian townhouse facade in golden evening light: a columned black panelled door between lantern lights and clipped box topiary."
              fill
              sizes="(min-width: 1180px) 560px, 90vw"
              priority
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </div>
      </section>

      {/* Choose what to cover — the doc's Home / Pet / Home & Pet step */}
      <section className="px-[5vw] pb-4">
        <div className="mx-auto max-w-[1080px]">
          <p className="font-sans text-[14px] tracking-[0.28em] uppercase text-[color:var(--ins-ink)]">Choose what to cover</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Home", body: "Buildings and contents cover for houses, flats, period homes and more specialist properties.", href: "/insurance/everyday/home" },
              { label: "Pet", body: "Cover for cats, dogs and other eligible pets, with different levels to compare.", href: "/insurance/everyday/pet-and-travel" },
              { label: "Home and pet", body: "Start with the home and the pet, then follow the right route for each.", href: "/insurance/speak-to-a-specialist" },
            ].map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="group flex flex-col justify-between border border-house-brown/15 bg-house-white p-6 no-underline transition-[border-color] hover:border-[color:var(--ins-ink)]"
              >
                <div>
                  <h2 className="font-display text-[25px] leading-tight text-house-black group-hover:text-[color:var(--ins-ink)]">{c.label}</h2>
                  <p className="mt-2 font-sans text-[18px] leading-[1.55] text-house-stone">{c.body}</p>
                </div>
                <span className="mt-5 font-sans text-[13px] tracking-[0.16em] uppercase text-[color:var(--ins-ink)]">Cover {c.label.toLowerCase()} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Two doors */}
      <section className="px-[5vw] pb-14">
        <div className="mx-auto grid max-w-[1080px] gap-6 lg:grid-cols-5">
          {/* Advised, the lead, larger, warmer */}
          <Link href="/insurance/private-client" className="group flex flex-col justify-between border border-house-brown/15 bg-house-white p-8 no-underline lg:col-span-3">
            <div>
              <p className="font-sans text-[13px] tracking-[0.2em] uppercase text-[color:var(--ins-ink)]">Advised · Private client & estate</p>
              <h2 className="mt-3 font-display text-[clamp(27px,3vw,39px)] leading-[1.1] text-house-black group-hover:text-[color:var(--ins-ink)]">
                For homes and assets that need specialist advice.
              </h2>
              <p className="mt-4 max-w-[48ch] font-sans text-[19px] leading-[1.6] text-house-stone">
                Provenance provides an advised Private Client service for high-value, period and more complex risks, with a broker who can look across the wider estate.
              </p>
            </div>
            <span className="mt-6 font-sans text-[14px] tracking-[0.16em] uppercase text-[color:var(--ins-ink)]">Speak to a specialist →</span>
          </Link>
          {/* Everyday, enquiry-led, secondary */}
          <Link href="/insurance/everyday" className="group flex flex-col justify-between border border-house-brown/15 bg-house-cream-dark/40 p-8 no-underline lg:col-span-2">
            <div>
              <p className="font-sans text-[13px] tracking-[0.2em] uppercase text-[color:var(--ins-ink)]">Everyday cover</p>
              <h2 className="mt-3 font-display text-[clamp(25px,2.6vw,33px)] leading-[1.1] text-house-black group-hover:text-[color:var(--ins-ink)]">
                For the insurance needs of everyday life.
              </h2>
              <p className="mt-4 font-sans text-[18.5px] leading-[1.6] text-house-stone">
                Home, car, pet, travel and other personal cover, with the House making the introduction and Provenance arranging the insurance.
              </p>
            </div>
            <span className="mt-6 font-sans text-[14px] tracking-[0.16em] uppercase text-[color:var(--ins-ink)]">Everyday cover →</span>
          </Link>
        </div>
      </section>

      {/* Why House cover — benefit pillars, spec §11.3 */}
      <WhyHouseCover />

      {/* What may be covered — scannable examples + route to policy wording, spec §11.4 */}
      <WhatMayBeCovered />

      {/* Find your cover — self-serve search across every cover */}
      <section id="find-cover" className="scroll-mt-24 px-[5vw] py-14" style={{ background: "var(--color-house-cream-dark)" }}>
        <div className="mx-auto max-w-[1180px]">
          <p className="mb-2 font-sans text-[18.5px] leading-[1.6] text-house-brown/85">Know what you need? Find the relevant cover and the route that applies.</p>
          <CoverFinder />
        </div>
      </section>

      {/* What is not covered / key limitations — spec §11, never buried. */}
      <section className="px-[5vw] py-14">
        <div className="mx-auto max-w-[1080px] border-l-4 border-[color:var(--ins-accent)] bg-house-cream-dark/50 p-7 sm:p-9">
          <p className="font-sans text-[14px] tracking-[0.28em] uppercase text-[color:var(--ins-ink)]">Read this before you rely on cover</p>
          <h2 className="mt-3 max-w-[26ch] font-display text-[clamp(27px,3.4vw,43px)] leading-[1.1] text-house-black">
            What is not covered, and what to check.
          </h2>
          <p className="mt-4 max-w-[64ch] font-sans text-[18.5px] leading-[1.65] text-house-brown/85">
            Every policy has limits and exclusions. The examples below are a guide only, and the policy wording is what matters when you choose cover or make a claim.
          </p>
          <div className="mt-8 grid gap-x-10 gap-y-7 md:grid-cols-2">
            {[
              { h: "Wear, tear and gradual damage", p: "Wear, deterioration and damage that develops over time are generally maintenance matters rather than insured events." },
              { h: "Anything already known", p: "A loss, fault or condition that already exists when cover begins may be excluded." },
              { h: "Under-insurance", p: "If the sum insured is too low, a claim may be reduced. A home’s rebuild cost is different from its market value." },
              { h: "Limits and excesses", p: "Section limits, single-item limits and the excess all affect what may be paid. Higher-value belongings may need to be listed separately." },
              { h: "Unoccupied and let homes", p: "Cover can change when a home is left unoccupied for longer periods or is let to others, so the policy needs to reflect how the property is used." },
              { h: "The House does not advise", p: "The House introduces you to Provenance and does not advise on, arrange or decide your cover. The terms that bind are in the policy documents." },
            ].map((pt) => (
              <div key={pt.h} className="border-t border-[color:var(--ins-accent)]/40 pt-4">
                <h3 className="font-sans text-[17px] font-semibold tracking-[0.02em] text-[color:var(--ins-ink)]">{pt.h}</h3>
                <p className="mt-2 font-sans text-[19px] leading-[1.6] text-house-brown/85">{pt.p}</p>
              </div>
            ))}
          </div>
          <p className="mt-7 font-sans text-[15.5px] leading-[1.6] text-house-brown/70">
            The policy wording, key facts and exclusions are provided by Provenance before you commit to anything.
          </p>
        </div>
      </section>

      {/* Claims and help — prominent route for existing customers, spec §11.7 */}
      <ClaimsHelpBand />

      {/* The argument, once — dark burgundy anchor */}
      <section className="px-[5vw] py-14 text-house-cream" style={{ background: "var(--ins-accent)" }}>
        <div className="mx-auto grid max-w-[980px] items-center gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <p className="font-display text-[clamp(31px,4vw,47px)] leading-[1.1] text-[color:var(--house-green-soft)]">Rebuild cost</p>
            <p className="font-sans text-[18.5px] leading-[1.6] text-house-cream/80">
              A home’s rebuild cost is not the same as its market value. Period, altered and specialist properties can need a more detailed reinstatement assessment.
            </p>
          </div>
          <p className="max-w-[42ch] font-display text-[clamp(23px,2.4vw,31px)] leading-[1.3] text-house-cream">
            For homes that need specialist underwriting, accurate information about the building gives the broker and insurer a sound basis on which to assess the risk.
          </p>
        </div>
      </section>

      {/* Who arranges it */}
      <section className="border-t border-house-brown/10 px-[5vw] py-12">
        <div className="mx-auto max-w-[760px]">
          <p className="font-sans text-[14px] tracking-[0.28em] uppercase text-[color:var(--ins-ink)]">Who arranges it</p>
          <p className="mt-4 font-sans text-[20px] leading-[1.7] text-house-brown/85">
            Cover is arranged and administered by {PROVENANCE.legalName}, authorised and regulated by the FCA (FRN {PROVENANCE.frn}), part of {PROVENANCE.group} and the {PROVENANCE.backer} group. {PROVENANCE.backer} is charity-owned and gives its available profits to good causes. The House introduces you; it does not advise on, arrange, administer or compare insurance.
          </p>
          <ProvenanceLockup className="mt-6" />
          <Link href="/insurance/how-this-works" className="mt-6 inline-block font-sans text-[17px] tracking-[0.04em] text-[color:var(--ins-ink)] underline underline-offset-2 hover:text-house-brown">
            How this works, and how we are paid →
          </Link>
        </div>
      </section>

      {/* The published commitment */}
      <section className="px-[5vw] pb-14">
        <div className="mx-auto max-w-[760px] border-l-2 border-[color:var(--ins-ink)] pl-6">
          <p className="font-display text-[clamp(23px,2.6vw,33px)] leading-[1.3] text-house-brown">
            Take the time to understand the cover, the exclusions and the policy documents before you decide. There is no need to rush the decision.
          </p>
        </div>
      </section>

      {/* Frequently asked questions (spec §11.8) */}
      <section id="faqs" className="scroll-mt-24 border-t border-house-brown/10 px-[5vw] py-14">
        <div className="mx-auto max-w-[820px]">
          <p className="font-sans text-[14px] tracking-[0.28em] uppercase text-[color:var(--ins-ink)]">
            Good to know
          </p>
          <h2 className="mt-3 mb-8 font-display text-[clamp(27px,3vw,41px)] leading-[1.1] text-house-black">
            What to know before you arrange cover.
          </h2>
          <Accordion
            items={[
              {
                id: "faq-who",
                summary: "Who provides the insurance?",
                body: (
                  <p>
                    The House makes the introduction. Provenance is the
                    FCA-authorised firm that provides the regulated insurance
                    service and arranges the cover.
                  </p>
                ),
              },
              {
                id: "faq-what",
                summary: "What can I cover?",
                body: (
                  <p>
                    Home and pet, together or separately, plus motor, travel and
                    other personal cover. Private-client and specialist routes are
                    available where the risk needs a more detailed conversation.
                  </p>
                ),
              },
              {
                id: "faq-claim",
                summary: "How do I make a claim?",
                body: (
                  <p>
                    Claims and existing-policy help go directly to Provenance.
                    The claims route and contact details are set out in your
                    policy documents and in the Claims and help section.
                  </p>
                ),
              },
              {
                id: "faq-notcovered",
                summary: "What is not covered?",
                body: (
                  <p>
                    Every policy has limits and exclusions. These are set out
                    plainly before you decide, and in full in the policy wording.
                    Read them alongside what may be covered.
                  </p>
                ),
              },
              {
                id: "faq-pressure",
                summary: "Is there any pressure to buy?",
                body: (
                  <p>
                    No. Take the time to read the cover, exclusions and policy
                    documents and decide whether it is right for you.
                  </p>
                ),
              },
              {
                id: "faq-renewal",
                summary: "Can you remind me before my renewal?",
                body: (
                  <p>
                    Yes. Tell us your renewal month and we will send one email at
                    the right time. It is a reminder, not a newsletter.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* Strong closing CTA band — always an action before the footer */}
      <InsuranceCtaBand
        eyebrow="Find the right cover"
        heading="Start with what you need to insure."
        body="Choose the cover you need or speak to a specialist about more complex risks. The House makes the introduction and Provenance arranges the insurance."
        primaryLabel="Request a quote"
        primaryHref="/insurance/private-client"
        tertiary={{ label: "Everyday cover", href: "/insurance/everyday" }}
      />

      {/* Renewal reminder */}
      <section id="reminder" className="scroll-mt-20 border-t border-house-brown/10 px-[5vw] py-14" style={{ background: "var(--color-house-cream-dark)" }}>
        <div className="mx-auto max-w-[620px]">
          <p className="font-sans text-[14px] tracking-[0.28em] uppercase text-[color:var(--ins-ink)]">Not ready today?</p>
          <h2 className="mt-3 font-display text-[clamp(27px,3vw,39px)] leading-[1.1] text-house-black">Remind me before my renewal.</h2>
          <p className="mt-4 mb-7 max-w-[52ch] font-sans text-[19px] leading-[1.6] text-house-stone">
            Tell us your renewal month and we will send one email before it is due. It is a reminder, not a newsletter.
          </p>
          <RenewalReminderForm turnstileSiteKey={turnstileSiteKey} sourcePage="/insurance" />
        </div>
      </section>

      {/* Page-level disclosure */}
      <section className="px-[5vw] pb-16">
        <div className="mx-auto max-w-[760px]">
          <InsuranceDisclosure />
        </div>
      </section>
    </div>
  );
}
