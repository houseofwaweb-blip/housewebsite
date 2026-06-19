/**
 * PlaceholderImage — a clearly-marked stand-in for imagery the House has not yet
 * supplied. Used where the Designer Handover Guide calls for a visual (origin
 * studio, garden, threshold, etc.) but no final asset exists. Styled on-brand so
 * the layout reads correctly in review, with an explicit "Placeholder image"
 * label and a caption describing what should sit here.
 */
export function PlaceholderImage({
  caption,
  ratio = "4 / 3",
  className = "",
}: {
  caption?: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-house-cream-dark flex flex-col items-center justify-center text-center px-8 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {/* inset frame */}
      <span
        aria-hidden
        className="absolute inset-4 border border-house-brown/20"
      />
      <span className="relative font-sans text-[10px] tracking-[0.32em] uppercase text-house-gold mb-3">
        Placeholder image
      </span>
      {caption ? (
        <span className="relative font-display italic text-[clamp(14px,1.6vw,17px)] leading-[1.4] text-house-brown/55 max-w-[30ch]">
          {caption}
        </span>
      ) : null}
    </div>
  );
}
