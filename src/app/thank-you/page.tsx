import Link from "next/link";
import { FlowerWatermark } from "@/components/marketing/FlowerWatermark";

export const metadata = {
  title: "Thank you",
  description: "Your message is with the House. We reply personally, usually within one working day.",
  robots: { index: false, follow: true },
};

/**
 * /thank-you — post-submission confirmation.
 *
 * Forms redirect here on success (clearer than an inline note + gives a clean
 * URL for GA4/Ads conversion goals). Noindex so it doesn't surface in search.
 */
export default function ThankYouPage() {
  return (
    <div className="relative overflow-hidden bg-house-cream text-house-brown">
      <FlowerWatermark color="gold" side="left" opacity={0.12} className="!top-auto bottom-[-10%] h-[70%]" />
      <section className="relative z-10 mx-auto flex min-h-[70vh] max-w-[760px] flex-col items-center justify-center px-[6vw] py-[clamp(80px,10vw,160px)] text-center">
        <p className="mb-5 font-sans text-[12px] uppercase tracking-[0.32em] text-house-gold-ink">
          The House of HoWA
        </p>
        <h1 className="font-display text-[clamp(48px,7vw,88px)] leading-[1.04] tracking-[-0.01em] text-house-brown">
          Thank you.
        </h1>
        <p className="mt-6 max-w-[46ch] font-sans text-[17px] leading-[1.75] text-house-brown/75">
          Your message is with the House. We read everything and reply personally,
          usually within one working day. If it&apos;s urgent, you can also call the
          House directly.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-house-gold-ink px-8 py-4 font-sans text-[12px] uppercase tracking-[0.18em] text-house-brown no-underline transition-[filter] hover:brightness-105"
          >
            Back to the House
          </Link>
          <Link
            href="/the-hearth"
            className="inline-flex items-center justify-center border border-house-brown/25 px-8 py-4 font-sans text-[12px] uppercase tracking-[0.18em] text-house-brown no-underline transition-colors hover:border-house-brown"
          >
            Read the Hearth
          </Link>
        </div>

        <p className="mt-10 font-sans text-[13px] text-house-brown/50">
          A copy of your enquiry has been logged to your Home Record.
        </p>
      </section>
    </div>
  );
}
