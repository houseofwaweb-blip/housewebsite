import Image from "next/image";
import Link from "next/link";

/**
 * HearthCinemaBand — a Cinema block for the Hearth index.
 *
 * Presents the House screening room inside the magazine: a lead still on the
 * right, an editorial intro and a short list of current films on the left, each
 * linking through to /cinema. Uses the Hearth's own visual language
 * (font-hearth-serif / font-hearth-sans, house tokens) rather than the
 * standalone Cinema page styles.
 *
 * The film list is a light editorial teaser. The full, always-current index
 * (auto-pulled from the House YouTube channel) lives at /cinema.
 */

type FilmEntry = { category: string; title: string };

const FILMS: FilmEntry[] = [
  { category: "Interiors", title: "Inside a Beckenham home designed for work and family life" },
  { category: "Gardens", title: "Inside the World Garden with Tom Hart Dyke" },
  { category: "Makers", title: "The hands behind the objects we choose" },
];

export function HearthCinemaBand() {
  return (
    <section
      aria-label="The Hearth Cinema"
      className="bg-house-cream-dark px-[5vw] py-[72px] border-t border-b border-house-brown/8 my-8"
    >
      <div className="max-w-[1360px] mx-auto grid md:grid-cols-[1fr_1.15fr] gap-14 items-center">
        {/* Copy + film list */}
        <div>
          <span className="block mb-[14px] font-hearth-sans text-[14px] tracking-[0.28em] uppercase text-house-gold-ink">
            ◆ The Hearth · Cinema
          </span>
          <h2 className="font-hearth-serif font-medium text-[clamp(35px,3.6vw,51px)] leading-[1.1] tracking-[-0.005em] text-house-black mb-3">
            Films from <em className="italic font-normal">the House.</em>
          </h2>
          <p className="font-hearth-serif italic text-[21px] leading-[1.55] text-house-stone mb-6 max-w-[460px]">
            Gardens through the seasons, rooms coming together, and the makers
            behind the objects we choose. Our screening room, free to watch.
          </p>

          <ul className="mb-7 border-t border-house-brown/12">
            {FILMS.map((film) => (
              <li key={film.title} className="border-b border-house-brown/12">
                <Link
                  href="/cinema"
                  className="group flex items-baseline gap-4 py-[14px] no-underline"
                >
                  <span className="shrink-0 w-[84px] font-hearth-sans text-[13px] tracking-[0.18em] uppercase text-house-gold-ink">
                    {film.category}
                  </span>
                  <span className="font-hearth-serif text-[22px] leading-[1.25] text-house-black transition-colors duration-[var(--t-base)] ease-out group-hover:text-house-gold-dark">
                    {film.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/cinema"
            className="inline-block font-hearth-sans text-[14px] tracking-[0.2em] uppercase text-white bg-house-black px-6 py-[13px] no-underline transition-colors duration-[var(--t-slow)] ease-out hover:bg-house-brown"
          >
            Enter the screening room →
          </Link>
        </div>

        {/* Lead still */}
        <Link
          href="/cinema"
          aria-label="Watch films from the House"
          className="group relative block aspect-[16/10] w-full overflow-hidden bg-house-cream-dark no-underline"
        >
          <Image
            src="/home/cinema-grid.webp"
            alt="A film still from the House Cinema"
            fill
            sizes="(min-width: 768px) 54vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <span aria-hidden className="absolute inset-0 flex items-center justify-center">
            <span className="is-round flex h-[68px] w-[68px] items-center justify-center border border-house-cream/80 bg-house-black/35 text-[19px] text-house-cream backdrop-blur-sm transition-colors duration-[var(--t-base)] ease-out group-hover:border-house-gold-light group-hover:text-house-gold-light">
              ▶
            </span>
          </span>
        </Link>
      </div>
    </section>
  );
}
