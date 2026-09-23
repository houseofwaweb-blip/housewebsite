import Image from "next/image";
import Link from "next/link";

/**
 * PopularServices — homepage "Get something sorted" (brief §7), designed to the
 * mockup: four high-intent service cards with confirmed starting prices, plus a
 * dark-green "Not sure what you need?" help card carrying the "brighter
 * tomorrow" leaf motif. Prices confirmed by the House (2026-09-21).
 */
const CARDS = [
  {
    name: "Garden Tidy",
    slug: "gardening",
    href: "/services/gardening/garden-tidy",
    desc: "For gardens that need bringing back under control.",
    includes: ["Lawn care where required", "Weeding and pruning", "Hedge trimming within limits", "General garden tidy"],
    image: "/services/subbrands/gardeners.webp",
    price: "From £79",
    cta: "Book now",
  },
  {
    name: "Home Cleaning",
    slug: "cleaning",
    href: "/services/cleaning",
    desc: "Reliable help keeping home as it should be.",
    includes: ["Kitchens", "Bathrooms", "Floors", "General surfaces"],
    image: "/services/subbrands/cleaners.webp",
    price: "From £59",
    cta: "Book now",
  },
  {
    name: "Window Cleaning",
    slug: "window-cleaning",
    href: "/services/window-cleaning",
    desc: "Clear windows, frames and external cleaning.",
    includes: ["Exterior windows", "Frames and sills", "Interior glass on request"],
    image: "/services/subbrands/window-cleaner.webp",
    price: "From £49",
    cta: "Check my property",
  },
  {
    name: "Handyman",
    slug: "handyman",
    href: "/services/handyman",
    desc: "The jobs that have been waiting long enough.",
    includes: ["Furniture assembly", "Hanging and fitting", "Repairs and maintenance"],
    image: "/services/subbrands/handyman.webp",
    price: "From £69",
    cta: "Book a handyman",
  },
];

export function PopularServices() {
  return (
    <section aria-label="Popular services" className="bg-house-cream-light px-[5vw] py-[clamp(48px,6vw,88px)]">
      <div className="mx-auto max-w-[1360px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-[clamp(30px,3.6vw,48px)] leading-[1.04] text-house-ink">Get something sorted.</h2>
            <p className="mt-3 max-w-[56ch] font-sans text-[17px] leading-[1.6] text-house-brown/80">
              Choose the job. See what it includes. Check availability.
            </p>
          </div>
          <Link href="/services" className="font-sans text-[13px] tracking-[0.18em] uppercase text-house-brown no-underline border-b border-house-brown/40 pb-1 hover:border-house-brown">
            View all services →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {CARDS.map((c) => (
            <article key={c.slug} className="flex flex-col border border-house-brown/12 bg-house-white">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image src={c.image} alt={`${c.name} by the House`} fill sizes="(min-width:1280px) 20vw, (min-width:640px) 45vw, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-[21px] leading-tight text-house-ink">{c.name}</h3>
                <p className="mt-1.5 font-sans text-[14px] leading-[1.5] text-house-brown/75">{c.desc}</p>
                <ul className="mt-3 flex flex-1 flex-col gap-1.5">
                  {c.includes.map((i) => (
                    <li key={i} className="flex gap-2 font-sans text-[13.5px] leading-[1.45] text-house-brown/80">
                      <span aria-hidden className="text-house-gold-dark">·</span>{i}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 font-display text-[22px] leading-none text-house-ink"><span className="font-sans text-[12px] uppercase tracking-[0.1em] text-house-stone">From </span><span className="font-sans tabular-nums font-medium text-house-ink">{c.price.replace("From ", "")}</span></p>
                <Link href={c.href} className="mt-3 inline-flex h-11 items-center justify-center whitespace-nowrap border border-house-gold-ink bg-house-gold-ink px-5 font-sans text-[12px] uppercase tracking-[0.14em] text-house-ink no-underline transition-[filter] hover:brightness-105">
                  {c.cta} →
                </Link>
              </div>
            </article>
          ))}

          {/* Help card — when it's the odd one out in the 2-col grid, span the
              row and centre it (with a cap) rather than sit alone on the left. */}
          <article className="flex flex-col justify-center bg-house-forest p-6 text-house-cream sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-[460px] lg:col-span-1 lg:mx-0 lg:max-w-none">
            <h3 className="font-display text-[clamp(22px,1.6vw,26px)] leading-tight">Not sure what you need?</h3>
            <p className="mt-3 font-sans text-[15px] leading-[1.55] text-house-cream/80">
              Tell HoWA what&rsquo;s happening and we&rsquo;ll point you in the right direction.
            </p>
            <Link href="/howa/ask" className="mt-5 inline-flex h-11 items-center justify-center whitespace-nowrap border border-house-gold-light bg-house-gold-light px-5 font-sans text-[12px] uppercase tracking-[0.14em] text-house-ink no-underline transition-[filter] hover:brightness-105">
              Ask HoWA →
            </Link>
            <div className="mt-6 flex items-center gap-2 border-t border-house-cream/20 pt-4 font-sans text-[10px] uppercase tracking-[0.18em] text-house-gold-light">
              <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="currentColor"><path d="M12 2C8 6 6 10 6 14a6 6 0 0 0 12 0c0-4-2-8-6-12Zm0 3c2.5 2.8 4 5.8 4 9a4 4 0 0 1-8 0c0-3.2 1.5-6.2 4-9Z"/></svg>
              A happier home is a brighter tomorrow
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
