import Image from "next/image";

/**
 * /cinema — the House screening room (Aug 2026 eComm/Insurance refocus).
 *
 * A dark, immersive home for the House's film and video. This is the scaffold:
 * a featured film and a grid of films by category. The player is a placeholder
 * for now — the plan is Sanity + Mux (adaptive streaming, branded player) or
 * Vimeo embeds, wired in a follow-up. Each card is ready to become a focused
 * /cinema/[slug] player.
 */

export const metadata = {
  title: "Cinema | Films and video from the House",
  description:
    "The House screening room: gardens through the seasons, rooms coming together, and the makers behind the objects we choose.",
};

type Film = {
  title: string;
  category: string;
  blurb: string;
  duration: string;
  poster: string;
};

const FEATURED: Film = {
  title: "A garden, through the seasons",
  category: "Gardens",
  blurb:
    "A year in a single London garden, from bare winter structure to high-summer borders, filmed month by month.",
  duration: "8 min",
  poster: "/home-v4/pillar-1.webp",
};

const FILMS: Film[] = [
  { title: "A room comes together", category: "Interiors", blurb: "An empty room, dressed and lived into over a single afternoon.", duration: "5 min", poster: "/design/interiors/project-living-room.webp" },
  { title: "The makers", category: "Objects", blurb: "The people and workshops behind the objects the House chooses.", duration: "11 min", poster: "/home-v4/pillar-3.webp" },
  { title: "Cutting back", category: "Gardens", blurb: "An overgrown garden read, cleared and given its shape again.", duration: "6 min", poster: "/services/photos/gardening/garden-clearance-hero.webp" },
  { title: "Colour, up close", category: "Colour & Materials", blurb: "Pigment, plaster and paint, and how light changes them through the day.", duration: "4 min", poster: "/home-v4/pillar-4.webp" },
  { title: "The kitchen table", category: "Food & Hosting", blurb: "A slow lunch, laid and shared, in a house that likes to gather.", duration: "9 min", poster: "/shop/rooms/kitchen.webp" },
  { title: "Living room, evening light", category: "Interiors", blurb: "One room as the light falls, and how a scheme holds at dusk.", duration: "3 min", poster: "/shop/rooms/living-room.webp" },
];

function PlayBadge({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`flex items-center justify-center rounded-full border border-house-cream/70 bg-house-black/40 text-house-cream backdrop-blur-sm ${className}`}>
      ▶
    </span>
  );
}

export default function CinemaPage() {
  return (
    <div className="bg-house-black text-house-cream">
      {/* Header */}
      <section className="px-[5vw] pt-20 pb-10 text-center">
        <p className="font-sans text-[12px] tracking-[0.32em] uppercase text-house-gold-light">
          The House · Cinema
        </p>
        <h1 className="mx-auto mt-4 max-w-[18ch] font-display text-[clamp(40px,6vw,80px)] leading-[1.02] text-house-cream">
          The screening <em className="text-house-gold-light">room.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-[58ch] font-sans text-[17px] leading-[1.65] text-house-cream/75">
          Films and short video from the House: gardens through the seasons, rooms
          coming together, and the makers behind the objects we choose.
        </p>
      </section>

      {/* Featured film */}
      <section className="px-[5vw] pb-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="group relative aspect-[21/9] w-full overflow-hidden border border-house-gold-dark/30">
            <Image src={FEATURED.poster} alt={FEATURED.title} fill priority sizes="100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
            <span aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,12,9,0.9), rgba(15,12,9,0.15) 60%, rgba(15,12,9,0.35))" }} />
            <PlayBadge className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 text-[22px]" />
            <div className="absolute inset-x-0 bottom-0 p-[clamp(20px,4vw,48px)]">
              <p className="font-sans text-[11px] tracking-[0.24em] uppercase text-house-gold-light">
                Featured · {FEATURED.category} · {FEATURED.duration}
              </p>
              <h2 className="mt-2 max-w-[20ch] font-display text-[clamp(26px,3.6vw,48px)] leading-[1.05] text-house-cream">
                {FEATURED.title}
              </h2>
              <p className="mt-3 max-w-[56ch] font-sans text-[15px] leading-[1.6] text-house-cream/80">
                {FEATURED.blurb}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Film grid */}
      <section className="px-[5vw] pb-24">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-6 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-light">
            More from the House
          </p>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {FILMS.map((f) => (
              <article key={f.title} className="group">
                <div className="relative aspect-video w-full overflow-hidden border border-house-gold-dark/25">
                  <Image src={f.poster} alt={f.title} fill sizes="(min-width: 1024px) 31vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  <span aria-hidden className="absolute inset-0 bg-house-black/25 transition-colors group-hover:bg-house-black/10" />
                  <PlayBadge className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2" />
                  <span className="absolute bottom-2 right-2 bg-house-black/70 px-2 py-1 font-sans text-[11px] tracking-[0.08em] text-house-cream/90">
                    {f.duration}
                  </span>
                </div>
                <p className="mt-3 font-sans text-[11px] tracking-[0.2em] uppercase text-house-gold-light/80">{f.category}</p>
                <h3 className="mt-1 font-display text-[22px] leading-tight text-house-cream">{f.title}</h3>
                <p className="mt-2 font-sans text-[14px] leading-[1.55] text-house-cream/70">{f.blurb}</p>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-16 max-w-[60ch] text-center font-sans text-[13px] leading-[1.6] text-house-cream/45">
            More films are being added. Video plays here soon.
          </p>
        </div>
      </section>
    </div>
  );
}
