import { NextResponse, type NextRequest } from "next/server";
import { draftMode } from "next/headers";
import { env } from "@/lib/env";

/**
 * Draft preview toggle.
 * Spec: PLAN.md §15 Finding E7.
 *
 * GET  ?secret=...&slug=/some/path  → enable draft mode + redirect
 * DELETE → disable (exit preview)
 */
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  const slug = req.nextUrl.searchParams.get("slug") ?? "/";
  if (
    !env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET ||
    secret !== env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET
  ) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const draft = await draftMode();
  draft.enable();
  return NextResponse.redirect(new URL(slug, req.url), 307);
}

export async function DELETE() {
  const draft = await draftMode();
  draft.disable();
  return NextResponse.json({ ok: true });
}
