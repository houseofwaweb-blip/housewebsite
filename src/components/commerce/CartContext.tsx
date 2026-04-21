"use client";

import * as React from "react";

export interface CartLine {
  handle: string;
  title: string;
  price: string;
  image: string;
  collection: string;
  houseApproved?: boolean;
  quantity: number;
}

interface CartToast {
  id: string;
  title: string;
  href?: string;
  linkLabel?: string;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  toast: CartToast | null;
  drawerOpen: boolean;
  add: (item: Omit<CartLine, "quantity"> & { quantity?: number }) => void;
  remove: (handle: string) => void;
  updateQty: (handle: string, quantity: number) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  clearToast: () => void;
}

const CartContext = React.createContext<CartContextValue | null>(null);

function parsePrice(p: string): number {
  return parseFloat(p.replace(/[^0-9.]/g, "")) || 0;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = React.useState<CartLine[]>([]);
  const [toast, setToast] = React.useState<CartToast | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const hideTimer = React.useRef<number | null>(null);

  const count = lines.reduce((s, l) => s + l.quantity, 0);
  const subtotal = lines.reduce((s, l) => s + parsePrice(l.price) * l.quantity, 0);

  const add = React.useCallback(
    (item: Omit<CartLine, "quantity"> & { quantity?: number }) => {
      const qty = item.quantity ?? 1;
      setLines((prev) => {
        const idx = prev.findIndex((l) => l.handle === item.handle);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
          return next;
        }
        return [...prev, { ...item, quantity: qty }];
      });

      const next: CartToast = {
        id: crypto.randomUUID(),
        title: `${item.title} added.`,
        href: "/shop/basket",
        linkLabel: "View basket",
      };
      setToast(next);
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setToast(null), 3000);
    },
    [],
  );

  const remove = React.useCallback((handle: string) => {
    setLines((prev) => prev.filter((l) => l.handle !== handle));
  }, []);

  const updateQty = React.useCallback((handle: string, quantity: number) => {
    if (quantity <= 0) {
      setLines((prev) => prev.filter((l) => l.handle !== handle));
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.handle === handle ? { ...l, quantity } : l)),
    );
  }, []);

  const openDrawer = React.useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = React.useCallback(() => setDrawerOpen(false), []);

  const clearToast = React.useCallback(() => {
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    setToast(null);
  }, []);

  const value: CartContextValue = {
    lines,
    count,
    subtotal,
    toast,
    drawerOpen,
    add,
    remove,
    updateQty,
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
