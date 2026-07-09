import Link from "next/link";

/**
 * Reusable House of HoWA content modules (launch read section 36).
 * Built once, used across service, design, protect and Hearth pages.
 * Keeps the House design system (cream ground, gold ink, Didot display).
 */

/** "Booked. And remembered." — the writeback promise. Used on every service page. */
export function BookedAndRemembered({
  className = "",
}: {
  className?: string;
}) {
  return (
    <section
      className={`px-[5vw] py-14 bg-house-cream-dark border-t border-b border-house-brown/8 ${className}`}
    >
      <div className="max-w-[860px] mx-auto text-center">
        <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-house-gold-ink mb-3">
          The HoWA promise
        </p>
        <h2 className="font-display text-[clamp(28px,3.4vw,44px)] leading-[1.1] text-house-black mb-5">
          Booked. <em className="italic">And remembered.</em>
        </h2>
        <p className="font-sans text-[17px] leading-[1.65] text-house-brown/80 max-w-[60ch] mx-auto">
          When the visit is complete, HoWA can save the date, provider, notes,
          photographs where requested, cost, invoice and next reminder to your
          Home Record.
        </p>
        <div className="mt-7 flex flex-wrap justify-center items-center gap-x-3 gap-y-2">
          {["Booked", "Delivered", "Remembered", "Home Record", "HoWA Score"].map(
            (step, i, arr) => (
              <span key={step} className="flex items-center gap-3">
                <span className="font-sans text-[12px] tracking-[0.1em] uppercase text-house-brown/75 border border-house-brown/15 px-3 py-1.5">
                  {step}
                </span>
                {i < arr.length - 1 ? (
                  <span aria-hidden className="text-house-gold-ink">
                    →
                  </span>
                ) : null}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * Founding-partner strip — "Delivered by Willow Alexander [discipline], a
 * founding House of HoWA partner." Willow Alexander is kept only as origin /
 * founding-partner reference per the launch read.
 */
export function FoundingPartnerStrip({
  discipline,
  href = "/partners/willow-alexander-gardens",
}: {
  discipline: string;
  href?: string;
}) {
  return (
    <div className="px-[5vw] py-6 bg-house-cream border-t border-house-brown/8">
      <p className="max-w-[1000px] mx-auto font-sans text-[14px] tracking-[0.02em] text-house-stone text-center">
        Delivered by{" "}
        <Link
          href={href}
          className="text-house-gold-ink no-underline hover:underline underline-offset-2"
        >
          Willow Alexander {discipline}
        </Link>
        , a founding House of HoWA partner.
      </p>
    </div>
  );
}

/**
 * Safety-boundary strip — used on repair, surveyor, protect, energy/electrical
 * and insurance-adjacent pages. Copy can be overridden.
 */
export function SafetyBoundary({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`px-[5vw] py-6 ${className}`}>
      <p className="max-w-[820px] mx-auto font-sans text-[13px] leading-[1.6] text-house-stone/90 text-center">
        {children ??
          "HoWA helps you understand, plan and remember. It does not replace qualified emergency, legal, gas, electrical, medical, structural or insurance advice."}
      </p>
    </div>
  );
}

/** "Save to my Home Record" pill — used across Hearth, services and product pages. */
export function SaveToRecord({
  label = "Save to my Home Record",
  href = "/howa/assistant",
}: {
  label?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 font-sans text-[12px] tracking-[0.14em] uppercase text-house-brown border border-house-gold-ink/40 bg-house-gold-ink/10 px-4 py-2.5 no-underline transition-colors hover:bg-house-gold-ink/20"
    >
      <span aria-hidden className="text-house-gold-ink">
        ◆
      </span>
      {label}
    </Link>
  );
}
