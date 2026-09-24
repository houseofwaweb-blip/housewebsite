/**
 * "The House at work" — data for the homepage + per-service Instagram-style
 * proof carousel (final September brief §1).
 *
 * IMPORTANT — this ships with PLACEHOLDER content using existing House
 * photography so the layout and interaction can be reviewed on localhost.
 * Before publishing:
 *   1. Replace `WORK_POSTS` with 8-12 selected real Instagram posts/reels,
 *      balanced across the four disciplines.
 *   2. For reels, set `media: "reel"` and provide `video` (the reel plays ON
 *      THE SITE, so prefer a hosted mp4; an embeddable URL also works) plus the
 *      poster `image`. We do NOT link out to Instagram: the card's action is the
 *      service/design page, and reels play in place. The Instagram post is only
 *      needed as the source to obtain that video.
 *
 * "Gardens" = the garden DESIGN studio and its projects (Willow Alexander
 * Gardens). "Gardeners" = the care/maintenance SERVICE. Keep that distinction
 * clear in captions (brief §1).
 *
 * We deliberately do NOT link cards out to Instagram: the House keeps visitors
 * on the site. Photos are stills; reels play in place from `video`.
 */

export type WorkDiscipline = "gardeners" | "gardens" | "cleaners" | "window-cleaners";

export interface WorkPost {
  id: string;
  discipline: WorkDiscipline;
  /** "image" for a photo, "reel" for a video (still + play). */
  media: "image" | "reel";
  /** The still. Every post has one (a reel shows this until played). */
  image: string;
  /** Reels only: the video played IN PLACE on the site (hosted mp4 preferred,
   *  or an embeddable URL). Omitted for photos. No outbound link. */
  video?: string;
  /** What the work was and what it achieved (brief: a useful visible caption). */
  caption: string;
  location?: string;
  /** Where the card's action goes — the relevant service/design page. */
  serviceHref: string;
  serviceLabel: string;
  alt: string;
  /** True while using stand-in House imagery rather than a real IG post. */
  placeholder?: boolean;
}

export const WORK_FILTERS: ReadonlyArray<{ id: WorkDiscipline | "all"; label: string }> = [
  { id: "all", label: "All" },
  { id: "gardeners", label: "Gardeners" },
  { id: "gardens", label: "Gardens" },
  { id: "cleaners", label: "Cleaners" },
  { id: "window-cleaners", label: "Window Cleaners" },
];

/**
 * PLACEHOLDER SET — replace with real, curated Instagram content.
 * Uses existing House photography so the section renders and the interaction
 * can be reviewed. All `placeholder`; reels will carry a `video` to play in place.
 */
export const WORK_POSTS: ReadonlyArray<WorkPost> = [
  // ── Gardeners (care & maintenance) ──────────────────────────────────────
  {
    id: "g1",
    discipline: "gardeners",
    media: "image",
    image: "/services/subbrands/gardeners.webp",
    caption: "A season of regular visits keeps this garden in good order.",
    location: "Kent",
    serviceHref: "/services/gardening",
    serviceLabel: "Gardening",
    alt: "A House gardener tending established planting",
    placeholder: true,
  },
  {
    id: "g2",
    discipline: "gardeners",
    media: "image",
    image: "/services/field/team-at-work.webp",
    caption: "Our garden team on a maintenance round, everything left tidy.",
    location: "London",
    serviceHref: "/services/gardening",
    serviceLabel: "Gardening",
    alt: "A House garden team at work",
    placeholder: true,
  },
  {
    id: "g3",
    discipline: "gardeners",
    media: "image",
    image: "/services/field/garden-in-good-order.webp",
    caption: "Beds edged, borders cleared and the lawn cut on a garden tidy.",
    location: "London",
    serviceHref: "/services/gardening/garden-tidy",
    serviceLabel: "Garden Tidy",
    alt: "A garden left in good order after a tidy",
    placeholder: true,
  },
  // ── Gardens (design studio) ─────────────────────────────────────────────
  {
    id: "d1",
    discipline: "gardens",
    media: "image",
    image: "/design/gardens/hero.jpg",
    caption: "A garden designed and planted by Willow Alexander Gardens.",
    location: "Kent",
    serviceHref: "/design/gardens",
    serviceLabel: "Garden design",
    alt: "A designed English garden",
    placeholder: true,
  },
  {
    id: "d2",
    discipline: "gardens",
    media: "image",
    image: "/design/gardens/full-design.webp",
    caption: "From plan to planting: a complete garden transformation.",
    serviceHref: "/design/gardens",
    serviceLabel: "Garden design",
    alt: "A completed garden design project",
    placeholder: true,
  },
  {
    id: "d3",
    discipline: "gardens",
    media: "image",
    image: "/design/gardens/planting-plans.jpg",
    caption: "Considered planting plans, drawn for structure through the seasons.",
    serviceHref: "/design/gardens",
    serviceLabel: "Garden design",
    alt: "A planting plan from the studio",
    placeholder: true,
  },
  // ── Cleaners ────────────────────────────────────────────────────────────
  {
    id: "c1",
    discipline: "cleaners",
    media: "image",
    image: "/services/photos/cleaner-team.jpg",
    caption: "Our cleaning team, ready for a regular visit.",
    location: "London",
    serviceHref: "/services/cleaning",
    serviceLabel: "Cleaning",
    alt: "A House cleaning team",
    placeholder: true,
  },
  {
    id: "c2",
    discipline: "cleaners",
    media: "image",
    image: "/services/photos/cleaning-gallery-1.webp",
    caption: "A kitchen brought back to order on a deep clean.",
    serviceHref: "/services/cleaning",
    serviceLabel: "Cleaning",
    alt: "A kitchen after a deep clean",
    placeholder: true,
  },
  {
    id: "c3",
    discipline: "cleaners",
    media: "image",
    image: "/services/photos/cleaner-shower.jpg",
    caption: "Bathrooms detailed, glass and tile left gleaming.",
    serviceHref: "/services/cleaning",
    serviceLabel: "Cleaning",
    alt: "A bathroom detailed after cleaning",
    placeholder: true,
  },
  // ── Window Cleaners ─────────────────────────────────────────────────────
  {
    id: "w1",
    discipline: "window-cleaners",
    media: "image",
    image: "/services/photos/window-cleaning-hero.webp",
    caption: "Pure-water pole cleaning across a period frontage.",
    location: "London",
    serviceHref: "/services/window-cleaning",
    serviceLabel: "Window cleaning",
    alt: "Pure-water pole window cleaning",
    placeholder: true,
  },
  {
    id: "w2",
    discipline: "window-cleaners",
    media: "image",
    image: "/services/photos/window-cleaning-gallery-1.webp",
    caption: "Glass and frames left clear and streak-free.",
    serviceHref: "/services/window-cleaning",
    serviceLabel: "Window cleaning",
    alt: "Clean glass and frames after a visit",
    placeholder: true,
  },
  {
    id: "w3",
    discipline: "window-cleaners",
    media: "image",
    image: "/services/photos/gutter-cleaning-skyvac.jpg",
    caption: "SkyVac gutter clearance, photographed to your record.",
    serviceHref: "/services/window-cleaning/gutter-cleaning",
    serviceLabel: "Gutter cleaning",
    alt: "SkyVac vacuum-pole gutter clearance",
    placeholder: true,
  },
];

/** Posts for a single discipline (used on the service/design pages). */
export function workPostsFor(discipline: WorkDiscipline): WorkPost[] {
  return WORK_POSTS.filter((p) => p.discipline === discipline);
}
