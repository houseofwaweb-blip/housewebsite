import Link from "next/link";

/**
 * MobileActionBar — the sticky action bar on mobile.
 *
 * REVISIONS v3 §3/§14: the mobile experience must preserve the service finder,
 * the call action AND My Home in HoWA. Fixed to the bottom of the viewport,
 * mobile only (hidden at lg). The retail Basket stays in the header, so it does
 * not compete with the service action here.
 */
export function MobileActionBar({
  ctaHref = "/services",
  ctaLabel = "Find a service",
  phone = "08000478738",
  myHomeHref = "https://accounts.willowalexander.co.uk/",
}: {
  ctaHref?: string;
  ctaLabel?: string;
  phone?: string;
  myHomeHref?: string;
}) {
  return (
    <div
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 flex gap-2 px-3 py-2.5 bg-house-cream/95 backdrop-blur border-t border-house-brown/15"
      style={{ paddingBottom: "calc(10px + env(safe-area-inset-bottom))" }}
    >
      <Link
        href={ctaHref}
        data-ga-event="booking_intent"
        data-ga-cta={ctaLabel}
        className="flex-1 text-center font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown bg-house-gold-ink border border-house-gold-dark py-3.5 no-underline"
      >
        {ctaLabel}
      </Link>
      <a
        href={`tel:${phone}`}
        aria-label="Call the House"
        className="shrink-0 font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown bg-house-white border border-house-brown/25 px-4 py-3.5 no-underline"
      >
        Call
      </a>
      <a
        href={myHomeHref}
        aria-label="Open My Home in HoWA"
        className="shrink-0 font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown bg-house-white border border-house-brown/25 px-4 py-3.5 no-underline"
      >
        My Home
      </a>
    </div>
  );
}
