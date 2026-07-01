import Image from "next/image";

/* ──────────────────────────────────────────────────────────────────────
   Partner & supply architecture, as THREE separate strips (askhowa handover):
     C1  The House at work — fulfilment      · House register (parchment)
     C2  An exclusive circle of partners     · House register (parchment)
     C3  Become a founding partner (the ask) · HoWA register (navy/mono)
   Ported for the House site: image paths .jpg -> .webp.
   NOTE: WA_BRANDS still lists Handyman + Removals (askhowa content); CLAUDE.md
   lists those as deferred at launch — pending Alex's call on whether to trim.
   ────────────────────────────────────────────────────────────────────── */

const WA_BRANDS = [
  { name: "Gardeners", color: "#586b3f" },
  { name: "Cleaners", color: "#38597a" },
  { name: "Window Cleaners", color: "#5a3a55" },
  { name: "Handyman", color: "#743338" },
  { name: "Removals", color: "#8a3d6a" },
];

const CIRCLE = ["Property", "Estate agents", "Conveyancing", "Energy & utilities", "Design studios", "Home cover"];

export function V6Partners() {
  return (
    <>
      {/* ── C1 · The House at work (fulfilment, House register) ── */}
      <section id="fulfilment" className="bg-[#efe7d5] border-t border-[color:var(--color-gold)]/25 scroll-mt-20">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            <p className="smallcaps text-[12px] tracking-[0.2em] text-[color:var(--color-gold-deep)] mb-5">The House at work</p>
            <h2 className="font-italic-display text-[clamp(28px,3vw,44px)] leading-[1.1] text-[color:var(--color-ink)]">
              When the work needs doing, the House steps in.
            </h2>
            <p className="mt-4 text-[clamp(17px,1.7vw,21px)] leading-[1.5] text-[color:var(--color-ink-soft)] max-w-[560px]">
              HoWA recommends. The House of Willow Alexander and its specialists fulfil.
            </p>

            <div className="mt-9 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-[520px]">
              {WA_BRANDS.map((b) => (
                <div key={b.name} className="rounded-md px-3.5 py-4 text-[#f3ede0]" style={{ background: b.color }}>
                  <p className="smallcaps text-[8.5px] tracking-[0.14em] text-[#f3ede0]/70">Willow Alexander</p>
                  <p className="font-display text-[16px] leading-tight mt-0.5">{b.name}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[16px] leading-[1.5] text-[color:var(--color-ink-soft)]/85 max-w-[520px]">
              Alongside a vetted network of House Approved trades, with coverage across the country.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative w-full aspect-[784/1168] max-w-[392px] mx-auto lg:ml-auto rounded-lg overflow-hidden ring-1 ring-[color:var(--color-gold)]/25 shadow-[0_30px_70px_-34px_rgba(40,30,10,0.5)]">
              <Image
                src="/home-v4/v6-house-approved.webp"
                alt="A sage-green styling board with a hand-lettered House Approved canvas, fabric swatches and a line drawing of a Georgian house."
                fill
                sizes="(max-width:1024px) 80vw, 392px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── C2 · An exclusive circle of partners (credibility, House register) ── */}
      <section id="partners" className="bg-[#f4f1e9] scroll-mt-20">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10 py-16 lg:py-20">
          <div className="text-center max-w-[660px] mx-auto">
            <SealMark className="mx-auto w-12 h-12 text-[color:var(--color-gold)] opacity-50 mb-5" />
            <p className="smallcaps text-[12px] tracking-[0.18em] text-[color:var(--color-gold-deep)] mb-4">Partnerships &middot; by the House of Willow Alexander</p>
            <h2 className="font-italic-display text-[clamp(28px,3vw,44px)] leading-[1.1] text-[color:var(--color-ink)]">
              An exclusive circle of partners.
            </h2>
            <div className="mt-8 relative w-full aspect-[1168/784] rounded-lg overflow-hidden ring-1 ring-[color:var(--color-gold)]/25 shadow-[0_30px_70px_-34px_rgba(40,30,10,0.45)]">
              <Image
                src="/home-v4/v6-interior-design.webp"
                alt="An interior design styling board of fabric swatches over an elegant Georgian room with sash windows and a checkerboard floor."
                fill
                sizes="(max-width:1024px) 90vw, 660px"
                className="object-cover"
              />
            </div>
            <p className="mt-7 text-[17px] leading-[1.55] text-[color:var(--color-ink-soft)]">
              Hand-picked British institutions across property, the home and beyond. First names announced soon.
            </p>
            <p className="mt-7 smallcaps text-[12px] tracking-[0.16em] text-[color:var(--color-gold-deep)]/70 leading-[1.9]">
              {CIRCLE.join("  ·  ")}
            </p>
          </div>
        </div>
      </section>

      {/* ── C3 · Become a founding partner (the ask, HoWA register, navy/mono) ── */}
      <section id="founding-partner" className="text-[#f3ede0] scroll-mt-20" style={{ background: "#1d2a40" }}>
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10 py-14 lg:py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-[680px]">
            <p className="smallcaps text-[12px] tracking-[0.18em] text-[#f3ede0]/55 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a960]" /> Founding partners
            </p>
            <h2 className="font-display text-[clamp(26px,2.6vw,38px)] leading-[1.1] text-[#f3ede0]">
              Building something for the British home?
            </h2>
            <p className="mt-4 text-[16.5px] leading-[1.55] text-[#f3ede0]/80 max-w-[600px]">
              Design studios, home cover, energy, lifestyle, if you supply the home, there&apos;s a place on the shelf. Join the founding circle.
            </p>
          </div>
          <a
            href="mailto:sales@willowalexander.co.uk?subject=Founding partner application"
            className="shrink-0 inline-flex items-center gap-2 rounded-md bg-[#c5a960] px-7 py-3.5 font-mono text-[15px] tracking-[0.02em] text-[#1d2a40] hover:bg-[#d4ba78] transition-colors"
          >
            Apply to partner <span aria-hidden>→</span>
          </a>
        </div>
      </section>
    </>
  );
}

function SealMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" aria-hidden>
      <circle cx="50" cy="50" r="46" strokeWidth="1.4" />
      <circle cx="50" cy="50" r="38" strokeWidth="0.7" />
      <text x="50" y="60" textAnchor="middle" fontSize="30" fontFamily="Georgia, serif" fill="currentColor" stroke="none">
        W
      </text>
    </svg>
  );
}
