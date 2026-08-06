import Image from "next/image";
import Link from "next/link";
import { FILMS, FEATURED } from "@/lib/cinema-data";

/**
 * /cinema — the House film index. A featured film autoplays (muted) at the top;
 * clicking it, or any film below, opens that film's own page (/cinema/[slug]),
 * laid out like a Hearth article. Films are hosted free on YouTube.
 */
export const metadata = {
  title: "Cinema | Films and video from the House",
  description:
    "The House screening room: gardens through the seasons, rooms coming together, and the makers behind the objects we choose.",
};

export default function CinemaPage() {
  const rest = FILMS.filter((f) => f.slug !== FEATURED.slug);

  return (
    <div className="bg-house-cream text-house-brown">
      {/* Header */}
      <section className="px-[5vw] pt-16 pb-8">
        <div className="mx-auto max-w-[1200px]">
          <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-house-gold-ink">The House · Cinema</p>
          <h1 className="mt-3 max-w-[16ch] font-display text-[clamp(34px,5vw,68px)] leading-[1.03] text-house-black">
            Films from <em>the House.</em>
          </h1>
          <p className="mt-5 max-w-[58ch] font-sans text-[17px] leading-[1.6] text-house-stone">
            Gardens through the seasons, rooms coming together, and the makers
            behind the objects we choose.
          </p>
        </div>
      </section>

      {/* Featured film — autoplays muted; clicking opens its page. */}
      <section className="px-[5vw] pb-14">
        <div className="mx-auto max-w-[1200px]">
          <Link
            href={`/cinema/${FEATURED.slug}`}
            className="group relative block aspect-video w-full overflow-hidden border border-house-brown/12 bg-house-black no-underline"
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${FEATURED.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${FEATURED.youtubeId}&controls=0&modestbranding=1&playsinline=1&rel=0&disablekb=1`}
              title={FEATURED.title}
              allow="autoplay; encrypted-media"
              className="pointer-events-none absolute inset-0 h-full w-full"
            />
            <span aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,12,9,0.85), rgba(15,12,9,0.05) 55%, rgba(15,12,9,0.25))" }} />
            <span className="absolute inset-x-0 bottom-0 p-[clamp(20px,4vw,48px)]">
              <span className="inline-flex items-center gap-2.5 font-sans text-[12px] tracking-[0.22em] uppercase text-house-cream">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-house-cream/70 text-[11px]">▶</span>
                Watch · {FEATURED.category} · {FEATURED.duration}
              </span>
              <span className="mt-3 block max-w-[24ch] font-display text-[clamp(26px,3.6vw,50px)] leading-[1.05] text-house-cream">
                {FEATURED.title}
              </span>
            </span>
          </Link>
        </div>
      </section>

      {/* The rest — cards link to each film's page. */}
      <section className="px-[5vw] pb-24">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-6 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">More films</p>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((f) => (
              <Link key={f.slug} href={`/cinema/${f.slug}`} className="group no-underline">
                <div className="relative aspect-video w-full overflow-hidden border border-house-brown/12 bg-house-cream-dark">
                  <Image src={f.poster} alt={f.title} fill sizes="(min-width: 1024px) 31vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  <span aria-hidden className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-house-cream/80 bg-house-black/35 text-house-cream backdrop-blur-sm transition-colors group-hover:border-house-gold group-hover:text-house-gold">▶</span>
                  </span>
                  <span className="absolute bottom-2 right-2 bg-house-black/70 px-2 py-1 font-sans text-[11px] tracking-[0.08em] text-house-cream/90">{f.duration}</span>
                </div>
                <p className="mt-3 font-sans text-[11px] tracking-[0.2em] uppercase text-house-gold-ink">{f.category}</p>
                <h3 className="mt-1 font-display text-[22px] leading-tight text-house-brown transition-colors group-hover:text-house-gold-ink">{f.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
