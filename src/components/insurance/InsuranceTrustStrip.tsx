import { PROVENANCE } from "@/lib/insurance/config";

/**
 * The deep-green trust band used across insurance pages (specialist template and
 * the hubs), so every insurance page shares the same reassurance rhythm right
 * under the hero.
 */
export function InsuranceTrustStrip() {
  const trust = [
    { h: "FCA-regulated", p: `Arranged by ${PROVENANCE.legalName.split(" ").slice(0, 2).join(" ")} (FRN ${PROVENANCE.frn})` },
    { h: "Claims handled for you", p: "From first notification to settlement" },
    { h: "A named specialist", p: "One point of contact who knows the file" },
    { h: "Part of Benefact", p: `Provenance places business with markets in the ${PROVENANCE.backer} group` },
  ];
  return (
    <section className="px-[5vw] py-7 text-house-cream" style={{ background: "var(--house-green)" }}>
      <div className="mx-auto grid max-w-[1120px] gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
        {trust.map((t) => (
          <div key={t.h} className="flex flex-col">
            <span className="font-sans text-[16.5px] font-semibold tracking-[0.01em] text-house-cream">{t.h}</span>
            <span className="mt-0.5 font-sans text-[14.5px] leading-[1.45] text-house-cream/70">{t.p}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
