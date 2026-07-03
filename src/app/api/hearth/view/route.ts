import type { NextRequest } from "next/server";
import { recordArticleView, getArticleViewStats } from "@/lib/hearth/views";
import { checkViewRateLimit } from "@/lib/rate-limit";
import { env } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SLUG_RE = /^[a-z0-9-]{1,120}$/;

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || "anon";
}

/**
 * POST /api/hearth/view  { slug }
 * Records one view. Best-effort: always returns 204 so the client beacon never
 * surfaces an error, even if Supabase isn't configured or rate-limited.
 */
export async function POST(req: NextRequest) {
  try {
    const rl = await checkViewRateLimit(clientIp(req));
    if (!rl.ok) return new Response(null, { status: 204 });

    const body = (await req.json().catch(() => null)) as { slug?: unknown } | null;
    const slug = typeof body?.slug === "string" ? body.slug : "";
    if (SLUG_RE.test(slug)) {
      await recordArticleView(slug);
    }
  } catch {
    /* swallow — view tracking is best-effort */
  }
  return new Response(null, { status: 204 });
}

/**
 * GET /api/hearth/view?slug=…  → { total, last30 }
 * Read-only stats for the Sanity Studio display. Same-origin only (the Studio
 * lives on this domain) so the counts aren't casually scrapeable — they're
 * deliberately never rendered on public pages.
 */
export async function GET(req: NextRequest) {
  const site = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const sameOrigin =
    (origin && origin.startsWith(site)) || (referer && referer.startsWith(site));
  if (!sameOrigin) {
    return Response.json({ error: "forbidden" }, { status: 403 });
  }

  const rl = await checkViewRateLimit(clientIp(req));
  if (!rl.ok) return Response.json({ error: "rate_limited" }, { status: 429 });

  const slug = new URL(req.url).searchParams.get("slug") ?? "";
  if (!SLUG_RE.test(slug)) {
    return Response.json({ error: "bad_slug" }, { status: 400 });
  }
  const stats = await getArticleViewStats(slug);
  return Response.json(stats, {
    headers: { "cache-control": "private, max-age=60" },
  });
}
