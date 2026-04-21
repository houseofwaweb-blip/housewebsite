import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Paywall — fade-out over preview content + bottom gate with CTA.
 * Spec: /ux/09-interactions/playground.html (other section → paywall).
 *
 * Used on article pages when `isPremium` is true AND the reader isn't
 * authenticated. Shows ~3 paragraphs then fades under this gate.
 *
 * The outer `<article>` must include `.paywall-hidden` on anything the
 * bot sees but the reader shouldn't, so the paywall JSON-LD selector
 * (defined in src/lib/seo/jsonLd.tsx) matches per Google flexible sampling.
 */
export interface PaywallProps {
  /** Headline shown in the gate (e.g. "Continue reading with HoWA+"). */
  heading: React.ReactNode;
  /** Sign-in URL; defaults to /sign-in. */
  signInHref?: string;
  /** Upgrade URL; defaults to /howa/plans. */
  upgradeHref?: string;
  /** Upgrade button label. */
  upgradeLabel?: string;
  className?: string;
}

export function Paywall({
  heading,
  signInHref = "/sign-in",
  upgradeHref = "/howa/plans",
  upgradeLabel = "Join HoWA+",
  className,
}: PaywallProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 bottom-[120px] h-[120px] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,#ffffff_100%)]"
      />

      {/* Gate */}
      <div className="absolute left-0 right-0 bottom-0 bg-white px-10 pt-6 pb-7 border-t border-house-gold">
        <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold mb-2">
          ◆ Continue reading with HoWA+
        </div>
        <h5 className="font-display text-[22px] font-medium leading-[1.2] mb-4 text-house-brown">
          {heading}
        </h5>
        <div className="flex items-center gap-4 flex-wrap">
          <Link
            href={upgradeHref}
            className="inline-block bg-house-gold text-white px-5 py-3 font-sans text-[11px] tracking-[0.18em] uppercase no-underline border border-house-gold transition-colors duration-[var(--t-slow)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
          >
            {upgradeLabel}
          </Link>
          <p className="font-sans text-[11px] tracking-[0.16em] uppercase text-house-stone">
            Already a member?{" "}
            <Link
              href={signInHref}
              className="text-house-brown underline decoration-house-gold underline-offset-4 no-underline border-b border-house-gold pb-0.5 hover:text-house-gold transition-colors duration-[var(--t-base)] ease-out"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
