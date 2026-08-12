import Link from "next/link";

/**
 * HouseCrossLinks — contextual cross-journey cards (DIRECTIVE §12: "Connect
 * products to real House service aftercare, a HoWA design output or Hearth
 * guidance only when the recommendation is useful and transparent").
 *
 * A small, honest band that moves a visitor from one House journey into a
 * relevant next one: inspiration (The Hearth), having work done (Services),
 * or a considered redesign (Design). Pass your own cards to re-theme per page.
 */
export interface CrossLinkCard {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  href: string;
}

/** Default set used on the Shop: guidance, aftercare, design output, Hearth. */
export const SHOP_CROSS_LINKS: CrossLinkCard[] = [
  {
    eyebrow: "Not sure?",
    title: "Planning work on your home?",
    body: "Tell the House the room and what you have in mind, and we will point you to the right service or studio, from a single visit to a full redesign.",
    cta: "Explore services",
    href: "/services",
  },
  {
    eyebrow: "Inspiration",
    title: "Looking for ideas?",
    body: "Home tours, room studies and seasonal notes from the House, with the pieces that make them.",
    cta: "Read The Hearth",
    href: "/the-hearth",
  },
  {
    eyebrow: "Aftercare",
    title: "Want the work done?",
    body: "The House books the gardeners, cleaners and specialists, and coordinates the whole job for you.",
    cta: "Book a service",
    href: "#open-booking-form",
  },
  {
    eyebrow: "Design",
    title: "Rethinking a room or garden?",
    body: "Start with a mapped HoWA First Design for £400, then continue with a named human studio.",
    cta: "Begin a design",
    href: "/design",
  },
];

export function HouseCrossLinks({
  heading = "While you are here",
  cards,
}: {
  heading?: string;
  cards: CrossLinkCard[];
}) {
  return (
    <section className="px-[5vw] py-[clamp(48px,6vw,88px)] border-t border-house-brown/10" style={{ background: "var(--color-house-cream)" }}>
      <div className="mx-auto max-w-[1180px]">
        <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink mb-8">
          {heading}
        </p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group flex flex-col border border-house-brown/12 bg-house-white p-7 no-underline transition-colors hover:border-house-gold"
            >
              <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-house-gold-ink mb-3">
                {c.eyebrow}
              </p>
              <h3 className="font-display text-[22px] leading-tight text-house-brown mb-2">
                {c.title}
              </h3>
              <p className="font-sans text-[14px] leading-[1.55] text-house-stone mb-6 flex-1">
                {c.body}
              </p>
              <span className="font-sans text-[12px] tracking-[0.2em] uppercase text-house-gold-ink transition-colors group-hover:text-house-brown">
                {c.cta} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
