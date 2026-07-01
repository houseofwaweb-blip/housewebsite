import Link from "next/link";

/**
 * HearthHowaHooks — the soft conversion module on Hearth articles (change brief
 * slide 14): turn editorial warmth into one quiet next action through HoWA.
 */
const HOOKS: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Save this guide to your HoWA seasonal plan", href: "/howa" },
  { label: "Book the mentioned service through HoWA", href: "#open-booking-form" },
  { label: "Check your HoWA Score", href: "/howa" },
  { label: "Housekeeper members get full archive access", href: "/howa/housekeeper" },
];

export function HearthHowaHooks() {
  return (
    <aside className="px-[5vw] py-12 border-t border-house-brown/12 bg-house-white">
      <div className="mx-auto max-w-[720px]">
        <p className="font-hearth-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-4">
          Take it further with HoWA
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
