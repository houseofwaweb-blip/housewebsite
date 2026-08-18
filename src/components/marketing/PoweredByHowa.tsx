import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * PoweredByHowa — the single reusable technology credit (spec §7.5, §25.2).
 *
 * Governing rule (spec §0): "House of Willow Alexander is who we are. HoWA is
 * what we use." This credit is deliberately quiet — HoWA is enabling
 * infrastructure, never the identity. Per spec §7.5 it "must never be larger
 * than the House logo or page title", so every size here stays small: a ~16px
 * mark and 11–13px utility type.
 *
 * Three sizes (spec §7.5):
 *   - compact:     monogram + "Powered by HoWA"            (header utility, footer)
 *   - explanatory: "Booking, records and reminders in one place, powered by HoWA"
 *   - account:     "My House, powered by HoWA"             (My House sub-label)
 *
 * Copy avoids em dashes per the House brand rule.
 */

export type PoweredByHowaSize = "compact" | "explanatory" | "account";

export interface PoweredByHowaProps {
  size?: PoweredByHowaSize;
  /** When set, the credit becomes a link (usually to /how-it-works). */
  href?: string;
  /** Dark surface (footer / navy stages) — uses the white mark + cream type. */
  dark?: boolean;
  /** Show the small HoWA mark. Defaults on for compact/account, off for explanatory. */
  showMark?: boolean;
  className?: string;
}

const COPY: Record<PoweredByHowaSize, string> = {
  compact: "Powered by HoWA",
  explanatory: "Booking, records and reminders in one place, powered by HoWA",
  account: "My House, powered by HoWA",
};

export function PoweredByHowa({
  size = "compact",
  href,
  dark = false,
  showMark,
  className,
}: PoweredByHowaProps) {
  const withMark = showMark ?? size !== "explanatory";
  const label = COPY[size];

  const inner = (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-sans no-underline",
        // Kept subordinate: small type, restrained tracking.
        size === "explanatory"
          ? "text-[13px] tracking-[0.02em] normal-case leading-[1.4]"
          : "text-[11px] tracking-[0.14em] uppercase",
        dark ? "text-house-cream/70" : "text-house-brown/60",
        href && "transition-opacity duration-[var(--t-base)] hover:opacity-100",
        className,
      )}
    >
      {withMark ? (
        <Image
          src={dark ? "/brand/howa/howa-white.svg" : "/brand/howa/howa-black.svg"}
          alt=""
          aria-hidden="true"
          width={204}
          height={102}
          className="h-[15px] w-auto opacity-70 shrink-0"
        />
      ) : null}
      <span>{label}</span>
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={`${label}. How the House works.`}
        className="inline-flex no-underline"
      >
        {inner}
      </Link>
    );
  }

  return inner;
}
