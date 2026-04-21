import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { env } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Sanity webhook → tag-based revalidation.
 * Spec: PLAN.md §15 Finding E3. Configure in Sanity as a GROQ-powered webhook
 * posting { _type, slug } for create/update/delete on all document types.
 */
interface SanityWebhookBody {
  _type?: string;
  slug?: string;
  secret?: string;
}

export async function POST(req: NextRequest) {
  const bodyText = await req.text();
  const providedSecret =
    req.headers.get("x-sanity-secret") ??
    req.nextUrl.searchParams.get("secret") ??
    "";

  if (!env.SANITY_WEBHOOK_SECRET || providedSecret !== env.SANITY_WEBHOOK_SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  let body: SanityWebhookBody = {};
  try {
    body = JSON.parse(bodyText) as SanityWebhookBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  const tags: string[] = [];
  if (body._type) tags.push(`type:${body._type}`);
  if (body._type && body.slug) tags.push(`${body._type}:${body.slug}`);

  for (const tag of tags) revalidateTag(tag, "max");
  return NextResponse.json({ ok: true, revalidated: tags });
}
