"use client";

import * as React from "react";
import { klaviyoTrack } from "@/lib/klaviyo/client";
import { numericId } from "@/lib/commerce/gtin";
import { gaEvent, parseAmount } from "@/lib/google/ga4";
import { getAttributionAttributes } from "@/lib/attribution";
import { readConsent } from "@/lib/consent";

/**
 * Cart — backed by the Shopify Storefront Cart (via /api/cart). The cart id
 * is persisted in localStorage so the basket survives reloads. `checkout()`
 * sends the customer to Shopify's hosted checkout (cart.checkoutUrl).
 */

export interface CartLine {
  /** Shopify cart line id (used for update/remove). */
  id: string;
  handle: string;
  title: string;
  price: string; // formatted, e.g. "£30"
  image: string;
  quantity: number;
}

interface CartToastT {
  id: string;
  title: string;
  href?: string;
  linkLabel?: string;
}

interface AddInfo {
  handle: string;
  title: string;
  price: string;
  image: string;
  /** Variant SKU — the GA4 item_id / feed g:id, so add_to_cart matches the feed. */
  sku?: string | null;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: string;
  checkoutUrl: string | null;
  /** Catalog mode: false → browse-only, add-to-basket + checkout disabled. */
  buyable: boolean;
  busy: boolean;
  toast: CartToastT | null;
  drawerOpen: boolean;
  /** Short note shown in the drawer after a restore skipped an unavailable item. */
  restoreNote: string | null;
  /** Resolves true when the item was added, false if it was sold out / failed. */
  add: (merchandiseId: string, info: AddInfo, quantity?: number) => Promise<boolean>;
  remove: (lineId: string) => Promise<void>;
  updateQty: (lineId: string, quantity: number) => Promise<void>;
  /** Rebuild the basket from an email link's lines; opens the drawer. */
  restore: (
    lines: Array<{ merchandiseId: string; quantity: number }>,
  ) => Promise<{ restored: number; skipped: number }>;
  checkout: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  clearToast: () => void;
  clearRestoreNote: () => void;
}

const CART_KEY = "wa_cart_id";
const CartContext = React.createContext<CartContextValue | null>(null);

function money(m?: { amount: string; currencyCode: string }): string {
  if (!m) return "";
  const n = parseFloat(m.amount);
  if (!Number.isFinite(n)) return "";
  const body = n.toFixed(2).replace(/\.00$/, "");
  if (m.currencyCode === "GBP") return `£${body}`;
  if (m.currencyCode === "USD") return `$${body}`;
  if (m.currencyCode === "EUR") return `€${body}`;
  return `${body} ${m.currencyCode}`;
}

interface ApiCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: { amount: string; currencyCode: string };
  lines: Array<{
    id: string;
    quantity: number;
    sku?: string | null;
    variantId?: string;
    product: { id: string; handle: string; title: string; images: Array<{ url: string }>; price: { amount: string; currencyCode: string } };
  }>;
}

const SHOP_BASE = "https://willowalexander.co.uk";

/**
 * Basket-restore link for Klaviyo emails: rebuilds the whole basket on our site
 * from variant ids + quantities (/shop/basket/restore). Returns null when no
 * line carries a variant id, so callers can fall back to the Shopify checkout
 * URL and the CheckoutURL field is never empty.
 */
function buildRestoreUrl(
  lines: Array<{ variantId?: string; quantity: number }>,
): string | null {
  const parts = lines
    .map((l) => {
      const id = l.variantId ? numericId(l.variantId) : null;
      return id ? `${id}:${l.quantity}` : null;
    })
    .filter((x): x is string => Boolean(x));
  return parts.length ? `${SHOP_BASE}/shop/basket/restore?lines=${parts.join(",")}` : null;
}

export function CartProvider({
  children,
  buyable = true,
}: {
  children: React.ReactNode;
  buyable?: boolean;
}) {
  const [cart, setCart] = React.useState<ApiCart | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [toast, setToast] = React.useState<CartToastT | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [restoreNote, setRestoreNote] = React.useState<string | null>(null);
  const hideTimer = React.useRef<number | null>(null);

  const persist = React.useCallback((c: ApiCart | null) => {
    setCart(c);
    if (typeof window !== "undefined" && c?.id) localStorage.setItem(CART_KEY, c.id);
  }, []);

  // Rehydrate from a stored cart id on first load.
  React.useEffect(() => {
    const id = localStorage.getItem(CART_KEY);
    if (!id) return;
    (async () => {
      try {
        const r = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "get", cartId: id }),
        });
        const j = await r.json();
        if (j.cart) setCart(j.cart);
        else localStorage.removeItem(CART_KEY); // expired or already checked out
      } catch {
        /* offline — leave cart empty */
      }
    })();
  }, []);

  const call = React.useCallback(
    async (payload: Record<string, unknown>) => {
      setBusy(true);
      try {
        const cartId = cart?.id ?? localStorage.getItem(CART_KEY) ?? undefined;
        const r = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, cartId }),
        });
        const j = await r.json();
        if (j.cart) persist(j.cart);
        return j.cart as ApiCart | undefined;
      } finally {
        setBusy(false);
      }
    },
    [cart, persist],
  );

  // When the visitor changes their cookie choice, re-query the cart so the NEXT
  // checkoutUrl carries the updated consent (Shopify encodes it as `_cs`). No-op
  // if there's no cart yet.
  React.useEffect(() => {
    function onConsentChange() {
      const id = cart?.id ?? (typeof window !== "undefined" ? localStorage.getItem(CART_KEY) : null);
      if (id) void call({ action: "get" });
    }
    window.addEventListener("wa-consent-changed", onConsentChange);
    return () => window.removeEventListener("wa-consent-changed", onConsentChange);
  }, [cart, call]);

  const add = React.useCallback(
    async (merchandiseId: string, info: AddInfo, quantity = 1) => {
      if (!buyable) return false; // catalog mode — browse only
      let updated: ApiCart | undefined;
      // Ad-source attribution → Shopify order (landing page + UTMs always; click
      // ids only with marketing consent). Attached when the cart is created.
      const attributes = getAttributionAttributes(readConsent()?.marketing ?? false);
      try {
        updated = await call({ action: "add", merchandiseId, quantity, attributes });
      } catch {
        updated = undefined;
      }
      // If the cart API failed, don't show a false "added" toast, open the
      // drawer, or fire add_to_cart — surface a retry instead.
      if (!updated) {
        setToast({ id: crypto.randomUUID(), title: "Couldn't add to basket. Please try again." });
        if (hideTimer.current) window.clearTimeout(hideTimer.current);
        hideTimer.current = window.setTimeout(() => setToast(null), 3000);
        return false;
      }
      // Sold-out guard: the cart API can "succeed" yet add the item at quantity 0
      // when the variant is actually out of stock (e.g. a stale "in stock" state
      // after it sold out). Surface "sold out" instead of a false "added", and
      // skip the drawer + add-to-cart events.
      const soldOutLine = (updated.lines ?? []).find(
        (l) => (info.sku && l.sku === info.sku) || l.product?.handle === info.handle,
      );
      if (!soldOutLine || soldOutLine.quantity < 1) {
        setToast({ id: crypto.randomUUID(), title: `${info.title} is sold out.` });
        if (hideTimer.current) window.clearTimeout(hideTimer.current);
        hideTimer.current = window.setTimeout(() => setToast(null), 3000);
        return false;
      }
      setToast({
        id: crypto.randomUUID(),
        title: `${info.title} added.`,
        href: "/shop/basket",
        linkLabel: "View basket",
      });
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setToast(null), 3000);
      setDrawerOpen(true);

      // GA4 add_to_cart (standard ecommerce event; same measurement ID as the
      // WP site so the shop funnel stays continuous across cutover).
      const addPrice = parseAmount(info.price);
      gaEvent("add_to_cart", {
        currency: "GBP",
        value: addPrice !== undefined ? addPrice * quantity : undefined,
        items: [
          {
            // `item_id` for GA4; `id` (= feed g:id / SKU) + google_business_vertical
            // for Google Ads retail dynamic remarketing (basket-abandoner audience).
            item_id: info.sku || info.handle,
            id: info.sku || info.handle,
            google_business_vertical: "retail",
            item_name: info.title,
            price: addPrice,
            quantity,
          },
        ],
      });

      // Klaviyo "Added to Cart" — powers the abandoned-cart flow. No-ops unless
      // klaviyo.js is loaded (marketing consent granted). CheckoutURL is the
      // Shopify cart link, which recovers the basket cross-device from the email.
      try {
        if (updated) {
          // Absolute production URLs so links in the abandoned-cart email always
          // resolve to the live site, even if an event fires from a preview.
          const shopBase = "https://willowalexander.co.uk";
          const cartLines = updated.lines ?? [];
          // Full per-line detail (KLAVIYO-onsite-tracking brief §3). VariantName
          // isn't carried on the cart line, so it's omitted.
          const Items = cartLines.map((l) => {
            const unit = l.product?.price ? parseFloat(l.product.price.amount) : undefined;
            return {
              ProductID: l.product?.id ? numericId(l.product.id) : undefined,
              VariantID: l.variantId ? numericId(l.variantId) : undefined,
              SKU: l.sku ?? undefined,
              ProductName: l.product?.title,
              Quantity: l.quantity,
              ItemPrice: unit,
              RowTotal: unit !== undefined ? unit * l.quantity : undefined,
              ProductURL: l.product?.handle ? `${shopBase}/shop/${l.product.handle}` : undefined,
              ImageURL: l.product?.images?.[0]?.url,
            };
          });
          const subTotal = updated.subtotal ? parseFloat(updated.subtotal.amount) : undefined;
          // The just-added line, for the top-level AddedItem* fields.
          const addedLine = cartLines.find((l) => l.product?.handle === info.handle);
          const addedUnit = addedLine?.product?.price
            ? parseFloat(addedLine.product.price.amount)
            : addPrice;
          // Canonical Klaviyo "Added to Cart" shape. CheckoutURL and Items are
          // TOP-LEVEL (not under `extra`) because the email templates read them
          // there. CheckoutURL is the cross-device basket-recovery link.
          klaviyoTrack("Added to Cart", {
            $value: subTotal,
            AddedItemProductName: info.title,
            AddedItemProductID: addedLine?.product?.id ? numericId(addedLine.product.id) : undefined,
            AddedItemSKU: info.sku ?? addedLine?.sku ?? undefined,
            AddedItemImageURL: info.image || addedLine?.product?.images?.[0]?.url,
            AddedItemURL: `${shopBase}/shop/${info.handle}`,
            AddedItemPrice: addedUnit,
            AddedItemQuantity: quantity,
            ItemNames: Items.map((i) => i.ProductName).filter(Boolean),
            ItemCount: cartLines.reduce((n, l) => n + l.quantity, 0),
            // CheckoutURL is the on-site basket-restore link for the whole
            // current basket (Klaviyo email templates read it as
            // {{ event.CheckoutURL }}). Falls back to the Shopify checkout URL
            // if no variant id is available, so it is never empty.
            CheckoutURL: buildRestoreUrl(cartLines) ?? updated.checkoutUrl,
            Items,
          });
        }
      } catch {
        /* tracking must never break add-to-cart */
      }
      return true;
    },
    [call, buyable],
  );

  const remove = React.useCallback(async (lineId: string) => {
    await call({ action: "remove", lineId });
  }, [call]);

  const updateQty = React.useCallback(
    async (lineId: string, quantity: number) => {
      if (quantity <= 0) await call({ action: "remove", lineId });
      else await call({ action: "update", lineId, quantity });
    },
    [call],
  );

  // Rebuild a basket from a Klaviyo email's restore link. Calls the cart API's
  // "restore" action (get-or-create + add only missing variants, so no
  // duplicates) and opens the drawer. Does NOT fire add_to_cart / Added to Cart
  // events — a restore is not a fresh user add. UTMs on the inbound URL are
  // captured by AttributionCapture and ride onto the cart via `attributes`.
  const restore = React.useCallback(
    async (restoreLines: Array<{ merchandiseId: string; quantity: number }>) => {
      const attributes = getAttributionAttributes(readConsent()?.marketing ?? false);
      const cartId =
        cart?.id ?? (typeof window !== "undefined" ? localStorage.getItem(CART_KEY) : null) ?? undefined;
      let restored = 0;
      let skipped = 0;
      try {
        const r = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "restore", lines: restoreLines, attributes, cartId }),
        });
        const j = await r.json();
        if (j.cart) {
          persist(j.cart);
          restored = j.cart.totalQuantity ?? 0;
        }
        skipped = Array.isArray(j.skipped) ? j.skipped.length : 0;
      } catch {
        /* leave restored/skipped at 0 — caller sends the visitor to /shop */
      }
      if (skipped > 0) setRestoreNote("One item in your basket is no longer available.");
      if (restored > 0) setDrawerOpen(true);
      return { restored, skipped };
    },
    [cart, persist],
  );

  const checkout = React.useCallback(() => {
    if (!buyable) return; // catalog mode — checkout disabled
    if (!cart?.checkoutUrl) return;
    // GA4 begin_checkout — the last event we can fire before handing off to
    // Shopify's hosted checkout (where `purchase` must be tracked, Shopify-side).
    gaEvent("begin_checkout", {
      currency: cart.subtotal?.currencyCode ?? "GBP",
      value: parseAmount(cart.subtotal?.amount),
      items: cart.lines.map((l) => ({
        // GA4 item_id + Google Ads id/vertical (retail) — see add_to_cart.
        item_id: l.sku || l.product.handle,
        id: l.sku || l.product.handle,
        google_business_vertical: "retail",
        item_name: l.product.title,
        price: parseAmount(l.product.price?.amount),
        quantity: l.quantity,
      })),
    });
    window.location.href = cart.checkoutUrl;
  }, [cart, buyable]);

  const openDrawer = React.useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = React.useCallback(() => setDrawerOpen(false), []);
  const clearToast = React.useCallback(() => {
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    setToast(null);
  }, []);
  const clearRestoreNote = React.useCallback(() => setRestoreNote(null), []);

  const lines: CartLine[] = cart
    ? cart.lines.map((l) => ({
        id: l.id,
        handle: l.product.handle,
        title: l.product.title,
        price: money(l.product.price),
        image: l.product.images?.[0]?.url ?? "",
        quantity: l.quantity,
      }))
    : [];

  const value: CartContextValue = {
    lines,
    count: cart?.totalQuantity ?? 0,
    subtotal: money(cart?.subtotal),
    checkoutUrl: cart?.checkoutUrl ?? null,
    buyable,
    busy,
    toast,
    drawerOpen,
    restoreNote,
    add,
    remove,
    updateQty,
    restore,
    checkout,
    openDrawer,
    closeDrawer,
    clearToast,
    clearRestoreNote,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
