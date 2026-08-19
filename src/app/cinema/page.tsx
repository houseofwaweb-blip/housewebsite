import { FilmThumb } from "@/components/cinema/FilmThumb";
import Link from "next/link";
import { resolveFilms, resolveFeatured } from "@/lib/cinema-data";
import { CinemaFeatured } from "@/components/cinema/CinemaFeatured";

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

export default async function CinemaPage() {
  const films = await resolveFilms();
  const FEATURED = await resolveFeatured();
  const rest = films.filter((f) => f.slug !== FEATURED.slug);

  return (
    <div className="bg-house-cream text-house-brown">
      {/* Header */}
      <section className="px-[5vw] pt-16 pb-8">
        <div className="mx-auto max-w-[1200px]">
          <p className="font-sans text-[14px] tracking-[0.3em] uppercase text-house-gold-ink">The House · Cinema</p>
          <h1 className="mt-3 max-w-[16ch] font-display text-[clamp(37px,5vw,71px)] leading-[1.03] text-house-black">
            Films from <em>the House.</em>
          </h1>
          <p className="mt-5 max-w-[58ch] font-sans text-[20px] leading-[1.6] text-house-stone">
            Gardens through the seasons, rooms coming together, and the makers
            behind the objects we choose.
          </p>
        </div>
      </section>

      {/* Featured film — autoplays muted; clicking opens its page and resumes
          from where the ambient loop had reached. */}
      <section className="px-[5vw] pb-14">
        <div className="mx-auto max-w-[1200px]">
          <CinemaFeatured
            youtubeId={FEATURED.youtubeId}
            slug={FEATURED.slug}
            title={FEATURED.title}
            category={FEATURED.category}
          />
        </div>
      </section>

      {/* The rest — cards link to each film's page. */}
      <section className="px-[5vw] pb-24">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-6 font-sans text-[14px] tracking-[0.28em] uppercase text-house-gold-ink">More films</p>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((f) => (
              <Link key={f.slug} href={`/cinema/${f.slug}`} className="group no-underline">
                <div className="relative aspect-video w-full overflow-hidden border border-house-brown/12 bg-house-cream-dark">
                  <FilmThumb youtubeId={f.youtubeId} poster={f.poster} alt={f.title} className="transition-transform duration-500 group-hover:scale-[1.04]" />
                  <span aria-hidden className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-house-cream/80 bg-house-black/35 text-house-cream backdrop-blur-sm transition-colors group-hover:border-house-gold group-hover:text-house-gold">▶</span>
                  </span>
                  {f.duration ? <span className="absolute bottom-2 right-2 bg-house-black/70 px-2 py-1 font-sans text-[13px] tracking-[0.08em] text-house-cream/90">{f.duration}</span> : null}
                </div>
                <p className="mt-3 font-sans text-[13px] tracking-[0.2em] uppercase text-house-gold-ink">{f.category}</p>
                <h3 className="mt-1 font-display text-[25px] leading-tight text-house-brown transition-colors group-hover:text-house-gold-ink">{f.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
