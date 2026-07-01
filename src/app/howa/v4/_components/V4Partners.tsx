import Image from "next/image";

/* STEP 13 — partners enrich the record, they are not the product. Short and
   low on the page, with consent. (Brief v2, slide 18.) */
export function V4Partners() {
  return (
    <section id="partners" className="scroll-mt-20 bg-[#fbfaf5] py-14 border-t border-[color:var(--color-ink)]/8">
      <div className="mx-auto max-w-[860px] px-6 text-center sm:px-10">
        <div className="relative mx-auto mb-8 aspect-[1168/784] w-full max-w-[520px] overflow-hidden rounded-2xl ring-1 ring-[color:var(--color-gold)]/25 shadow-[0_30px_70px_-34px_rgba(40,30,10,0.45)]">
          <Image src="/home-v4/v6-interior-design.webp" alt="An interior design styling board of fabric swatches over an elegant Georgian room." fill sizes="(max-width:768px) 92vw, 520px" className="object-cover" />
        </div>
        <p className="smallcaps mb-3 text-[15px] tracking-[0.2em] text-[color:var(--color-gold-deep)]">Partners</p>
        <p className="font-display text-[clamp(19px,2vw,26px)] leading-[1.3] text-[color:var(--color-ink)]">
          Partners appear where they help the home record.
        </p>
        <p className="mt-3 smallcaps text-[12px] tracking-[0.16em] text-[color:var(--color-gold-deep)]/75">
          Energy · Insurance readiness · Conveyancing · Home goods
        </p>
        <p className="mt-4 text-[15px] text-[color:var(--color-ink-soft)]/60">
          With your consent, and only where they help the home, never a directory or a discounts club.
        </p>
        <a href="mailto:sales@willowalexander.co.uk?subject=HoWA partner enquiry" className="mt-4 inline-flex items-center gap-1.5 text-[15px] text-[color:var(--color-gold-deep)] underline underline-offset-2">
          Apply to partner <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
