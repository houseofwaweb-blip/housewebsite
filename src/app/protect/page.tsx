import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { StateBadge } from "@/components/primitives/StateBadge";
import { WaitlistMini } from "@/components/marketing/WaitlistMini";
import { env } from "@/lib/env";
import { NewsletterInline } from "@/components/marketing/NewsletterInline";
import { getNewsletterBlock } from "@/lib/cms/newsletter";

export const metadata = {
  title: "Protect",
  description:
    "Protect Review and House Approved Insurance — calm prevention, evidence, and proper cover for the home.",
};

export default async function ProtectPage() {
  const nlBlock = await getNewsletterBlock("protect");
  return (
    <article className="bg-house-cream text-house-brown">
      {/* Hero */}
      <section className="px-[5vw] pt-[12vh] pb-16">
        <div className="max-w-[880px] mx-auto">
          <Eyebrow>Protect</Eyebrow>
          <h1 className="em-accent font-display font-medium text-[clamp(44px,6vw,80px)] leading-[1.05] tracking-[-0.01em] mt-4">
            Calm <em>prevention</em>. Proper cover.
          </h1>
          <p className="font-sans text-[19px] leading-[1.6] text-house-brown/75 mt-6 max-w-[60ch]">
            Two things the House takes seriously. A Protect Review that
            documents the state of your home and flags what it quietly needs.
            A Provenance insurance introduction for homes and collections the
            high-street products don&apos;t quite fit.
          </p>
        </div>
      </section>

      {/* Protect Review panel */}
      <section id="review" className="px-[5vw] py-14 border-t border-house-brown/10 bg-white">
        <div className="max-w-[1080px] mx-auto grid md:grid-cols-[1fr_1.3fr] gap-12 items-start">
          <div>
            <StateBadge state="coming">Coming soon</StateBadge>
            <h2 className="em-accent font-display font-medium text-[36px] leading-[1.1] mt-5 mb-4">
              Protect <em>Review</em>.
            </h2>
            <p className="font-sans italic text-[17px] leading-[1.6] text-house-stone">
              A one-day in-person review by House-vetted specialists.
            </p>
          </div>
          <div>
            <ul className="flex flex-col gap-3 mb-6">
              {[
                "Condition survey across the building — fabric, systems, access, security.",
                "Evidence pack — photographs, notes, and a prioritised works list.",
                "Insurance-ready documentation, filed straight to your HoWA record.",
                "Introductions to vetted specialists for anything the Review flags.",
              ].map((line) => (
                <li
                  key={line}
                  className="relative pl-5 font-sans text-[16px] leading-[1.55] text-house-brown/90 before:content-['—'] before:absolute before:left-0 before:text-house-gold"
                >
                  {line}
                </li>
              ))}
            </ul>
            <p className="font-sans italic text-[14px] text-house-stone mb-5">
              Opening in late 2026. Register interest and we&apos;ll write when
              it&apos;s ready, with priority for HoWA+ members.
            </p>
            <WaitlistMini
              product="protect_review"
              sourcePage="/protect"
              placeholder="Your email"
              buttonLabel="Register interest"
              successMessage="Thank you. We'll write when the Protect Review opens."
            />
          </div>
        </div>
      </section>

      {/* Insurance panel — now links to dedicated /insurance page */}
      <section id="insurance" className="px-[5vw] py-14 border-t border-house-brown/10">
        <div className="max-w-[1080px] mx-auto grid md:grid-cols-[1fr_1.3fr] gap-12 items-start">
          <div>
            <StateBadge state="interest">Register interest</StateBadge>
            <h2 className="em-accent font-display font-medium text-[36px] leading-[1.1] mt-5 mb-4">
              House Approved <em>Insurance</em>.
            </h2>
            <p className="font-sans italic text-[17px] leading-[1.6] text-house-stone">
              Cover that understands period homes, valuable contents, and
              the things a standard policy quietly excludes.
            </p>
          </div>
          <div>
            <p className="font-sans text-[16px] leading-[1.7] text-house-brown/90 mb-4">
              Introduced by the House, underwritten by FCA-regulated specialists
              we&apos;ve vetted to the same standard as every partner who carries
              the House Approved seal. A proper conversation, not a comparison site.
            </p>
            <ul className="flex flex-col gap-3 mb-6">
              {[
                "A named underwriter who understands the home.",
                "Cover for period features, outbuildings, collections, and grounds.",
                "Claims support via the House — we stay with you until it resolves.",
              ].map((line) => (
                <li
                  key={line}
                  className="relative pl-5 font-sans text-[16px] leading-[1.55] text-house-brown/90 before:content-['—'] before:absolute before:left-0 before:text-house-gold"
                >
                  {line}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 flex-wrap mb-4">
              <Link
                href="/insurance"
                className="inline-block font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold px-6 py-3.5 no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
              >
                See full insurance page
              </Link>
            </div>
            <WaitlistMini
              product="insurance"
              sourcePage="/protect#insurance"
              placeholder="Your email"
              buttonLabel="Register interest"
              successMessage="Thank you. A House contact will reach out with next steps."
            />
          </div>
        </div>
      </section>

      {/* FCA notice */}
      <section className="px-[5vw] py-10 bg-house-brown text-house-cream">
        <div className="max-w-[880px] mx-auto">
          <p className="font-sans text-[12px] leading-[1.6] text-house-cream/75">
            House of Willow Alexander acts as an introducer for insurance
            products; we do not advise on, arrange, or conduct regulated
            activity. Introductions are passed to FCA-authorised partners for
            any subsequent discussion, quotation, or contract. See our{" "}
            <Link
              href="/legal/privacy"
              className="text-house-cream underline decoration-house-gold-light underline-offset-4"
            >
              privacy page
            </Link>{" "}
            for how your details are handled.
          </p>
        </div>
      </section>
      {/* Newsletter */}
      <NewsletterInline
        variant={nlBlock?.variant ?? "cream"}
        sourcePage="/protect"
        headline={nlBlock?.headline ?? "Prevention starts with awareness."}
        body={nlBlock?.body ?? "The Hearth publishes weekly on homes, gardens, and the quiet discipline of looking after a place. Seasonal notes that help you stay ahead."}
        {...(nlBlock ?? {})}
      />
    </article>
  );
}
