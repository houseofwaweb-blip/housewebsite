import { CinemaClient, type Film } from "@/components/cinema/CinemaClient";

/**
 * /cinema — the House screening room. Films are hosted (unlisted) on YouTube for
 * free and played through a House-branded Plyr player (see CinemaClient).
 *
 * TO ADD REAL FILMS: replace each `youtubeId` below with the YouTube video ID
 * (the part after watch?v= or youtu.be/). The placeholder id currently points at
 * a public demo clip so the player works out of the box.
 */

export const metadata = {
  title: "Cinema | Films and video from the House",
  description:
    "The House screening room: gardens through the seasons, rooms coming together, and the makers behind the objects we choose.",
};

// Test films (unlisted YouTube). Add more by dropping in the video ID from a
// youtu.be/<ID> or watch?v=<ID> link.
const V1 = "uPeHiJd2DCc";
const V2 = "RVx47CNdcco";

const FEATURED: Film = {
  title: "A garden, through the seasons",
  category: "Gardens",
  blurb:
    "A year in a single London garden, from bare winter structure to high-summer borders, filmed month by month.",
  duration: "8 min",
  poster: "/home-v4/pillar-1.webp",
  youtubeId: V1,
};

const FILMS: Film[] = [
  { title: "A room comes together", category: "Interiors", blurb: "An empty room, dressed and lived into over a single afternoon.", duration: "5 min", poster: "/design/interiors/project-living-room.webp", youtubeId: V2 },
  { title: "The makers", category: "Objects", blurb: "The people and workshops behind the objects the House chooses.", duration: "11 min", poster: "/home-v4/pillar-3.webp", youtubeId: V1 },
  { title: "Cutting back", category: "Gardens", blurb: "An overgrown garden read, cleared and given its shape again.", duration: "6 min", poster: "/services/photos/gardening/garden-clearance-hero.webp", youtubeId: V2 },
  { title: "Colour, up close", category: "Colour & Materials", blurb: "Pigment, plaster and paint, and how light changes them through the day.", duration: "4 min", poster: "/home-v4/pillar-4.webp", youtubeId: V1 },
  { title: "The kitchen table", category: "Food & Hosting", blurb: "A slow lunch, laid and shared, in a house that likes to gather.", duration: "9 min", poster: "/shop/rooms/kitchen.webp", youtubeId: V2 },
  { title: "Living room, evening light", category: "Interiors", blurb: "One room as the light falls, and how a scheme holds at dusk.", duration: "3 min", poster: "/shop/rooms/living-room.webp", youtubeId: V1 },
];

export default function CinemaPage() {
  return (
    <div className="bg-house-black text-house-cream">
      <section className="px-[5vw] pt-20 pb-10 text-center">
        <p className="font-sans text-[12px] tracking-[0.32em] uppercase text-house-gold-light">The House · Cinema</p>
        <h1 className="mx-auto mt-4 max-w-[18ch] font-display text-[clamp(40px,6vw,80px)] leading-[1.02] text-house-cream">
          The screening <em className="text-house-gold-light">room.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-[58ch] font-sans text-[17px] leading-[1.65] text-house-cream/75">
          Films and short video from the House: gardens through the seasons, rooms
          coming together, and the makers behind the objects we choose.
        </p>
      </section>

      <CinemaClient featured={FEATURED} films={FILMS} />
    </div>
  );
}
