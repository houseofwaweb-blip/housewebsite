import Image from "next/image";

/* STEP 12 — services demoted to ONE compact, optional fulfilment rail. HoWA
   earns its place before anyone visits; booking is not the proof of value.
   "Create a plan" before "Book". (Brief v2, slides 17 & 29.)
   STEP 13 — Managed Stewardship is the only "by application" block, kept
   separate and lower, never in the three-tier grid. (Slides 13 & 28.) */

export function V4Fulfilment() {
  const flow = [
    { t: "HoWA writes the brief", b: "From a scan, a quote or a reminder, it sets out exactly what needs doing." },
    { t: "The House or a partner fulfils", b: "Optional. An approved partner, only when you choose to act." },
    { t: "It writes back to the record", b: "The job, photos, cost and guarantee join the home record." },
  ];
  return (
    <section id="fulfilment" className="scroll-mt-20 bg-[#fbfaf5] py-16 lg:py-20 border-t border-[color:var(--color-ink)]/8">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <p className="smallcaps mb-3 text-[14px] tracking-[0.2em] text-[color:var(--color-gold-deep)]">Optional fulfilment</p>
            <h2 className="font-display text-[clamp(26px,2.8vw,40px)] leading-[1.1] tracking-[-0.01em]">
              Trusted hands, <span className="font-italic-display text-[#c5a960]">always optional.</span>
            </h2>
            <p className="mt-4 text-[16.5px] leading-[1.55] text-[color:var(--color-ink-soft)]">
              HoWA earns its place whether or not anyone visits. When work is needed, HoWA creates the brief; the House or an approved partner can fulfil it; the job, photos, cost and guarantee write back to the record.
            </p>
            <a href="/howa/coming-soon" className="mt-7 inline-flex items-center gap-2 rounded-md border border-[color:var(--color-howa-green)]/40 px-6 py-3 text-[15.5px] text-[color:var(--color-howa-green)] transition-colors hover:bg-[color:var(--color-howa-green)]/[0.06]">
              Create a plan <span aria-hidden>→</span>
            </a>
          </div>
          <div className="relative mx-auto aspect-[784/1168] w-full max-w-[340px] overflow-hidden rounded-2xl ring-1 ring-[color:var(--color-gold)]/25 shadow-[0_30px_70px_-34px_rgba(40,30,10,0.5)] lg:ml-auto">
            <Image src="/home-v4/v6-house-approved.webp" alt="A sage-green styling board with a hand-lettered House Approved canvas, fabric swatches and a line drawing of a Georgian house." fill sizes="(max-width:1024px) 80vw, 340px" className="object-cover" />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {flow.map((s, i) => (
            <div key={s.t} className="rounded-xl border border-[color:var(--color-gold)]/20 bg-white p-5">
              <p className="font-display text-[16px] text-[#c5a960]">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 font-display text-[17px] leading-tight text-[color:var(--color-ink)]">{s.t}</p>
              <p className="mt-2 text-[14px] leading-[1.5] text-[color:var(--color-ink-soft)]/80">{s.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function V4Managed() {
  return (
    <section id="managed" className="scroll-mt-20 bg-[#fbfaf5] pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-[color:var(--color-gold)]/30 bg-white p-8 lg:flex-row lg:items-center lg:p-10">
          <div className="max-w-[640px]">
            <p className="smallcaps mb-2 text-[12px] tracking-[0.18em] text-[color:var(--color-gold-deep)]">Managed Stewardship · bespoke · by application</p>
            <h3 className="font-display text-[clamp(22px,2.2vw,32px)] leading-[1.12] tracking-[-0.005em]">
              For larger homes, estates and complex households.
            </h3>
            <p className="mt-3 text-[15.5px] leading-[1.55] text-[color:var(--color-ink-soft)]">
              Human coordination, contractor management and named oversight. An add-on service layer for homes that ask a lot of you, not an app tier.
            </p>
          </div>
          <a href="mailto:sales@willowalexander.co.uk?subject=Managed Stewardship enquiry" className="shrink-0 inline-flex items-center gap-2 rounded-md bg-[#1d2a40] px-7 py-3.5 text-[15.5px] text-[#f3ede0] transition-colors hover:bg-[#16243b]">
            Enquire <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
