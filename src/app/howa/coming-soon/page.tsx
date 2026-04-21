import { Eyebrow } from "@/components/primitives/Eyebrow";
import { StateBadge } from "@/components/primitives/StateBadge";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { env } from "@/lib/env";

export const metadata = {
  title: "HoWA — coming soon",
  robots: { index: false, follow: true },
};

export default function HowaComingSoonPage() {
  return (
    <section className="bg-howa-navy text-house-cream px-[5vw] py-[14vh] min-h-[70vh]">
      <div className="max-w-[720px] mx-auto">
        <Eyebrow colour="cream">HoWA</Eyebrow>
        <h1 className="font-sans text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.1] tracking-[-0.01em] mt-4">
          Arriving soon.
        </h1>
        <p className="font-sans text-[17px] leading-[1.65] text-house-cream/80 mt-6 max-w-[56ch]">
          HoWA Product is where stewardship becomes operational: home records, the Companion
          diagnostic, bookings, and a single place for the House to reach you. We'll write
          the moment it opens.
        </p>
        <div className="mt-6">
          <StateBadge state="coming">Coming soon</StateBadge>
        </div>

        <div className="mt-12 border-t border-house-cream/15 pt-10">
          <WaitlistForm
            product="howa_app"
            turnstileSiteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
            sourcePage="/howa/coming-soon"
            dark
            submitLabel="Tell me when it opens"
            successMessage="Thank you. You'll be among the first to hear."
          />
        </div>
      </div>
    </section>
  );
}
