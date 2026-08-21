import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { env } from "@/lib/env";
import { RenewalReminderForm } from "@/components/insurance/RenewalReminderForm";
import { ThankYouConversion } from "@/components/insurance/ThankYouConversion";

/**
 * A4 · /insurance/thank-you, confirmation. The conversion event fires here, so
 * it must exist before any media spend. Sets the expectation that the call
 * comes from Provenance (the commonest referral drop-off). No upsell.
 */
export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

export default function InsuranceThankYou() {
  const turnstileSiteKey = env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  return (
    <div className="bg-house-cream text-house-brown">
      <ThankYouConversion />
      <section className="px-[5vw] pt-24 pb-14">
        <div className="mx-auto grid max-w-[1080px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-sans text-[14px] tracking-[0.3em] uppercase text-[color:var(--ins-ink)]">Received</p>
            <h1 className="mt-4 font-display text-[clamp(37px,5.5vw,67px)] leading-[1.03] text-house-black">
              Thank you. <em className="italic">Your enquiry is in.</em>
            </h1>
            <p className="mt-6 max-w-[46ch] font-sans text-[21px] leading-[1.65] text-house-stone">
              A <strong>Provenance</strong> specialist will contact you about the enquiry. The call will come from Provenance rather than the House.
            </p>
            <p className="mt-4 max-w-[46ch] font-sans text-[20px] leading-[1.65] text-house-brown/85">
              You do not need to send anything else unless the specialist asks for it.
            </p>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/insurance/townhouse-golden.webp"
              alt="A white townhouse doorway framed by wisteria and white climbing roses in warm evening light, a home quietly covered and remembered."
              fill
              sizes="(min-width: 1080px) 500px, 90vw"
              priority
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </div>

        <div className="mx-auto max-w-[680px]">
          <div className="mt-12 border-t border-house-brown/12 pt-8">
            <p className="font-sans text-[14px] tracking-[0.24em] uppercase text-[color:var(--ins-ink)]">For next time</p>
            <h2 className="mt-2 font-display text-[clamp(23px,2.4vw,31px)] leading-[1.2] text-house-black">Set a reminder for your renewal.</h2>
            <p className="mt-3 mb-6 max-w-[52ch] font-sans text-[18.5px] leading-[1.6] text-house-stone">
              If we do not already have your renewal month, you can add it here and receive one reminder before next year’s renewal.
            </p>
            <RenewalReminderForm turnstileSiteKey={turnstileSiteKey} sourcePage="/insurance/thank-you" />
          </div>

          <p className="mt-10 font-sans text-[18px] text-house-stone">
            <Link href="/the-hearth" className="text-[color:var(--ins-ink)] underline underline-offset-2 hover:text-house-brown">Read The Hearth</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
