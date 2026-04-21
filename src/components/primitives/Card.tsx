import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Card — editorial tile with the Playground hover behaviour.
 * Spec: /ux/09-interactions/playground.html (cards section).
 *
 * On hover (for clickable cards): translateY -4px + soft shadow + the
 * title shifts to gold and the hairline rule under it extends 28 → 72px.
 *
 * Variants:
 *   editorial  — cream bg, brown text (House)
 *   product    — white bg, brown text (Shop)
 *   service    — cream bg, gold border on hover (Service tiles)
 *   blueprint  — navy bg, gold hairlines (Steward)
 *   dark       — brown bg, cream text (CTA promos)
 */

type Variant = "editorial" | "product" | "service" | "blueprint" | "dark";

const variants: Record<Variant, string> = {
  editorial: "bg-house-cream text-house-brown border border-house-brown/10",
  product: "bg-white text-house-brown border border-house-brown/8",
  service: "bg-house-cream text-house-brown border border-house-brown/10 hover:border-house-gold",
  blueprint: "bg-howa-navy text-house-cream border border-house-gold/30",
  dark: "bg-house-brown text-house-cream border border-house-cream/10",
};

export interface CardProps {
  children: React.ReactNode;
  variant?: Variant;
  href?: string;
  /** Enable hover lift + shadow. Defaults true for linked cards, false otherwise. */
  lift?: boolean;
  className?: string;
  as?: "div" | "article" | "section";
}

export function Card({
  children,
  variant = "editorial",
  href,
  lift,
  className,
  as: Tag = "div",
}: CardProps) {
  const hoverable = lift ?? !!href;
  const body = (
    <Tag
      className={cn(
        "group block p-6 md:p-8",
        "transition-all",
        "duration-slow ease-out",
        hoverable &&
          "hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(48,35,28,0.1)] cursor-pointer",
        variants[variant],
        className,
      )}
    >
      {children}
    </Tag>
  );

  if (href) {
    return (
      <Link href={href} className="block no-underline">
        {body}
      </Link>
    );
  }
  return body;
}

/**
 * CardTitle — with the gold-rule-under-title that extends on parent Card hover.
 * Sits inside a Card; the `group-hover` picks up the Card's `group` class.
 */
export function CardTitle({
  children,
  className,
  rule = true,
}: {
  children: React.ReactNode;
  className?: string;
  /** Show the gold hairline rule under the title. Default true. */
  rule?: boolean;
}) {
  return (
    <h3
      className={cn(
        "relative font-display text-[22px] font-medium leading-[1.25] mb-2",
        "transition-colors duration-[var(--t-slow)] ease-out",
        "group-hover:text-house-gold",
        rule &&
          "pb-3 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:bg-house-gold after:w-[28px] after:transition-[width] after:duration-[var(--t-slow)] after:ease-out group-hover:after:w-[72px]",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function CardMeta({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold mb-3",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function CardBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-sans italic text-[15px] leading-[1.6] opacity-85",
        className,
      )}
    >
      {children}
    </p>
  );
}
