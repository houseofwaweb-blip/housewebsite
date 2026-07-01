import { V6DemoPhone } from "@/components/howa/V6DemoPhone";

/* STEP 03 — reframe the demo around the home record, not "book a service".
   The interactive phone (V6DemoPhone) is reused; its own heading is hidden via
   the .skin-v4 scoped CSS. Copy + a "what you can do" list sit beside the phone
   so the section isn't a tall column of empty space. (Brief v2, slides 8 & 27.) */
export function V4Demo() {
  const can = [
    { t: "Ask HoWA", b: "Anything about the home, garden or a document." },
    { t: "Scan a problem", b: "Point and get what it is, how urgent, what's next." },
    { t: "Add a document", b: "Watch the HoWA Score sharpen as the record fills." },
    { t: "Create a plan", b: "Turn what's found into the next right action." },
  ];
  return (
    <section className="bg-[#fbfaf5] py-14 lg:py-16 border-t border-[color:var(--color-ink)]/8">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          {/* copy + what you can do, beside the phone */}
          <div className="min-w-0">
            <p className="smallcaps mb-3 text-[15px] tracking-[0.2em] text-[color:var(--color-gold-deep)]">Step inside</p>
            <h2 className="font-display text-[clamp(27px,2.8vw,42px)] leading-[1.08] tracking-[-0.01em]">
              Try the first <span className="font-italic-display text-[#c5a960]">home record.</span>
            </h2>
            <p className="mt-4 max-w-[460px] text-[16.5px] leading-[1.55] text-[color:var(--color-ink-soft)]">
              Open a sample home, or pop in your postcode and tap <span className="text-[color:var(--color-ink)]">Save this record</span> to begin yours. Preview mode saves nothing until you do.
            </p>

            <ul className="mt-7 grid max-w-[480px] grid-cols-1 gap-3 sm:grid-cols-2">
              {can.map((c) => (
                <li key={c.t} className="rounded-xl border border-[color:var(--color-gold)]/20 bg-white p-4">
                  <p className="font-display text-[16px] leading-tight text-[color:var(--color-ink)]">{c.t}</p>
                  <p className="mt-1 text-[15px] leading-snug text-[color:var(--color-ink-soft)]/80">{c.b}</p>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <a href="/howa/coming-soon?tier=assistant" className="inline-flex items-center gap-2 rounded-md bg-[color:var(--color-howa-green)] px-6 py-3 text-[16px] text-white transition-colors hover:bg-[color:var(--color-howa-green-deep)]">
                Start with my address <span aria-hidden>→</span>
              </a>
              <a href="#tiers" className="inline-flex items-center gap-1.5 text-[16px] text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)] transition-colors">
                See the tiers <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          {/* the interactive demo; internal heading hidden + padding trimmed by .skin-v4 CSS */}
          <div className="min-w-0 justify-self-center lg:justify-self-end">
            <V6DemoPhone saveCta />
          </div>
        </div>
      </div>
    </section>
  );
}
