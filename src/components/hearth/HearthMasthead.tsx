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
        <span className="block font-hearth-sans text-[14px] tracking-[0.32em] uppercase text-house-stone mb-[2px]">
          THE
        </span>
        {/* Brand/logo, not the page heading — the masthead recurs on every
            Hearth page, so it must not compete with each page's own <h1>
            (lead story on the landing, article headline, category title). */}
        <span className="block font-hearth-serif font-medium uppercase leading-none text-[clamp(37px,4vw,57px)] tracking-[-0.005em] text-house-black transition-colors hover:text-house-gold-ink">
          Hearth
        </span>
      </Link>
      <p className="font-hearth-serif italic text-[clamp(20px,1.8vw,25px)] text-house-gold-ink mt-[12px]">
        The magazine of the House.
      </p>
      <p className="font-hearth-sans text-[13px] tracking-[0.24em] uppercase text-house-stone mt-[10px]">
        Issue No. 01 · Late Summer 2026
      </p>
      <p className="font-hearth-serif italic text-[18px] text-house-stone mt-[10px] max-w-[640px] mx-auto">
        Essays, recipes, garden notes and design wisdom, gathered through the
        seasons. Quiet observations on the art of keeping a home, and the rooms,
        gardens and thresholds worth keeping well.
      </p>
    </header>
  );
}
