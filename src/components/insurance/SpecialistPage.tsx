import Image from "next/image";
import Link from "next/link";
import type { SpecialistPage as SpecialistPageData } from "@/lib/insurance/specialist-pages";
import { InsuranceEnquiryForm } from "./InsuranceEnquiryForm";
import { PROVENANCE } from "@/lib/insurance/config";

/**
 * SpecialistPage — the shared template for specialist property/asset and home-
 * cover pages. Rebuilt (aug12 feedback) to reassure a buyer, not just to read
 * as editorial: a trust strip under the hero, the Home Record "readiness"
 * argument, a Benefact proof line, and alternating colour bands so sections
 * stop bleeding into one cream scroll. Burgundy "protect world". No compare
 * language, no advice, no urgency.
 */

const READINESS = [
  { h: "The roof", p: "What it is, and when it was last treated." },
  { h: "What it's built of", p: "The fabric behind the walls, not a guess from a table." },
  { h: "What's been added", p: "Every extension, rewire and works project." },
  { h: "The cost to rebuild", p: "The reinstatement figure, not the market value." },
];

export function SpecialistPage({
  data,
  turnstileSiteKey,
}: {
  data: SpecialistPageData;
  turnstileSiteKey: string;
}) {
  const TRUST = [
    { h: "FCA-regulated", p: `Arranged by ${PROVENANCE.legalName.split(" ").slice(0, 2).join(" ")} (FRN ${PROVENANCE.frn})` },
    { h: "Claims handled for you", p: "From first notification to settlement" },
    { h: "A named specialist", p: "One person who knows the file, not a call centre" },
    { h: "Profits to charity", p: `Provenance sits within the ${PROVENANCE.group} group` },
  ];

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

      {/* Trust strip — reassurance, directly under the hero */}
      <section className="border-y border-house-brown/12 px-[5vw] py-6" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto grid max-w-[1120px] gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t) => (
            <div key={t.h} className="flex flex-col">
              <span className="font-sans text-[13.5px] font-semibold tracking-[0.01em] text-house-black">{t.h}</span>
              <span className="mt-0.5 font-sans text-[12.5px] leading-[1.45] text-house-stone">{t.p}</span>
            </div>
          ))}
        </div>
      </section>

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

      {/* Evidence — green-tinted band */}
      {data.evidence && data.evidence.length > 0 ? (
        <section className="px-[5vw] py-10" style={{ background: "var(--house-green-soft)" }}>
          <div className="mx-auto grid max-w-[880px] gap-6 sm:grid-cols-3">
            {data.evidence.map((e) => (
              <div key={e.label}>
                <p className="font-display text-[clamp(28px,3.4vw,44px)] leading-none text-[color:var(--house-green-ink)]">{e.stat}</p>
                <p className="mt-2 font-sans text-[13px] leading-[1.5] text-house-brown/75">{e.label}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-4 max-w-[880px] font-sans text-[11.5px] text-house-brown/55">
            Figures are indicative and pending Provenance compliance sign-off.
          </p>
        </section>
      ) : null}

      {/* Detail points — white, to separate from the cream argument */}
      <section className="px-[5vw] py-12" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto max-w-[880px]">
          <h2 className="mb-8 font-display text-[clamp(22px,2.8vw,34px)] leading-[1.12] text-house-black">
            {data.detail.title}
          </h2>
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-3">
            {data.detail.points.map((pt) => (
              <div key={pt.h} className="border-t border-house-brown/15 pt-4">
                <h3 className="font-sans text-[13px] font-semibold tracking-[0.04em] text-[color:var(--ins-ink)]">{pt.h}</h3>
                <p className="mt-2 font-sans text-[15px] leading-[1.6] text-house-brown/85">{pt.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Home Record readiness argument — the reassurance + differentiator */}
      <section className="px-[5vw] py-14" style={{ background: "var(--color-house-cream-dark)" }}>
        <div className="mx-auto max-w-[1040px]">
          <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-[color:var(--ins-ink)]">The House Record</p>
          <h2 className="mt-3 max-w-[24ch] font-display text-[clamp(24px,3vw,38px)] leading-[1.1] text-house-black">
            What we already know about your home.
          </h2>
          <p className="mt-4 max-w-[62ch] font-sans text-[16px] leading-[1.7] text-house-brown/85">
            A home insured well is a home described well. Most insurance is arranged by people who have never been asked a single question about the house. The House already holds the answers, and hands them to the specialist so your cover is built on fact rather than a guess.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {READINESS.map((r) => (
              <div key={r.h} className="border border-house-brown/12 bg-house-white p-5">
                <p className="font-display text-[18px] leading-tight text-house-black">{r.h}</p>
                <p className="mt-2 font-sans text-[13.5px] leading-[1.5] text-house-stone">{r.p}</p>
              </div>
            ))}
          </div>
          <p className="mt-7 max-w-[40ch] font-display text-[clamp(19px,2.2vw,26px)] italic leading-[1.3] text-[color:var(--ins-ink)]">
            Care recorded becomes risk understood.
          </p>
        </div>
      </section>

      {/* What Provenance can place — dark burgundy anchor, split with image */}
      <section className="px-[5vw] py-14 text-house-cream" style={{ background: "var(--ins-accent)" }}>
        <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="max-w-[560px]">
            <h2 className="font-display text-[clamp(22px,2.8vw,34px)] leading-[1.12] text-house-cream">
              {data.placed.heading}
            </h2>
            <p className="mt-5 font-sans text-[17px] leading-[1.7] text-house-cream/85">{data.placed.body}</p>
            <p className="mt-5 font-sans text-[14px] leading-[1.6] text-house-cream/70">
              Provenance is authorised and regulated by the FCA (FRN {PROVENANCE.frn}), a member of BIBA, and part of the {PROVENANCE.group} group, owned by {PROVENANCE.backer} — whose profits go to charitable causes.
            </p>
            {data.crossLinks && data.crossLinks.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 p-0">
                {data.crossLinks.map((l) => (
                  <li key={l.href} className="list-none">
                    <Link href={l.href} className="font-sans text-[14px] text-[color:var(--house-green-soft)] underline underline-offset-2 hover:text-house-cream">
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

      {/* Enquiry — subtle step down from the dark band */}
      <section id="enquire" className="scroll-mt-20 px-[5vw] py-14" style={{ background: "var(--color-house-cream-dark)" }}>
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
