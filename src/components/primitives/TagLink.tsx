import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * TagLink — category / taxonomy link, e.g. article tags, journal filters.
 * Spec: /ux/09-interactions/playground.html (links section).
 *
 * Default: brown 11px uppercase, 0.22em letter-spacing.
 * Hover:   color → gold over --t-base (350ms).
 * Active:  gold text + gold hairline underline (padding-bottom 2px).
 */
export interface TagLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  dark?: boolean;
  className?: string;
}

export function TagLink({ href, children, active, dark, className }: TagLinkProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "font-sans text-[11px] tracking-[0.22em] uppercase no-underline",
        "transition-colors duration-[var(--t-base)] ease-out",
        dark
          ? "text-house-cream/80 hover:text-house-gold-light"
          : "text-house-brown hover:text-house-gold",
        active &&
          (dark
            ? "text-house-gold-light border-b border-house-gold-light pb-0.5"
            : "text-house-gold border-b border-house-gold pb-0.5"),
        className,
      )}
    >
      {children}
    </Link>
  );
}
