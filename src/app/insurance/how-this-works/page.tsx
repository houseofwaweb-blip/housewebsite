import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PROVENANCE } from "@/lib/insurance/config";
import { ProvenanceLockup } from "@/components/insurance/ProvenanceLockup";
import { insuranceOg } from "@/lib/insurance/og";

/**
 * F1 · /insurance/how-this-works, a compliance requirement turned into a brand
 * asset. Almost nobody explains their commission openly; doing it plainly is the
 * House's voice, pre-empts the obvious question, and is what the fair-value file
 * points at. Content pending Provenance compliance sign-off.
 */
export const metadata: Metadata = {
  title: "How this works, and how we are paid",
  description: "How House of Willow Alexander introduces insurance through Provenance, how the service is provided, how the House is paid and where to go if something goes wrong.",
  ...insuranceOg("how-this-works", "How this works, and how we are paid"),
};

function Block({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-house-brown/10 py-8">
      <p className="mb-3 font-sans text-[14px] tracking-[0.24em] uppercase text-[color:var(--ins-ink)]">{eyebrow}</p>
      <div className="space-y-4 font-sans text-[20px] leading-[1.7] text-house-brown/85">{children}</div>
    </div>
  );
}

export default function HowThisWorks() {
  return (
    <div className="bg-house-cream text-house-brown">
      <section className="px-[5vw] pt-20 pb-6">
        <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-sans text-[14px] tracking-[0.3em] uppercase text-[color:var(--ins-ink)]">The House · Insurance</p>
            <h1 className="mt-4 font-display text-[clamp(35px,5vw,61px)] leading-[1.04] text-house-black">
              How this works, and how we are paid.
            </h1>
            <p className="mt-6 max-w-[46ch] font-sans text-[21px] leading-[1.62] text-house-stone">
              The House is an introducer. Provenance provides the regulated insurance services. This page explains the relationship and how the House is paid.
            </p>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/insurance/provenance-can-place.webp"
              alt="A ledger lettered Provenance Insurance beside architectural drawings, a brass globe sconce and a pink peony, a quiet still life for a page about how the arrangement works."
              fill
              sizes="(min-width: 1120px) 540px, 90vw"
              priority
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </div>
      </section>

      <section className="px-[5vw] pb-16">
        <div className="mx-auto max-w-[720px]">
          <Block eyebrow="What the House does">
            <p>The House <strong>introduces</strong> you to a specialist. That is all it does. It does not advise on, arrange, administer, compare or transact insurance. Those are regulated activities, and they belong to Provenance.</p>
          </Block>
          <Block eyebrow="Who arranges the cover">
            <p>{PROVENANCE.legalName} is authorised and regulated by the Financial Conduct Authority, firm reference number {PROVENANCE.frn}, and is part of {PROVENANCE.group}. Provenance advises, arranges, administers and, when the time comes, handles claims on your behalf.</p>
            <ProvenanceLockup className="mt-5" />
          </Block>
          <Block eyebrow="Why Benefact matters">
            <p>Provenance is part of the {PROVENANCE.backer} group, a charity-owned group. {PROVENANCE.backer} gives its available profits to good causes, so business placed within the group can contribute to that wider charitable purpose.</p>
          </Block>
          <Block eyebrow="How the House is paid">
            <p>As the introducer, the House receives a share of Provenance's commission when a policy starts and at renewal. We would rather tell you that plainly than leave it unsaid.</p>
          </Block>
          <Block eyebrow="What the House provides">
            <p>The House provides the introduction and keeps the insurance route connected to the wider care of the home. Provenance provides the regulated insurance service.</p>
          </Block>
          <Block eyebrow="If something goes wrong">
            <p>Complaints about the arranged cover are handled by Provenance under its FCA permissions, and eligible complainants can refer a matter to the Financial Ombudsman Service. The full regulatory notice and complaints route are set out on the{" "}
              <Link href="/insurance/terms" className="text-[color:var(--ins-ink)] underline underline-offset-2 hover:text-house-brown">regulatory notice</Link> page.</p>
          </Block>
          <p className="mt-8 font-sans text-[14px] text-house-stone/70">This page describes the regulatory relationship and is pending Provenance compliance sign-off.</p>
        </div>
      </section>
    </div>
  );
}
