import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * HearthCategoryStrip — per variant-A: centred horizontal category nav.
 * Jost 11px, 0.18em tracking, uppercase. Active: gold text + gold underline.
 *
 * Labels match the ACTUAL category each link resolves to (final September brief:
 * "align visible names with their actual contents"). The rebuild spec §13 also
 * wanted dedicated "Pets" and "The Useful List" sections, but the taxonomy has
 * no such categories yet, so we show the real category names for now. When a
 * Pets category and a Useful List/how-to category are added in Sanity and
 * articles retagged, add those entries and their real slugs here.
 */

// `slug` must equal the real Sanity category slug so activeSlug highlighting and
// the /the-hearth/category/[slug] route both resolve.
const STRIP = [
  { slug: "all", label: "The Latest", href: "/the-hearth" },
  { slug: "interiors-and-styling", label: "House & Home", href: "/the-hearth/category/interiors-and-styling" },
  { slug: "gardens-and-exteriors", label: "Garden", href: "/the-hearth/category/gardens-and-exteriors" },
  { slug: "heritage-and-culture", label: "Living Well", href: "/the-hearth/category/heritage-and-culture" },
  { slug: "trends-and-inspiration", label: "Trends & Inspiration", href: "/the-hearth/category/trends-and-inspiration" },
  { slug: "design-and-architecture", label: "Design & Architecture", href: "/the-hearth/category/design-and-architecture" },
  { slug: "cinema", label: "Cinema", href: "/cinema" },
];

export function HearthCategoryStrip({ activeSlug = "all" }: { activeSlug?: string }) {
  return (
    <nav
      aria-label="Hearth categories"
      className="bg-house-white px-[5vw] py-3 border-b border-house-brown/12 flex justify-center flex-wrap gap-7"
    >
      {STRIP.map((c) => {
        const active = c.slug === activeSlug;
        return (
          <Link
            key={c.slug}
            href={c.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "font-hearth-sans text-[14px] font-normal tracking-[0.18em] uppercase no-underline py-1 transition-colors duration-[var(--t-base)] ease-out",
              active
                ? "text-house-gold-ink border-b border-house-gold"
                : "text-house-black hover:text-house-gold-ink",
            )}
          >
            {c.label}
          </Link>
        );
      })}
    </nav>
  );
}
