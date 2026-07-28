import Link from "next/link";

/**
 * HearthHowaHooks — the soft conversion module on Hearth articles.
 *
 * DIRECTIVE §12 — Hearth articles should deepen the service, design, insurance
 * and Shop journeys through relevant in-article actions, NOT blanket HoWA
 * promotion. No HoWA Score, no tier/archive promise (that lives on howa.co.uk).
 */
const HOOKS: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Book the service mentioned here", href: "#open-booking-form" },
  { label: "Find related pieces in the Shop", href: "/shop" },
  { label: "Start a HoWA First Design for your home", href: "/design" },
  { label: "Keep this in your home record", href: "/howa" },
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
