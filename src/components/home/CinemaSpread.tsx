import Image from "next/image";
import Link from "next/link";
import { FEATURE_FILMS } from "@/lib/cinema";

/**
 * CinemaSpread — homepage cinema band (sits under the Hearth section).
 *
 * The screening-room band sits on the left; two feature films (Beckenham,
 * Tom Hart Dyke) stack on the right. House tokens throughout, sentence case,
 * no em dashes. Wire in as <CinemaSpread /> (no props).
 */
export function CinemaSpread() {
  return (
    <section aria-label="The House Cinema" className="bg-house-ink px-[5vw] py-[clamp(40px,5vw,72px)]">
      <div className="mx-auto grid max-w-[1360px] items-stretch gap-6 lg:grid-cols-[1.55fr_1fr]">
        {/* Left — the screening room */}
        <Link
          href="/cinema"
          aria-label="Enter the House screening room"
          className="group relative block aspect-[16/10] overflow-hidden no-underline lg:aspect-auto lg:min-h-[540px]"
        >
          <Image
            src="/home/cinema-grid.webp"
            alt="A film still from the House Cinema"
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <span
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(29,20,15,0.85) 0%, rgba(29,20,15,0.35) 45%, rgba(29,20,15,0.05) 100%)",
            }}
          />
          <span aria-hidden className="absolute inset-0 flex items-center justify-center">
            <span className="is-round flex h-[76px] w-[76px] items-center justify-center border border-house-cream/70 bg-house-black/30 text-[18px] text-house-cream backdrop-blur-sm transition-colors duration-[var(--t-base)] ease-out group-hover:border-house-gold-light group-hover:text-house-gold-light">
              ▶
            </span>
          </span>
          <div className="absolute inset-x-0 bottom-0 p-[clamp(20px,3vw,44px)]">
            <span className="mb-3 block font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-light">
              The House · Cinema
            </span>
            <h2 className="max-w-[16ch] font-display font-medium text-[clamp(26px,3.2vw,46px)] leading-[1.05] text-house-cream">
              An evening in <em className="font-normal italic">the screening room.</em>
            </h2>
            <span className="mt-4 inline-block border-b border-house-cream/40 pb-1 font-sans text-[12px] tracking-[0.2em] uppercase text-house-cream transition-colors duration-[var(--t-base)] ease-out group-hover:border-house-gold-light group-hover:text-house-gold-light">
              Watch now →
            </span>
          </div>
        </Link>

        {/* Right — two feature films */}
        <div className="grid gap-6 lg:grid-rows-2">
          {FEATURE_FILMS.map((film) => (
            <Link
              key={film.slug}
              href={`/cinema/${film.slug}`}
              aria-label={`Watch: ${film.shortTitle}`}
              className="group relative block aspect-video overflow-hidden no-underline lg:aspect-auto"
            >
              <Image
                src={film.thumb}
                alt={film.title}
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <span
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(29,20,15,0.88) 0%, rgba(29,20,15,0.3) 55%, rgba(29,20,15,0.05) 100%)",
                }}
              />
              <span aria-hidden className="absolute inset-0 flex items-center justify-center">
                <span className="is-round flex h-[52px] w-[52px] items-center justify-center border border-house-cream/70 bg-house-black/30 text-[13px] text-house-cream backdrop-blur-sm transition-colors group-hover:border-house-gold-light group-hover:text-house-gold-light">
                  ▶
                </span>
              </span>
              <div className="absolute inset-x-0 bottom-0 p-[clamp(16px,1.6vw,24px)]">
                <span className="mb-1.5 block font-sans text-[10px] tracking-[0.24em] uppercase text-house-gold-light">
                  {film.category}
                </span>
                <h3 className="max-w-[24ch] font-display text-[clamp(17px,1.5vw,22px)] leading-[1.15] text-house-cream">
                  {film.shortTitle}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
