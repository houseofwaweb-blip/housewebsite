import Link from "next/link";

/**
 * MobileActionBar — the sticky action bar on mobile.
 *
 * Aug 2026 strip-back: the HoWA account ("My Home") button is removed; the bar
 * now carries the service finder and the call action only. Fixed to the bottom
 * of the viewport, mobile only (hidden at lg). The retail Basket stays in the
 * header, so it does not compete with the service action here.
 */
export function MobileActionBar({
  ctaHref = "/insurance",
  ctaLabel = "Get covered",
  phone = "08000478738",
}: {
  ctaHref?: string;
  ctaLabel?: string;
  phone?: string;
}) {
  return (
    <div
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 flex gap-2 px-3 py-2.5 bg-house-cream/95 backdrop-blur border-t border-house-brown/15"
      style={{ paddingBottom: "calc(10px + env(safe-area-inset-bottom))" }}
    >
      <Link
        href={ctaHref}
        data-ga-event="cta_click"
        data-ga-cta={ctaLabel}
        className="flex-1 text-center font-sans text-[12px] tracking-[0.16em] uppercase text-house-cream border py-3.5 no-underline"
        style={{ background: "var(--house-green)", borderColor: "var(--house-green-deep)" }}
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
    </div>
  );
}
