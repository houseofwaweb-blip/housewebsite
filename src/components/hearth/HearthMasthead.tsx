import Link from "next/link";
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
      <Link href="/the-hearth" className="block no-underline" aria-label="The Hearth, home">
        <span className="block font-hearth-sans text-[12px] tracking-[0.32em] uppercase text-house-stone mb-[2px]">
          THE
        </span>
        <h1 className="font-hearth-serif font-medium uppercase leading-none text-[clamp(34px,4vw,54px)] tracking-[-0.005em] text-house-black transition-colors hover:text-house-gold-ink">
          Hearth
        </h1>
      </Link>
      <p className="font-hearth-serif italic text-[clamp(17px,1.8vw,22px)] text-house-gold-ink mt-[12px]">
        The magazine of the House.
      </p>
      <p className="font-hearth-sans text-[11px] tracking-[0.24em] uppercase text-house-stone mt-[10px]">
        Issue No. 01 · Late Summer 2026
      </p>
      <p className="font-hearth-serif italic text-[15px] text-house-stone mt-[10px] max-w-[640px] mx-auto">
        Essays, recipes, garden notes and design wisdom, gathered through the
        seasons. Quiet observations on the art of keeping a home, and the rooms,
        gardens and thresholds worth keeping well.
      </p>
    </header>
  );
}
