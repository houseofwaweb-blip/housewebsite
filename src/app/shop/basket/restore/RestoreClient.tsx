"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/components/commerce/CartContext";
import { captureAttribution } from "@/lib/attribution";

/**
 * Parses ?lines=<variantId>:<qty>,... , rebuilds the basket through the cart
 * API, and sends the shopper on to /shop with the drawer open. All other query
 * params (UTMs, Klaviyo's _kx) are preserved on the onward URL, and attribution
 * is captured first so the UTMs ride onto the restored cart's attributes.
 */
export function RestoreClient() {
  const router = useRouter();
  const params = useSearchParams();
  const { restore } = useCart();
  const ran = React.useRef(false);

  React.useEffect(() => {
    if (ran.current) return; // run once
    ran.current = true;

    // Capture UTMs from this inbound link before the cart is created, so they
    // save onto the cart attributes exactly as a normal landing would.
    try {
      captureAttribution();
    } catch {
      /* non-fatal */
    }

    // Forward every param except `lines` to /shop (keeps utm_*, _kx, etc.).
    const forward = new URLSearchParams(params.toString());
    forward.delete("lines");
    const qs = forward.toString();
    const shopUrl = qs ? `/shop?${qs}` : "/shop";

    const lines = (params.get("lines") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((pair) => {
        const [idRaw, qtyRaw] = pair.split(":");
        const id = (idRaw ?? "").replace(/[^0-9]/g, "");
        const quantity = Math.max(1, parseInt(qtyRaw ?? "1", 10) || 1);
        return id ? { merchandiseId: `gid://shopify/ProductVariant/${id}`, quantity } : null;
      })
      .filter((x): x is { merchandiseId: string; quantity: number } => Boolean(x));

    if (lines.length === 0) {
      router.replace(shopUrl);
      return;
    }

    void (async () => {
      try {
        await restore(lines);
      } catch {
        /* restore() is already defensive; fall through to /shop */
      }
      router.replace(shopUrl);
    })();
  }, [params, restore, router]);

  return (
    <p className="font-sans text-[18px] text-house-stone" role="status" aria-live="polite">
      Restoring your basket…
    </p>
  );
}
