/**
 * "The House at work" — data for the homepage + per-service Instagram-style
 * proof carousel (final September brief §1).
 *
 * WORK_POSTS holds the 10 supplied reels. Each plays via a Cinema-style YouTube
 * player (the reel uploaded to YouTube; `youtubeId` set here), so nothing heavy
 * is hosted on the site and there is no Instagram chrome. The card's only link
 * is the relevant service/design page. Covers use the service/design page
 * imagery, so the resting card is fully House-branded (still + gold play button).
 *
 * "Gardens" = the garden DESIGN studio and its projects (Willow Alexander
 * Gardens). "Gardeners" = the care/maintenance SERVICE. Keep that distinction
 * clear in captions (brief §1).
 */

export type WorkDiscipline = "gardeners" | "gardens" | "cleaners" | "window-cleaners";

export interface WorkPost {
  id: string;
  discipline: WorkDiscipline;
  /** "image" for a photo, "reel" for a video (still + play). */
  media: "image" | "reel";
  /** The still. Every post has one (a reel shows this until played). */
  image: string;
  /** Reels only: the YouTube id the reel plays (Cinema-style Plyr player, no
   *  site hosting, no Instagram chrome). Empty until the clip is uploaded. */
  youtubeId?: string;
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
 * The 10 supplied reels, mapped to disciplines by the account each sits on
 * (`id` is the Instagram shortcode, kept as a stable key + upload reference).
 * Fill each `youtubeId` once the reel is uploaded to YouTube (unlisted, blank-ish
 * title). CAPTIONS are drafts. Order is interleaved so "All" opens on a mix.
 */
export const WORK_POSTS: ReadonlyArray<WorkPost> = [
  {
    id: "DaftjnZlMS1",
    discipline: "gardeners",
    media: "reel",
    image: "/services/subbrands/gardeners.webp",
    youtubeId: "", // TODO: instagram.com/p/DaftjnZlMS1
    caption: "Our garden team on a recent visit.",
    serviceHref: "/services/gardening",
    serviceLabel: "Gardening",
    alt: "A House gardener at work",
  },
  {
    id: "DWYkUglj9Da",
    discipline: "window-cleaners",
    media: "reel",
    image: "/services/photos/gutter-cleaning-skyvac.jpg",
    youtubeId: "", // TODO: instagram.com/p/DWYkUglj9Da
    caption: "Gutter clearance, photographed to your record.",
    serviceHref: "/services/window-cleaning/gutter-cleaning",
    serviceLabel: "Gutter cleaning",
    alt: "Vacuum-pole gutter clearance",
  },
  {
    id: "DDH2_wlJXQu",
    discipline: "cleaners",
    media: "reel",
    image: "/services/photos/cleaner-team.jpg",
    youtubeId: "", // TODO: instagram.com/p/DDH2_wlJXQu
    caption: "A clean brought back to order.",
    serviceHref: "/services/cleaning",
    serviceLabel: "Cleaning",
    alt: "A House cleaning team at work",
  },
  {
    id: "DXopZQelB-c",
    discipline: "gardens",
    media: "reel",
    image: "/design/gardens/hero.jpg",
    youtubeId: "", // TODO: instagram.com/reel/DXopZQelB-c
    caption: "A garden by Willow Alexander Gardens.",
    serviceHref: "/design/gardens",
    serviceLabel: "Garden design",
    alt: "A designed English garden",
  },
  {
    id: "DV_cebnkRMA",
    discipline: "gardeners",
    media: "reel",
    image: "/services/field/team-at-work.webp",
    youtubeId: "", // TODO: instagram.com/p/DV_cebnkRMA
    caption: "Maintenance that keeps a garden in good order.",
    serviceHref: "/services/gardening",
    serviceLabel: "Gardening",
    alt: "A House garden team on a maintenance round",
  },
  {
    id: "DWn6R5LjN7o",
    discipline: "window-cleaners",
    media: "reel",
    image: "/services/photos/window-cleaning-hero.webp",
    youtubeId: "", // TODO: instagram.com/p/DWn6R5LjN7o
    caption: "Pure-water pole cleaning across a frontage.",
    serviceHref: "/services/window-cleaning",
    serviceLabel: "Window cleaning",
    alt: "Pure-water pole window cleaning",
  },
  {
    id: "C35l-PYp8_G",
    discipline: "cleaners",
    media: "reel",
    image: "/services/photos/cleaning-gallery-1.webp",
    youtubeId: "", // TODO: instagram.com/reel/C35l-PYp8_G
    caption: "Detail work from our cleaning team.",
    serviceHref: "/services/cleaning",
    serviceLabel: "Cleaning",
    alt: "A room detailed after a clean",
  },
  {
    id: "DNnw7uXhb5h",
    discipline: "gardens",
    media: "reel",
    image: "/design/gardens/full-design.webp",
    youtubeId: "", // TODO: instagram.com/reel/DNnw7uXhb5h
    caption: "From plan to planting, in the studio’s work.",
    serviceHref: "/design/gardens",
    serviceLabel: "Garden design",
    alt: "A completed garden design project",
  },
  {
    id: "DXZekDmik-v",
    discipline: "gardeners",
    media: "reel",
    image: "/services/field/garden-in-good-order.webp",
    youtubeId: "", // TODO: instagram.com/p/DXZekDmik-v
    caption: "A tidy from our gardeners, start to finish.",
    serviceHref: "/services/gardening/garden-tidy",
    serviceLabel: "Garden Tidy",
    alt: "A garden left in good order after a tidy",
  },
  {
    id: "DXwpr9CDlkj",
    discipline: "gardeners",
    media: "reel",
    image: "/services/photos/gardening/gardening-team-action.jpg",
    youtubeId: "", // TODO: instagram.com/reel/DXwpr9CDlkj
    caption: "Seasonal care, out with the team.",
    serviceHref: "/services/gardening",
    serviceLabel: "Gardening",
    alt: "Seasonal garden care by the House team",
  },
];

/** Posts for a single discipline (used on the service/design pages). */
export function workPostsFor(discipline: WorkDiscipline): WorkPost[] {
  return WORK_POSTS.filter((p) => p.discipline === discipline);
}
