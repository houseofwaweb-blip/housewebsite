import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClaimsHelpDetail, SALES_EMAIL, SUPPORT_PHONE, SUPPORT_PHONE_HREF } from "@/components/insurance/ClaimsHelp";
import { insuranceOg } from "@/lib/insurance/og";

/**
 * §11.7 · /insurance/claims-and-help, the prominent route for people who already
 * hold cover. How to make a claim, who to contact, what to have ready, and the
 * introducer disclosure. The House connects; Provenance handles the claim.
 * Content pending Provenance compliance sign-off.
 */
export const metadata: Metadata = {
  title: "Claims and help",
  description:
    "Already insured through the House? How to make a claim, who to contact, and what to have ready. Claims are handled by Provenance; the House will make sure you reach the right person.",
  ...insuranceOg("claims-and-help", "Claims and help"),
};

export default function ClaimsAndHelp() {
  return (
    <div className="bg-house-cream text-house-brown">
      <section className="px-[5vw] pt-20 pb-6">
        <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-[color:var(--ins-ink)]">
              The House · Insurance
            </p>
            <h1 className="mt-4 font-display text-[clamp(32px,5vw,58px)] leading-[1.04] text-house-black">
              Claims and help.
            </h1>
            <p className="mt-6 max-w-[46ch] font-sans text-[18px] leading-[1.62] text-house-stone">
              If something has happened, or you just need to reach the right person, start here. The House will point you to it, and Provenance handles the claim.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={SUPPORT_PHONE_HREF}
                className="inline-flex w-fit items-center whitespace-nowrap border border-[color:var(--ins-dark)] bg-[var(--ins-accent)] px-7 py-3.5 font-sans text-[12px] tracking-[0.16em] uppercase text-[color:var(--ins-on)] no-underline transition-[filter] hover:brightness-110"
              >
                Call {SUPPORT_PHONE}
              </a>
              <a
                href={`mailto:${SALES_EMAIL}`}
                className="inline-flex w-fit items-center font-sans text-[12px] tracking-[0.16em] uppercase text-[color:var(--ins-ink)] no-underline underline-offset-2 hover:text-house-brown hover:underline"
              >
                Email the House →
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/insurance/hub-hero.webp"
              alt="A cream Georgian townhouse facade in golden evening light, a quiet still life for a page about reaching the House when you need help."
              fill
              sizes="(min-width: 1120px) 540px, 90vw"
              priority
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </div>
      </section>

      <section className="px-[5vw] pb-16">
        <ClaimsHelpDetail />
      </section>

      <section className="border-t border-house-brown/10 px-[5vw] py-12">
        <div className="mx-auto max-w-[760px]">
          <p className="font-sans text-[16.5px] leading-[1.7] text-house-brown/85">
            Not yet insured through the House, and weighing it up? Start with the{" "}
            <Link href="/insurance" className="text-[color:var(--ins-ink)] underline underline-offset-2 hover:text-house-brown">
              insurance hub
            </Link>{" "}
            or{" "}
            <Link href="/insurance/private-client" className="text-[color:var(--ins-ink)] underline underline-offset-2 hover:text-house-brown">
              speak to a specialist
            </Link>
            .
          </p>
          <p className="mt-6 font-sans text-[12px] text-house-stone/70">
            This page describes how to reach us and how claims are handled, and is pending Provenance compliance sign-off.
          </p>
        </div>
      </section>
    </div>
  );
}
