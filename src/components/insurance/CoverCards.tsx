import Image from "next/image";
import Link from "next/link";

/**
 * CoverCards — the five "what can be arranged" category cards, used on the
 * insurance hub and the private-client page. Each is a clickable card (image,
 * heading, one line, button) linking through to its specialist page. One source
 * so both pages stay in step.
 */
export const COVER_CARDS = [
  {
    heading: "The house",
    body: "Listed and period homes, thatch, non-standard construction, second and unoccupied homes.",
    image: "/insurance/cat-house.webp",
    imageAlt: "A period house, the kind of home the House insures on its true rebuild cost.",
    href: "/insurance/listed-buildings",
    cta: "Listed & period homes",
  },
  {
    heading: "The things in it",
    body: "Fine art, jewellery, watches, wine and collections, scheduled and valued properly.",
    image: "/insurance/cat-fine-art.webp",
    imageAlt: "Fine art and collected pieces, the contents a household policy tends to under-value.",
    href: "/insurance/fine-art-and-collections",
    cta: "Fine art & collections",
  },
  {
    heading: "The cars",
    body: "Classic, prestige and collection vehicles, on one renewal date with the home.",
    image: "/insurance/cat-cars.webp",
    imageAlt: "A classic car, of the kind kept and valued on one renewal date with the home.",
    href: "/insurance/classic-and-prestige-motor",
    cta: "Classic & prestige motor",
  },
  {
    heading: "The works",
    body: "One policy over the existing structure and the contract works, for the life of a project.",
    image: "/insurance/cat-works.webp",
    imageAlt: "A home under building work, insured under one policy over the existing structure and the contract works.",
    href: "/insurance/renovation-and-extension",
    cta: "Renovation & works",
  },
  {
    heading: "The boat, yacht or aircraft",
    body: "Marine and aviation cover, from a family boat to complex Lloyd's placements, arranged alongside the home.",
    image: "/insurance/boat-yacht-aviation.webp",
    imageAlt: "A classic yacht's brass and teak detail, the kind of asset arranged on one policy with the home.",
    href: "/insurance/boat-yacht-aviation",
    cta: "Boat, yacht & aviation",
  },
];

export function CoverCards() {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {COVER_CARDS.map((g) => (
        <Link
          key={g.heading}
          href={g.href}
          className="group flex w-full flex-col overflow-hidden border border-house-brown/12 bg-white no-underline transition-[border-color,box-shadow] hover:border-[color:var(--ins-ink)] hover:shadow-[0_14px_40px_-24px_rgba(0,0,0,0.4)] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={g.image}
              alt={g.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="font-display text-[22px] leading-[1.15] text-house-black transition-colors group-hover:text-[color:var(--ins-ink)]">{g.heading}</h3>
            <p className="mt-2 mb-7 font-sans text-[16px] leading-[1.6] text-house-brown/85">{g.body}</p>
            <span className="mt-auto inline-flex w-fit items-center justify-center whitespace-nowrap border border-[color:var(--ins-dark)] bg-[var(--ins-accent)] px-6 py-3 font-sans text-[12px] tracking-[0.16em] uppercase text-[color:var(--ins-on)] transition-[filter] group-hover:brightness-110">
              {g.cta} →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
