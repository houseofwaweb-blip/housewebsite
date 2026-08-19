import Link from "next/link";

/**
 * HearthNextAction — the contextual next-action module (rebuild spec §13,
 * article step 8, and the editorial-to-service rule). One quiet, clearly
 * labelled route from a piece of writing into the relevant part of the House:
 * garden pieces point at the garden services, protection pieces at cover, and
 * so on. It is NOT a booking form, and it sits after the article body (never in
 * the first 40%), so reading is never interrupted.
 *
 * Destinations are top-level House routes that always exist, so the module never
 * produces a dead link regardless of service-slug migration.
 */
type Action = { eyebrow: string; heading: string; body: string; cta: string; href: string };

const DEFAULT_ACTION: Action = {
  eyebrow: "From the House",
  heading: "Let the House take care of it.",
  body: "When a piece of writing turns into something to do, the House has a vetted specialist for it.",
  cta: "Explore House services",
  href: "/services",
};

/** Real Sanity category slug → the most relevant House next step. */
const BY_CATEGORY: Record<string, Action> = {
  "gardens-and-exteriors": {
    eyebrow: "From the House",
    heading: "Bring the garden into good order.",
    body: "From a one-off tidy to seasonal upkeep, the House's gardeners work to the same standard the writing does.",
    cta: "Explore garden services",
    href: "/services",
  },
  "interiors-and-styling": {
    eyebrow: "From the House",
    heading: "Make it real in your own rooms.",
    body: "Housekeeping, cleaning and the House's interiors service can carry a good idea from the page into the home.",
    cta: "Explore House services",
    href: "/services",
  },
  "design-and-architecture": {
    eyebrow: "From the House",
    heading: "Put good design to work at home.",
    body: "The House's specialists handle the practical side, from repairs and interiors to the trades a project needs.",
    cta: "Explore House services",
    href: "/services",
  },
  "colour-and-materials": {
    eyebrow: "From the House",
    heading: "Useful things, beautifully chosen.",
    body: "The pieces and materials worth living with, gathered in the House Store.",
    cta: "Shop the House",
    href: "/shop",
  },
  "heritage-and-culture": {
    eyebrow: "From the House",
    heading: "Protect a home worth keeping.",
    body: "For a home with history, cover built around what it is really made of, introduced by the House.",
    cta: "See insurance and cover",
    href: "/insurance",
  },
  "trends-and-inspiration": {
    eyebrow: "From the House",
    heading: "Considered offers from the House.",
    body: "Seasonal packages, multi-service savings and member benefits, gathered in one place.",
    cta: "View House offers",
    href: "/offers",
  },
};

export function HearthNextAction({ categorySlug }: { categorySlug?: string }) {
  const action = (categorySlug && BY_CATEGORY[categorySlug]) || DEFAULT_ACTION;
  return (
    <aside
      aria-label="What to do next"
      className="my-14 border-l-2 border-house-gold bg-house-cream/70 px-6 py-8 sm:px-9"
    >
      <p className="font-hearth-sans text-[13px] tracking-[0.24em] uppercase text-house-gold-ink">
        {action.eyebrow}
      </p>
      <h2 className="mt-3 max-w-[22ch] font-hearth-serif font-medium text-[clamp(27px,3vw,37px)] leading-[1.1] text-house-black">
        {action.heading}
      </h2>
      <p className="mt-3 max-w-[56ch] font-hearth-serif text-[20px] leading-[1.6] text-house-black/80">
        {action.body}
      </p>
      <Link
        href={action.href}
        className="mt-6 inline-flex items-center gap-2 border border-house-brown/30 px-6 py-3 font-hearth-sans text-[14px] tracking-[0.16em] uppercase text-house-brown no-underline transition-colors hover:bg-house-brown hover:text-house-cream"
      >
        {action.cta} <span aria-hidden>→</span>
      </Link>
    </aside>
  );
}
