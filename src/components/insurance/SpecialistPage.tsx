import Image from "next/image";
import Link from "next/link";
import type { SpecialistPage as SpecialistPageData } from "@/lib/insurance/specialist-pages";
import { InsuranceEnquiryForm } from "./InsuranceEnquiryForm";

/**
 * SpecialistPage, the shared template for every specialist property and asset
 * page (spec Groups B and C). Editorial top, evidence, the specifics, what
 * Provenance can place, then the 5-field enquiry (disclosure above its button).
 * No compare language, no advice, no urgency.
 */
export function SpecialistPage({
  data,
  turnstileSiteKey,
}: {
  data: SpecialistPageData;
  turnstileSiteKey: string;
}) {
  return (
    <div className="bg-house-cream text-house-brown">
      {/* Hero, split: text left, image right */}
      <section className="px-[5vw] pt-20 pb-12">
        <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-sans text-[12px] tracking-[0.28em] uppercase text-[color:var(--ins-ink)]">
              Insurance · {data.hero.eyebrow}
            </p>
            <h1 className="mt-4 font-display text-[clamp(32px,5vw,60px)] leading-[1.04] text-house-black">
              {data.hero.heading}
            </h1>
            <p className="mt-6 max-w-[54ch] font-sans text-[18px] leading-[1.62] text-house-stone">
              {data.hero.lede}
            </p>
            <div className="mt-8">
              <a
                href="#enquire"
                className="inline-flex items-center justify-center whitespace-nowrap border border-[color:var(--ins-dark)] bg-[var(--ins-accent)] px-7 py-3.5 font-sans text-[12px] tracking-[0.16em] uppercase text-[color:var(--ins-on)] no-underline transition-[filter] hover:brightness-110"
              >
                Speak to a specialist
              </a>
            </div>
          </div>
          {data.image ? (
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={data.image}
                alt={data.imageAlt ?? ""}
                fill
                sizes="(min-width: 1120px) 540px, 90vw"
                priority
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          ) : null}
        </div>
      </section>

      {/* Evidence strip */}
      {data.evidence && data.evidence.length > 0 ? (
        <section className="px-[5vw] pb-6">
          <div className="mx-auto grid max-w-[880px] gap-6 border-y border-house-brown/12 py-8 sm:grid-cols-3">
            {data.evidence.map((e) => (
              <div key={e.label}>
                <p className="font-display text-[clamp(28px,3.4vw,44px)] leading-none text-[color:var(--ins-ink)]">{e.stat}</p>
                <p className="mt-2 font-sans text-[13px] leading-[1.5] text-house-stone">{e.label}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-3 max-w-[880px] font-sans text-[11.5px] text-house-stone/70">
            Figures are indicative and pending Provenance compliance sign-off.
          </p>
        </section>
      ) : null}

      {/* Why different */}
      <section className="px-[5vw] py-12">
        <div className="mx-auto max-w-[760px]">
          <h2 className="font-display text-[clamp(24px,3vw,36px)] leading-[1.12] text-house-black">
            {data.whyDifferent.heading}
          </h2>
          {data.whyDifferent.body.map((para, i) => (
            <p key={i} className="mt-5 font-sans text-[17px] leading-[1.7] text-house-brown/85">{para}</p>
          ))}
        </div>
      </section>

      {/* Detail points */}
      <section className="border-t border-house-brown/10 px-[5vw] py-12">
        <div className="mx-auto max-w-[880px]">
          <h2 className="mb-8 font-display text-[clamp(22px,2.8vw,34px)] leading-[1.12] text-house-black">
            {data.detail.title}
          </h2>
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-3">
            {data.detail.points.map((pt) => (
              <div key={pt.h}>
                <h3 className="font-sans text-[13px] font-semibold tracking-[0.04em] text-[color:var(--ins-ink)]">{pt.h}</h3>
                <p className="mt-2 font-sans text-[15px] leading-[1.6] text-house-brown/85">{pt.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Provenance can place, split: text left, image right */}
      <section className="border-t border-house-brown/10 px-[5vw] py-12" style={{ background: "var(--color-house-cream-dark)" }}>
        <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="max-w-[560px]">
            <h2 className="font-display text-[clamp(22px,2.8vw,34px)] leading-[1.12] text-house-black">
              {data.placed.heading}
            </h2>
            <p className="mt-5 font-sans text-[17px] leading-[1.7] text-house-brown/85">{data.placed.body}</p>
            {data.crossLinks && data.crossLinks.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 p-0">
                {data.crossLinks.map((l) => (
                  <li key={l.href} className="list-none">
                    <Link href={l.href} className="font-sans text-[14px] text-[color:var(--ins-ink)] underline underline-offset-2 hover:text-house-brown">
                      {l.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          {data.placedImage ? (
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={data.placedImage}
                alt={data.placedImageAlt ?? ""}
                fill
                sizes="(min-width: 1120px) 480px, 90vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          ) : null}
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquire" className="scroll-mt-20 border-t border-house-brown/10 px-[5vw] py-14">
        <div className="mx-auto max-w-[620px]">
          <p className="font-sans text-[12px] tracking-[0.28em] uppercase text-[color:var(--ins-ink)]">Speak to a specialist</p>
          <h2 className="mt-3 font-display text-[clamp(24px,3vw,38px)] leading-[1.1] text-house-black">
            A short conversation, not a comparison engine.
          </h2>
          <p className="mt-4 mb-8 max-w-[54ch] font-sans text-[16px] leading-[1.6] text-house-stone">
            Leave your details and a specialist will call. We ask only what we need to make the introduction, nothing about sums insured, contents or your current insurer. That conversation belongs on your first call with Provenance.
          </p>
          <InsuranceEnquiryForm
            enquiryType={data.enquiryType}
            turnstileSiteKey={turnstileSiteKey}
            sourcePage={`/insurance/${data.slug}`}
          />
        </div>
      </section>
    </div>
  );
}
