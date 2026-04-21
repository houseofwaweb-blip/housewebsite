"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { useCart } from "./CartContext";

export interface CartIconProps {
  dark?: boolean;
  className?: string;
  onClick?: () => void;
}

export function CartIcon({ dark = false, className, onClick }: CartIconProps) {
  const { count } = useCart();

  return (
    <button
      type="button"
      aria-label={`Basket, ${count} ${count === 1 ? "item" : "items"}`}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-2 border bg-transparent cursor-pointer",
        "font-sans text-[11px] tracking-[0.18em] uppercase",
        "transition-colors duration-[var(--t-base)] ease-out",
        dark
          ? "border-house-cream/30 text-house-cream hover:border-house-cream"
          : "border-house-brown/30 text-house-brown hover:border-house-brown",
        className,
      )}
    >
      <span>Basket</span>
      <span
        key={count}
        className={cn(
          "is-round inline-flex items-center justify-center",
          "min-w-[20px] h-5 px-1.5 bg-house-gold text-white",
          "font-sans text-[11px] tracking-normal leading-none",
          count > 0 && "[animation:howa-bump_var(--t-slow)_var(--ease-settle)]",
        )}
      >
        {count}
      </span>
    </button>
  );
}
