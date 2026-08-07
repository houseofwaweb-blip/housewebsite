import type { Metadata } from "next";
import { PROVENANCE, INTRODUCER_LEGAL_NAME } from "@/lib/insurance/config";

/**
 * F2 · /insurance/terms, the full regulatory wording in one place, so every
 * other page carries a short disclosure and links here. The definitive wording
 * is ISSUED BY PROVENANCE COMPLIANCE VERBATIM. Everything below is a structural
 * placeholder pending that copy, never improvised per page.
 */
export const metadata: Metadata = {
  title: "Insurance, regulatory notice and complaints",
  description: "The regulatory notice for insurance introduced by House of Willow Alexander and arranged by Provenance, with the complaints route and FOS eligibility.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-house-brown/10 py-7">
      <h2 className="mb-3 font-sans text-[14px] font-semibold tracking-[0.03em] text-house-brown">{title}</h2>
      <div className="space-y-3 font-sans text-[15px] leading-[1.7] text-house-brown/85">{children}</div>
    </div>
  );
}

export default function InsuranceTerms() {
  return (
    <div className="bg-house-cream text-house-brown">
      <section className="px-[5vw] pt-20 pb-16">
        <div className="mx-auto max-w-[720px]">
          <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-[color:var(--ins-ink)]">Insurance</p>
          <h1 className="mt-4 font-display text-[clamp(28px,4.4vw,48px)] leading-[1.06] text-house-black">
            Regulatory notice and complaints.
          </h1>

          <div className="mt-6 border-l-2 border-[color:var(--ins-ink)] bg-house-cream-dark/50 px-4 py-3">
            <p className="m-0 font-sans text-[12px] tracking-[0.06em] uppercase text-[color:var(--ins-ink)]">Pending Provenance compliance</p>
            <p className="mt-1 mb-0 font-sans text-[13.5px] leading-[1.55] text-house-brown/80">
              The wording below is indicative. The published version is issued by Provenance compliance verbatim before launch.
            </p>
          </div>

          <div className="mt-4">
            <Section title="The introducer arrangement">
              <p>{INTRODUCER_LEGAL_NAME} acts solely as an introducer. It does not advise on, arrange, administer, compare or transact insurance. Insurance is arranged and administered by {PROVENANCE.legalName}.</p>
            </Section>
            <Section title="Provenance's FCA registration">
              <p>{PROVENANCE.legalName} is authorised and regulated by the Financial Conduct Authority, firm reference number {PROVENANCE.frn}. You can verify this on the FCA Register at register.fca.org.uk.</p>
            </Section>
            <Section title="Complaints and the Financial Ombudsman Service">
              <p>Complaints about the arranged cover are handled by Provenance under its FCA permissions. Where a matter cannot be resolved, eligible complainants may refer it to the Financial Ombudsman Service. The full complaints procedure is issued by Provenance compliance.</p>
            </Section>
            <Section title="How your information is handled">
              <p>Under the introducer arrangement, the House passes only the information you provide or ask it to pass, and only when you ask it to. What is passed, when, and on what basis is set out here in the wording Provenance compliance issues, and in the House privacy notice.</p>
            </Section>
          </div>
        </div>
      </section>
    </div>
  );
}
