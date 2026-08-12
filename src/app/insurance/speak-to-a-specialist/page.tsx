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

const COVER: Record<string, { label: string; type: string }> = {
  home: { label: "home insurance", type: "home" },
  pet: { label: "pet insurance", type: "pet" },
  boiler: { label: "boiler cover", type: "boiler-cover" },
  appliance: { label: "appliance cover", type: "appliance-cover" },
};

export default async function SpeakToASpecialist({
  searchParams,
}: {
  searchParams: Promise<{ postcode?: string; cover?: string }>;
}) {
  const turnstileSiteKey = env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  const sp = await searchParams;
  const postcode = typeof sp.postcode === "string" ? sp.postcode.trim().slice(0, 12) : undefined;
  const chosen = typeof sp.cover === "string" ? COVER[sp.cover] : undefined;
  return (
    <div className="bg-house-cream text-house-brown">
      <section className="px-[5vw] pt-24 pb-16">
        <div className="mx-auto grid max-w-[1080px] items-start gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-[color:var(--ins-ink)]">Insurance</p>
            <h1 className="mt-4 font-display text-[clamp(30px,4.6vw,52px)] leading-[1.05] text-house-black">
              Speak to a specialist.
            </h1>
            <p className="mt-5 mb-4 max-w-[52ch] font-sans text-[17px] leading-[1.6] text-house-stone">
              Leave your details and a specialist will call. We ask only what we need to make the introduction, nothing about sums insured, contents or your current insurer.
            </p>
            {chosen || postcode ? (
              <p className="mb-8 inline-block border-l-2 border-[color:var(--ins-ink)] bg-house-cream-dark/50 px-4 py-2 font-sans text-[14px] text-house-brown">
                Starting {chosen ? `a ${chosen.label} enquiry` : "your enquiry"}{postcode ? ` for ${postcode.toUpperCase()}` : ""}.
              </p>
            ) : null}
            <InsuranceEnquiryForm enquiryType={chosen?.type ?? "general"} turnstileSiteKey={turnstileSiteKey} sourcePage="/insurance/speak-to-a-specialist" submitLabel="Send" initialPostcode={postcode} />
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
