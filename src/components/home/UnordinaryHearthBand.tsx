import Image from "next/image";
import Link from "next/link";

/**
 * UnordinaryHearthBand — homepage §12 + §13 (further-amendments brief), paired
 * side-by-side per the mockup's bottom band: The unOrdinary (campaign) on the
 * left, The Hearth (editorial) on the right. Two image cards, one CTA each.
 *
 * Copy from the brief. The unOrdinary points at /the-unordinary (the campaign
 * landing, brief §26). This Hearth teaser replaces the 3-article magazine spread
 * on the homepage to match the mockup; the full spread still lives at /the-hearth.
 *
 * IMAGE NOTE: the mockup's unOrdinary card uses a cosy dog-on-sofa shot; none
 * exists yet, so a cinematic campaign still stands in. Swap when supplied.
 */
type Card = { eyebrow: string; heading: string; copy: string; cta: string; href: string; image: string; alt: string };

const CARDS: Card[] = [
  {
    eyebrow: "The unOrdinary",
    heading: "Ordinary home. Particular people.",
    copy: "Meet the people, habits and homes that make ordinary life anything but.",
    cta: "Enter The unOrdinary →",
    href: "/the-unordinary",
    image: "/howa/cinema/the-post-room-still.webp",
    alt: "A cinematic scene from The unOrdinary: particular people in an ordinary British home",
  },
  {
    eyebrow: "The Hearth",
    heading: "Useful stories for a more interesting home.",
    copy: "Homes, gardens, people, food, design and the useful business of everyday life.",
    cta: "Read The Hearth →",
    href: "/the-hearth",
    image: "/home/hearth-card.webp",
    alt: "An editorial still life from The Hearth",
  },
];

export function UnordinaryHearthBand() {
  return (
    <section aria-label="The unOrdinary and The Hearth" className="bg-house-ink px-[clamp(16px,3vw,40px)] py-[clamp(28px,3.5vw,52px)]">
      <div className="mx-auto grid max-w-[1760px] gap-8 lg:grid-cols-2 lg:gap-7">
        {CARDS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            aria-label={c.cta}
            className="group relative block aspect-[16/10] overflow-hidden border border-house-cream/12 no-underline sm:aspect-[2/1] lg:aspect-[16/9]"
          >
            <Image src={c.image} alt={c.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition-transform duration-[var(--t-slow)] ease-out group-hover:scale-[1.03]" />
            <span aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(16,20,17,0.86) 0%, rgba(16,20,17,0.5) 45%, rgba(16,20,17,0.12) 82%)" }} />
            <div className="absolute inset-y-0 left-0 flex max-w-[78%] flex-col justify-center px-[clamp(28px,4.5vw,56px)] sm:max-w-[72%]">
              <span className="mb-3 block font-sans text-[clamp(11px,1vw,13px)] tracking-[0.26em] uppercase text-house-gold-light">
                {c.eyebrow}
              </span>
              <h2 className="font-display text-[clamp(26px,2.8vw,44px)] leading-[1.03] text-house-cream">
                {c.heading}
              </h2>
              <p className="mt-3 max-w-[36ch] font-sans text-[clamp(14px,1.3vw,18px)] leading-[1.5] text-house-cream/85">
                {c.copy}
              </p>
              <span className="mt-5 inline-block w-fit border-b border-house-cream/40 pb-1 font-sans text-[clamp(12px,1.1vw,14px)] tracking-[0.2em] uppercase text-house-cream transition-colors duration-[var(--t-base)] ease-out group-hover:border-house-gold-light group-hover:text-house-gold-light">
                {c.cta}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
