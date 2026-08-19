"use client";

import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────────────
   HomeHealthGauge — a partial ring (fills to `value`%, not the full circle)
   with the number counting up from 0 to `value`, the arc filling in sync.
   Animates once when scrolled into view; respects reduced-motion.

   Ported from the askhowa.co.uk source (app/v5/HomeHealthGauge.tsx) for the
   /howa hero's Home Health card. Unmodified.
   ────────────────────────────────────────────────────────────────────── */
export function HomeHealthGauge({
  value = 91,
  size = 66,
  stroke = 5,
}: {
  value?: number;
  size?: number;
  stroke?: number;
}) {
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1600;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
              setShown(Math.round(eased * value));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [value]);

  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - shown / 100); // arc fills to shown% of the circle

  return (
    <div ref={ref} className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(184,153,104,0.22)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-[23px] leading-none text-[color:var(--color-ink)] tabular-nums">
          {shown}
          <span className="text-[18px] align-top">%</span>
        </span>
      </div>
    </div>
  );
}
