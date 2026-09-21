import Image from "next/image";
import Link from "next/link";

/**
 * CategoryStrip — homepage five-entrance strip (brief §6), designed to the
 * further-amendments mockup: five WIDE landscape cards in a row, each a dark
 * image with a big serif title overlaid left, a small-caps sub-line and a
 * circular arrow. Copy from the brief; colours from the House palette.
 */
type Entry = { title: string; sub: string; href: string; image: string; alt: string };

const ENTRIES: Entry[] = [
  {
    title: "Services",
    sub: "A little help. A lot off your list.",
    href: "/services",
    image: "/home/services-card.webp",
    alt: "Home and garden services from the House",
  },
  {
    title: "Design",
    sub: "Spaces that feel like you.",
    href: "/design",
    image: "/home-v4/design-portrait.webp",
    alt: "A considered, characterful room designed by the House",
  },
  {
    title: "Insurance",
    sub: "Look after what you love.",
    href: "/insurance",
    image: "/insurance/cat-fine-art.webp",
    alt: "Fine art and treasured possessions, protected by specialist cover",
  },
  {
    title: "Shop the House",
    sub: "A more beautiful everyday.",
    href: "/shop",
    image: "/home/shop-objects.webp",
    alt: "A still life of characterful objects for home and garden",
  },
  {
    title: "The Hearth",
    sub: "Ideas for living well.",
    href: "/the-hearth",
    image: "/home/hearth-card.webp",
    alt: "An editorial still life from The Hearth",
  },
];

export function CategoryStrip() {
  return (
    <section aria-label="Explore the House" className="bg-house-cream px-[clamp(16px,3vw,40px)] py-[clamp(28px,3.5vw,48px)]">
      <div className="mx-auto grid max-w-[1760px] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {ENTRIES.map((e) => (
          <Link
            key={e.href}
            href={e.href}
            className="group relative block aspect-[4/3] overflow-hidden no-underline sm:aspect-[3/2]"
          >
            <Image src={e.image} alt={e.alt} fill sizes="(min-width:1024px) 20vw, (min-width:768px) 33vw, 50vw" className="object-cover transition-transform duration-[var(--t-slow)] ease-out group-hover:scale-[1.05]" />
            <span aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(24,30,24,0.82) 0%, rgba(24,30,24,0.45) 42%, rgba(24,30,24,0.08) 78%)" }} />
            <div className="absolute inset-0 flex flex-col justify-center p-[clamp(16px,1.4vw,24px)]">
              <h3 className="font-display text-[clamp(22px,1.7vw,30px)] leading-[1.02] text-house-cream">
                {e.title}
              </h3>
              <p className="mt-2 max-w-[16ch] font-sans text-[clamp(10px,0.72vw,11.5px)] uppercase tracking-[0.14em] leading-[1.5] text-house-cream/80">
                {e.sub}
              </p>
            </div>
            <span
              aria-hidden
              className="is-round absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-house-cream/60 text-[14px] text-house-cream transition-colors duration-[var(--t-base)] group-hover:border-house-gold-light group-hover:text-house-gold-light"
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
