import Image from "next/image";

/**
 * "Arranged by [Provenance]" credit mark, used wherever the site says Provenance
 * arranges the cover. The logo is navy on transparent, so on dark bands
 * (burgundy / green) it sits on a cream chip; on light backgrounds it renders
 * plain.
 */
export function ProvenanceLockup({
  variant = "onLight",
  label = "Arranged by",
  className = "",
}: {
  variant?: "onDark" | "onLight";
  label?: string;
  className?: string;
}) {
  const labelCls = variant === "onDark" ? "text-house-cream/55" : "text-house-brown/55";
  const logo = (
    <Image
      src="/insurance/provenance-logo.webp"
      alt="Provenance Insurance Brokers"
      width={168}
      height={28}
      className="h-7 w-auto"
    />
  );
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className={`font-sans text-[10px] tracking-[0.2em] uppercase ${labelCls}`}>{label}</span>
      {variant === "onDark" ? <span className="inline-flex bg-house-cream px-3.5 py-2">{logo}</span> : logo}
    </div>
  );
}
