import Link from "next/link";
import { SUPPORT_PHONE, SUPPORT_PHONE_HREF } from "./ClaimsHelp";

/**
 * A full-width closing CTA band for the insurance world. Burgundy ground
 * (--ins-accent), cream text, a considered headline and a repeated primary
 * action so a visitor can always act, with a Call fallback and an optional
 * tertiary route. Introducer-only: every action is an enquiry, quote-request or
 * call, never a bindable purchase. No urgency, no countdowns, no pricing.
 */
export function InsuranceCtaBand({
  eyebrow,
  heading,
  body,
  primaryLabel,
  primaryHref,
  secondaryCall = true,
  tertiary,
}: {
  eyebrow?: string;
  heading: string;
  body?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryCall?: boolean;
  tertiary?: { label: string; href: string };
}) {
  const primaryClass =
    "inline-flex w-full items-center justify-center whitespace-nowrap border border-house-cream bg-house-cream px-7 py-3.5 font-sans text-[14px] tracking-[0.16em] uppercase text-[color:var(--ins-accent)] no-underline transition-[filter] hover:brightness-95 sm:w-auto";
  const isHash = primaryHref.startsWith("#");
  return (
    <section className="px-[5vw] py-14 text-house-cream" style={{ background: "var(--ins-accent)" }}>
      <div className="mx-auto max-w-[1080px]">
        {eyebrow ? (
          <p className="font-sans text-[14px] tracking-[0.28em] uppercase text-house-cream/70">{eyebrow}</p>
        ) : null}
        <h2 className="mt-3 max-w-[26ch] font-display text-[clamp(27px,3.4vw,43px)] leading-[1.1] text-house-cream">
          {heading}
        </h2>
        {body ? (
          <p className="mt-4 max-w-[58ch] font-sans text-[18.5px] leading-[1.65] text-house-cream/80">{body}</p>
        ) : null}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {isHash ? (
            <a href={primaryHref} className={primaryClass}>
              {primaryLabel}
            </a>
          ) : (
            <Link href={primaryHref} className={primaryClass}>
              {primaryLabel}
            </Link>
          )}
          {secondaryCall ? (
            <a
              href={SUPPORT_PHONE_HREF}
              className="inline-flex w-full items-center justify-center whitespace-nowrap border border-house-cream/40 px-7 py-3.5 font-sans text-[14px] tracking-[0.16em] uppercase text-house-cream no-underline transition-colors hover:border-house-cream sm:w-auto"
            >
              Call {SUPPORT_PHONE}
            </a>
          ) : null}
          {tertiary ? (
            <Link
              href={tertiary.href}
              className="inline-flex w-fit items-center font-sans text-[14px] tracking-[0.16em] uppercase text-house-cream/85 no-underline underline-offset-2 hover:text-house-cream hover:underline"
            >
              {tertiary.label} →
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
