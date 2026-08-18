/**
 * House Cinema — a small curated set of House films. Ported from the preview
 * branch's cinema (the full build auto-pulls a YouTube channel; here we hold the
 * curated films statically). Thumbnails are stored locally in /public/home so no
 * remote-image config is needed; playback uses a YouTube iframe embed.
 */

export interface CinemaFilm {
  slug: string;
  youtubeId: string;
  /** Full editorial title. */
  title: string;
  /** Short title for cards. */
  shortTitle: string;
  category: string;
  description: string;
  /** Local poster path in /public. */
  thumb: string;
}

export const CINEMA_FILMS: CinemaFilm[] = [
  {
    slug: "inside-a-beckenham-home",
    youtubeId: "uPeHiJd2DCc",
    title: "Inside a Beckenham home designed for work and family life",
    shortTitle: "Inside a Beckenham home",
    category: "Interiors",
    description:
      "Inside this Beckenham home, writer Katherine Slee reflects on what home really means to her, not as a style or statement, but as a space shaped around family life, work, routine and togetherness. The garden, designed and built by Willow Alexander Gardens, continues this connection outdoors.",
    thumb: "/home/cinema-beckenham.webp",
  },
  {
    slug: "the-world-garden-tom-hart-dyke",
    youtubeId: "RVx47CNdcco",
    title: "Inside the World Garden with Tom Hart Dyke",
    shortTitle: "The World Garden with Tom Hart Dyke",
    category: "Gardens",
    description:
      "Step inside The World Garden at Lullingstone Castle with Tom Hart Dyke, plant hunter, curator and creator of one of Kent's most extraordinary gardens.",
    thumb: "/home/cinema-hartdyke.webp",
  },
];

export function filmBySlug(slug: string): CinemaFilm | undefined {
  return CINEMA_FILMS.find((f) => f.slug === slug);
}

/** The two films shown as homepage features (Beckenham + Tom Hart Dyke). */
export const FEATURE_FILMS = CINEMA_FILMS;
