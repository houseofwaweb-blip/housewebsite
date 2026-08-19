import Link from "next/link";

/**
 * Why House cover, spec §11.3. Plain-language benefit pillars. Only
 * substantiated claims: a considered introduction, a named specialist, claims
 * handled for you, and profits to charity through Benefact, all of which the
 * House can stand behind. No comparison language, no urgency.
 */
export function WhyHouseCover() {
  const pillars = [
    {
      h: "A considered introduction",
      p: "Not a comparison form. The House introduces you to a specialist who takes the time to understand the home before anything is arranged.",
    },
    {
      h: "One named specialist",
      p: "One person who knows the file, from the first conversation to renewal. Not a call centre, and not a new name each time.",
    },
    {
      h: "Claims handled for you",
      p: "Provenance handles the claim on your behalf, from first notification through to settlement, so you are not left to argue it alone.",
    },
    {
      h: "Profits to good causes",
      p: "Cover is placed with markets in the Benefact group, which is charity-owned and gives its available profits to good causes, so business placed through it can support charitable causes at no extra cost to you.",
    },
  ];
  return (
    <section className="px-[5vw] py-14">
      <div className="mx-auto max-w-[1080px]">
        <p className="font-sans text-[14px] tracking-[0.28em] uppercase text-[color:var(--ins-ink)]">
          Why House cover
        </p>
        <h2 className="mt-3 max-w-[24ch] font-display text-[clamp(27px,3.4vw,43px)] leading-[1.1] text-house-black">
          What an introduction from the House is worth.
        </h2>
        <div className="mt-9 grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.h} className="border-t border-[color:var(--ins-ink)]/25 pt-5">
              <h3 className="font-display text-[24px] leading-tight text-house-black">{p.h}</h3>
              <p className="mt-2.5 font-sans text-[19px] leading-[1.6] text-house-brown/85">{p.p}</p>
            </div>
          ))}
        </div>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/insurance/private-client"
            className="inline-flex w-fit items-center whitespace-nowrap border border-[color:var(--ins-dark)] bg-[var(--ins-accent)] px-7 py-3.5 font-sans text-[14px] tracking-[0.16em] uppercase text-[color:var(--ins-on)] no-underline transition-[filter] hover:brightness-110"
          >
            Speak to a specialist →
          </Link>
          <Link
            href="/insurance/everyday"
            className="inline-flex w-fit items-center font-sans text-[14px] tracking-[0.16em] uppercase text-[color:var(--ins-ink)] no-underline underline-offset-2 hover:text-house-brown hover:underline"
          >
            Or arrange everyday cover →
          </Link>
        </div>
      </div>
    </section>
  );
}
