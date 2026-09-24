import Link from "next/link";

/**
 * HouseAboutIntro — the short About introduction on the homepage (final
 * September brief §2). Sits immediately after "The House at work" and links to
 * the full story at /the-house/about. Kept compact so the homepage does not
 * gain another long block.
 */
export function HouseAboutIntro() {
  return (
    <section
      aria-label="About the House"
      className="border-t border-house-line bg-house-cream-light px-[5vw] py-[clamp(44px,6vw,88px)]"
    >
      <div className="mx-auto max-w-[860px] text-center">
        <p className="font-sans text-[13px] tracking-[0.28em] uppercase text-house-gold-ink">
          About the House
        </p>
        <h2 className="mt-4 font-display text-[clamp(30px,3.4vw,50px)] leading-[1.06] text-house-brown text-balance">
          Rooted in design. <em className="italic text-house-gold-ink">Devoted to home.</em>
        </h2>
        <p className="mx-auto mt-5 max-w-[62ch] font-sans text-[clamp(17px,1.5vw,20px)] leading-[1.65] text-house-brown/80">
          We began in 2019 with a garden design studio and a belief that
          beautiful spaces deserved thoughtful care. Founded by Samuel Collett
          and Alexander Oakley, the House now brings that same attention to
          homes, gardens and the people who live in them, through our own teams,
          our design studio and selected House Approved specialists.
        </p>
        <Link
          href="/the-house/about"
          className="mt-7 inline-flex h-12 items-center justify-center whitespace-nowrap border border-house-gold-ink px-7 font-sans text-[13px] uppercase tracking-[0.16em] text-house-brown no-underline transition-colors hover:bg-house-gold-ink hover:text-house-ink"
        >
          Read our story &rarr;
        </Link>
      </div>
    </section>
  );
}
