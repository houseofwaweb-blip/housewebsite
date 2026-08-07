import Image from "next/image";
import Link from "next/link";
import type { Guide } from "@/lib/insurance/guides";
import { RenewalReminderForm } from "./RenewalReminderForm";
import { InsuranceDisclosure } from "./InsuranceDisclosure";

/**
 * GuideLayout, editorial long-form for the Group G guides. Reads like a guide,
 * not an ad: a single soft route to the advised service at the foot (or the
 * renewal reminder for the timing guide). No inline forms mid-article.
 */
export function GuideLayout({
  guide,
  turnstileSiteKey,
}: {
  guide: Guide;
  turnstileSiteKey: string;
}) {
  return (
    <div className="ins-everyday bg-house-cream text-house-brown">
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

      <article className="mx-auto max-w-[760px] px-[5vw] pb-16">
        {guide.sections.map((s) => (
          <section key={s.heading} className="mt-10">
            <h2 className="font-display text-[clamp(22px,2.6vw,30px)] leading-[1.15] text-house-black">{s.heading}</h2>
            {s.paras.map((p, i) => (
              <p key={i} className="mt-4 font-sans text-[17px] leading-[1.7] text-house-brown/85">{p}</p>
            ))}
          </section>
        ))}

        {guide.hasFigures ? (
          <p className="mt-10 font-sans text-[12px] text-house-stone/70">
            Figures are indicative, drawn from published market research, and pending Provenance compliance sign-off. This is general information, not advice.
          </p>
        ) : null}

        {/* Foot CTA */}
        <div className="mt-12 border-t border-house-brown/12 pt-10">
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

          {guide.related ? (
            <p className="mt-8 font-sans text-[14px] text-house-stone">
              Related:{" "}
              <Link href={guide.related.href} className="text-[color:var(--ins-ink)] underline underline-offset-2 hover:text-house-brown">{guide.related.label} →</Link>
            </p>
          ) : null}
        </div>
      </article>
    </div>
  );
}
