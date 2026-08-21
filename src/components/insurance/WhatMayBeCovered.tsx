import Link from "next/link";

/**
 * What may be covered, spec §11.4. Scannable, plain-language examples with a
 * clear route to fuller cover detail and to the policy wording Provenance
 * provides. Deliberately framed as examples, never a promise: the policy wording
 * is what decides any claim, and that lives with Provenance.
 */
export function WhatMayBeCovered() {
  const examples = [
    {
      h: "A burst pipe",
      p: "Sudden escape of water that soaks floors and ceilings, and putting the damage right.",
    },
    {
      h: "Storm and flood",
      p: "Damage to the building and its contents from named storms and rising water.",
    },
    {
      h: "Fire and smoke",
      p: "From the fabric of the house to the things inside it, and somewhere to stay while it is repaired.",
    },
    {
      h: "Theft and attempted break-in",
      p: "Loss of contents, and the cost of making the home secure again afterwards.",
    },
    {
      h: "Accidental damage",
      p: "Accidental damage to the home or belongings, where that cover is included in the policy.",
    },
    {
      h: "Valuables and belongings away from home",
      p: "Jewellery, art and personal belongings at home and, where the policy includes it, away from home.",
    },
  ];
  return (
    <section className="px-[5vw] py-14" style={{ background: "var(--color-house-cream-dark)" }}>
      <div className="mx-auto max-w-[1080px]">
        <p className="font-sans text-[14px] tracking-[0.28em] uppercase text-[color:var(--ins-ink)]">
          What may be covered
        </p>
        <h2 className="mt-3 max-w-[26ch] font-display text-[clamp(27px,3.4vw,43px)] leading-[1.1] text-house-black">
          Examples of what a policy may protect against.
        </h2>
        <p className="mt-4 max-w-[62ch] font-sans text-[18.5px] leading-[1.65] text-house-brown/85">
          These examples show the kinds of insured events a policy may cover. The exact cover, limits and exclusions depend on the policy wording provided before you decide.
        </p>
        <div className="mt-8 grid gap-x-10 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
          {examples.map((e) => (
            <div key={e.h} className="border-t border-house-brown/20 pt-4">
              <h3 className="font-sans text-[18px] font-semibold tracking-[0.01em] text-house-black">{e.h}</h3>
              <p className="mt-2 font-sans text-[17.5px] leading-[1.55] text-house-brown/80">{e.p}</p>
            </div>
          ))}
        </div>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/insurance/everyday"
            className="inline-flex w-fit items-center whitespace-nowrap border border-[color:var(--ins-dark)] bg-[var(--ins-accent)] px-7 py-3.5 font-sans text-[14px] tracking-[0.16em] uppercase text-[color:var(--ins-on)] no-underline transition-[filter] hover:brightness-110"
          >
            See what each cover includes →
          </Link>
          <Link
            href="/insurance/how-this-works"
            className="inline-flex w-fit items-center font-sans text-[14px] tracking-[0.16em] uppercase text-[color:var(--ins-ink)] no-underline underline-offset-2 hover:text-house-brown hover:underline"
          >
            Where to find the full policy wording →
          </Link>
        </div>
        <p className="mt-5 font-sans text-[15.5px] leading-[1.6] text-house-brown/70">
          The full policy wording, key facts and exclusions are provided by Provenance before you commit to anything.
        </p>
      </div>
    </section>
  );
}
