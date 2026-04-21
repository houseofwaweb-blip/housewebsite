"use client";

import type { FormType } from "@/lib/forms/schemas";

/**
 * Thin client-side wrapper around the /api/forms/[type] endpoint.
 * Shared by every form component so error handling stays consistent.
 */
export async function submitForm(
  type: FormType,
  payload: Record<string, unknown>,
): Promise<{ ok: true; already?: boolean } | { ok: false; error: string }> {
  try {
    const res = await fetch(`/api/forms/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = (await res.json()) as {
      ok: boolean;
      error?: string;
      already?: boolean;
    };
    if (res.ok && body.ok) {
      return { ok: true, already: body.already };
    }
    const code = body.error ?? `http-${res.status}`;
    const message = mapErrorCode(code);
    return { ok: false, error: message };
  } catch {
    return { ok: false, error: "Network trouble — please try again in a moment." };
  }
}

function mapErrorCode(code: string): string {
  switch (code) {
    case "validation":
      return "Please check the fields above.";
    case "rate-limited":
      return "You've sent a few of these recently. Try again in ten minutes.";
    case "verification-failed":
      return "We couldn't verify your browser. Refresh and try again.";
    case "insert-failed":
      return "Something went wrong saving your message. Please try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}
