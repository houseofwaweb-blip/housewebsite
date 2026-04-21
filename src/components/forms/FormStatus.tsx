"use client";

import { cn } from "@/lib/cn";

export type FormStatusState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; message?: string }
  | { kind: "error"; message: string };

/**
 * Inline status strip shown below a form's submit button.
 * Respects prefers-reduced-motion — the line slides in unless reduced.
 */
export function FormStatus({ status, dark }: { status: FormStatusState; dark?: boolean }) {
  if (status.kind === "idle") return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "font-sans text-[12px] tracking-[0.04em] mt-6 pb-3 border-b",
        dark
          ? "text-house-cream border-house-cream/15"
          : "text-house-brown border-house-brown/15",
      )}
    >
      {status.kind === "submitting" && (
        <span className="opacity-70">· · · sending</span>
      )}
      {status.kind === "success" && (
        <span className="text-house-moss">
          {status.message ?? "Thank you. We'll be in touch."}
        </span>
      )}
      {status.kind === "error" && (
        <span className="text-red-700">{status.message}</span>
      )}
    </div>
  );
}
