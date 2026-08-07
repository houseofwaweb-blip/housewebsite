import type { Metadata } from "next";
import Image from "next/image";
import { env } from "@/lib/env";
import { InsuranceEnquiryForm } from "@/components/insurance/InsuranceEnquiryForm";
import { insuranceOg } from "@/lib/insurance/og";

/**
 * A3 · /insurance/speak-to-a-specialist, one shared enquiry destination for
 * every email, Instagram link and QR code, so the CRM has a single, cleanly
 * attributed endpoint. Minimal chrome. The source parameter is captured
 * silently by the form's first-touch tracking.
 */
export const metadata: Metadata = {
  title: "Speak to a specialist",
  description: "Leave your details and an insurance specialist will call. Introduced by House of Willow Alexander, arranged by Provenance.",
  ...insuranceOg("speak-to-a-specialist", "Speak to a specialist"),
};

export default function SpeakToASpecialist() {
  const turnstileSiteKey = env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  return (
    <div className="bg-house-cream text-house-brown">
      <section className="px-[5vw] pt-24 pb-16">
        <div className="mx-auto grid max-w-[1080px] items-start gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-[color:var(--ins-ink)]">Insurance</p>
            <h1 className="mt-4 font-display text-[clamp(30px,4.6vw,52px)] leading-[1.05] text-house-black">
              Speak to a specialist.
            </h1>
            <p className="mt-5 mb-8 max-w-[52ch] font-sans text-[17px] leading-[1.6] text-house-stone">
              Leave your details and a specialist will call. We ask only what we need to make the introduction, nothing about sums insured, contents or your current insurer.
            </p>
            <InsuranceEnquiryForm enquiryType="general" turnstileSiteKey={turnstileSiteKey} sourcePage="/insurance/speak-to-a-specialist" submitLabel="Send" />
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden lg:mt-2">
            <Image
              src="/insurance/period-home.webp"
              alt="A white stucco period townhouse with a columned portico and black panelled door, dressed in cascading wisteria and white roses, a home worth a conversation."
              fill
              sizes="(min-width: 1080px) 460px, 90vw"
              priority
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
