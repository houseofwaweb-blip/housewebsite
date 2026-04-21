import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GhostLink } from "@/components/primitives/GhostLink";

/**
 * /design — landing page.
 * Two disciplines (interiors + gardens) + four launch studios.
 * Partner profiles live at /partners/[slug] once Sanity content arrives.
 */
export const metadata = {
  title: "Design",
  description:
    "Interiors and gardens by designers we've vetted and trust. Every project carries the House standard.",
};

const LAUNCH_PARTNERS = [
  {
    slug: "delve-interiors",
    name: "Delve Interiors",
    type: "Interiors studio",
    blurb: "Considered schemes, quiet palettes, careful detailing. London and the South East.",
  },
  {
    slug: "jessica-durling-mcmahon",
    name: "Jessica Durling-McMahon",
    type: "Interior designer",
    blurb: "Layered rooms with confident colour, antiques properly used, and a love of textile.",
  },
  {
    slug: "willow-alexander-gardens",
    name: "Willow Alexander Gardens",
    type: "Garden design",
    blurb: "Planting schemes and landscapes rooted in the garden's existing character.",
  },
  {
    slug: "house-ai",
    name: "House AI",
    type: "Specialist partner",
    blurb: "Automation, lighting schemes, and quiet technology that disappears into the architecture.",
  },
];

export default function DesignLanding() {
  return (
    <article className="bg-house-cream text-house-brown">
      {/* Hero */}
      <section className="px-[5vw] pt-[12vh] pb-16">
        <div className="max-w-[880px] mx-auto">
          <Eyebrow>Design</Eyebrow>
          <h1 className="em-accent font-display font-medium text-[clamp(44px,6vw,80px)] leading-[1.05] tracking-[-0.01em] mt-4">
            Interiors and gardens, <em>considered</em>.
          </h1>
          <p className="font-sans text-[19px] leading-[1.6] text-house-brown/75 mt-6 max-w-[60ch]">
            The House commissions and introduces. Every studio below has been
            vetted and lives up to what we call &ldquo;House Approved&rdquo;
            — a mark we place only when we would recommend them to someone
            we love.
          </p>
          <div className="mt-8 flex items-center gap-4 flex-wrap">
            <Link
              href="/book-consultation?service=design-interiors"
              className="inline-block font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold px-6 py-3.5 no-underline transition-colors duration-[var(--t-slow)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
            >
              Commission a space
            </Link>
            <GhostLink href="/partners">See all partners</GhostLink>
          </div>
        </div>
      </section>

      {/* Two disciplines */}
      <section className="px-[5vw] py-14 border-t border-house-brown/10 bg-white">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-6">
          <Link
            href="/design/interiors"
            className="group relative border border-house-brown/10 p-10 bg-house-cream no-underline block transition-all duration-[var(--t-slow)] ease-out hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(48,35,28,0.1)] hover:border-house-gold"
          >
            <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold mb-3">
              01 · Interiors
            </div>
            <h2 className="font-display font-medium text-[32px] leading-[1.15] mb-3 pb-3 relative text-house-brown after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:bg-house-gold after:w-[28px] after:transition-[width] after:duration-[var(--t-slow)] after:ease-out group-hover:after:w-[72px]">
              Interiors
            </h2>
            <p className="font-sans italic text-[16px] leading-[1.6] text-house-stone mb-6">
              Considered schemes, from whole-house renovations to single-room
              re-reads.
            </p>
            <div className="font-sans text-[11px] tracking-[0.16em] uppercase text-house-gold">
              Discover interiors →
            </div>
          </Link>

          <Link
            href="/design/gardens"
            className="group relative border border-house-brown/10 p-10 bg-house-cream no-underline block transition-all duration-[var(--t-slow)] ease-out hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(48,35,28,0.1)] hover:border-house-gold"
          >
            <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold mb-3">
              02 · Gardens
            </div>
            <h2 className="font-display font-medium text-[32px] leading-[1.15] mb-3 pb-3 relative text-house-brown after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:bg-house-gold after:w-[28px] after:transition-[width] after:duration-[var(--t-slow)] after:ease-out group-hover:after:w-[72px]">
              Gardens
            </h2>
            <p className="font-sans italic text-[16px] leading-[1.6] text-house-stone mb-6">
              Planting plans and landscape work, led by Willow Alexander Gardens.
            </p>
            <div className="font-sans text-[11px] tracking-[0.16em] uppercase text-house-gold">
              Discover gardens →
            </div>
          </Link>
        </div>
      </section>

      {/* Launch studios */}
      <section className="px-[5vw] py-20 border-t border-house-brown/10">
        <div className="max-w-[1080px] mx-auto">
          <Eyebrow>Our studios</Eyebrow>
          <h2 className="em-accent font-display font-medium text-[clamp(28px,3.8vw,44px)] leading-[1.15] mt-3 mb-10 max-w-[24ch]">
            Four launch <em>partners</em>.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {LAUNCH_PARTNERS.map((p) => (
              <Link
                key={p.slug}
                href={`/partners/${p.slug}`}
                className="group block border border-house-brown/10 p-8 bg-white no-underline transition-[border-color,transform] duration-[var(--t-slow)] ease-out hover:border-house-gold hover:-translate-y-0.5"
              >
                <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold mb-2">
                  {p.type}
                </div>
                <h3 className="font-display font-medium text-[24px] leading-[1.2] text-house-brown mb-3">
                  {p.name}
                </h3>
                <p className="font-sans italic text-[15px] leading-[1.55] text-house-stone">
                  {p.blurb}
                </p>
                <div className="mt-4 font-sans text-[11px] tracking-[0.16em] uppercase text-house-gold">
                  Read profile →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
