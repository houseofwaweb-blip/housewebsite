import Image from "next/image";

/**
 * HoWA hero demo — the askhowa reference hero: a cutaway blueprint house with a
 * floating phone mockup showing the Home Overview (HoWA Score, Living Record,
 * What matters first). Recreated in the House palette (cream cards, gold ring).
 * Pure server component (SVG + CSS). Rounding via the `howa-surface` scope.
 */

function ScoreRing({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="relative w-14 h-14 shrink-0">
      <svg viewBox="0 0 36 36" className="w-full h-full" aria-hidden>
        <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(48,35,28,0.12)" strokeWidth="2.6" />
        <circle
          cx="18"
          cy="18"
          r="15.5"
          fill="none"
          stroke="var(--color-house-gold-dark)"
          strokeWidth="2.6"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={`${pct} 100`}
          transform="rotate(-90 18 18)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-[16px] leading-none text-house-black">{value}</span>
        <span className="font-sans text-[7px] tracking-[0.06em] text-house-stone">OF 100</span>
      </div>
    </div>
  );
}

function Sparkline() {
  const pts = [
    [0, 24], [12, 20], [24, 22], [36, 14], [48, 16], [60, 9], [72, 6],
  ];
  return (
    <svg viewBox="0 0 80 30" className="flex-1 h-8" aria-hidden>
      <polyline
        points={pts.map((p) => p.join(",")).join(" ")}
        fill="none"
        stroke="var(--color-house-gold-dark)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.3" fill="var(--color-house-gold-dark)" />
      ))}
    </svg>
  );
}

export function HowaHeroDemo() {
  return (
    <div className="howa-surface relative min-h-[56vh] lg:min-h-[84vh] overflow-hidden bg-house-cream-dark">
      <Image
        src="/howa/hero-house.webp"
        alt="A HoWA home, seen in cutaway, with a live Home Overview"
        fill
        sizes="(min-width:1024px) 50vw, 100vw"
        className="object-cover"
        priority
      />
      {/* Floating phone */}
      <div className="absolute left-[5%] top-1/2 -translate-y-1/2 w-[min(276px,42vw)]">
        <div className="rounded-2xl bg-house-cream border-[6px] border-[#171009] shadow-[0_22px_54px_rgba(20,14,10,0.4)] overflow-hidden">
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <div>
              <div className="font-display text-[15px] leading-none text-house-black">HoWA</div>
              <div className="font-sans text-[9px] tracking-[0.1em] uppercase text-house-stone mt-1">
                Home Overview
              </div>
            </div>
            <div className="flex flex-col gap-[3px]">
              {[0, 1, 2].map((i) => (
                <span key={i} className="w-4 h-px bg-house-brown/50" />
              ))}
            </div>
          </div>

          {/* Score */}
          <div className="mx-3 mb-2 rounded-xl bg-white border border-house-brown/10 p-3">
            <div className="font-sans text-[8px] tracking-[0.14em] uppercase text-house-stone">
              HoWA Score
            </div>
            <div className="font-sans text-[10px] text-house-brown/70 mb-2">In order, with gaps</div>
            <div className="flex items-center gap-3">
              <ScoreRing value={62} />
              <Sparkline />
            </div>
          </div>

          {/* Living record */}
          <div className="mx-3 mb-2 rounded-xl bg-white border border-house-brown/10 p-3">
            <div className="font-sans text-[8px] tracking-[0.14em] uppercase text-house-stone">
              Living Record
            </div>
            <div className="font-sans text-[10px] text-house-brown/70">Updated today · 08:42</div>
            <div className="font-sans text-[10px] text-house-gold-ink mt-1">View record →</div>
          </div>

          {/* What matters first */}
          <div className="mx-3 mb-3 rounded-xl bg-white border border-house-brown/10 p-3">
            <div className="font-sans text-[8px] tracking-[0.14em] uppercase text-house-stone mb-1.5">
              What matters first
            </div>
            <ul className="space-y-1.5">
              {[
                "Boiler service · due in 14 days",
                "Gutter clean · before winter",
                "Smoke alarms · tested OK",
              ].map((t) => (
                <li key={t} className="flex items-center gap-1.5 font-sans text-[10px] text-house-brown/75">
                  <span className="is-round w-1.5 h-1.5 bg-house-gold-ink shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="font-sans text-[10px] text-house-gold-ink mt-2">View plan →</div>
          </div>

          <div className="flex justify-around border-t border-house-brown/10 py-2 font-sans text-[9px] text-house-stone">
            <span className="text-house-black">Home</span>
            <span>Timeline</span>
            <span>Record</span>
            <span>Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
}
