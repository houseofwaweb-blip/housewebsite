/**
 * FlowerWatermark — the Willow Alexander botanical motif as a faint, cropped
 * brand watermark hung off a section edge (see flower pattern/FLOWER_PATTERN_HANDOVER.md).
 *
 * Usage: the parent section must be `position: relative; overflow: hidden`, and
 * the section's real content must sit above it (e.g. wrap it with `relative z-10`).
 * Colour rule (set by the House): white on dark / coloured surfaces; gold or
 * black on light surfaces. Keep it a whisper, opacity ~0.06-0.16.
 */
type FlowerColor = "white" | "gold" | "black" | "brown";

export function FlowerWatermark({
  color,
  side = "right",
  opacity = 0.12,
  variant = "flower",
  className = "",
}: {
  color: FlowerColor;
  side?: "left" | "right";
  /** Keep it faint. 0.06-0.16 reads as texture, higher reads as a graphic. */
  opacity?: number;
  /** "flower" = the single cropped bloom (default). "pattern" = the denser
   *  van-style all-over line pattern, hung as a cropped vertical strip off the
   *  edge (white on dark/coloured grounds, brown on cream). */
  variant?: "flower" | "pattern";
  /** Tailwind overrides for width / position / vertical bleed if a section needs it. */
  className?: string;
}) {
  const isPattern = variant === "pattern";
  const asset = isPattern ? `/photos/wa-pattern-${color}.webp` : `/photos/wa-flower-${color}.png`;
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute top-[-12%] bottom-[-12%] z-0 hidden select-none sm:block ${
        isPattern ? "w-[clamp(200px,26vw,420px)]" : "w-[clamp(360px,48vw,760px)]"
      } ${side === "right" ? "right-[-4%]" : "left-[-4%]"} ${className}`}
      style={{
        backgroundImage: `url(${asset})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: `${side} center`,
        backgroundSize: "cover",
        opacity,
        transform: side === "left" ? "scaleX(-1)" : undefined,
      }}
    />
  );
}
