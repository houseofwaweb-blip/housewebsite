import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { env } from "@/lib/env";
import { RenewalReminderForm } from "@/components/insurance/RenewalReminderForm";
import { InsuranceDisclosure } from "@/components/insurance/InsuranceDisclosure";
import { CoverCards } from "@/components/insurance/CoverCards";
import { insuranceOg } from "@/lib/insurance/og";

/**
 * A1 · /insurance, the hub. Orientation and routing. Two doors: advised
 * private client (the lead) and everyday cover (self-serve). The argument once.
 * No product list above the fold. No comparison language. No urgency. HoWA
 * appears nowhere. Renewal-reminder capture as a tertiary CTA.
 */
export const metadata: Metadata = {
  title: "Insurance from the House",
  description:
    "Insurance introduced by House of Willow Alexander and arranged by Provenance. Advised cover for homes worth insuring properly, and everyday cover for everything that does not need a conversation.",
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
            <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-[color:var(--ins-ink)]">The House · Insurance</p>
            <h1 className="mt-4 font-display text-[clamp(36px,6vw,72px)] leading-[1.02] text-house-black">
              Covered. <em className="italic">And remembered.</em>
            </h1>
            <p className="mt-6 max-w-[52ch] font-sans text-[19px] leading-[1.6] text-house-stone">
              The House knows what your home is made of and what has been done to it. That is exactly what it takes to insure it properly. We introduce you to a specialist; the cover is arranged by Provenance.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/insurance/private-client" className="inline-flex items-center justify-center whitespace-nowrap border border-[color:var(--ins-dark)] bg-[var(--ins-accent)] px-7 py-3.5 font-sans text-[12px] tracking-[0.16em] uppercase text-[color:var(--ins-on)] no-underline transition-[filter] hover:brightness-110">
                Speak to a specialist
              </Link>
              <Link href="/insurance/everyday" className="inline-flex items-center justify-center whitespace-nowrap border border-house-brown/30 px-7 py-3.5 font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown no-underline transition-colors hover:border-[color:var(--ins-ink)]">
                Everyday cover
              </Link>
              <a href="#reminder" className="inline-flex items-center justify-center whitespace-nowrap px-2 py-3.5 font-sans text-[12px] tracking-[0.16em] uppercase text-[color:var(--ins-ink)] no-underline hover:text-house-brown">
                Remind me before my renewal →
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/insurance/hub-hero.webp"
              alt="An olive-green Georgian London townhouse with white sash windows, clipped box topiary and a black front door, framed by summer trees."
              fill
              sizes="(min-width: 1180px) 560px, 90vw"
              priority
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </div>
      </section>

      {/* Two doors */}
      <section className="px-[5vw] pb-14">
        <div className="mx-auto grid max-w-[1080px] gap-6 lg:grid-cols-5">
          {/* Advised, the lead, larger, warmer */}
          <Link href="/insurance/private-client" className="group flex flex-col justify-between border border-house-brown/15 bg-house-white p-8 no-underline lg:col-span-3">
            <div>
              <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-[color:var(--ins-ink)]">Advised · Private client</p>
              <h2 className="mt-3 font-display text-[clamp(24px,3vw,36px)] leading-[1.1] text-house-black group-hover:text-[color:var(--ins-ink)]">
                For a home worth insuring properly.
              </h2>
              <p className="mt-4 max-w-[48ch] font-sans text-[16px] leading-[1.6] text-house-stone">
                A named specialist, a conversation about the house, and a policy built around it rather than around a comparison engine. One estate, one renewal date.
              </p>
            </div>
            <span className="mt-6 font-sans text-[12px] tracking-[0.16em] uppercase text-[color:var(--ins-ink)]">Speak to a specialist →</span>
          </Link>
          {/* Everyday, self-serve, secondary */}
          <Link href="/insurance/everyday" className="group flex flex-col justify-between border border-house-brown/15 bg-house-cream-dark/40 p-8 no-underline lg:col-span-2">
            <div>
              <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-[color:var(--ins-ink)]">Everyday cover</p>
              <h2 className="mt-3 font-display text-[clamp(22px,2.6vw,30px)] leading-[1.1] text-house-black group-hover:text-[color:var(--ins-ink)]">
                For everything that does not need a conversation.
              </h2>
              <p className="mt-4 font-sans text-[15px] leading-[1.6] text-house-stone">
                Home, car, pet and travel, arranged online through the service Provenance operates.
              </p>
            </div>
            <span className="mt-6 font-sans text-[12px] tracking-[0.16em] uppercase text-[color:var(--ins-ink)]">Everyday cover →</span>
          </Link>
        </div>
      </section>

      {/* The argument, once — dark burgundy anchor */}
      <section className="px-[5vw] py-14 text-house-cream" style={{ background: "var(--ins-accent)" }}>
        <div className="mx-auto grid max-w-[980px] items-center gap-10 md:grid-cols-2">
          <div className="flex gap-6">
            <p className="font-display text-[clamp(56px,10vw,110px)] leading-none text-[color:var(--house-green-soft)]">70%</p>
            <p className="pt-3 font-sans text-[15px] leading-[1.6] text-house-cream/80">
              of UK properties are insured below their rebuild cost, at an average of 66% of what they should be. Rebuild costs rose around 40% between 2020 and 2024, and index-linking runs behind.
            </p>
          </div>
          <p className="max-w-[42ch] font-display text-[clamp(20px,2.4vw,28px)] leading-[1.3] text-house-cream">
            The House already knows what your home is made of. That is the difference between a guess and a figure.
          </p>
        </div>
        <p className="mx-auto mt-4 max-w-[980px] font-sans text-[11.5px] text-house-cream/55">Figures indicative and pending Provenance compliance sign-off.</p>
      </section>

      {/* What can be arranged, grouped by life, as cards */}
      <section className="px-[5vw] py-14">
        <div className="mx-auto max-w-[1180px]">
          <h2 className="mb-2 font-display text-[clamp(24px,3vw,38px)] leading-[1.1] text-house-black">What can be arranged</h2>
          <p className="mb-9 max-w-[56ch] font-sans text-[15px] leading-[1.6] text-house-stone">
            Five kinds of cover the House introduces, each arranged by Provenance. Start wherever your home does.
          </p>
          <CoverCards />
        </div>
      </section>

      {/* Who arranges it */}
      <section className="border-t border-house-brown/10 px-[5vw] py-12">
        <div className="mx-auto max-w-[760px]">
          <p className="font-sans text-[12px] tracking-[0.28em] uppercase text-[color:var(--ins-ink)]">Who arranges it</p>
          <p className="mt-4 font-sans text-[17px] leading-[1.7] text-house-brown/85">
            Cover is arranged and administered by Provenance, authorised and regulated by the FCA, part of the Benefact group, a charity-owned insurer whose profits go to charitable causes. The House introduces you; it does not advise on, arrange, administer or compare insurance.
          </p>
          <Link href="/insurance/how-this-works" className="mt-4 inline-block font-sans text-[13px] tracking-[0.04em] text-[color:var(--ins-ink)] underline underline-offset-2 hover:text-house-brown">
            How this works, and how we are paid →
          </Link>
        </div>
      </section>

      {/* The published commitment */}
      <section className="px-[5vw] pb-14">
        <div className="mx-auto max-w-[760px] border-l-2 border-[color:var(--ins-ink)] pl-6">
          <p className="font-display text-[clamp(20px,2.6vw,30px)] leading-[1.3] text-house-brown">
            No fear. No urgency. No pressure. We will not chase you, and we will not manufacture a deadline.
          </p>
        </div>
      </section>

      {/* Renewal reminder */}
      <section id="reminder" className="scroll-mt-20 border-t border-house-brown/10 px-[5vw] py-14" style={{ background: "var(--color-house-cream-dark)" }}>
        <div className="mx-auto max-w-[620px]">
          <p className="font-sans text-[12px] tracking-[0.28em] uppercase text-[color:var(--ins-ink)]">Not ready today?</p>
          <h2 className="mt-3 font-display text-[clamp(24px,3vw,36px)] leading-[1.1] text-house-black">Remind me before my renewal.</h2>
          <p className="mt-4 mb-7 max-w-[52ch] font-sans text-[16px] leading-[1.6] text-house-stone">
            Insurance is bought at one moment in the year, and most people miss it. Tell us your renewal month and we will send one email at the right time. Not a newsletter.
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
