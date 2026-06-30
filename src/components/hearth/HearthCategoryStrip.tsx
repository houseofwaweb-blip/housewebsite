import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * HearthCategoryStrip — per variant-A: centred horizontal category nav.
 * Jost 11px, 0.18em tracking, uppercase. Active: gold text + gold underline.
 *
 * Labels match the WordPress taxonomy names exactly (including "The Latest"
 * for the index and "The Hearth Collection" for the editorial series).
 */

// Slugs match the Sanity `articleCategory` slugs so the category routes resolve.
const STRIP = [
  { slug: "all", label: "The Latest", href: "/the-hearth" },
  { slug: "interiors-and-styling", label: "Interiors & Styling", href: "/the-hearth/category/interiors-and-styling" },
  { slug: "design-and-architecture", label: "Design & Architecture", href: "/the-hearth/category/design-and-architecture" },
  { slug: "gardens-and-exteriors", label: "Gardens & Exteriors", href: "/the-hearth/category/gardens-and-exteriors" },
  { slug: "colour-and-materials", label: "Colour & Materials", href: "/the-hearth/category/colour-and-materials" },
  { slug: "heritage-and-culture", label: "Heritage & Culture", href: "/the-hearth/category/heritage-and-culture" },
  { slug: "trends-and-inspiration", label: "Trends & Inspiration", href: "/the-hearth/category/trends-and-inspiration" },
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
                ? "text-house-gold-dark border-b border-house-gold"
                : "text-house-black hover:text-house-gold-dark",
            )}
          >
            {c.label}
          </Link>
        );
      })}
    </nav>
  );
}
