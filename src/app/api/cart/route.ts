import { NextRequest, NextResponse } from "next/server";
import { shopifyProvider } from "@/lib/commerce/shopify";
import type { VisitorConsent } from "@/lib/commerce/types";
import { readConsentFromCookieHeader } from "@/lib/consent";

/**
 * Cart API — drives the Storefront Cart from the browser without exposing
 * the token. All ops go through one POST with an `action`. Returns the
 * full cart (including `checkoutUrl`) so the client can render + redirect.
 *
 * Consent: the visitor's banner choice (wa-consent cookie, sent with this
 * same-origin request) is read here and passed to the cart ops, so Shopify
 * encodes it into `checkoutUrl` as `_cs` and the hosted checkout respects it.
 * Before any choice is made, everything is false.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function visitorConsent(req: NextRequest): VisitorConsent {
  const c = readConsentFromCookieHeader(req.headers.get("cookie"));
  if (!c) return { analytics: false, marketing: false, preferences: false, saleOfData: false };
  // measurement -> analytics; marketing -> marketing + sale_of_data; functional -> preferences.
  return {
    analytics: c.measurement,
    marketing: c.marketing,
    preferences: c.functional,
    saleOfData: c.marketing,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const action = body.action as string;
    const p = shopifyProvider;
    const consent = visitorConsent(req);

    switch (action) {
      case "get": {
        const cart = body.cartId ? await p.getCart(body.cartId, consent) : null;
        return NextResponse.json({ cart });
      }
      case "add": {
        let cartId = body.cartId as string | undefined;
        // Ad-source attributes (landing page, UTMs, consented click ids) ride
        // onto the cart at creation, so they reach the Shopify order.
        const attributes = Array.isArray(body.attributes) ? body.attributes : undefined;
        // No cart yet (or it expired) → create one first.
        if (!cartId) cartId = (await p.createCart(consent, attributes)).id;
        try {
          const cart = await p.addLine(cartId, body.merchandiseId, body.quantity ?? 1, consent);
          return NextResponse.json({ cart });
        } catch {
          // Stale cart id → start a fresh cart and retry once.
          const fresh = await p.createCart(consent, attributes);
          const cart = await p.addLine(fresh.id, body.merchandiseId, body.quantity ?? 1, consent);
          return NextResponse.json({ cart });
        }
      }
      case "update": {
        const cart = await p.updateLine(body.cartId, body.lineId, body.quantity, consent);
        return NextResponse.json({ cart });
      }
      case "remove": {
        const cart = await p.removeLine(body.cartId, body.lineId, consent);
        return NextResponse.json({ cart });
      }
      default:
        return NextResponse.json({ error: "unknown action" }, { status: 400 });
    }
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
