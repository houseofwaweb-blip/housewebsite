import Image from "next/image";
import Link from "next/link";
import type { Guide } from "@/lib/insurance/guides";
import { RenewalReminderForm } from "./RenewalReminderForm";
import { InsuranceDisclosure } from "./InsuranceDisclosure";

/**
 * GuideLayout — editorial long-form for the Group G guides, redesigned to the
 * scannable "broker guide" pattern: a sticky table of contents, an "in short"
 * key-takeaway box, stat callouts, an optional comparison table, an FAQ
 * accordion (native <details>, no JS) and related-guide cards. Still reads like
 * a guide, not an ad: one soft route to the advised service at the foot.
 */
function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function StatCallout({ value, label }: { value: string; label: string }) {
  return (
    <div className="my-9 flex items-center gap-6 px-7 py-7 text-house-cream" style={{ background: "var(--ins-accent)" }}>
      <p className="font-display text-[clamp(40px,6vw,64px)] leading-none text-house-gold-light">{value}</p>
      <p className="font-sans text-[16px] leading-[1.5] text-house-cream/90">{label}</p>
    </div>
  );
}

export function GuideLayout({
  guide,
  turnstileSiteKey,
}: {
  guide: Guide;
  turnstileSiteKey: string;
}) {
  const toc = guide.sections.map((s) => ({ id: slugify(s.heading), label: s.heading }));

  return (
    <div className="bg-house-cream text-house-brown">
      {/* Hero, split: text left, image right */}
      <section className="px-[5vw] pt-20 pb-10">
        <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-sans text-[12px] tracking-[0.3em] uppercase text-[color:var(--ins-ink)]">Insurance · Guide</p>
            <h1 className="mt-4 font-display text-[clamp(30px,4.6vw,52px)] leading-[1.06] text-house-black">{guide.title}</h1>
            <p className="mt-6 max-w-[52ch] font-sans text-[19px] leading-[1.6] text-house-stone">{guide.intro}</p>
          </div>
          {guide.image ? (
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={guide.image}
                alt={guide.imageAlt ?? ""}
                fill
                sizes="(min-width: 1120px) 540px, 90vw"
                priority
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          ) : null}
        </div>
      </section>

      {/* Body: sticky TOC rail + article */}
      <div className="mx-auto max-w-[1120px] px-[5vw] pb-8">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* Sticky table of contents (desktop) */}
          <aside className="hidden lg:block">
            <nav className="sticky top-24">
              <p className="font-sans text-[11px] tracking-[0.24em] uppercase text-[color:var(--ins-ink)]">On this page</p>
              <ul className="mt-4 flex list-none flex-col gap-2.5 p-0">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="font-sans text-[14px] leading-[1.4] text-house-brown/75 no-underline hover:text-[color:var(--ins-ink)]">
                      {t.label}
                    </a>
                  </li>
                ))}
                {guide.faqs && guide.faqs.length > 0 ? (
                  <li>
                    <a href="#faq" className="font-sans text-[14px] leading-[1.4] text-house-brown/75 no-underline hover:text-[color:var(--ins-ink)]">Common questions</a>
                  </li>
                ) : null}
              </ul>
            </nav>
          </aside>

          <article className="max-w-[760px]">
            {/* In short */}
            {guide.takeaways && guide.takeaways.length > 0 ? (
              <div className="border border-house-brown/15 bg-house-white px-6 py-5">
                <p className="font-sans text-[11px] tracking-[0.24em] uppercase text-[color:var(--ins-ink)]">In short</p>
                <ul className="mt-3 flex list-none flex-col gap-2 p-0">
                  {guide.takeaways.map((t, i) => (
                    <li key={i} className="relative pl-5 font-sans text-[16px] leading-[1.55] text-house-brown/90 before:absolute before:left-0 before:top-[0.6em] before:h-[5px] before:w-[5px] before:bg-[color:var(--ins-ink)]">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Hero stat */}
            {guide.stat ? <StatCallout value={guide.stat.value} label={guide.stat.label} /> : null}

            {/* Sections */}
            {guide.sections.map((s) => (
              <section key={s.heading} id={slugify(s.heading)} className="mt-10 scroll-mt-24">
                <h2 className="font-display text-[clamp(22px,2.6vw,30px)] leading-[1.15] text-house-black">{s.heading}</h2>
                {s.paras.map((p, i) => (
                  <p key={i} className="mt-4 font-sans text-[17px] leading-[1.7] text-house-brown/85">{p}</p>
                ))}
                {s.stat ? <StatCallout value={s.stat.value} label={s.stat.label} /> : null}
              </section>
            ))}

            {/* Comparison table — on a tinted panel so it reads as a distinct block */}
            {guide.table ? (
              <section className="mt-12 px-6 py-7 sm:px-8" style={{ background: "var(--color-house-cream-dark)" }}>
                {guide.table.title ? (
                  <h2 className="font-display text-[clamp(22px,2.6vw,30px)] leading-[1.15] text-house-black">{guide.table.title}</h2>
                ) : null}
                <div className="mt-5 overflow-x-auto">
                  <table className="w-full min-w-[520px] border-collapse text-left">
                    <thead>
                      <tr>
                        {guide.table.columns.map((c) => (
                          <th key={c} className="border-b border-house-brown/25 pb-3 pr-6 font-sans text-[13px] font-semibold tracking-[0.02em] text-[color:var(--ins-ink)]">{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {guide.table.rows.map((row, ri) => (
                        <tr key={ri}>
                          {row.map((cell, ci) => (
                            <td key={ci} className={`border-b border-house-brown/12 py-3 pr-6 align-top font-sans text-[15px] leading-[1.5] ${ci === 0 ? "font-semibold text-house-black" : "text-house-brown/85"}`}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {guide.table.caption ? (
                  <p className="mt-3 font-sans text-[13px] leading-[1.5] text-house-stone">{guide.table.caption}</p>
                ) : null}
              </section>
            ) : null}

            {/* FAQ accordion */}
            {guide.faqs && guide.faqs.length > 0 ? (
              <section id="faq" className="mt-14 scroll-mt-24">
                <h2 className="font-display text-[clamp(22px,2.6vw,30px)] leading-[1.15] text-house-black">Common questions</h2>
                <div className="mt-5 border-t border-house-brown/15">
                  {guide.faqs.map((f, i) => (
                    <details key={i} className="group border-b border-house-brown/15">
                      <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 font-sans text-[17px] font-medium text-house-black marker:content-['']">
                        {f.q}
                        <span aria-hidden className="shrink-0 font-display text-[22px] leading-none text-[color:var(--ins-ink)] transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <p className="pb-5 font-sans text-[16px] leading-[1.65] text-house-brown/85">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            {/* Sources + indicative note */}
            {guide.sources && guide.sources.length > 0 ? (
              <p className="mt-12 font-sans text-[12px] leading-[1.6] text-house-stone/80">
                <span className="font-semibold">Sources:</span> {guide.sources.join("; ")}.
              </p>
            ) : null}
            {guide.hasFigures ? (
              <p className="mt-3 font-sans text-[12px] leading-[1.6] text-house-stone/70">
                Figures are indicative and pending Provenance compliance sign-off. This is general information, not advice.
              </p>
            ) : null}
          </article>
        </div>
      </div>

      {/* Foot CTA — colour band after the cream article */}
      <section className="px-[5vw] py-14" style={{ background: "var(--color-house-cream-dark)" }}>
        <div className="mx-auto max-w-[1120px]">
          <div className="max-w-[760px]">
            {guide.footCta === "renewal" ? (
              <>
                <h2 className="font-display text-[clamp(22px,2.6vw,30px)] leading-[1.15] text-house-black">Remind me before my renewal.</h2>
                <p className="mt-3 mb-6 max-w-[52ch] font-sans text-[16px] leading-[1.6] text-house-stone">
                  One email, at the right moment. Not a newsletter, and your details are not passed to anyone until you ask.
                </p>
                <RenewalReminderForm turnstileSiteKey={turnstileSiteKey} sourcePage={`/insurance/guides/${guide.slug}`} />
              </>
            ) : (
              <>
                <h2 className="font-display text-[clamp(22px,2.6vw,30px)] leading-[1.15] text-house-black">When you want a figure you can trust.</h2>
                <p className="mt-3 mb-5 max-w-[54ch] font-sans text-[16px] leading-[1.6] text-house-stone">
                  A specialist can review your cover against the real rebuild reality of your home. The House introduces you; Provenance arranges the cover.
                </p>
                <InsuranceDisclosure className="mb-5 max-w-[62ch]" />
                <Link href="/insurance/private-client" className="inline-flex items-center justify-center whitespace-nowrap border border-[color:var(--ins-dark)] bg-[var(--ins-accent)] px-7 py-3.5 font-sans text-[12px] tracking-[0.16em] uppercase text-[color:var(--ins-on)] no-underline transition-[filter] hover:brightness-110">
                  Speak to a specialist
                </Link>
              </>
            )}
          </div>

          {/* Related guide cards */}
          {guide.related && guide.related.length > 0 ? (
            <div className="mt-12 border-t border-house-brown/12 pt-8">
              <p className="mb-5 font-sans text-[11px] tracking-[0.24em] uppercase text-[color:var(--ins-ink)]">Related reading</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {guide.related.map((r) => (
                  <Link key={r.href} href={r.href} className="group flex items-center justify-between gap-4 border border-house-brown/15 bg-house-white px-5 py-4 no-underline transition-colors hover:border-[color:var(--ins-ink)]">
                    <span className="font-display text-[17px] leading-tight text-house-black group-hover:text-[color:var(--ins-ink)]">{r.label}</span>
                    <span aria-hidden className="shrink-0 text-[color:var(--ins-ink)]">→</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
