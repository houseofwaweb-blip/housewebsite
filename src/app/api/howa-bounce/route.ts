import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/lib/env";

/**
 * Single-hop redirect to the HoWA Product app when it's live.
 * When HOWA_APP_LIVE=false, bounces visitors to /howa/coming-soon.
 *
 * This exists so header CTA hrefs stay stable regardless of product status.
 */
export async function GET(req: NextRequest) {
  const source = req.nextUrl.searchParams.get("source") ?? "header";
  if (env.HOWA_APP_LIVE && env.NEXT_PUBLIC_HOWA_APP_URL) {
    const dest = new URL(env.NEXT_PUBLIC_HOWA_APP_URL);
    dest.searchParams.set("utm_source", "howa-site");
    dest.searchParams.set("utm_medium", source);
    return NextResponse.redirect(dest, 307);
  }
  return NextResponse.redirect(new URL("/howa/coming-soon", req.url), 307);
}
