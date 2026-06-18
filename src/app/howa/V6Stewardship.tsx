import Image from "next/image";

/* ──────────────────────────────────────────────────────────────────────
   /howa — the Stewardship banner — ported from the askhowa.co.uk source
   (app/v6/V6Sections.tsx → V6Stewardship). Navy band, dark lamp-lit
   dollhouse image, four points, "Explore Steward" (→ the Steward deep-dive
   panel #tier-steward), handwritten gold note. Image path .png → .webp.
   ────────────────────────────────────────────────────────────────────── */

const hand = { className: "handwriting" };

export function V6Stewardship() {
  const points = ["Long term plans", "Asset protection", "Legacy & handover", "Peace of mind"];
  return (
    <section className="relative text-[#f3ede0] overflow-hidden" style={{ background: "#27384c" }}>
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-4">
          <p className="smallcaps text-[11px] tracking-[0.18em] text-[#f3ede0]/60 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a960]" /> Stewardship
          </p>
          <h2 className="font-display text-[clamp(29px,2.8vw,42px)] leading-[1.05] text-[#c5a960]">
            Built to be handed on, not handed over.
          </h2>
          <p className="mt-4 text-[16.5px] leading-[1.55] text-[#f3ede0]/85 max-w-[340px]">
            HoWA Steward protects what matters now and prepares for the future with clarity, care and confidence.
          </p>
          <a href="#tier-steward" className="mt-6 inline-flex items-center gap-2 rounded-md border border-[#f3ede0]/45 px-6 py-3 text-[16px] text-[#f3ede0] hover:bg-[#f3ede0]/10 transition-colors">
            Explore Steward <span aria-hidden>→</span>
          </a>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)] ring-1 ring-[color:var(--color-gold)]/20">
            <Image src="/home-v4/v6-house-dark-v3.webp" alt="The dollhouse in a dark, lamp-lit setting with subtle engineering linework." fill sizes="(max-width:1024px) 92vw, 42vw" className="object-cover" />
          </div>
        </div>
        <div className="lg:col-span-3">
          <ul className="space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-[16px] text-[#f3ede0]/90">
                <Tick light /> {p}
              </li>
            ))}
          </ul>
          <p className={`${hand.className} mt-6 text-[21px] text-[#c5a960]`}>A legacy well kept.</p>
        </div>
      </div>
    </section>
  );
}

function Tick({ light }: { light?: boolean }) {
  const c = light ? "#c5a960" : "var(--color-howa-green)";
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </svg>
  );
}
