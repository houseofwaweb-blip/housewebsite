import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PROVENANCE } from "@/lib/insurance/config";
import { insuranceOg } from "@/lib/insurance/og";

/**
 * F1 · /insurance/how-this-works, a compliance requirement turned into a brand
 * asset. Almost nobody explains their commission openly; doing it plainly is the
 * House's voice, pre-empts the obvious question, and is what the fair-value file
 * points at. Content pending Provenance compliance sign-off.
 */
export const metadata: Metadata = {
  title: "How this works, and how we are paid",
  description: "Plainly: the House introduces you to Provenance, who arranges the cover. Who Provenance and Benefact are, how the House is paid, and how to complain.",
  ...insuranceOg("how-this-works", "How this works, and how we are paid"),
};

function Block({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-house-brown/10 py-8">
      <p className="mb-3 font-sans text-[12px] tracking-[0.24em] uppercase text-[color:var(--ins-ink)]">{eyebrow}</p>
      <div className="space-y-4 font-sans text-[17px] leading-[1.7] text-house-brown/85">{children}</div>
    </div>
  );
}

export default function HowThisWorks() {
  return (
    <div className="bg-house-cream text-house-brown">
      <section className="px-[5vw] pt-20 pb-6">
        <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-[color:var(--ins-ink)]">The House · Insurance</p>
            <h1 className="mt-4 font-display text-[clamp(32px,5vw,58px)] leading-[1.04] text-house-black">
              How this works, and how we are paid.
            </h1>
            <p className="mt-6 max-w-[46ch] font-sans text-[18px] leading-[1.62] text-house-stone">
              Almost nobody in this market explains this openly. We would rather you did not have to ask.
            </p>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/insurance/house-record.webp"
              alt="A worn House Record ledger beside a brass globe sconce, a fountain pen and a pink peony on a sage surface, the record the House keeps in return for its share."
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
          </Block>
          <Block eyebrow="Why Benefact matters">
            <p>Provenance places business with markets in the {PROVENANCE.backer} group, a charity-owned insurer. Benefact gave £28.3m to charitable causes in 2025 and more than £275m since 2014, is the third-largest corporate donor in the UK, and is AM Best A rated. Benefact gives all its available profits to good causes, so every policy placed supports UK charities, at no extra cost to you. This is verifiable, and it is unusual, and it is the part we are happiest to put in writing.</p>
          </Block>
          <Block eyebrow="How the House is paid">
            <p>The House receives a share of the commission Provenance earns, at inception and on renewal. We would rather say the shape of it plainly than pretend the introduction is free: an introduction that pays nobody tends not to last, and a lasting relationship is the point.</p>
          </Block>
          <Block eyebrow="What the House contributes in return">
            <p>The House brings the part a comparison form cannot: the record of what your home is made of, the inventory of what is in it, the rebuild assessments, and the renewal timing. That is what turns care recorded into risk understood, and it is what earns the share.</p>
          </Block>
          <Block eyebrow="If something goes wrong">
            <p>Complaints about the arranged cover are handled by Provenance under its FCA permissions, and eligible complainants can refer a matter to the Financial Ombudsman Service. The full regulatory notice and complaints route are set out on the{" "}
              <Link href="/insurance/terms" className="text-[color:var(--ins-ink)] underline underline-offset-2 hover:text-house-brown">regulatory notice</Link> page.</p>
          </Block>
          <p className="mt-8 font-sans text-[12px] text-house-stone/70">This page describes the regulatory relationship and is pending Provenance compliance sign-off.</p>
        </div>
      </section>
    </div>
  );
}
