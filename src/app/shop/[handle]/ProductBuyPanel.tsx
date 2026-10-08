"use client";

import * as React from "react";
import { useCart } from "@/components/commerce/CartContext";
import { gaEventReady, parseAmount } from "@/lib/google/ga4";
import { numericId } from "@/lib/commerce/gtin";
import { deliveryLine, type ShippingLabel } from "@/lib/shop-data/delivery";
import type { ProductVariant } from "@/lib/shop-data/shopify-catalogue";
import s from "./product.module.css";

/**
 * ProductBuyPanel — the whole variant-aware buy column: price + was-price,
 * delivery line, stock, variant picker, quantity and Add to basket.
 *
 * Owns the selected-variant state so everything stays in step (Fix 1):
 *   - Server renders the FIRST IN-STOCK variant (never a sold-out default).
 *   - On load it applies ?variant from the URL (feed g:link sends the numeric
 *     id) and fires one view_item for that variant.
 *   - Changing the variant updates price/was-price/stock/SKU and rewrites the
 *     URL with replaceState (no reload, no history spam).
 */
export function ProductBuyPanel({
  variants,
  handle,
  title,
  image,
  initialVariantId,
  fallbackPrice,
  fallbackCompareAt,
  shippingLabel = null,
  brand,
  category,
}: {
  variants: ProductVariant[];
  handle: string;
  title: string;
  image: string;
  /** Variant preselected on the server from ?variant, so the first paint
   *  already shows the linked variant (no flash) and matches the JSON-LD. */
  initialVariantId?: string;
  fallbackPrice: string;
  fallbackCompareAt?: string;
  shippingLabel?: ShippingLabel;
  brand?: string;
  category?: string;
}) {
  const { add, busy, buyable, drawerOpen } = useCart();
  const firstInStock = variants.find((v) => v.availableForSale) ?? variants[0];
  const [variantId, setVariantId] = React.useState(
    initialVariantId ?? firstInStock?.id ?? "",
  );
  const [qty, setQty] = React.useState(1);
  const [added, setAdded] = React.useState(false);
  const firedRef = React.useRef(false);

  // Sticky bottom bar (Fix 3, mobile): show once the main Add to basket button
  // has scrolled out of view. Hidden again when it scrolls back, and while the
  // basket drawer is open (drawerOpen); the mobile menu sits above it by z-index.
  const addBtnRef = React.useRef<HTMLDivElement>(null);
  const [addOutOfView, setAddOutOfView] = React.useState(false);
  React.useEffect(() => {
    const el = addBtnRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setAddOutOfView(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [buyable]);

  // On load: apply ?variant (numeric id, as the feed g:link sends it, or a full
  // GID), then fire exactly one view_item for the resolved variant.
  React.useEffect(() => {
    let chosen = firstInStock;
    const param = new URLSearchParams(window.location.search).get("variant");
    if (param) {
      const match = variants.find((v) => numericId(v.id) === param || v.id === param);
      if (match) {
        chosen = match;
        setVariantId(match.id);
      }
    }
    if (!firedRef.current && chosen) {
      firedRef.current = true;
      gaEventReady("view_item", {
        currency: "GBP",
        value: parseAmount(chosen.price),
        items: [
          {
            item_id: chosen.sku || handle,
            item_name: title,
            item_brand: brand,
            item_category: category,
            price: parseAmount(chosen.price),
            quantity: 1,
          },
        ],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selected = variants.find((v) => v.id === variantId) ?? firstInStock;
  const multi = variants.length > 1;
  const soldOut = !!selected && !selected.availableForSale;
  const price = selected?.price || fallbackPrice;
  const compareAt = selected?.compareAtPrice ?? fallbackCompareAt;

  const onSelect = (id: string) => {
    setVariantId(id);
    // Keep the URL in step so a refresh/share lands on the same variant.
    const num = numericId(id);
    if (num && typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("variant", num);
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    }
  };

  async function handleAdd() {
    if (!selected || soldOut) return;
    const ok = await add(
      selected.id,
      { handle, title, price: selected.price || fallbackPrice, image, sku: selected.sku },
      qty,
    );
    if (!ok) return;
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  const stepBtn =
    "w-9 h-11 flex items-center justify-center text-[21px] text-house-brown/70 hover:text-house-brown transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer select-none";

  return (
    <>
      {/* Price + was-price (selected variant) */}
      <div className={s.price}>
        {compareAt ? <span className={s.compare}>{compareAt}</span> : null}
        {price}
      </div>

      {/* Delivery, by shipping label */}
      <p className="mt-1 mb-4 font-sans text-[15px] text-house-brown/70">
        {deliveryLine(shippingLabel)}
      </p>

      {/* Stock, matching the selected variant */}
      <div className="mb-6 flex items-center gap-2 font-sans text-[18px] text-house-stone">
        <span
          aria-hidden
          className="inline-block w-1.5 h-1.5 is-round"
          style={{ background: soldOut ? "var(--color-house-stone)" : "var(--house-gold-ink)" }}
        />
        {soldOut ? "Currently unavailable" : "In stock"}
      </div>

      {!selected ? (
        <span className="font-sans text-[18px] tracking-[0.16em] uppercase text-house-stone">
          Unavailable
        </span>
      ) : !buyable ? (
        <div className="mb-3">
          <span className="inline-flex w-full items-center justify-center gap-2 px-6 py-4 font-sans text-[14px] tracking-[0.18em] uppercase text-house-cream bg-house-brown border border-house-brown">
            Available at launch
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-5 mb-9">
          {multi ? (
            <label className="flex flex-col gap-2">
              <span className="font-sans text-[14px] tracking-[0.18em] uppercase text-house-stone">
                Option
              </span>
              <select
                value={variantId}
                onChange={(e) => onSelect(e.target.value)}
                className="font-sans text-[18px] text-house-brown bg-house-white border border-house-brown/20 px-4 py-3 cursor-pointer focus:border-house-gold focus:outline-none"
                aria-label="Choose an option"
              >
                {variants.map((v) => (
                  <option key={v.id} value={v.id} disabled={!v.availableForSale}>
                    {v.title}
                    {v.availableForSale ? "" : " (sold out)"}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <div ref={addBtnRef} className="flex items-stretch border border-house-brown/25">
            <div className="flex items-center shrink-0 border-r border-house-brown/25">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="Decrease quantity" className={stepBtn}>
                −
              </button>
              <span className="w-7 text-center font-sans text-[18px] text-house-brown tabular-nums">{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity" className={stepBtn}>
                +
              </button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              disabled={soldOut || busy}
              className="flex-1 px-6 font-sans text-[14px] tracking-[0.22em] uppercase text-house-brown bg-house-gold-ink border-0 transition-[filter] duration-[var(--t-base)] ease-out hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {soldOut ? "Sold out" : busy ? "Adding…" : added ? "Added ✓" : "Add to basket"}
            </button>
          </div>
        </div>
      )}

      {/* Sticky bottom bar (mobile only, via CSS). Uses the selected variant. */}
      {selected && buyable ? (
        <div
          className={`${s.sticky} ${addOutOfView && !drawerOpen ? s.stickyOn : ""}`}
          aria-hidden={!(addOutOfView && !drawerOpen)}
        >
          <div className={s.stickyInner}>
            <span className={s.stickyPrice}>{price}</span>
            <button
              type="button"
              onClick={handleAdd}
              disabled={soldOut || busy}
              className={s.stickyBtn}
              tabIndex={addOutOfView && !drawerOpen ? 0 : -1}
            >
              {soldOut ? "Sold out" : busy ? "Adding…" : added ? "Added ✓" : "Add to basket"}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
