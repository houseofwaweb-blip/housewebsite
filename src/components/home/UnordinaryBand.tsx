import Image from "next/image";
import Link from "next/link";

/**
 * UnordinaryBand — homepage §12 (further-amendments brief): a short visual
 * interruption between House and HoWA, not a product explainer. Full-bleed
 * cinematic still, one headline, one line, one CTA. The image carries the idea.
 *
 * DESTINATION: "Enter The unOrdinary" points at /cinema (the campaign film
 * world) for now; a dedicated /the-unordinary landing (brief §26) is a separate
 * build item.
 */
export function UnordinaryBand() {
  return (
    <section aria-label="The unOrdinary" className="relative bg-house-ink">
      <Link
        href="/cinema"
        aria-label="Enter The unOrdinary"
        className="group relative block aspect-[16/9] w-full overflow-hidden no-underline sm:aspect-[2/1] lg:aspect-[21/9]"
      >
        <Image
          src="/howa/cinema/the-post-room-still.webp"
          alt="A cinematic scene from The unOrdinary: particular people in an ordinary British home"
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-[var(--t-slow)] ease-out group-hover:scale-[1.03]"
        />
        <span
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(16,20,17,0.86) 0%, rgba(16,20,17,0.5) 42%, rgba(16,20,17,0.1) 75%)" }}
        />
        <div className="absolute inset-y-0 left-0 flex max-w-[60%] flex-col justify-center px-[clamp(24px,6vw,96px)]">
          <span className="mb-3 block font-sans text-[clamp(11px,1vw,13px)] tracking-[0.28em] uppercase text-house-gold-light">
            The unOrdinary
          </span>
          <h2 className="font-display text-[clamp(32px,5vw,72px)] leading-[0.98] text-house-cream">
            Ordinary home.<br />Particular people.
          </h2>
          <p className="mt-4 max-w-[42ch] font-sans text-[clamp(15px,1.5vw,20px)] leading-[1.5] text-house-cream/85">
            Meet the people, habits and homes that make ordinary life anything but.
          </p>
          <span className="mt-6 inline-block w-fit border-b border-house-cream/40 pb-1 font-sans text-[clamp(12px,1.1vw,14px)] tracking-[0.2em] uppercase text-house-cream transition-colors duration-[var(--t-base)] ease-out group-hover:border-house-gold-light group-hover:text-house-gold-light">
            Enter The unOrdinary →
          </span>
        </div>
      </Link>
    </section>
  );
}
