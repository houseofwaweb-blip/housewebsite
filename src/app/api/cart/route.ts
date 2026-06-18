import { NextRequest, NextResponse } from "next/server";
import { shopifyProvider } from "@/lib/commerce/shopify";

/**
 * Cart API — drives the Storefront Cart from the browser without exposing
 * the token. All ops go through one POST with an `action`. Returns the
 * full cart (including `checkoutUrl`) so the client can render + redirect.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const action = body.action as string;
    const p = shopifyProvider;

    switch (action) {
      case "get": {
        const cart = body.cartId ? await p.getCart(body.cartId) : null;
        return NextResponse.json({ cart });
      }
      case "add": {
        let cartId = body.cartId as string | undefined;
        // No cart yet (or it expired) → create one first.
        if (!cartId) cartId = (await p.createCart()).id;
        try {
          const cart = await p.addLine(cartId, body.merchandiseId, body.quantity ?? 1);
          return NextResponse.json({ cart });
        } catch {
          // Stale cart id → start a fresh cart and retry once.
          const fresh = await p.createCart();
          const cart = await p.addLine(fresh.id, body.merchandiseId, body.quantity ?? 1);
          return NextResponse.json({ cart });
        }
      }
      case "update": {
        const cart = await p.updateLine(body.cartId, body.lineId, body.quantity);
        return NextResponse.json({ cart });
      }
      case "remove": {
        const cart = await p.removeLine(body.cartId, body.lineId);
        return NextResponse.json({ cart });
      }
      default:
        return NextResponse.json({ error: "unknown action" }, { status: 400 });
    }
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
