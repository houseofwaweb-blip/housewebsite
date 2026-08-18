import Image from "next/image";

/**
 * OfferCard — compact card (spec §7.3 card family 4 + §14). A short, scannable
 * "magazine advertisement": image, category eyebrow, title and a one-line
 * summary, with a "View offer" affordance. The full honest shape of the offer
 * (included, eligibility, price/saving basis, dates, exclusions, terms, one CTA)
 * lives in the OfferModal that opens when the card is activated — so mobile is a
 * short scannable list rather than long stacked walls of text.
 *
 * Governance (spec §14): never fake scarcity, no flashing countdowns, no
 * strike-through pricing without a genuine reference price, no vague "up to"
 * savings. Service colour appears ONLY as a thin accent when the offer belongs
 * to a single discipline; otherwise the card stays House brown/gold.
 */

export type Offer = {
  slug: string;
  /** Eyebrow, e.g. "Seasonal package" or "Cover offer". */
  category: string;
  title: string;
  summary: string;
  /** Visual header image (premium still-life or property photography). */
  image?: string;
  imageAlt?: string;
  /** What is included. */
  included: string[];
  /** Who is eligible. */
  eligibility: string;
  /** Price or saving basis. Honest, never a bare "up to" figure. */
  priceBasis: string;
  /** When the offer starts. */
  starts: string;
  /** When the offer ends. */
  ends: string;
  /** Exclusions / key limitations, never buried. */
  exclusions: string;
  /** Link to the full terms. */
  termsHref: string;
  cta: { label: string; href: string };
  /**
   * A CSS colour (usually a service token) for the thin top accent. Set only
   * where the offer belongs to a single discipline; omit for cross-House offers.
   */
  accent?: string;
};

export function OfferCard({
  offer,
  onOpen,
}: {
  offer: Offer;
  /** Open the full-detail modal for this offer. */
  onOpen: (offer: Offer) => void;
}) {
  return (
    <article className="h-full">
      <button
        type="button"
        onClick={() => onOpen(offer)}
        aria-haspopup="dialog"
        aria-label={`View offer: ${offer.title}`}
        className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden border border-house-brown/15 bg-house-cream text-left text-house-brown transition-colors duration-[var(--t-base)] ease-out hover:border-house-gold focus-visible:border-house-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-house-gold"
      >
        {/* Visual header — the offer, at a glance */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-house-ink">
          {offer.accent ? (
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 z-20 block h-1"
              style={{ background: offer.accent }}
            />
          ) : null}
          {offer.image ? (
            <Image
              src={offer.image}
              alt={offer.imageAlt ?? ""}
              fill
              sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 90vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-house-gold-dark">
            {offer.category}
          </p>
          <h3 className="mt-2.5 font-display text-[clamp(1.35rem,2vw,1.65rem)] leading-[1.12] text-house-ink">
            {offer.title}
          </h3>
          <p className="mt-2 line-clamp-2 font-sans text-[14px] leading-[1.5] text-house-brown/75">
            {offer.summary}
          </p>

          <span className="mt-auto inline-flex items-center gap-2 pt-6 font-sans text-[11px] tracking-[0.16em] uppercase text-house-brown">
            <span className="border-b border-house-gold pb-[3px] transition-colors group-hover:text-house-gold-ink">
              View offer
            </span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-[var(--t-base)] ease-out group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </span>
        </div>
      </button>
    </article>
  );
}
