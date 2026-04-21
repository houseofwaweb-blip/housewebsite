import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GhostLink } from "@/components/primitives/GhostLink";
import { Card } from "@/components/primitives/Card";

/**
 * Homepage — locked direction: Variant B (Georgian Photography).
 * Spec: /ux/01-homepage-hero/variant-B.html + _shared.css.
 *
 * Structure (top → bottom):
 *   1. Full-bleed Georgian hero — cream eyebrow + Didot headline + two CTAs
 *      over photograph with cream→brown gradient. Caption bottom-right.
 *   2. Four-column action rail — Use HoWA / Design / Care / Protect, each
 *      with a top gold hairline that fades in on hover.
 *   3. Closing tagline — italic Didot, centred.
 *
 * No Sanity yet — copy is hardcoded from the approved mockup until schemas
 * are populated. Once the homepage `page` doc lands in Sanity, swap the
 * strings for GROQ reads.
 */
export default function HomePage() {
  return (
    <>
      {/* 1. Georgian hero */}
      <section
        aria-label="Welcome"
        className="relative min-h-[calc(100vh-92px)] flex items-center justify-center text-center overflow-hidden"
      >
        <Image
          src="/home/hero-georgian.png"
          alt="A Georgian terrace in Notting Hill at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Gradient overlay — matches _shared.css */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(245,240,232,0.1)_0%,rgba(245,240,232,0)_30%,rgba(48,35,28,0.45)_100%)]"
        />

        <div className="relative z-10 max-w-[760px] px-6 text-house-cream">
          <Eyebrow colour="cream" className="block mb-8">
            A modern British institution
          </Eyebrow>
          <h1
            className="em-accent font-display font-medium leading-[1.02] tracking-[-0.01em] mb-5 text-house-cream drop-shadow-[0_2px_24px_rgba(29,29,27,0.28)]"
            style={{ fontSize: "clamp(56px, 7.5vw, 104px)" }}
          >
            Beautiful living,
            <br />
            <em>intelligently</em> stewarded.
          </h1>
          <p className="mx-auto max-w-[560px] text-[18px] leading-[1.6] text-house-cream/90 drop-shadow-[0_1px_14px_rgba(29,29,27,0.3)] mb-10">
            One House. One standard. One system of care. Design, services,
            protection, and curated commerce, connected by HoWA.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/api/howa-bounce?source=hero-primary"
              className="inline-block px-6 py-3 font-sans text-[12px] tracking-[0.16em] uppercase no-underline border border-house-cream/90 text-house-cream bg-transparent transition-colors duration-[var(--t-med)] ease-out hover:bg-house-cream hover:text-house-brown"
            >
              Start HoWA
            </Link>
            <Link
              href="/the-house"
              className="inline-block px-6 py-3 font-sans text-[12px] tracking-[0.16em] uppercase no-underline border border-house-cream/45 text-house-cream/90 bg-transparent transition-colors duration-[var(--t-med)] ease-out hover:bg-house-cream hover:text-house-brown hover:border-house-cream"
            >
              Explore the House
            </Link>
          </div>
        </div>

        <div className="absolute bottom-5 right-6 z-10 font-sans text-[10px] tracking-[0.16em] uppercase text-house-cream/60">
          Notting Hill · Golden Hour
        </div>
      </section>

      {/* 2. Four-column action rail */}
      <section
        aria-label="Ways to begin"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-house-cream border-t border-house-brown/10 px-[5vw]"
      >
        <ActionCard
          eyebrow="Use HoWA"
          title="Start with the living record"
          desc="A guided Companion builds the memory of your home."
          cta="Begin"
          href="/api/howa-bounce?source=action-rail"
          first
        />
        <ActionCard
          eyebrow="Design"
          title="Commission a space"
          desc="Interiors and gardens shaped by taste and craft."
          cta="See design"
          href="/design"
        />
        <ActionCard
          eyebrow="Care"
          title="Book care for the home"
          desc="Recurring and one-off services, configured through HoWA."
          cta="Book care"
          href="/services"
        />
        <ActionCard
          eyebrow="Protect"
          title="Protect what matters"
          desc="Calm prevention, evidence, and cover, never alarm."
          cta="Protect"
          href="/protect"
        />
      </section>

      {/* 3. Closing tagline */}
      <div className="text-center border-t border-house-brown/10 bg-house-cream px-5 py-6">
        <p className="font-sans italic text-[14px] text-house-stone tracking-[0.04em]">
          Ownership is passive. Stewardship is intentional.
        </p>
      </div>
    </>
  );
}

/**
 * ActionCard — one of the four tiles in the action rail.
 * Has a gold hairline rule at the top that fades in on hover (as in _shared.css).
 */
function ActionCard({
  eyebrow,
  title,
  desc,
  cta,
  href,
  first,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
  first?: boolean;
}) {
  return (
    <article
      className={`group relative px-6 pt-7 pb-8 ${
        first ? "" : "border-l border-house-brown/8"
      }`}
    >
      {/* Top gold hairline — fades in on card hover */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-6 right-6 h-px bg-house-gold opacity-0 transition-opacity duration-[var(--t-base)] ease-out group-hover:opacity-100"
      />
      <span className="block font-sans text-[10px] tracking-[0.18em] uppercase text-house-gold/90 mb-2">
        {eyebrow}
      </span>
      <h3 className="font-display text-[22px] font-medium leading-[1.15] text-house-brown mb-1">
        {title}
      </h3>
      <p className="font-sans text-[13px] leading-[1.5] text-house-stone">{desc}</p>
      <div className="mt-3">
        <GhostLink href={href}>{cta}</GhostLink>
      </div>
    </article>
  );
}
