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
  description: "Tell us your renewal month and we will send one reminder before it is due.",
  ...insuranceOg("renewal-reminder", "Remind me before my renewal"),
};

export default function RenewalReminder() {
  const turnstileSiteKey = env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  return (
    <div className="bg-house-cream text-house-brown">
      <section className="px-[5vw] pt-24 pb-16">
        <div className="mx-auto grid max-w-[1080px] items-start gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <p className="font-sans text-[14px] tracking-[0.3em] uppercase text-[color:var(--ins-ink)]">Insurance</p>
            <h1 className="mt-4 font-display text-[clamp(33px,4.6vw,55px)] leading-[1.05] text-house-black">
              Remind me before my renewal.
            </h1>
            <p className="mt-6 max-w-[50ch] font-sans text-[21px] leading-[1.62] text-house-stone">
              Tell us when your insurance renews and we will send one reminder before it is due, giving you time to review the cover rather than leaving it until the last few days.
            </p>
            <p className="mt-4 mb-8 max-w-[50ch] font-sans text-[19px] leading-[1.65] text-house-brown/85">
              One reminder, not a newsletter. Your details are not passed on as an insurance enquiry unless you ask us to make an introduction.
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
