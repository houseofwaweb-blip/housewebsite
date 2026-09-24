import Link from "next/link";
import Image from "next/image";

/**
 * DesignShowcase — homepage Design section (brief §9), designed to the
 * further-amendments mockup: a large interior image LEFT, the heading + copy +
 * CTA in the CENTRE, and a three-image triptych RIGHT carrying the
 * "beautiful / practical / always British" card. Copy from the brief.
 */
const TRIPTYCH = [
  { src: "/home/design-artwork.webp", alt: "Two people hanging a colour-confident abstract artwork in a British sitting room" },
  { src: "/home/garden-design.webp", alt: "A designed English garden set for dining" },
  { src: "/home-v4/design-portrait.webp", alt: "A considered interior detail" },
];

export function DesignShowcase() {
  return (
    <section aria-label="House Design" className="border-t border-house-line bg-house-cream-light px-[clamp(16px,3vw,40px)] py-[clamp(40px,5vw,80px)]">
      <div className="mx-auto grid max-w-[1760px] items-center gap-4 lg:grid-cols-[0.85fr_0.85fr_1.3fr]">
        {/* Left — large interior image. Keep the image's own 1168:784 aspect so
            object-cover never crops the sides and cuts the "INTERIOR DESIGN"
            wording baked into it (was forced to 4:3 / portrait and lost it). */}
        <div className="relative aspect-[1168/784] w-full self-center overflow-hidden bg-house-cream-light">
          <Image src="/home-v4/v6-interior-design.webp" alt="A layered, considered British interior" fill sizes="(min-width:1024px) 28vw, 100vw" className="object-contain" />
        </div>

        {/* Centre — copy */}
        <div className="flex flex-col justify-center px-[clamp(4px,1.5vw,28px)] py-4">
          <p className="font-sans text-[13px] tracking-[0.22em] uppercase text-house-gold-dark">Interiors &amp; gardens</p>
          <h2 className="mt-4 font-display text-[clamp(30px,3vw,50px)] leading-[1.03] text-house-ink text-balance">
            Design for a kinder, calmer home.
          </h2>
          <p className="mt-4 max-w-[42ch] font-sans text-[clamp(16px,1.4vw,19px)] leading-[1.55] text-house-brown/80">
            From a single room or neglected garden to a complete transformation,
            the House brings together practical thinking, character and proper
            design.
          </p>
          <Link href="/design" className="mt-6 inline-flex h-12 w-fit items-center justify-center whitespace-nowrap border border-house-gold-ink bg-house-gold-ink px-7 font-sans text-[13px] uppercase tracking-[0.16em] text-house-ink no-underline transition-[filter] hover:brightness-105">
            Explore Design →
          </Link>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-sans text-[14px] text-house-brown/70">
            <Link href="/design/gardens" className="no-underline hover:text-house-gold-ink">Garden design →</Link>
            <Link href="/design/interiors" className="no-underline hover:text-house-gold-ink">Home design →</Link>
            <Link href="/design#routes" className="no-underline hover:text-house-gold-ink">Book a consultation →</Link>
          </div>
        </div>

        {/* Right — triptych with the motif card */}
        <div className="relative grid grid-cols-3 gap-3">
          {TRIPTYCH.map((t) => (
            <div key={t.src} className="relative aspect-[3/4] w-full overflow-hidden">
              <Image src={t.src} alt={t.alt} fill sizes="(min-width:1024px) 15vw, 33vw" className="object-cover" />
            </div>
          ))}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-house-cream px-5 py-4 text-center shadow-[0_18px_50px_-24px_rgba(29,29,27,0.6)]">
            <p className="font-sans text-[clamp(10px,0.9vw,12px)] uppercase tracking-[0.22em] leading-[1.9] text-house-ink">
              Beautiful<br />Practical<br />Always British
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
