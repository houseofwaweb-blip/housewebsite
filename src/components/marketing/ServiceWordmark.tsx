/**
 * "Provided by [service wordmark]" credit for the service pages. Spec §10 wants
 * the official service name/wordmark above the fold, and §2.1 names each service
 * as a Willow Alexander-owned brand (Willow Alexander Gardeners, etc.).
 *
 * The wordmarks are the supplied handwritten artwork, each already in its own
 * service colour on transparent, so they sit on the cream hero as-is. Do NOT
 * recolour them (spec §4.2: "Do not recolour the official service wordmarks").
 *
 * Keyed by any page slug (not just the 8 core services) so composite pages like
 * home-and-garden and interiors can use their own wordmark too.
 *
 * Gutter-cleaning has no wordmark of its own — it is delivered by the Window
 * Cleaners brand, so it reuses that wordmark (user decision 2026-08-19).
 */
const WORDMARK: Record<string, { src: string; brand: string }> = {
  gardening: { src: "/services/wordmarks/gardeners.png", brand: "Willow Alexander Gardeners" },
  "window-cleaning": { src: "/services/wordmarks/window-cleaning.png", brand: "Willow Alexander Window Cleaners" },
  cleaning: { src: "/services/wordmarks/cleaning.png", brand: "Willow Alexander Cleaners" },
  "gutter-cleaning": { src: "/services/wordmarks/window-cleaning.png", brand: "Willow Alexander Window Cleaners" },
  handyman: { src: "/services/wordmarks/handyman.png", brand: "Willow Alexander Handyman" },
  removals: { src: "/services/wordmarks/removals.png", brand: "Willow Alexander Removals" },
  energy: { src: "/services/wordmarks/energy.png", brand: "Willow Alexander Energy" },
  "pet-care": { src: "/services/wordmarks/pet-care.png", brand: "Willow Alexander Dog Walkers" },
  "home-and-garden": { src: "/services/wordmarks/home-and-garden.png", brand: "Willow Alexander Home & Garden" },
  interiors: { src: "/services/wordmarks/interiors.png", brand: "Willow Alexander Interiors" },
};

export function ServiceWordmark({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const mark = WORDMARK[slug];
  if (!mark) return null;
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-house-brown/50">
        Provided by
      </span>
      {/* Supplied wordmark artwork, its own service colour on transparent.
          Height-capped so it never exceeds the page title (spec §10). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={mark.src} alt={mark.brand} className="h-9 w-auto" />
    </div>
  );
}
