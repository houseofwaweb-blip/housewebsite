"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";

export function CartDrawer() {
  const { lines, count, subtotal, drawerOpen, closeDrawer, updateQty, remove, buyable } =
    useCart();
  const pathname = usePathname() ?? "";
  /**
   * Directive v2 STEP 04: "The basket is absent on non-Store routes."
   * The drawer is mounted globally from the root layout (a server component, so
   * it cannot read the path), which left this dialog markup in the DOM of every
   * editorial and trust page even though nothing there could open it. The gate
   * therefore lives here, alongside the CartIcon gate in the Header.
   */
  const isStoreRoute = pathname === "/shop" || pathname.startsWith("/shop/");

  React.useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, closeDrawer]);

  React.useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Placed after the hooks, not at the top of the component: an early return
  // before them would break the rules of hooks.
  if (!isStoreRoute) return null;

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden="true"
        onClick={closeDrawer}
        className={cn(
          "fixed inset-0 z-40 bg-house-brown/40",
          "transition-opacity duration-[var(--t-slow)] ease-out",
          drawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Basket"
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-[420px] max-w-[92vw]",
          "bg-house-white flex flex-col",
          "shadow-[-8px_0_40px_rgba(48,35,28,0.12)]",
          "transition-transform duration-[var(--t-xslow)] ease-out",
          drawerOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Head */}
        <div className="flex justify-between items-center px-6 py-[18px] border-b border-house-brown/8">
          <h2 className="font-display font-medium text-[18px]">
            Basket
            <span className="font-sans font-light text-[15px] text-house-stone ml-1.5">
              ({count})
            </span>
          </h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close basket"
            className="text-[24px] leading-none bg-transparent border-0 cursor-pointer text-house-brown hover:text-house-gold-ink transition-colors duration-[var(--t-base)]"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6">
          {lines.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-display italic text-[18px] text-house-stone mb-4">
                Your basket is empty.
              </p>
              <Link
                href="/shop"
                onClick={closeDrawer}
                className="font-sans text-[12px] tracking-[0.18em] uppercase text-house-gold-ink border-b border-dotted border-house-gold pb-0.5 no-underline hover:border-solid transition-all"
              >
                Browse the shop →
              </Link>
            </div>
          ) : (
            lines.map((line) => (
              <div
                key={line.id}
                className="flex gap-4 py-5 border-b border-house-brown/8 last:border-b-0"
              >
                <div className="w-[72px] h-[90px] flex-shrink-0 overflow-hidden bg-house-cream">
                  {line.image ? (
                    <Image
                      src={line.image}
                      alt={line.title}
                      width={144}
                      height={180}
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="flex-1 flex flex-col">
                  <span className="font-display font-medium text-[16px] mb-1">
                    {line.title}
                  </span>
                  <span className="font-display font-medium text-[16px]">
                    {line.price}
                  </span>
                  {/* Quantity */}
                  <div className="flex items-center gap-2 mt-2.5">
                    <button
                      type="button"
                      onClick={() => updateQty(line.id, line.quantity - 1)}
                      className="w-7 h-7 border border-house-brown/20 bg-transparent text-[16px] flex items-center justify-center cursor-pointer hover:border-house-gold transition-colors duration-[var(--t-base)]"
                    >
                      −
                    </button>
                    <span className="font-sans text-[15px] min-w-[20px] text-center">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQty(line.id, line.quantity + 1)}
                      className="w-7 h-7 border border-house-brown/20 bg-transparent text-[16px] flex items-center justify-center cursor-pointer hover:border-house-gold transition-colors duration-[var(--t-base)]"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(line.id)}
                    className="mt-2 self-start text-left font-sans text-[12px] tracking-[0.14em] uppercase text-house-stone bg-transparent border-0 cursor-pointer hover:text-house-brown transition-colors duration-[var(--t-base)]"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 ? (
          <div className="px-6 py-5 border-t border-house-brown/8 bg-house-white">
            <div className="flex items-baseline justify-between mb-1">
              <span className="font-sans text-[12px] tracking-[0.14em] uppercase text-house-stone">Subtotal</span>
              <span className="font-display font-medium text-[18px]">{subtotal}</span>
            </div>
            <p className="font-sans text-[12px] text-house-stone mb-4">
              Shipping &amp; taxes calculated at checkout.
            </p>

            {buyable ? (
              <Link
                href="/shop/checkout"
                onClick={closeDrawer}
                className="block w-full py-4 font-sans text-[15px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold text-center no-underline transition-colors duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
              >
                Checkout
              </Link>
            ) : (
              <p className="block w-full py-4 font-sans text-[15px] tracking-[0.18em] uppercase text-house-stone border border-house-brown/15 text-center">
                Checkout available at launch
              </p>
            )}

            <Link
              href="/shop/basket"
              onClick={closeDrawer}
              className="block text-center mt-3 font-sans text-[12px] tracking-[0.16em] uppercase text-house-gold-ink no-underline border-b border-dotted border-house-gold pb-0.5 mx-auto w-fit hover:border-solid transition-all"
            >
              View basket →
            </Link>

            <button
              type="button"
              onClick={closeDrawer}
              className="block w-full text-center mt-2 font-sans text-[12px] tracking-[0.16em] uppercase text-house-stone bg-transparent border-0 cursor-pointer hover:text-house-brown transition-colors duration-[var(--t-base)]"
            >
              Continue browsing
            </button>
          </div>
        ) : null}
      </aside>
    </>
  );
}
