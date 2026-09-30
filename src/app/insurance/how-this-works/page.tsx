import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { insuranceOg } from "@/lib/insurance/og";

/**
 * F1 · /insurance/how-this-works. Insurance from the House is coming soon, so
 * this page sets out the plan in principle (the House introduces; a regulated
 * specialist provides the cover) without naming a partner or making regulated
 * claims. The full regulatory detail is published when cover opens.
 */
export const metadata: Metadata = {
  alternates: { canonical: "/insurance/how-this-works" },
  title: "How insurance from the House will work",
  description: "How insurance from the House is intended to work when it opens: the House introduces, a regulated specialist provides the cover. Coming soon.",
  robots: { index: false, follow: false },
  ...insuranceOg("how-this-works", "How insurance from the House will work"),
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
              How insurance from the House will work.
            </h1>
            <p className="mt-6 max-w-[46ch] font-sans text-[21px] leading-[1.62] text-house-stone">
              Insurance from the House is coming soon. This page explains, in principle, how it is intended to work. The full detail is published when cover opens.
            </p>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/insurance/provenance-can-place.webp"
              alt="A ledger beside architectural drawings, a brass globe sconce and a pink peony, a quiet still life for a page about how insurance from the House will work."
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
          <Block eyebrow="What the House will do">
            <p>The House <strong>introduces</strong>. It does not advise on, arrange, administer, compare or transact insurance. Those are regulated activities, and when insurance opens they will be carried out by an FCA-regulated specialist, not by the House.</p>
          </Block>
          <Block eyebrow="Who will arrange the cover">
            <p>When insurance opens, the cover will be advised, arranged and administered by an insurance specialist authorised and regulated by the Financial Conduct Authority. Their name and registration details will be published here before the service goes live.</p>
          </Block>
          <Block eyebrow="How the House keeps it connected">
            <p>The House provides the introduction and keeps the insurance route connected to the wider care of the home. The regulated insurance service is provided by the specialist.</p>
          </Block>
          <Block eyebrow="If something goes wrong">
            <p>When cover is live, complaints about the arranged cover will be handled by the regulated specialist under its FCA permissions, and eligible complainants will be able to refer a matter to the Financial Ombudsman Service. The full regulatory notice and complaints route will be published on the{" "}
              <Link href="/insurance/terms" className="text-[color:var(--ins-ink)] underline underline-offset-2 hover:text-house-brown">regulatory notice</Link> page.</p>
          </Block>
          <Block eyebrow="Register your interest">
            <p>Insurance from the House is not yet open. You can{" "}
              <Link href="/insurance/private-client" className="text-[color:var(--ins-ink)] underline underline-offset-2 hover:text-house-brown">register your interest</Link>{" "}
              and we will be in touch when cover opens.</p>
          </Block>
          <p className="mt-8 font-sans text-[14px] text-house-stone/70">Insurance from the House is coming soon. The regulatory detail on this page will be completed before the service goes live.</p>
        </div>
      </section>
    </div>
  );
}
