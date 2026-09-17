import Link from "next/link";
import Image from "next/image";
import { HowaScoreGauge } from "@/components/marketing/HowaScoreGauge";

/**
 * Homepage HoWA hero-product module (Sept HoWA review v2, Step 04 / COPY 5.4).
 *
 * The House opens the homepage; this is the substantial product reveal AFTER the
 * service collection: "The House runs on HoWA." A bordered product-showcase
 * panel on a deeper warm ground so it reads as a product feature, not another
 * editorial band. The Doll's House sits on a matching rose panel (shown whole,
 * never cropped) with a baked HoWA Score dial over the empty backdrop.
 *
 * Release state: transition (HOWA_APP_LIVE=false). Links use truthful
 * destinations; the Score dial is a labelled "Example home" demonstration
 * (COPY 6.7), not a live score.
 */

const PROOF = [
  { when: "Before", copy: "A clearer brief, with less to explain again." },
  { when: "During", copy: "The right information for the person doing the work." },
  { when: "After", copy: "A record of what happened and what may need attention next." },
];

export function HowaHeroProduct() {
  return (
    <section aria-labelledby="howa-module-heading" className="howa-surface bg-[#e9ddcd]">
      <div className="mx-auto max-w-[1600px] px-[5vw] py-[clamp(56px,7vw,112px)]">
        <div className="grid items-stretch overflow-hidden border border-house-brown/15 bg-[#f6efe7] lg:grid-cols-[0.78fr_1.22fr]">
          {/* Copy — generous padding + rhythm so it doesn't feel cramped */}
          <div className="flex flex-col justify-center gap-7 p-[clamp(32px,4.5vw,68px)]">
            <p className="flex items-center gap-3 font-sans text-[13px] tracking-[0.24em] uppercase text-house-gold-dark">
              <span aria-hidden="true" className="inline-block h-px w-8 bg-house-gold-dark/60" />
              <Image src="/brand/howa/howa-black.svg" alt="HoWA" width={90} height={33} className="h-[28px] w-auto" />
              <span>Home Intelligence</span>
            </p>

            <h2 id="howa-module-heading" className="font-display text-[clamp(38px,4.6vw,62px)] leading-[1.02]">
              The House runs on HoWA.
            </h2>

            <p className="max-w-[46ch] font-sans text-[clamp(18px,1.5vw,21px)] leading-[1.65] text-house-brown/80">
              The House brings the people, expertise and care. HoWA brings the
              useful details together: your priorities before a visit, the
              relevant history for the professional and a record of the work
              afterwards.
            </p>

            <ul className="divide-y divide-house-brown/12 border-y border-house-brown/12">
              {PROOF.map((p) => (
                <li key={p.when} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6">
                  <span className="shrink-0 font-sans text-[12px] tracking-[0.2em] uppercase text-house-gold-dark sm:w-[92px] sm:pt-1">{p.when}</span>
                  <span className="font-sans text-[16px] leading-[1.5] text-house-brown/85">{p.copy}</span>
                </li>
              ))}
            </ul>

            {/* Stacked buttons must be equal length (brand rule). The long label
                means these stay stacked + full-width rather than wrapping to
                unequal widths. */}
            <div className="flex flex-col items-stretch gap-3">
              <Link href="/how-it-works" className="booknow-button w-full whitespace-nowrap text-center font-sans text-[13px] tracking-[0.16em] uppercase text-house-cream bg-house-brown border border-house-brown px-6 py-3 no-underline transition-[filter] duration-[var(--t-slow)] ease-out hover:brightness-125">
                See how the House uses HoWA
              </Link>
              <Link href="/howa" className="w-full whitespace-nowrap text-center font-sans text-[13px] tracking-[0.16em] uppercase text-house-brown border border-house-brown/40 px-6 py-3 no-underline transition-colors duration-[var(--t-base)] hover:border-house-brown">
                Explore HoWA
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-7 gap-y-2 font-sans text-[14px] text-house-brown/70">
              <Link href="/howa/design" className="no-underline hover:text-house-gold-ink">Start a design idea →</Link>
              <Link href="/howa" className="no-underline hover:text-house-gold-ink">Already with the House? Meet HoWA →</Link>
              <Link href="/howa/house-customers" className="no-underline hover:text-house-gold-ink">On a regular service plan? See your HoWA Steward move →</Link>
            </div>
          </div>

          {/* Visual — the Doll's House is always shown at its true 4:3, so its
              WIDTH is never cropped (the house stays whole). Any vertical gap at
              narrow two-column widths is filled by the pink sampled from the
              image's own wall, so it reads as one continuous wall rather than a
              painted panel. Baked HoWA Score dial over the empty wall left. */}
          <div className="relative flex items-center justify-center overflow-hidden bg-[#d9a9a2]">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/howa/sept/howa-dollhouse-4x3.webp"
                alt="The HoWA Doll's House: a cutaway model of a British home, room by room"
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-contain object-bottom"
              />
              <div className="absolute left-[7%] top-1/2 -translate-y-1/2">
                <HowaScoreGauge score={82} label="Example home" />
              </div>
              <span className="absolute bottom-3 right-3 font-sans text-[10px] tracking-[0.14em] uppercase text-house-brown/60">
                Product concept
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
