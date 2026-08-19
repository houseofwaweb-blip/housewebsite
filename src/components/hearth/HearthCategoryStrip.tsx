import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * HearthCategoryStrip — per variant-A: centred horizontal category nav.
 * Jost 11px, 0.18em tracking, uppercase. Active: gold text + gold underline.
 *
 * Sections follow the rebuild spec §13: House & Home, Garden, Living Well,
 * Pets, The Useful List. Each doc section is mapped onto an existing Sanity
 * `articleCategory` slug so the category routes still resolve to real content
 * (the WP taxonomy has no dedicated Pets or Useful List category yet, so those
 * two are soft-mapped to the nearest bucket — see OPEN ITEMS in the handover:
 * a Pets category + a Useful List/how-to category should be added in Sanity and
 * articles retagged, at which point these targets are updated).
 */

// `slug` must equal the real Sanity category slug so activeSlug highlighting and
// the /the-hearth/category/[slug] route both resolve.
const STRIP = [
  { slug: "all", label: "The Latest", href: "/the-hearth" },
  { slug: "interiors-and-styling", label: "House & Home", href: "/the-hearth/category/interiors-and-styling" },
  { slug: "gardens-and-exteriors", label: "Garden", href: "/the-hearth/category/gardens-and-exteriors" },
  { slug: "heritage-and-culture", label: "Living Well", href: "/the-hearth/category/heritage-and-culture" },
  { slug: "trends-and-inspiration", label: "Pets", href: "/the-hearth/category/trends-and-inspiration" },
  { slug: "design-and-architecture", label: "The Useful List", href: "/the-hearth/category/design-and-architecture" },
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
