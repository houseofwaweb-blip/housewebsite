import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * GhostLink — in-content editorial CTA.
 * Spec: /ux/09-interactions/playground.html (links section).
 *
 * Default:  brown text, gold solid hairline underneath.
 * Hover:    text → gold, underline morphs solid → dotted, arrow slides 8px right.
 * Timing:   --t-slow (550ms) with --ease-out.
 *
 * Use for "Read more", "See all", "Tour HoWA" style links inside prose/sections.
 */
export interface GhostLinkProps {
  href: string;
  children: React.ReactNode;
  /** Show trailing arrow. Default true. */
  arrow?: boolean;
  /** For dark backgrounds: cream text, gold hover. */
  dark?: boolean;
  className?: string;
  external?: boolean;
}

export function GhostLink({
  href,
  children,
  arrow = true,
  dark = false,
  className,
  external,
}: GhostLinkProps) {
  const classes = cn(
    "group inline-flex items-center gap-2 no-underline",
    "font-sans text-[12px] tracking-[0.18em] uppercase pb-1",
    "border-b border-solid border-house-gold",
    "transition-[color,border-style] duration-[var(--t-slow)] ease-out",
    "hover:border-dotted",
    dark ? "text-house-cream hover:text-house-gold-light" : "text-house-brown hover:text-house-gold",
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <span
          aria-hidden="true"
          className="inline-block transition-all duration-[var(--t-slow)] ease-out group-hover:translate-x-2"
        >
          →
        </span>
      ) : null}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
