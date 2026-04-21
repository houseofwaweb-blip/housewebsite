import Link from "next/link";

/**
 * HearthPromoStrip — per variant-A: thin black callout strip.
 * Jost 11px tracking 0.14em uppercase + Cormorant italic "New" tag.
 */
export function HearthPromoStrip() {
  return (
    <div className="bg-house-black text-house-white text-center px-[5vw] py-2">
      <p className="font-hearth-sans text-[11px] tracking-[0.14em] uppercase font-light">
        <em className="not-italic font-hearth-serif italic text-[13px] tracking-[0.02em] normal-case text-house-gold-light mr-2">
          New
        </em>
        Introducing HoWA+ — the editorial archive of The Hearth, plus member
        benefits across the House.{" "}
        <Link
          href="/howa/plans"
          className="text-house-gold-light underline decoration-house-gold-light/60 underline-offset-[3px] hover:decoration-house-gold-light"
        >
          Join for £16.99/month →
        </Link>
      </p>
    </div>
  );
}
