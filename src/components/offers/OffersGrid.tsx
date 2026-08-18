"use client";

import * as React from "react";
import { OfferCard, type Offer } from "./OfferCard";
import { OfferModal } from "./OfferModal";

/**
 * OffersGrid — client shell for the House Offers page (spec §14). Renders the
 * compact, scannable cards in a responsive grid and owns the open/close state
 * for the full-detail OfferModal. Keeps focus honest: the card that opened the
 * modal is remembered and re-focused when the modal closes.
 */
export function OffersGrid({ offers }: { offers: Offer[] }) {
  const [activeOffer, setActiveOffer] = React.useState<Offer | null>(null);
  const triggerRef = React.useRef<HTMLElement | null>(null);

  const openOffer = React.useCallback((offer: Offer) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setActiveOffer(offer);
  }, []);

  const closeOffer = React.useCallback(() => {
    setActiveOffer(null);
    // Return focus to the card that opened the modal.
    triggerRef.current?.focus?.();
    triggerRef.current = null;
  }, []);

  return (
    <>
      <div className="mx-auto grid max-w-[1160px] gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {offers.map((offer) => (
          <OfferCard key={offer.slug} offer={offer} onOpen={openOffer} />
        ))}
      </div>
      <OfferModal offer={activeOffer} onClose={closeOffer} />
    </>
  );
}
