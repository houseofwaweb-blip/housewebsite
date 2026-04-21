"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { useCart } from "./CartContext";

/**
 * CartToast — slides down + fades in under the cart icon for 3 seconds.
 * Spec: /ux/09-interactions/playground.html (cart section).
 *
 * Mount once (e.g. inside a layout that wraps CartProvider). Reads toast
 * state from context; auto-hides on timer set inside CartProvider.
 */
export function CartToast() {
  const { toast, clearToast } = useCart();
  const visible = toast !== null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "pointer-events-none fixed top-[92px] right-[5vw] z-50 max-w-[360px]",
        "bg-house-brown text-house-cream px-5 py-4",
        "transition-[opacity,transform] duration-[var(--t-slow)] ease-out",
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-5",
      )}
    >
      {toast ? (
        <>
          <p className="font-sans italic text-[14px] leading-[1.45] pr-6">
            {toast.title}
          </p>
          {toast.href ? (
            <Link
              href={toast.href}
              onClick={clearToast}
              className="inline-block mt-2 font-sans text-[10px] tracking-[0.2em] uppercase text-house-gold-light border-b border-house-gold-light/40 hover:border-house-gold-light pb-0.5 no-underline transition-colors"
            >
              {toast.linkLabel} →
            </Link>
          ) : null}
          <button
            type="button"
            aria-label="Dismiss"
            onClick={clearToast}
            className="absolute top-2 right-2 text-house-cream/60 hover:text-house-cream font-sans text-[18px] leading-none"
          >
            ×
          </button>
        </>
      ) : null}
    </div>
  );
}
