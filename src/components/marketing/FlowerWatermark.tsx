/**
 * FlowerWatermark — the Willow Alexander botanical motif as a faint, cropped
 * brand watermark hung off a section edge (see flower pattern/FLOWER_PATTERN_HANDOVER.md).
 *
 * Usage: the parent section must be `position: relative; overflow: hidden`, and
 * the section's real content must sit above it (e.g. wrap it with `relative z-10`).
 * Colour rule (set by the House): white on dark / coloured surfaces; gold or
 * black on light surfaces. Keep it a whisper, opacity ~0.06-0.16.
 */
type FlowerColor = "white" | "gold" | "black";

export function FlowerWatermark({
  color,
  side = "right",
  opacity = 0.12,
  className = "",
}: {
  color: FlowerColor;
  side?: "left" | "right";
  /** Keep it faint. 0.06-0.16 reads as texture, higher reads as a graphic. */
  opacity?: number;
  /** Tailwind overrides for width / position / vertical bleed if a section needs it. */
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute top-[-12%] bottom-[-12%] z-0 hidden select-none sm:block w-[clamp(300px,42vw,640px)] ${
        side === "right" ? "right-[-7%]" : "left-[-7%]"
      } ${className}`}
      style={{
        backgroundImage: `url(/photos/wa-flower-${color}.png)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: `${side} center`,
        backgroundSize: "contain",
        opacity,
        transform: side === "left" ? "scaleX(-1)" : undefined,
      }}
    />
  );
}
