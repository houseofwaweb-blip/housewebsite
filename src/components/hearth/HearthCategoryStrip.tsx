import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * HearthCategoryStrip — per variant-A: centred horizontal category nav.
 * Jost 11px, 0.18em tracking, uppercase. Active: gold text + gold underline.
 *
 * Labels match the WordPress taxonomy names exactly (including "The Latest"
 * for the index and "The Hearth Collection" for the editorial series).
 */

const STRIP = [
  { slug: "all", label: "The Latest", href: "/journal" },
  { slug: "interiors-styling", label: "Interiors & Styling", href: "/journal/category/interiors-styling" },
  { slug: "design-architecture", label: "Design & Architecture", href: "/journal/category/design-architecture" },
  { slug: "gardens-exteriors", label: "Gardens & Exteriors", href: "/journal/category/gardens-exteriors" },
  { slug: "colour-materials", label: "Colour & Materials", href: "/journal/category/colour-materials" },
  { slug: "heritage-culture", label: "Heritage & Culture", href: "/journal/category/heritage-culture" },
  { slug: "trends-inspiration", label: "Trends & Inspiration", href: "/journal/category/trends-inspiration" },
  { slug: "collection", label: "The Hearth Collection", href: "/journal/collection" },
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
              "font-hearth-sans text-[11px] font-normal tracking-[0.18em] uppercase no-underline py-1 transition-colors duration-[var(--t-base)] ease-out",
              active
                ? "text-house-gold border-b border-house-gold"
                : "text-house-black hover:text-house-gold",
            )}
          >
            {c.label}
          </Link>
        );
      })}
    </nav>
  );
}
