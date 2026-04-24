import Image from "next/image";
import Link from "next/link";

/**
 * SubbrandGrid — service brand tiles with Didot title overlays.
 *
 * Desktop: 4-column grid. Mobile: horizontal scroll carousel.
 * Text aligned bottom-left. Each tile links to its service page.
 *
 * Can be driven from Sanity (subbrandTile docs) or hardcoded fallback.
 */

export interface SubbrandTileData {
  slug: string;
  name: string;
  image: string;
  href: string;
}

const FALLBACK_TILES: SubbrandTileData[] = [
  { slug: "gardeners", name: "Gardeners", image: "/services/subbrands/gardeners.jpg", href: "/services/gardening" },
  { slug: "cleaners", name: "Cleaners", image: "/services/subbrands/cleaners.jpg", href: "/services/cleaning" },
  { slug: "window-cleaners", name: "Window\nCleaners", image: "/services/subbrands/window-cleaner.jpg", href: "/services/window-cleaning" },
  { slug: "handyman", name: "Handyman", image: "/services/subbrands/handyman.jpg", href: "/services/handyman" },
  { slug: "housekeeping", name: "Housekeeping", image: "/services/subbrands/housekeeping.jpg", href: "/services" },
  { slug: "removals", name: "Removals", image: "/services/subbrands/removals.jpg", href: "/services/removals" },
  { slug: "electrical", name: "Electrical", image: "/services/subbrands/electrical.jpg", href: "/services" },
  { slug: "dog-walking", name: "Dog\nWalking", image: "/services/subbrands/dog-walking.jpg", href: "/services" },
];

interface Props {
  tiles?: SubbrandTileData[];
  className?: string;
}

export function SubbrandGrid({ tiles, className }: Props) {
  const data = tiles && tiles.length > 0 ? tiles : FALLBACK_TILES;

  return (
    <div className={className}>
      {/* Desktop: 4-column grid */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((svc) => (
          <Link
            key={svc.slug}
            href={svc.href}
            className="group relative block aspect-[3/4] overflow-hidden no-underline"
          >
            <Image
              src={svc.image}
              alt={svc.name.replace("\n", " ")}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/5 group-hover:from-black/60 transition-opacity duration-[var(--t-slow)]" />
            <div className="absolute bottom-0 left-0 p-5">
              <h3 className="font-display font-medium text-[clamp(22px,2.2vw,30px)] leading-[1.1] text-white whitespace-pre-line tracking-[-0.01em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
                {svc.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile: horizontal scroll carousel */}
      <div
        className="flex sm:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {data.map((svc) => (
          <Link
            key={svc.slug}
            href={svc.href}
            className="group relative flex-none w-[70vw] aspect-[3/4] snap-start overflow-hidden no-underline"
          >
            <Image
              src={svc.image}
              alt={svc.name.replace("\n", " ")}
              fill
              sizes="70vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/5" />
            <div className="absolute bottom-0 left-0 p-5">
              <h3 className="font-display font-medium text-[28px] leading-[1.1] text-white whitespace-pre-line tracking-[-0.01em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
                {svc.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
