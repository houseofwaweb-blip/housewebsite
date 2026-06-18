"use client";

import * as React from "react";
import { klaviyoTrack } from "@/lib/klaviyo/client";

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
  add: (merchandiseId: string, info: AddInfo, quantity?: number) => Promise<void>;
  remove: (lineId: string) => Promise<void>;
  updateQty: (lineId: string, quantity: number) => Promise<void>;
  checkout: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  clearToast: () => void;
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
    product: { handle: string; title: string; images: Array<{ url: string }>; price: { amount: string; currencyCode: string } };
  }>;
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

  const add = React.useCallback(
    async (merchandiseId: string, info: AddInfo, quantity = 1) => {
      if (!buyable) return; // catalog mode — browse only
      const updated = await call({ action: "add", merchandiseId, quantity });
      setToast({
        id: crypto.randomUUID(),
        title: `${info.title} added.`,
        href: "/shop/basket",
        linkLabel: "View basket",
      });
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setToast(null), 3000);
      setDrawerOpen(true);

      // Klaviyo "Added to Cart" — powers the abandoned-cart flow. No-ops unless
      // klaviyo.js is loaded (marketing consent granted). CheckoutURL is the
      // Shopify cart link, which recovers the basket cross-device from the email.
      try {
        if (updated) {
          const origin = window.location.origin;
          const cartLines = updated.lines ?? [];
          const Items = cartLines.map((l) => ({
            ProductName: l.product?.title,
            Quantity: l.quantity,
            ItemPrice: l.product?.price ? parseFloat(l.product.price.amount) : undefined,
            ImageURL: l.product?.images?.[0]?.url,
            ProductURL: l.product?.handle ? `${origin}/shop/${l.product.handle}` : undefined,
          }));
          const subTotal = updated.subtotal ? parseFloat(updated.subtotal.amount) : undefined;
          // Canonical Klaviyo "Added to Cart" shape (matches Shopify onsite
          // tracking): top-level AddedItem* + ItemNames/$value, cart detail
          // under `extra`. extra.CheckoutURL is the cross-device recovery link.
          klaviyoTrack("Added to Cart", {
            $value: subTotal,
            AddedItemProductName: info.title,
            AddedItemImageURL: info.image,
            AddedItemURL: `${origin}/shop/${info.handle}`,
            AddedItemQuantity: quantity,
            ItemNames: Items.map((i) => i.ProductName).filter(Boolean),
            ItemCount: cartLines.reduce((n, l) => n + l.quantity, 0),
            extra: {
              Items,
              SubTotal: subTotal,
              GrandTotal: subTotal,
              CheckoutURL: updated.checkoutUrl,
            },
          });
        }
      } catch {
        /* tracking must never break add-to-cart */
      }
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

  const checkout = React.useCallback(() => {
    if (!buyable) return; // catalog mode — checkout disabled
    if (cart?.checkoutUrl) window.location.href = cart.checkoutUrl;
  }, [cart, buyable]);

  const openDrawer = React.useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = React.useCallback(() => setDrawerOpen(false), []);
  const clearToast = React.useCallback(() => {
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    setToast(null);
  }, []);

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
    add,
    remove,
    updateQty,
    checkout,
    openDrawer,
    closeDrawer,
    clearToast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
