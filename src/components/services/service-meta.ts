/**
 * Shared service metadata for the service page templates.
 *
 * Provides a service colour expressed as a design token (never a hardcoded hex,
 * so a palette change in globals.css flows straight through).
 *
 * NOTE: the previous `serviceReview()` helper returned placeholder review scores
 * and counts (e.g. "4.9 / 342 verified visits"). It was removed because those
 * figures were invented, not attributable, and the templates rendered them as
 * fact (§7.4, §27). When a real, attributable ratings source exists, reintroduce
 * a helper that reads from it and have the templates render only live values.
 */

/** Service colour as a `--service-*` design token. Falls back to House brown so
 *  a service without its own volume still renders on-palette. */
export function serviceAccent(slug: string): string {
  const map: Record<string, string> = {
    gardening: "var(--service-gardeners)",
    "garden-clearance": "var(--service-gardeners)",
    "hedge-cutting": "var(--service-gardeners)",
    planting: "var(--service-gardeners)",
    "tree-work": "var(--service-gardeners)",
    "lawn-care": "var(--service-gardeners)",
    "window-cleaning": "var(--service-windows)",
    cleaning: "var(--service-cleaners)",
    housekeeping: "var(--service-housekeeping)",
    "gutter-cleaning": "var(--service-windows)",
    handyman: "var(--service-handyman)",
    "painting-decorating": "var(--service-handyman)",
    removals: "var(--service-removals)",
    "man-and-van": "var(--service-removals)",
    energy: "var(--service-energy)",
    "pet-care": "var(--service-dog-walkers)",
  };
  return map[slug] ?? "var(--color-house-brown)";
}
