import Link from "next/link";

/**
 * Household ownership marker for the /design routes (Directive v2 STEP 11).
 *
 * "Every /design route carries The Household -> The Designer breadcrumb and
 * marker. Design remains a detailed commercial and SEO route beneath The
 * Designer, not a peer primary-navigation world."
 *
 * Design is not a department of its own: it is the work The Designer owns. The
 * route stays for commercial and search intent, but a visitor landing here from
 * Google should still be able to see whose part of the House they are in, the
 * same way the service routes name their owning member.
 */
export function DesignerBreadcrumb({ current }: { current?: string }) {
  return (
    <nav aria-label="Breadcrumb" className="px-[5vw] pt-6 bg-house-cream">
      <ol className="mx-auto flex max-w-[1300px] flex-wrap items-center gap-2 p-0 m-0 list-none font-sans text-[11.5px] uppercase tracking-[0.14em] text-house-brown/55">
        <li>
          <Link href="/household" className="text-house-brown/55 no-underline hover:text-house-gold-ink">
            The Household
          </Link>
        </li>
        <li aria-hidden="true">·</li>
        <li>
          <Link href="/household/designer" className="text-house-gold-ink no-underline hover:opacity-75">
            The Designer
          </Link>
        </li>
        {current ? (
          <>
            <li aria-hidden="true">·</li>
            <li className="text-house-brown/80">{current}</li>
          </>
        ) : null}
      </ol>
    </nav>
  );
}
