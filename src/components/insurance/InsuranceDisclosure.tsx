/**
 * Insurance is not live yet (waitlist only), so no broker is named and no
 * FCA/introducer disclosure is made — this renders a coming-soon note instead.
 * One source of truth across every insurance surface. Restore the real
 * disclosure (git history + DISCLOSURE_TEXT) when insurance launches.
 */
export function InsuranceDisclosure({ className = "" }: { className?: string }) {
  return (
    <div
      className={`border-l-2 border-[color:var(--ins-ink)] bg-house-cream-dark/50 px-4 py-3 ${className}`}
    >
      <p className="m-0 font-sans text-[14.5px] leading-[1.55] text-house-brown/80">
        Insurance from the House is coming soon. Registering your interest adds
        you to the waitlist; it is not an application for cover or advice, and the
        House does not advise on or arrange insurance.
      </p>
    </div>
  );
}
