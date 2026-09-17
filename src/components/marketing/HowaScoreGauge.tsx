/**
 * HowaScoreGauge — an HTML/SVG HoWA Score dial, baked over product imagery.
 *
 * HoWA Score is in development (Sept HoWA review v2, COPY 6.7), so this always
 * carries an honest demonstration label ("Example home" by default). It is a
 * drawn dial, not a screenshot of a live score for a real property.
 */
export function HowaScoreGauge({
  score = 82,
  label = "Example home",
  className = "",
}: {
  score?: number;
  label?: string;
  className?: string;
}) {
  const r = 66;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, score)) / 100;
  const offset = c * (1 - pct);
  const sage = "#8a9a72";

  return (
    <div
      className={`is-round flex aspect-square w-[clamp(150px,20vw,220px)] flex-col items-center justify-center rounded-full bg-house-cream/95 text-center shadow-[0_14px_40px_rgba(48,35,28,0.20)] backdrop-blur-sm ${className}`}
      role="img"
      aria-label={`HoWA Score, ${score} out of 100, ${label}`}
    >
      <div className="relative flex items-center justify-center">
        <svg viewBox="0 0 160 160" className="h-[clamp(120px,16vw,180px)] w-[clamp(120px,16vw,180px)] -rotate-90">
          <circle cx="80" cy="80" r={r} fill="none" stroke="rgba(48,35,28,0.10)" strokeWidth="7" />
          <circle
            cx="80"
            cy="80"
            r={r}
            fill="none"
            stroke={sage}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-sans text-[9px] tracking-[0.18em] uppercase text-house-brown/50">HoWA Score</span>
          <span className="font-display text-[clamp(34px,4.4vw,52px)] leading-none text-house-brown">{score}</span>
          <span className="font-sans text-[10px] tracking-[0.06em] text-house-brown/55">out of 100</span>
          <span className="mt-1 font-sans text-[8.5px] tracking-[0.18em] uppercase text-house-brown/40">{label}</span>
        </div>
      </div>
    </div>
  );
}
