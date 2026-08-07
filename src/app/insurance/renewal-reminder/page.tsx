import type { Metadata } from "next";
import Image from "next/image";
import { env } from "@/lib/env";
import { RenewalReminderForm } from "@/components/insurance/RenewalReminderForm";
import { insuranceOg } from "@/lib/insurance/og";

/**
 * A5 · /insurance/renewal-reminder, the cheapest and most valuable page on the
 * site. Captures the one data point the compounding model depends on, from
 * people not ready to enquire today. Two fields only.
 */
export const metadata: Metadata = {
  title: "Remind me before my renewal",
  description: "Insurance is bought at one moment a year, and most people miss it. Tell us your renewal month and we will send a single email at the right time.",
  ...insuranceOg("renewal-reminder", "Remind me before my renewal"),
};

export default function RenewalReminder() {
  const turnstileSiteKey = env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  return (
    <div className="bg-house-cream text-house-brown">
      <section className="px-[5vw] pt-24 pb-16">
        <div className="mx-auto grid max-w-[1080px] items-start gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-[color:var(--ins-ink)]">Insurance</p>
            <h1 className="mt-4 font-display text-[clamp(30px,4.6vw,52px)] leading-[1.05] text-house-black">
              Remind me before my renewal.
            </h1>
            <p className="mt-6 max-w-[50ch] font-sans text-[18px] leading-[1.62] text-house-stone">
              Insurance is bought at exactly one moment in the year, and most people miss it. The unhurried, better-value window is roughly 15 to 25 days before renewal.
            </p>
            <p className="mt-4 mb-8 max-w-[50ch] font-sans text-[16px] leading-[1.65] text-house-brown/85">
              This is one email, once, at the right moment. Not a newsletter. And we will not pass your address to anyone until you ask us to.
            </p>
            <RenewalReminderForm turnstileSiteKey={turnstileSiteKey} sourcePage="/insurance/renewal-reminder" />
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden lg:mt-2">
            <Image
              src="/insurance/interior-editorial.webp"
              alt="A calm sunlit period drawing room with a marble fireplace, framed pictures and cut flowers, an unhurried moment for the one note that catches your renewal."
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
