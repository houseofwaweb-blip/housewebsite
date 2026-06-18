/* The HoWA Score ring — a gold arc filling to value/100, the number in the
   middle (no % — the score is "62", not "62%"). Static, presentational.
   Number defaults to cream because the ring always sits on the navy panel. */
export function V4ScoreRing({ value = 62, size = 92, stroke = 6, numColor = "#f3ede0" }: { value?: number; size?: number; stroke?: number; numColor?: string }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value / 100);
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(245,237,224,0.18)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#c5a960" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-[clamp(22px,2vw,28px)] leading-none tabular-nums" style={{ color: numColor }}>{value}</span>
      </div>
    </div>
  );
}
