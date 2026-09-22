import type { Metadata } from "next";
import Link from "next/link";

/**
 * House Offers — holding page (finding 37). The individual offers are being
 * defined with their own terms (price, eligibility, dates, exclusions), so the
 * page no longer advertises offer claims it cannot yet stand behind. It points
 * visitors to the live ways to book instead. Restore the OffersGrid once each
 * offer has confirmed terms.
 */
export const metadata: Metadata = {
  title: "House Offers",
  description:
    "House offers are being prepared, each with its own clear terms. In the meantime, explore the House services, design and cover.",
};

export default function OffersPage() {
  return (
    <div className="bg-house-cream text-house-brown">
      {/* Hero */}
      <section className="px-[5vw] pt-20 pb-10">
        <div className="mx-auto max-w-[1160px]">
          <p className="font-sans text-[14px] tracking-[0.24em] uppercase text-house-gold-dark">
            House Offers
          </p>
          <h1 className="mt-4 max-w-[18ch] font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.04] text-house-ink">
            Offers are on their way.
          </h1>
          <p className="mt-6 max-w-[58ch] font-sans text-[21px] leading-[1.6] text-house-brown/80">
            We&rsquo;re preparing a considered set of packages and benefits, each
            with its own clear terms: what you get, who it is for, how it is
            priced, when it runs and anything it does not cover. We&rsquo;ll
            publish them here when they are ready, with nothing hidden.
          </p>
        </div>
      </section>

      {/* In the meantime */}
      <section
        className="px-[5vw] py-14"
        style={{ background: "var(--color-house-cream-dark)" }}
      >
        <div className="mx-auto max-w-[760px]">
          <p className="font-sans text-[14px] tracking-[0.2em] uppercase text-house-gold-dark">
            In the meantime
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.15] text-house-ink">
            Everything is available to book now.
          </h2>
          <p className="mt-5 font-sans text-[18.5px] leading-[1.65] text-house-brown/85">
            You don&rsquo;t need an offer to get started. Book any House service,
            explore garden and interior design, or ask us about cover, introduced
            by the House and arranged by Provenance.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/services"
              className="inline-block border border-house-brown/30 px-7 py-3 font-sans text-[14px] tracking-[0.16em] uppercase text-house-brown no-underline transition-colors hover:bg-house-brown hover:text-house-cream"
            >
              Explore services
            </Link>
            <Link
              href="/design"
              className="inline-block border border-house-brown/30 px-7 py-3 font-sans text-[14px] tracking-[0.16em] uppercase text-house-brown no-underline transition-colors hover:bg-house-brown hover:text-house-cream"
            >
              Design
            </Link>
            <Link
              href="/insurance"
              className="inline-block border border-house-brown/30 px-7 py-3 font-sans text-[14px] tracking-[0.16em] uppercase text-house-brown no-underline transition-colors hover:bg-house-brown hover:text-house-cream"
            >
              Insurance &amp; cover
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
