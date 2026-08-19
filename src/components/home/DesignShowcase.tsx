import Link from "next/link";
import Image from "next/image";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";

/**
 * DesignShowcase — the House's two design studios as a pair of editorial image
 * cards on the homepage: Interior design (/services/interiors) and Garden
 * design (/services/home-and-garden). Design folds into Services per the Aug-17
 * spec (no separate Design pillar), but the House still leads with its design
 * craft here. Floral watermark per spec §4.4.
 */
const CARDS = [
  {
    eyebrow: "Interior design",
    title: "Rooms that hold a life.",
    body: "Interior design for a room, a floor or a whole house, from the first brief through to specification and installation.",
    image: "/home-v4/v6-interior-design.webp",
    imageAlt: "A layered, considered British interior",
    href: "/design/interiors",
    cta: "Explore interior design",
  },
  {
    eyebrow: "Garden design",
    title: "Gardens made to be lived in.",
    body: "Garden design shaped around the site, the soil and how you want to use it, with planting, structure and build considered together.",
    image: "/home/garden-design.webp",
    imageAlt: "A designed English garden in considered planting",
    href: "/design/gardens",
    cta: "Explore garden design",
  },
];

export function DesignShowcase() {
  return (
    <section className="relative overflow-hidden bg-house-cream-light border-t border-house-line px-[5vw] py-[clamp(48px,6vw,96px)]">
      <FlowerWatermark color="gold" side="right" opacity={0.12} />
      <div className="relative mx-auto max-w-[1180px]">
        <div className="max-w-[48ch]">
          <p className="font-sans text-[13px] tracking-[0.22em] uppercase text-house-gold-dark">House Design</p>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,3vw,3rem)] leading-[1.05] text-house-ink text-balance">
            Two studios, one standard of care.
          </h2>
          <p className="mt-4 font-sans text-[19px] leading-relaxed text-house-brown/80">
            Interior and garden design, each led by people who understand how the
            space needs to work as well as how it should look.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {CARDS.map((c) => (
            <Link key={c.href} href={c.href} className="group block no-underline">
              <div
                className="relative aspect-[4/3] w-full overflow-hidden"
                style={{ border: "1px solid var(--color-house-line)" }}
              >
                <Image
                  src={c.image}
                  alt={c.imageAlt}
                  fill
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <p className="mt-5 font-sans text-[13px] tracking-[0.22em] uppercase text-house-gold-dark">
                {c.eyebrow}
              </p>
              <h3 className="mt-2 font-display text-[clamp(1.4rem,2vw,1.9rem)] leading-[1.1] text-house-ink">
                {c.title}
              </h3>
              <p className="mt-3 max-w-[46ch] font-sans text-[18px] leading-relaxed text-house-brown/80">
                {c.body}
              </p>
              <span className="mt-4 inline-block border-b border-house-brown/40 pb-1 font-sans text-[14px] tracking-[0.16em] uppercase text-house-brown transition-colors group-hover:border-house-brown">
                {c.cta}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
