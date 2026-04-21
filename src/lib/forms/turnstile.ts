import "server-only";
import { env } from "@/lib/env";

/**
 * Cloudflare Turnstile server-side verification.
 * Spec: PLAN.md §15 Finding S3. Every public POST must verify before Supabase write.
 */
export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string,
): Promise<{ ok: boolean; reason?: string }> {
  if (!env.TURNSTILE_SECRET_KEY) {
    // Dev/preview with no key set — fail closed in production, open locally.
    if (process.env.NODE_ENV === "production") {
      return { ok: false, reason: "turnstile-not-configured" };
    }
    return { ok: true };
  }

  const body = new URLSearchParams();
  body.append("secret", env.TURNSTILE_SECRET_KEY);
  body.append("response", token);
  if (remoteIp) body.append("remoteip", remoteIp);

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body, cache: "no-store" },
    );
    if (!res.ok) return { ok: false, reason: `siteverify-${res.status}` };
    const data = (await res.json()) as {
      success: boolean;
      "error-codes"?: string[];
    };
    if (!data.success) {
      return { ok: false, reason: data["error-codes"]?.join(",") || "failed" };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : "network" };
  }
}
