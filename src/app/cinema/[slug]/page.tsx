import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FILMS, getFilm } from "@/lib/cinema-data";
import { CinemaPlayer } from "@/components/cinema/CinemaPlayer";

/**
 * /cinema/[slug] — a single film's page, laid out like a Hearth article: the
 * player, then the title, an "About" heading, and the description (the same text
 * used on YouTube), followed by more films.
 */
export function generateStaticParams() {
  return FILMS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const film = getFilm(slug);
  if (!film) return { title: "Film not found" };
  return { title: `${film.title} | Cinema`, description: film.description.split("\n")[0] };
}

export default async function FilmPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const film = getFilm(slug);
  if (!film) notFound();

  const others = FILMS.filter((f) => f.slug !== film.slug).slice(0, 3);
  const paragraphs = film.description.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);

  return (
    <div className="bg-house-cream text-house-brown">
      <article className="mx-auto max-w-[980px] px-[5vw] pt-10 pb-16">
        <nav aria-label="Breadcrumb" className="font-sans text-[12px] tracking-[0.18em] uppercase text-house-gold-ink">
          <Link href="/cinema" className="no-underline hover:text-house-brown">Cinema</Link>
          <span className="mx-2 text-house-stone/50">·</span>
          <span className="text-house-stone">{film.category}</span>
        </nav>

        {/* Player */}
        <CinemaPlayer youtubeId={film.youtubeId} className="mt-5 overflow-hidden border border-house-brown/12" />

        {/* Title block */}
        <p className="mt-7 font-sans text-[12px] tracking-[0.2em] uppercase text-house-gold-ink">
          {film.category} · {film.duration}
        </p>
        <h1 className="mt-2 font-display text-[clamp(32px,4.6vw,60px)] leading-[1.05] text-house-black">
          {film.title}
        </h1>

        {/* About + description */}
        <p className="mt-10 inline-block border-b-2 border-house-gold-ink pb-1 font-sans text-[12px] tracking-[0.24em] uppercase text-house-brown">
          About
        </p>
        <div className="mt-5 max-w-[68ch] space-y-5">
          {paragraphs.map((p, i) => (
            <p key={i} className="font-sans text-[17px] leading-[1.7] text-house-brown/85">{p}</p>
          ))}
        </div>
      </article>

      {/* More films */}
      {others.length > 0 ? (
        <section className="border-t border-house-brown/10 px-[5vw] py-16">
          <div className="mx-auto max-w-[1200px]">
            <p className="mb-6 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">More films</p>
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-3">
              {others.map((f) => (
                <Link key={f.slug} href={`/cinema/${f.slug}`} className="group no-underline">
                  <div className="relative aspect-video w-full overflow-hidden border border-house-brown/12 bg-house-cream-dark">
                    <Image src={f.poster} alt={f.title} fill sizes="(min-width: 1024px) 31vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                    <span aria-hidden className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-house-cream/80 bg-house-black/35 text-house-cream backdrop-blur-sm transition-colors group-hover:border-house-gold group-hover:text-house-gold">▶</span>
                    </span>
                  </div>
                  <p className="mt-3 font-sans text-[11px] tracking-[0.2em] uppercase text-house-gold-ink">{f.category}</p>
                  <h3 className="mt-1 font-display text-[20px] leading-tight text-house-brown transition-colors group-hover:text-house-gold-ink">{f.title}</h3>
                </Link>
              ))}
            </div>
            <div className="mt-9">
              <Link href="/cinema" className="font-sans text-[12px] tracking-[0.18em] uppercase text-house-gold-ink no-underline hover:text-house-brown">
                All films →
              </Link>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
