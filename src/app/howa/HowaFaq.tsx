/* Overview FAQ — the four verbatim Q&As from the askhowa handover (§4 FAQ),
   rendered self-contained (native <details>/<summary> + Tailwind) so it needs
   no extra globals classes. Bright House ground, gold accents. */
const FAQS: [string, string][] = [
  [
    "When does HoWA launch?",
    "We're in private beta. Joining the waitlist secures your spot in the first cohort, with invites rolling out in waves through 2026.",
  ],
  [
    "Is my home data private?",
    "Yes. Your record lives in the UK, encrypted at rest, owned by you. We don't sell it, share it, or train models on it.",
  ],
  [
    "How much will it cost?",
    "The free tier costs nothing. Housekeeper membership is £16.99 / month. Steward is by application. Pricing locks at sign-up for waitlist members.",
  ],
  [
    "What if I'm not in the UK?",
    "First release is UK-only so we can hand-pick trusted partners. International rollout is on the roadmap. Join the waitlist to be notified.",
  ],
];

export function HowaFaq() {
  return (
    <section id="faq" className="bg-[#f4f1e9] scroll-mt-20">
      <div className="mx-auto max-w-[860px] px-6 sm:px-10 py-20">
        <p className="smallcaps mb-4 text-center text-[12px] tracking-[0.2em] text-[color:var(--color-gold-deep)]">Questions</p>
        <h2 className="mb-12 text-center font-display text-[clamp(29px,3.2vw,44px)] leading-[1.1] tracking-[-0.005em]">
          Before <span className="font-italic-display text-[#c5a960]">you begin.</span>
        </h2>
        <div className="overflow-hidden rounded-2xl border border-[color:var(--color-gold)]/25 bg-white">
          {FAQS.map(([q, a], i) => (
            <details
              key={q}
              className={"group px-6 sm:px-8 " + (i > 0 ? "border-t border-[color:var(--color-ink)]/10" : "")}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[clamp(17px,1.6vw,20px)] font-display leading-snug text-[color:var(--color-ink)] [&::-webkit-details-marker]:hidden">
                <span>{q}</span>
                <span aria-hidden className="shrink-0 text-[22px] leading-none text-[color:var(--color-gold-deep)] transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-6 pr-8 text-[16px] leading-[1.6] text-[color:var(--color-ink-soft)]">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
