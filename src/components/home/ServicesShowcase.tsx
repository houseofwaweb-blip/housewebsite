import Image from "next/image";
import Link from "next/link";

/**
 * ServicesShowcase — a homepage image band giving the Services pillar presence
 * between the booking rail and the editorial spread. "A specialist for every
 * corner." (spec §9 H1, L669). Each discipline in its still-life + service
 * colour label (colour as navigation punctuation only).
 */
type Svc = { name: string; href: string; image: string; colour: string; soon?: boolean };

const SERVICES: Svc[] = [
  { name: "Gardeners", href: "/services/gardening", image: "/services/subbrands/gardeners.webp", colour: "var(--service-gardeners)" },
  { name: "Housekeeping", href: "/services/housekeeping", image: "/services/subbrands/housekeeping.webp", colour: "var(--service-housekeeping)" },
  { name: "Cleaners", href: "/services/cleaning", image: "/services/subbrands/cleaners.webp", colour: "var(--service-cleaners)" },
  { name: "Window cleaners", href: "/services/window-cleaning", image: "/services/subbrands/window-cleaner.webp", colour: "var(--service-windows)" },
  { name: "Repairs & handyman", href: "/services/handyman", image: "/services/subbrands/handyman.webp", colour: "var(--service-handyman)" },
  { name: "Removals", href: "/services/removals", image: "/services/subbrands/removals.webp", colour: "var(--service-removals)" },
  { name: "Electrical & energy", href: "/services/energy", image: "/services/subbrands/electrical.webp", colour: "var(--service-energy)" },
  { name: "Dog walking", href: "/services/pet-care", image: "/services/subbrands/dog-walking.jpg", colour: "var(--service-dog-walkers)" },
  { name: "Home & garden", href: "/services/home-and-garden", image: "/home-v4/design-garden-day.jpg", colour: "var(--service-home-garden)" },
  { name: "Interiors", href: "/services/interiors", image: "/home-v4/design-portrait.webp", colour: "var(--house-brown)" },
];

export function ServicesShowcase() {
  return (
    <section className="bg-house-cream-light px-[5vw] py-[clamp(40px,4vw,68px)] border-t border-house-line">
      <div className="mx-auto max-w-[1360px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-sans text-[13px] tracking-[0.22em] uppercase text-house-gold-dark">
              The House · Services
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,2.8vw,2.8rem)] leading-[1.03] text-house-ink">
              A specialist for every corner.
            </h2>
          </div>
          <Link
            href="/services"
            className="font-sans text-[13px] tracking-[0.18em] uppercase text-house-brown no-underline border-b border-house-brown/40 pb-1 hover:border-house-brown"
          >
            All services
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {SERVICES.map((svc) => (
            <Link key={svc.name} href={svc.href} className="group block no-underline">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-house-cream-dark">
                <Image
                  src={svc.image}
                  alt={svc.name}
                  fill
                  sizes="(min-width:1024px) 18vw, 45vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {svc.soon ? (
                  <span className="absolute top-2 left-2 bg-house-ink/85 text-house-chalk font-sans text-[9px] tracking-[0.14em] uppercase px-2 py-1">
                    Coming soon
                  </span>
                ) : null}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="inline-block w-3 h-3 shrink-0" style={{ backgroundColor: svc.colour }} aria-hidden />
                <p className="font-sans text-[15.5px] text-house-brown group-hover:text-house-gold-dark transition-colors">
                  {svc.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
