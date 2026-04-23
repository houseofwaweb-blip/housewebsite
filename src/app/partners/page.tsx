import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { StateBadge } from "@/components/primitives/StateBadge";
import { getAllPartners } from "@/lib/cms/partners";

export const metadata = {
  title: "Partners",
  description:
    "The four launch partner studios of House of Willow Alexander. Each profile is reviewed annually.",
};

export default async function PartnersLanding() {
  const partners = await getAllPartners();

  return (
    <article className="bg-house-cream text-house-brown">
      <section className="px-[5vw] pt-[12vh] pb-10">
        <div className="max-w-[880px] mx-auto">
          <Eyebrow>Partners</Eyebrow>
          <h1 className="em-accent font-display font-medium text-[clamp(44px,6vw,80px)] leading-[1.05] tracking-[-0.01em] mt-4">
            Studios the House <em>keeps company with</em>.
          </h1>
          <p className="font-sans text-[19px] leading-[1.6] text-house-brown/75 mt-6 max-w-[60ch]">
            Every partner below holds a House Approved seal. That means we know
            them, we&apos;ve seen their work in person, and we&apos;d point a
            family member at them. The list will grow slowly, on purpose.
          </p>
        </div>
      </section>

      <section className="px-[5vw] pb-16">
        <div className="max-w-[1080px] mx-auto grid md:grid-cols-2 gap-6">
          {partners.map((p) => {
            return (
              <Link
                key={p.slug}
                href={`/partners/${p.slug}`}
                className="group relative block bg-white border border-house-brown/10 p-8 no-underline transition-all duration-[var(--t-slow)] ease-out hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(48,35,28,0.1)] hover:border-house-gold"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-[var(--house-gold-dark)]">
                    {p.typeLabel}
                  </div>
                  {p.houseApprovedSeal ? (
                    <StateBadge state="live">House Approved</StateBadge>
                  ) : null}
                </div>
                <h2 className="font-display font-medium text-[28px] leading-[1.2] text-house-brown mb-3 pb-3 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:bg-house-gold after:w-[28px] after:transition-[width] after:duration-[var(--t-slow)] after:ease-out group-hover:after:w-[72px]">
                  {p.name}
                </h2>
                <p className="font-sans italic text-[16px] leading-[1.6] text-house-brown/70">
                  {p.shortBio}
                </p>
                <div className="mt-4 font-sans text-[11px] tracking-[0.16em] uppercase text-[var(--house-gold-dark)]">
                  Read profile →
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="px-[5vw] py-10 bg-house-brown text-house-cream text-center">
        <p className="font-sans italic text-[18px] leading-[1.5] max-w-[56ch] mx-auto">
          Interested in becoming a partner?{" "}
          <Link
            href="/contact"
            className="underline decoration-house-gold-light underline-offset-4"
          >
            Write to the House
          </Link>
          . We review partner applications quarterly.
        </p>
      </section>
    </article>
  );
}
