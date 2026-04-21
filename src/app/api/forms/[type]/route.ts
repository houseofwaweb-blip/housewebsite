import type { NextRequest } from "next/server";
import { handleFormSubmission } from "@/lib/forms/submit";
import { formRegistry, type FormType } from "@/lib/forms/schemas";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ type: string }> },
) {
  const { type } = await ctx.params;
  if (!(type in formRegistry)) {
    return new Response("Not found", { status: 404 });
  }
  return handleFormSubmission(req, type as FormType);
}
