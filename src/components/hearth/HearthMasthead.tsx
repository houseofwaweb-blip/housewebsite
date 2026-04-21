import { cn } from "@/lib/cn";

/**
 * HearthMasthead — per variant-A: small "THE" sits just above "Hearth",
 * italic tagline below. Extra breathing room above the block; tight
 * vertical stack so THE reads as a superior to the wordmark.
 */
export function HearthMasthead({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "bg-house-white text-center px-[5vw] pt-[32px] pb-[16px] border-b border-house-brown/12",
        className,
      )}
    >
      <span className="block font-hearth-sans text-[9px] tracking-[0.32em] uppercase text-house-stone mb-[2px]">
        THE
      </span>
      <h1 className="font-hearth-serif font-medium uppercase leading-none text-[clamp(34px,4vw,54px)] tracking-[-0.005em] text-house-black">
        Hearth
      </h1>
      <p className="font-hearth-serif italic text-[14px] text-house-stone mt-[10px]">
        A journal on the keeping of homes and gardens — from the House of
        Willow Alexander
      </p>
    </header>
  );
}
