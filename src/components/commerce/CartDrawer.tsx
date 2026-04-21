"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { useCart } from "./CartContext";

export function CartDrawer() {
  const { lines, count, subtotal, drawerOpen, closeDrawer, updateQty, remove } =
    useCart();

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
        aria-label="Your basket"
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
            Your basket
            <span className="font-sans font-light text-[13px] text-house-stone ml-1.5">
              ({count})
            </span>
          </h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close basket"
            className="text-[24px] leading-none bg-transparent border-0 cursor-pointer text-house-brown hover:text-house-gold transition-colors duration-[var(--t-base)]"
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
                className="font-sans text-[11px] tracking-[0.18em] uppercase text-house-gold border-b border-dotted border-house-gold pb-0.5 no-underline hover:border-solid transition-all"
              >
                Browse the shop →
              </Link>
            </div>
          ) : (
            lines.map((line) => (
              <div
                key={line.handle}
                className="flex gap-4 py-5 border-b border-house-brown/8 last:border-b-0"
              >
                <div className="w-[72px] h-[90px] flex-shrink-0 overflow-hidden bg-house-cream">
                  <Image
                    src={line.image}
                    alt={line.title}
                    width={144}
                    height={180}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <span className="font-display font-medium text-[15px] mb-0.5">
                    {line.title}
                  </span>
                  <span className="font-sans text-[11px] tracking-[0.08em] uppercase text-house-stone mb-1.5">
                    {line.collection}
                    {line.houseApproved ? " · House Approved" : ""}
                  </span>
                  <span className="font-display font-medium text-[15px]">
                    {line.price}
                  </span>
                  {/* Quantity */}
                  <div className="flex items-center gap-2 mt-2.5">
                    <button
                      type="button"
                      onClick={() => updateQty(line.handle, line.quantity - 1)}
                      className="w-7 h-7 border border-house-brown/20 bg-transparent text-[16px] flex items-center justify-center cursor-pointer hover:border-house-gold transition-colors duration-[var(--t-base)]"
                    >
                      −
                    </button>
                    <span className="font-sans text-[14px] min-w-[20px] text-center">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQty(line.handle, line.quantity + 1)}
                      className="w-7 h-7 border border-house-brown/20 bg-transparent text-[16px] flex items-center justify-center cursor-pointer hover:border-house-gold transition-colors duration-[var(--t-base)]"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(line.handle)}
                    className="mt-2 self-start text-left font-sans text-[10px] tracking-[0.14em] uppercase text-house-stone bg-transparent border-0 cursor-pointer hover:text-house-brown transition-colors duration-[var(--t-base)]"
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
            <div className="flex justify-between items-baseline mb-1">
              <span className="font-sans text-[13px] tracking-[0.08em] uppercase">
                Subtotal
              </span>
              <span className="font-display font-medium text-[20px]">
                £{subtotal.toFixed(0)}
              </span>
            </div>
            <p className="font-sans text-[11px] text-house-stone mb-4">
              Free UK delivery on all orders.
            </p>

            <div className="bg-house-cream border border-house-gold/20 px-3.5 py-2.5 mb-4">
              <p className="font-sans text-[11px] text-house-brown">
                <span className="font-medium text-house-gold">HoWA+</span>{" "}
                members save 10% on every order.{" "}
                <Link
                  href="/howa/plans"
                  className="underline decoration-house-gold underline-offset-2 hover:text-house-gold transition-colors"
                >
                  Join for £16.99/mo
                </Link>
              </p>
            </div>

            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="block w-full py-4 font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold text-center no-underline transition-colors duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
            >
              Proceed to checkout
            </Link>

            <Link
              href="/shop/basket"
              onClick={closeDrawer}
              className="block text-center mt-3 font-sans text-[11px] tracking-[0.16em] uppercase text-house-gold no-underline border-b border-dotted border-house-gold pb-0.5 mx-auto w-fit hover:border-solid transition-all"
            >
              View full basket →
            </Link>

            <button
              type="button"
              onClick={closeDrawer}
              className="block w-full text-center mt-2 font-sans text-[11px] tracking-[0.16em] uppercase text-house-stone bg-transparent border-0 cursor-pointer hover:text-house-brown transition-colors duration-[var(--t-base)]"
            >
              Continue shopping
            </button>

            <div className="flex justify-center gap-3.5 mt-4 font-sans text-[9px] tracking-[0.16em] uppercase text-house-stone">
              <span>Secure checkout</span>
              <span>Free delivery</span>
              <span>28-day returns</span>
            </div>
          </div>
        ) : null}
      </aside>
    </>
  );
}
