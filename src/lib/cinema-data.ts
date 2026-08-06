/**
 * Cinema catalog. Films are hosted (unlisted) on YouTube; each has its own page
 * at /cinema/[slug], laid out like a Hearth article (video → title → description).
 *
 * TO ADD A FILM: add an entry with a unique slug, the YouTube video ID (the bit
 * after youtu.be/ or watch?v=), a poster image, and the description — paste the
 * text you use on YouTube so the page and the video read the same.
 */
export type Film = {
  slug: string;
  title: string;
  category: string;
  duration: string;
  poster: string;
  youtubeId: string;
  /** The description shown on the film's page. Use the YouTube description. */
  description: string;
};

// Test videos to start with.
const V1 = "uPeHiJd2DCc";
const V2 = "RVx47CNdcco";

export const FILMS: Film[] = [
  {
    slug: "a-garden-through-the-seasons",
    title: "A garden, through the seasons",
    category: "Gardens",
    duration: "8 min",
    poster: "/home-v4/pillar-1.webp",
    youtubeId: V1,
    description:
      "A year in a single London garden, from bare winter structure to high-summer borders, filmed month by month.\n\n(Replace this with the YouTube description for this film.)",
  },
  {
    slug: "a-room-comes-together",
    title: "A room comes together",
    category: "Interiors",
    duration: "5 min",
    poster: "/design/interiors/project-living-room.webp",
    youtubeId: V2,
    description:
      "An empty room, dressed and lived into over a single afternoon.\n\n(Replace this with the YouTube description for this film.)",
  },
  {
    slug: "the-makers",
    title: "The makers",
    category: "Objects",
    duration: "11 min",
    poster: "/home-v4/pillar-3.webp",
    youtubeId: V1,
    description:
      "The people and workshops behind the objects the House chooses.\n\n(Replace this with the YouTube description for this film.)",
  },
  {
    slug: "cutting-back",
    title: "Cutting back",
    category: "Gardens",
    duration: "6 min",
    poster: "/services/photos/gardening/garden-clearance-hero.webp",
    youtubeId: V2,
    description:
      "An overgrown garden read, cleared and given its shape again.\n\n(Replace this with the YouTube description for this film.)",
  },
  {
    slug: "colour-up-close",
    title: "Colour, up close",
    category: "Colour & Materials",
    duration: "4 min",
    poster: "/home-v4/pillar-4.webp",
    youtubeId: V1,
    description:
      "Pigment, plaster and paint, and how light changes them through the day.\n\n(Replace this with the YouTube description for this film.)",
  },
  {
    slug: "the-kitchen-table",
    title: "The kitchen table",
    category: "Food & Hosting",
    duration: "9 min",
    poster: "/shop/rooms/kitchen.webp",
    youtubeId: V2,
    description:
      "A slow lunch, laid and shared, in a house that likes to gather.\n\n(Replace this with the YouTube description for this film.)",
  },
];

export const FEATURED_SLUG = "a-garden-through-the-seasons";
export const FEATURED: Film = FILMS.find((f) => f.slug === FEATURED_SLUG) ?? FILMS[0];

export function getFilm(slug: string): Film | undefined {
  return FILMS.find((f) => f.slug === slug);
}
