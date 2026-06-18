import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/lib/env";

/**
 * Single-hop redirect to the HoWA Product app when it's live.
 * When HOWA_APP_LIVE=false, bounces visitors to /howa/coming-soon.
 *
 * This exists so header CTA hrefs stay stable regardless of product status.
 *
 * Security: `source` is whitelisted so attacker-controlled UTM payloads can't
 * be smuggled into the HoWA Product app's analytics. Unknown source → "header".
 */

const ALLOWED_SOURCES = new Set([
  "header",
  "footer",
  "nav-cta",
  "hero",
  "cta",
  "booking-form",
  "howa-bounce",
  "howa-plus",
  "design-studios",
  "gardens-companion",
  "interiors-companion",
  "service-hero",
  "partner-brief",
  "home-credit",
  "house-credit",
]);

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("source") ?? "header";
  const source = ALLOWED_SOURCES.has(raw) ? raw : "header";
  if (env.HOWA_APP_LIVE && env.NEXT_PUBLIC_HOWA_APP_URL) {
    const dest = new URL(env.NEXT_PUBLIC_HOWA_APP_URL);
    dest.searchParams.set("utm_source", "howa-site");
    dest.searchParams.set("utm_medium", source);
    return NextResponse.redirect(dest, 307);
  }
  // Relative redirect: the browser resolves this Location against the URL it
  // actually requested. Building `new URL(..., req.url)` would bake in the
  // server's bound host (e.g. 0.0.0.0 when started with -H 0.0.0.0), producing
  // an unreachable http://0.0.0.0:4000/... destination.
  return new NextResponse(null, { status: 307, headers: { Location: "/howa/coming-soon" } });
}
