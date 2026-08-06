import Link from "next/link";

/**
 * HearthHowaHooks — the soft conversion module on Hearth articles.
 *
 * Aug 2026 eComm/Insurance refocus — Hearth articles route into the pillars the
 * House now leads with: the Marketplace, Insurance, Design and the service
 * businesses. No companion/HoWA promotion.
 */
const HOOKS: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Shop the Marketplace", href: "/shop" },
  { label: "Protect your home", href: "/insurance" },
  { label: "Find a home service", href: "/services" },
  { label: "Explore Design", href: "/design" },
];

export function HearthHowaHooks() {
  return (
    <aside className="px-[5vw] py-12 border-t border-house-brown/12 bg-house-white">
      <div className="mx-auto max-w-[720px]">
        <p className="font-hearth-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">
          Take it further with the House
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
          {HOOKS.map((h) =>
            h.href.startsWith("#") ? (
              <li key={h.label}>
                <a href={h.href} className="group inline-flex items-baseline gap-2 font-hearth-serif text-[17px] leading-snug text-house-black no-underline transition-colors hover:text-house-gold-ink">
                  <span aria-hidden className="text-house-gold-ink">→</span> {h.label}
                </a>
              </li>
            ) : (
              <li key={h.label}>
                <Link href={h.href} className="group inline-flex items-baseline gap-2 font-hearth-serif text-[17px] leading-snug text-house-black no-underline transition-colors hover:text-house-gold-ink">
                  <span aria-hidden className="text-house-gold-ink">→</span> {h.label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
    </aside>
  );
}
