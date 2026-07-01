/* STEP 10 close — FAQ with corrected pricing (Steward £29.99/mo), the "not a
   service-booking app" answer, and the insurance answer. Then the final
   address-first CTA. (Brief v2, slides 24 & 29.) */

const FAQS: Array<[string, string]> = [
  ["How much will it cost?", "Assistant is free. Housekeeper is £16.99/month. Steward is £29.99/month. Managed Stewardship is bespoke and by application, where a home needs human coordination."],
  ["Is HoWA a service-booking app?", "No. HoWA is the intelligence and record layer for the home. Services are optional and only appear when they help you act on something the home record has surfaced."],
  ["Is Steward insurance?", "No. Steward is not insurance and does not provide regulated advice. It helps build evidence, reminders and readiness so the home is better understood, maintained and documented."],
  ["Is my home data private?", "Yes. Your record lives in the UK, encrypted at rest, owned by you. Every source, share and partner access is visible, consented and reversible. We don't sell it or train models on it."],
  ["When does it launch?", "We're in private beta, UK first. Join the waitlist to secure a place in the first cohort, with invites rolling out through 2026."],
];

export function V4Faq() {
  return (
    <section id="faq" className="scroll-mt-20 bg-[#fbfaf5] py-16 lg:py-24 border-t border-[color:var(--color-ink)]/8">
      <div className="mx-auto max-w-[860px] px-6 sm:px-10">
        <p className="smallcaps mb-3 text-center text-[14px] tracking-[0.2em] text-[color:var(--color-gold-deep)]">Questions</p>
        <h2 className="mb-10 text-center font-display text-[clamp(28px,3vw,44px)] leading-[1.1] tracking-[-0.01em]">
          Before <span className="font-italic-display text-[#c5a960]">you begin.</span>
        </h2>
        <div className="overflow-hidden rounded-2xl border border-[color:var(--color-gold)]/20 bg-white">
          {FAQS.map(([q, a], i) => (
            <details key={q} className={"group px-6 py-1 " + (i ? "border-t border-[color:var(--color-ink)]/8" : "")}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[17px] text-[color:var(--color-ink)] [&::-webkit-details-marker]:hidden">
                {q}
                <span aria-hidden className="text-[color:var(--color-gold-deep)] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pb-5 text-[15px] leading-[1.6] text-[color:var(--color-ink-soft)]">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function V4Cta() {
  return (
    <section className="text-[#f3ede0]" style={{ background: "#5f6a49" }}>
      <div className="mx-auto max-w-[860px] px-6 py-16 text-center sm:px-10 lg:py-20">
        <h2 className="font-display text-[clamp(30px,3.4vw,50px)] leading-[1.05]">
          Start with your address.
        </h2>
        <p className="mx-auto mt-4 max-w-[480px] text-[17px] leading-[1.55] text-[#f3ede0]/85">
          In sixty seconds, meet your home and see its first HoWA Score. Free to start, the record begins when you save.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="/howa/coming-soon" className="inline-flex items-center gap-2 rounded-md bg-[#f3ede0] px-8 py-4 text-[17px] text-[#1d2a40] transition-colors hover:bg-white">
            Enter your address <span aria-hidden>→</span>
          </a>
          <a href="#demo" className="inline-flex items-center gap-1.5 text-[16px] text-[#f3ede0]/85 hover:text-[#f3ede0] transition-colors">
            See sample record <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
