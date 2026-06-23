import Image from "next/image";
import Link from "next/link";

/* ──────────────────────────────────────────────────────────────────────
   /howa — "How HoWA works" — ported from the askhowa.co.uk source
   (app/v6/V6Sections.tsx → V6HowItWorks). Lead image left, three plain
   steps right. Image path (.png → .webp) + a button through to the full
   /howa/how-it-works page.
   ────────────────────────────────────────────────────────────────────── */

export function V6HowItWorks() {
  const steps = [
    { n: "01", t: "Add your home", b: "Snap a room, scan a document, or forward an email. HoWA builds your home's record." },
    { n: "02", t: "We keep it in order", b: "Every room, appliance, document and task, organised in one living record." },
    { n: "03", t: "It tells you what's next", b: "Gentle reminders and the next best action, so nothing ever slips." },
  ];
  return (
    <section id="how" className="bg-[#f4f1e9] py-16 lg:py-20 scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10">
        {/* side by side on desktop — image left, the three steps right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* in-use lead image — the HoWA dashboard on the phone, beside the home */}
          <div className="relative w-full rounded-lg overflow-hidden shadow-[0_34px_80px_-36px_rgba(40,30,10,0.5)]">
            <div className="relative w-full aspect-[1448/1086]">
              <Image
                src="/home-v4/v6-how-it-works-lead-v2.webp"
                alt="A person holding a phone showing the HoWA home record beside a cutaway dollhouse on a table."
                fill
                sizes="(max-width:1024px) 92vw, 600px"
                className="object-cover"
              />
            </div>
          </div>

          {/* heading + the three plain, obvious steps */}
          <div>
            <p className="smallcaps text-[12px] tracking-[0.18em] text-[color:var(--color-gold-deep)] mb-3">How HoWA works</p>
            <h2 className="font-display text-[clamp(27px,2.6vw,40px)] leading-[1.05] tracking-[-0.01em]">
              Three simple steps.
              <br />
              <span className="font-italic-display text-[#c5a960]">Then it looks after the rest.</span>
            </h2>

            <ol className="mt-8">
              {steps.map((step, i) => (
                <li key={step.n} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <span className="font-display text-[29px] leading-none text-[#c5a960] tabular-nums">{step.n}</span>
                    {i < steps.length - 1 && <span aria-hidden className="mt-2 w-px flex-1 bg-[color:var(--color-gold)]/30" />}
                  </div>
                  <div className={i < steps.length - 1 ? "pb-7" : ""}>
                    <p className="font-display text-[21px] leading-[1.15] mb-1.5">{step.t}</p>
                    <p className="text-[16px] leading-[1.55] text-[color:var(--color-ink-soft)] max-w-[360px]">{step.b}</p>
                  </div>
                </li>
              ))}
            </ol>

            <Link
              href="/howa/how-it-works"
              className="mt-9 inline-flex items-center gap-2 rounded-md border border-[color:var(--color-gold)]/45 px-6 py-3 text-[16px] text-[color:var(--color-ink)] hover:border-[color:var(--color-gold-deep)] hover:bg-[color:var(--color-gold)]/8 transition-colors"
            >
              See how it works <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
