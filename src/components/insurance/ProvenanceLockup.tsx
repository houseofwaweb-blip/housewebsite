/**
 * Insurance is not live yet (waitlist only), so the House names no broker and
 * shows no "arranged by" credit. This component is intentionally inert — it
 * renders nothing — so the pages that used to display the Provenance lockup no
 * longer do, without having to unpick each call site. Restore the real lockup
 * (git history) when insurance launches and the introducer relationship is live.
 */
export function ProvenanceLockup(_props?: {
  variant?: "onDark" | "onLight";
  label?: string;
  className?: string;
}) {
  return null;
}
