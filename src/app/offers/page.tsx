import type { Metadata } from "next";
import Link from "next/link";
import { OffersGrid } from "@/components/offers/OffersGrid";
import { OFFERS } from "./offers-data";

/**
 * House Offers — spec §14. A gathered set of considered packages and benefits,
 * presented as premium magazine advertisements in House brown, cream and gold.
 * Every card carries the full honest shape of an offer (included, eligibility,
 * price/saving basis, dates, exclusions, terms, one CTA). No fake scarcity,
 * countdowns or strike-through pricing.
 */
export const metadata: Metadata = {
  title: "House Offers",
  description:
    "Seasonal service packages, multi-service care, member benefits and selected cover offers from the House. Every offer shown in full, with nothing hidden.",
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
          <h1 className="mt-4 max-w-[16ch] font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.04] text-house-ink">
            Our current offers.
          </h1>
          <p className="mt-6 max-w-[58ch] font-sans text-[21px] leading-[1.6] text-house-brown/80">
            Packages, plans and benefits from across the House, all in one place.
            Tap any offer to see exactly what you get, who it is for, how it is
            priced, when it runs and anything it does not cover. No countdowns, no
            pressure.
          </p>
        </div>
      </section>

      {/* Offer grid */}
      <section className="px-[5vw] pb-16">
        <OffersGrid offers={OFFERS} />
      </section>

      {/* How offers work / honest note */}
      <section
        className="px-[5vw] py-14"
        style={{ background: "var(--color-house-cream-dark)" }}
      >
        <div className="mx-auto max-w-[760px]">
          <p className="font-sans text-[14px] tracking-[0.2em] uppercase text-house-gold-dark">
            How these offers work
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.15] text-house-ink">
            Straightforward, and easy to check.
          </h2>
          <p className="mt-5 font-sans text-[18.5px] leading-[1.65] text-house-brown/85">
            We only put an offer here if it saves you money or effort: a season done
            in one visit, a few services booked together, or a perk that comes with a
            My House account. The terms are set out plainly, and anything an offer
            does not cover is written on the offer itself, not hidden in the small
            print. Cover offers are introduced by Provenance. The House does not
            advise on or sell insurance.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/services"
              className="inline-block border border-house-brown/30 px-7 py-3 font-sans text-[14px] tracking-[0.16em] uppercase text-house-brown no-underline transition-colors hover:bg-house-brown hover:text-house-cream"
            >
              Explore services
            </Link>
            <Link
              href="/insurance"
              className="inline-block border border-house-brown/30 px-7 py-3 font-sans text-[14px] tracking-[0.16em] uppercase text-house-brown no-underline transition-colors hover:bg-house-brown hover:text-house-cream"
            >
              Insurance & cover
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
