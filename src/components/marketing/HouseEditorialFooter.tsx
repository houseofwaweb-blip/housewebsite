import Link from "next/link";

/**
 * HouseEditorialFooter — a "keep reading" cross-link band + CTA for the
 * /the-house editorial sub-pages (Philosophy, Standards, Sustainability, Proof,
 * About). These pages share the EditorialPage template, which has no built-in
 * footer, so on their own they dead-end. This gives each one an onward path to
 * its siblings and back into the House. NOT used on /legal pages (which also
 * use EditorialPage) — those stay plain.
 */

const PAGES = [
  { slug: "about", href: "/the-house/about", label: "About the House", blurb: "Who we are, and why the House exists." },
  { slug: "philosophy", href: "/the-house/philosophy", label: "Philosophy", blurb: "What we believe about homes and stewardship." },
  { slug: "standards", href: "/the-house/standards", label: "Standards", blurb: "How we vet, hold and keep the House standard." },
  { slug: "sustainability", href: "/the-house/sustainability", label: "Sustainability", blurb: "How the House treats materials, waste and time." },
  { slug: "proof", href: "/the-house/proof", label: "Proof", blurb: "The evidence behind the promises." },
];

export function HouseEditorialFooter({ current }: { current: string }) {
  const others = PAGES.filter((p) => p.slug !== current).slice(0, 3);

  return (
    <section className="border-t border-house-brown/10 bg-house-cream-dark px-[5vw] py-[clamp(52px,7vw,104px)]">
      <div className="mx-auto max-w-[1140px]">
        <p className="mb-3 font-sans text-[13px] tracking-[0.28em] uppercase text-house-gold-ink">
          Keep reading
        </p>
        <h2 className="mb-10 font-display text-[clamp(28px,3.4vw,46px)] leading-[1.1] text-house-brown">
          More from the House.
        </h2>

        <div className="grid gap-px bg-house-brown/10 sm:grid-cols-3">
          {others.map((p) => (
            <Link
              key={p.slug}
              href={p.href}
              className="group bg-house-cream p-7 no-underline text-house-brown transition-colors hover:bg-house-cream-light"
            >
              <h3 className="mb-3 font-display text-[24px] leading-[1.15] text-house-brown">{p.label}</h3>
              <p className="mb-4 font-sans text-[16px] leading-[1.55] text-house-brown/70">{p.blurb}</p>
              <span className="font-sans text-[13px] tracking-[0.2em] uppercase text-house-gold-ink">Read →</span>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href="/the-house"
            className="inline-block border border-house-brown bg-house-brown px-7 py-3.5 font-sans text-[15px] tracking-[0.18em] uppercase text-house-cream no-underline transition-colors hover:bg-house-ink"
          >
            Explore the House
          </Link>
          <Link
            href="/services"
            className="font-sans text-[15px] tracking-[0.18em] uppercase text-house-brown/80 underline decoration-house-brown/25 underline-offset-4 hover:text-house-brown hover:decoration-house-gold"
          >
            See our services →
          </Link>
        </div>
      </div>
    </section>
  );
}
