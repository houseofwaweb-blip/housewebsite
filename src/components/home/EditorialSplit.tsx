import Image from "next/image";
import Link from "next/link";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";

/**
 * EditorialSplit — a text/image split band (text one side, image the other),
 * used to break up the homepage's text-only sections with imagery. Alternate
 * `imageSide` down the page for rhythm; `tone="brown"` gives a dark editorial
 * moment with cream text (and separates it from adjacent cream sections).
 */
export function EditorialSplit({
  eyebrow,
  heading,
  body,
  ctaLabel,
  ctaHref,
  image,
  imageAlt,
  imageSide = "right",
  tone = "cream",
}: {
  eyebrow: string;
  heading: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
  image: string;
  imageAlt: string;
  imageSide?: "left" | "right";
  tone?: "cream" | "cream-light" | "brown";
}) {
  const brown = tone === "brown";
  const bg = brown ? "bg-house-brown" : tone === "cream" ? "bg-house-cream" : "bg-house-cream-light";
  const eyebrowC = brown ? "text-house-gold" : "text-house-gold-dark";
  const headingC = brown ? "text-house-chalk" : "text-house-ink";
  const bodyC = brown ? "text-house-cream/80" : "text-house-brown/80";
  const ctaC = brown
    ? "text-house-chalk border-house-chalk/40 hover:bg-house-chalk hover:text-house-brown"
    : "text-house-brown border-house-brown/30 hover:bg-house-brown hover:text-house-cream";

  return (
    <section className={`${bg} relative overflow-hidden border-t border-house-line px-[5vw] py-[clamp(40px,5vw,76px)]`}>
      {/* Brand floral pattern hung off the copy-side edge (van-style), only on
          the dark brown moment, kept faint so it reads as texture. */}
      {brown ? (
        <FlowerWatermark
          variant="pattern"
          color="gold"
          side={imageSide === "right" ? "left" : "right"}
          opacity={0.22}
        />
      ) : null}
      <div className="relative z-10 mx-auto max-w-[1360px] grid lg:grid-cols-2 items-stretch gap-y-8 lg:gap-y-0">
        {/* Image */}
        <div
          className={`relative min-h-[320px] lg:min-h-[500px] ${
            imageSide === "left" ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <Image src={image} alt={imageAlt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
        </div>
        {/* Copy */}
        <div
          className={`flex flex-col justify-center py-4 lg:py-8 ${
            imageSide === "left" ? "lg:order-2 lg:pl-[clamp(32px,4vw,72px)]" : "lg:order-1 lg:pr-[clamp(32px,4vw,72px)]"
          }`}
        >
          <p className={`font-sans text-[13px] tracking-[0.22em] uppercase ${eyebrowC}`}>{eyebrow}</p>
          <h2 className={`mt-4 font-display text-[clamp(1.9rem,2.8vw,2.9rem)] leading-[1.04] text-balance ${headingC}`}>
            {heading}
          </h2>
          <p className={`mt-5 font-sans text-[19px] leading-relaxed max-w-[44ch] ${bodyC}`}>{body}</p>
          {ctaLabel && ctaHref ? (
            <Link
              href={ctaHref}
              className={`mt-7 inline-block w-fit font-sans text-[13px] tracking-[0.16em] uppercase no-underline border px-7 py-3 transition-colors ${ctaC}`}
            >
              {ctaLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
