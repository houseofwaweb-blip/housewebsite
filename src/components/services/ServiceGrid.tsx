import Image from "next/image";
import Link from "next/link";

/**
 * ServiceGrid — the colour-coded editorial anthology from rebuild spec §9.
 *
 * A still-life grid, not a horizontal carousel: each card carries its own
 * service colour AND its name (never colour alone), and follows the §9 card
 * copy model, name, one-sentence job, from-price, service-area note, and a
 * "View service" action.
 */

export interface ServiceGridCard {
  slug: string;
  name: string;
  /** One-sentence problem/outcome. */
  tagline: string;
  /** Resolved still-life image path. */
  image: string;
  href: string;
  /** CSS colour value, a `--service-*` token. */
  accent: string;
  /** Charging-basis line (e.g. "Priced per hour"), where a package basis exists.
   *  Never a £ figure: the House shows how a service is charged, not a number. */
  fromPrice?: string;
  /** Availability or service-area note. */
  area: string;
}

export function ServiceGrid({ cards }: { cards: ServiceGridCard[] }) {
  return (
    <div className="mx-auto grid max-w-[1340px] gap-7 px-[5vw] sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c) => (
        <Link
          key={c.slug}
          href={c.href}
          className="group flex flex-col border border-house-brown/15 bg-house-cream-light no-underline transition-colors hover:border-house-gold"
        >
          {/* Still-life in a refined service-colour frame (a measured ~5px, between
              a heavy block and a hairline). The name rides a colour tag so the
              service is identified by colour and name together, never colour alone. */}
          <div className="relative p-[5px]" style={{ background: c.accent }}>
            <div className="relative aspect-[5/4] w-full overflow-hidden">
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(min-width:1024px) 430px, (min-width:640px) 46vw, 92vw"
                className="object-cover"
              />
            </div>
            <span
              className="absolute left-4 top-4 inline-flex items-center gap-2 px-3 py-1.5 font-sans text-[11px] tracking-[0.18em] uppercase text-house-cream"
              style={{ background: c.accent }}
            >
              <span aria-hidden className="inline-block h-2 w-2 bg-house-cream/85" />
              {c.name}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-6">
            <h3 className="mb-2 font-hearth-serif text-[22px] leading-tight text-house-brown">
              {c.name}
            </h3>
            <p className="mb-5 font-sans text-[15px] leading-[1.55] text-house-brown/75">
              {c.tagline}
            </p>
            <div className="mt-auto grid gap-1 border-t border-house-brown/12 pt-4">
              <p className="font-sans text-[13px] font-medium text-house-brown">
                {c.fromPrice ?? "Priced on enquiry"}
              </p>
              <p className="font-sans text-[13px] text-house-brown/65">{c.area}</p>
            </div>
            <span className="mt-5 font-sans text-[11px] tracking-[0.2em] uppercase text-house-gold-ink transition-colors group-hover:text-house-brown">
              View service &rarr;
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
