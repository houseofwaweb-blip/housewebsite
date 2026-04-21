import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import crypto from "node:crypto";
import { env } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Shopify webhook → tag-based revalidation.
 * Verifies HMAC-SHA256 with SHOPIFY_WEBHOOK_SECRET.
 * Configure per topic in Shopify admin: products/update, products/delete,
 * collections/update, inventory_levels/update.
 */
function verifyHmac(raw: string, signature: string | null): boolean {
  if (!signature || !env.SHOPIFY_WEBHOOK_SECRET) return false;
  const digest = crypto
    .createHmac("sha256", env.SHOPIFY_WEBHOOK_SECRET)
    .update(raw, "utf8")
    .digest("base64");
  const a = Buffer.from(digest);
  const b = Buffer.from(signature);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const signature = req.headers.get("x-shopify-hmac-sha256");
  if (!verifyHmac(raw, signature)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const topic = req.headers.get("x-shopify-topic") ?? "";
  let body: { handle?: string; product_id?: number | string } = {};
  try {
    body = JSON.parse(raw);
  } catch {
    // Non-JSON payloads for some topics — fine.
  }

  const tags: string[] = [`shopify:${topic}`];
  if (body.handle) tags.push(`product:${body.handle}`);

  for (const tag of tags) revalidateTag(tag, "max");
  return NextResponse.json({ ok: true, revalidated: tags });
}
