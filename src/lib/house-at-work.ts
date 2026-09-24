/**
 * "The House at work" — data for the homepage + per-service Instagram-style
 * proof carousel (final September brief §1).
 *
 * WORK_POSTS holds the supplied reels. Each plays via a Cinema-style YouTube
 * player (`youtubeId`), so nothing heavy is hosted on the site and there is no
 * Instagram chrome. The card's only link is the relevant service/design page.
 * Covers use the service/design page imagery (portrait-friendly; YouTube's own
 * thumbnails are 16:9 with black bars for Shorts, so they crop badly here).
 *
 * DISCIPLINES were derived from each video's content (auto-classified from the
 * thumbnail), NOT the account, so a couple may need moving — confirm with Alex.
 *
 * "Gardens" = the garden DESIGN studio and its projects (Willow Alexander
 * Gardens). "Gardeners" = the care/maintenance SERVICE. CAPTIONS are drafts.
 */

export type WorkDiscipline = "gardeners" | "gardens" | "cleaners" | "window-cleaners";

export interface WorkPost {
  id: string;
  discipline: WorkDiscipline;
  /** "image" for a photo, "reel" for a video (still + play). */
  media: "image" | "reel";
  /** The still cover. */
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
}

export const WORK_FILTERS: ReadonlyArray<{ id: WorkDiscipline | "all"; label: string }> = [
  { id: "all", label: "All" },
  { id: "gardeners", label: "Gardeners" },
  { id: "gardens", label: "Gardens" },
  { id: "cleaners", label: "Cleaners" },
  { id: "window-cleaners", label: "Window Cleaners" },
];

/**
 * The 10 supplied YouTube reels, interleaved so "All" opens on a mix. Disciplines
 * are auto-classified from each video's content (see note above); captions are
 * drafts. Covers reuse service/design page imagery per discipline.
 */
export const WORK_POSTS: ReadonlyArray<WorkPost> = [
  {
    id: "nj-6x97JpDo",
    discipline: "gardens",
    media: "reel",
    image: "/design/gardens/hero.jpg",
    youtubeId: "nj-6x97JpDo",
    caption: "A garden design taking shape on paper.",
    serviceHref: "/design/gardens",
    serviceLabel: "Garden design",
    alt: "A hand-drawn garden design plan",
  },
  {
    id: "wt6_fls_GPI",
    discipline: "gardeners",
    media: "reel",
    image: "/services/subbrands/gardeners.webp",
    youtubeId: "wt6_fls_GPI",
    caption: "Autumn leaves cleared on a maintenance visit.",
    serviceHref: "/services/gardening",
    serviceLabel: "Gardening",
    alt: "A gardener clearing leaves",
  },
  {
    id: "3KDoUdsSMPs",
    discipline: "window-cleaners",
    media: "reel",
    image: "/services/photos/window-cleaning-hero.webp",
    youtubeId: "3KDoUdsSMPs",
    caption: "Pure-water pole cleaning, upstairs windows.",
    serviceHref: "/services/window-cleaning",
    serviceLabel: "Window cleaning",
    alt: "Water-fed pole cleaning an upstairs window",
  },
  {
    id: "U6pngBgBoyU",
    discipline: "cleaners",
    media: "reel",
    image: "/services/photos/cleaning-gallery-1.webp",
    youtubeId: "U6pngBgBoyU",
    caption: "A patio jet-washed back to clean.",
    serviceHref: "/services/cleaning",
    serviceLabel: "Cleaning",
    alt: "Jet-washing a patio",
  },
  {
    id: "eQnolV90N60",
    discipline: "gardens",
    media: "reel",
    image: "/design/gardens/full-design.webp",
    youtubeId: "eQnolV90N60",
    caption: "An established garden in full leaf.",
    serviceHref: "/design/gardens",
    serviceLabel: "Garden design",
    alt: "An established, planted garden",
  },
  {
    id: "yhqwW2xqy94",
    discipline: "gardeners",
    media: "reel",
    image: "/services/field/team-at-work.webp",
    youtubeId: "yhqwW2xqy94",
    caption: "Seasonal garden work with the team.",
    serviceHref: "/services/gardening",
    serviceLabel: "Gardening",
    alt: "Seasonal garden work",
  },
  {
    id: "r5Ex8R2OHPc",
    discipline: "window-cleaners",
    media: "reel",
    image: "/services/photos/window-cleaner-van.jpg",
    youtubeId: "r5Ex8R2OHPc",
    caption: "Out across the homes of London and Kent.",
    serviceHref: "/services/window-cleaning",
    serviceLabel: "Window cleaning",
    alt: "Homes across London and Kent from above",
  },
  {
    id: "CGVeesdySz8",
    discipline: "gardeners",
    media: "reel",
    image: "/services/field/garden-in-good-order.webp",
    youtubeId: "CGVeesdySz8",
    caption: "Lawn edges cut clean.",
    serviceHref: "/services/gardening",
    serviceLabel: "Gardening",
    alt: "Edging a lawn",
  },
  {
    id: "-yeK0pT7CNo",
    discipline: "gardens",
    media: "reel",
    image: "/design/gardens/planting-plans.jpg",
    youtubeId: "-yeK0pT7CNo",
    caption: "Planting chosen for structure and season.",
    serviceHref: "/design/gardens",
    serviceLabel: "Garden design",
    alt: "Planting a border",
  },
  {
    id: "XracxSjabNI",
    discipline: "gardeners",
    media: "reel",
    image: "/services/photos/gardening/gardening-team-action.jpg",
    youtubeId: "XracxSjabNI",
    caption: "A garden clearance, bagged and taken away.",
    serviceHref: "/services/gardening/garden-tidy",
    serviceLabel: "Garden Tidy",
    alt: "A garden clearance being bagged",
  },
];

/** Posts for a single discipline (used on the service/design pages). */
export function workPostsFor(discipline: WorkDiscipline): WorkPost[] {
  return WORK_POSTS.filter((p) => p.discipline === discipline);
}
