import type { Metadata } from "next";

/**
 * F2 · /insurance/terms. Insurance from the House is coming soon. The full
 * regulatory notice (introducer arrangement, the regulated specialist's FCA
 * registration, complaints and FOS route) is published here before cover opens.
 */
export const metadata: Metadata = {
  alternates: { canonical: "/insurance/terms" },
  title: "Insurance, regulatory notice and complaints",
  description: "The regulatory notice for insurance from House of Willow Alexander will be published here when cover opens. Insurance is coming soon.",
  robots: { index: false, follow: false },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-house-brown/10 py-7">
      <h2 className="mb-3 font-sans text-[18px] font-semibold tracking-[0.03em] text-house-brown">{title}</h2>
      <div className="space-y-3 font-sans text-[18.5px] leading-[1.7] text-house-brown/85">{children}</div>
    </div>
  );
}

export default function InsuranceTerms() {
  return (
    <div className="bg-house-cream text-house-brown">
      <section className="px-[5vw] pt-20 pb-16">
        <div className="mx-auto max-w-[720px]">
          <p className="font-sans text-[14px] tracking-[0.3em] uppercase text-[color:var(--ins-ink)]">Insurance</p>
          <h1 className="mt-4 font-display text-[clamp(31px,4.4vw,51px)] leading-[1.06] text-house-black">
            Regulatory notice and complaints.
          </h1>

          <div className="mt-6 border-l-2 border-[color:var(--ins-ink)] bg-house-cream-dark/50 px-4 py-3">
            <p className="m-0 font-sans text-[14px] tracking-[0.06em] uppercase text-[color:var(--ins-ink)]">Coming soon</p>
            <p className="mt-1 mb-0 font-sans text-[16.5px] leading-[1.55] text-house-brown/80">
              Insurance from the House is coming soon. The full regulatory notice below is published in its final form before cover opens.
            </p>
          </div>

          <div className="mt-4">
            <Section title="The introducer arrangement">
              <p>House of Willow Alexander acts solely as an introducer. It does not advise on, arrange, administer, compare or transact insurance. When cover opens, insurance will be arranged and administered by an FCA-regulated insurance specialist.</p>
            </Section>
            <Section title="The regulated specialist's FCA registration">
              <p>When insurance opens, the specialist arranging your cover will be authorised and regulated by the Financial Conduct Authority. Their firm reference number will be published here so you can verify it on the FCA Register at register.fca.org.uk.</p>
            </Section>
            <Section title="Complaints and the Financial Ombudsman Service">
              <p>Once cover is live, complaints about the arranged cover will be handled by the regulated specialist under its FCA permissions. Where a matter cannot be resolved, eligible complainants may refer it to the Financial Ombudsman Service. The full complaints procedure will be published here before launch.</p>
            </Section>
            <Section title="How your information is handled">
              <p>Under the introducer arrangement, the House will pass only the information you provide or ask it to pass, and only when you ask it to. What is passed, when, and on what basis is set out in the House privacy notice and in the wording published here when cover opens.</p>
            </Section>
          </div>
        </div>
      </section>
    </div>
  );
}
