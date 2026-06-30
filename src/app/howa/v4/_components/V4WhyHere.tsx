/**
 * V4WhyHere — the bridge section for the HoWA page on the House site (change
 * brief slide 11 + 12): keep the origin/trust messages, add the practical answer
 * for why House work is booked here, and carry the independence bridge line.
 * Deliberately not a full investor-grade explainer.
 */
const KEEP = [
  "Created from the House.",
  "Founding service partner.",
  "House work booked through HoWA.",
  "HoWA stands on its own, with or without House services.",
];

const PRACTICAL = [
  "HoWA handles bookings, confirmations and changes.",
  "Teams use HoWA on the road.",
  "Notes, photos, costs and reminders write back.",
  "The Home Record becomes more useful after every job.",
];

export function V4WhyHere() {
  return (
    <section className="scroll-mt-20 bg-[#fbfaf5] py-16 lg:py-24 border-t border-[color:var(--color-ink)]/8">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
        <div className="max-w-[760px]">
          <p className="smallcaps mb-3 text-[12px] tracking-[0.2em] text-[color:var(--color-gold-deep)]">
            Why House work is booked here
          </p>
          <h2 className="font-display text-[clamp(28px,3.2vw,46px)] leading-[1.08] tracking-[-0.01em]">
            Created from the House.{" "}
            <span className="font-italic-display text-[#c5a960]">
              Used here to book, route and remember every House service.
            </span>
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            { title: "Created from the House", items: KEEP },
            { title: "The practical answer", items: PRACTICAL },
          ].map((col) => (
            <div
              key={col.title}
              className="rounded-xl border border-[color:var(--color-gold)]/20 bg-white p-6 sm:p-8"
            >
              <p className="smallcaps mb-4 text-[11px] tracking-[0.18em] text-[color:var(--color-gold-deep)]">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.items.map((it) => (
                  <li
                    key={it}
                    className="flex gap-3 text-[15.5px] leading-[1.5] text-[color:var(--color-ink-soft)]"
                  >
                    <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-gold)]" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-9 max-w-[820px] font-italic-display text-[clamp(18px,1.9vw,24px)] leading-[1.35] text-[color:var(--color-gold-deep)]">
          HoWA began as the House booking and home-record platform. It now also
          lives independently as the Home Intelligence OS for any address.
        </p>
      </div>
    </section>
  );
}
