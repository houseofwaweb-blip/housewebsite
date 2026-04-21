import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant =
  | "gold" // HoWA primary — filled gold
  | "outline" // House primary — outlined brown
  | "outline-light" // on dark backgrounds
  | "teal" // HoWA secondary emphasis
  | "ghost"; // in-content link

type Size = "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  as?: "button" | "a";
  href?: string;
}

const base =
  "inline-block border font-sans text-[12px] tracking-[0.16em] uppercase " +
  "cursor-pointer transition-all " +
  "duration-[var(--t-med)] ease-[var(--ease-out)] " +
  "disabled:opacity-40 disabled:cursor-not-allowed " +
  "relative text-center whitespace-nowrap";

const sizes: Record<Size, string> = {
  md: "px-[26px] py-[13px]",
  lg: "px-[32px] py-[16px] text-[13px]",
};

const variants: Record<Variant, string> = {
  gold:
    "bg-house-gold text-white border-house-gold " +
    "hover:bg-house-gold-light hover:border-house-gold-light hover:-translate-y-px",
  outline:
    "bg-transparent text-house-brown border-house-brown " +
    "hover:bg-house-brown hover:text-house-cream hover:-translate-y-px",
  "outline-light":
    "bg-transparent text-house-cream border-[rgba(245,240,232,0.85)] " +
    "hover:bg-house-cream hover:text-house-brown",
  teal:
    "bg-howa-teal text-white border-howa-teal " +
    "hover:brightness-110",
  ghost:
    "bg-transparent text-house-gold border-transparent " +
    "underline underline-offset-4 decoration-solid " +
    "hover:text-house-gold-light hover:decoration-dotted",
};

export function Button({
  variant = "gold",
  size = "md",
  loading,
  className,
  children,
  as = "button",
  href,
  ...rest
}: ButtonProps) {
  const classes = cn(base, sizes[size], variants[variant], loading && "text-transparent pointer-events-none", className);

  if (href || as === "a") {
    return (
      <Link
        href={href ?? "#"}
        className={classes}
        aria-busy={loading || undefined}
      >
        <ButtonContent loading={loading} variant={variant}>
          {children}
        </ButtonContent>
      </Link>
    );
  }

  return (
    <button
      type={rest.type ?? "button"}
      className={classes}
      disabled={rest.disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      <ButtonContent loading={loading} variant={variant}>
        {children}
      </ButtonContent>
    </button>
  );
}

function ButtonContent({
  loading,
  variant,
  children,
}: {
  loading?: boolean;
  variant: Variant;
  children: React.ReactNode;
}) {
  if (!loading) return <>{children}</>;
  return (
    <>
      <span aria-hidden>{children}</span>
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center tracking-[0.3em]",
          variant === "outline" ? "text-house-brown" : "text-white",
        )}
      >
        · · ·
      </span>
    </>
  );
}
