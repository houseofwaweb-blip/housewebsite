import Image from "next/image";
import Link from "next/link";
import type { SpecialistPage as SpecialistPageData } from "@/lib/insurance/specialist-pages";
import { DEFAULT_LIMITATIONS } from "@/lib/insurance/specialist-pages";
import { InsuranceEnquiryForm } from "./InsuranceEnquiryForm";
import { InsuranceTrustStrip } from "./InsuranceTrustStrip";
import { PROVENANCE } from "@/lib/insurance/config";
import { ProvenanceLockup } from "./ProvenanceLockup";
import { SUPPORT_PHONE, SUPPORT_PHONE_HREF } from "./ClaimsHelp";

/**
 * SpecialistPage — shared template for specialist property/asset and home-cover
 * pages. aug12 feedback rebuild: every section shares ONE container width so the
 * left edges line up (no skew); a dark-green trust band and a dark-burgundy
 * "what can be placed" band anchor the top and bottom so the page alternates
 * dark/light instead of reading as one beige scroll; and a SECOND image sits in
 * the argument (not just the hero) so text never runs for three screens.
 * Burgundy "protect world". No compare/advice/urgency. Never claims the House
 * holds a record of your home.
 */

/** Default "questions a comparison form never asks" for PROPERTY pages. Asset,
    motor and cover pages override via data.readiness / data.differenceIntro. */
const READINESS_DEFAULT = [
  { h: "The roof", p: "What it is, and when it was last treated." },
  { h: "What it's built of", p: "The fabric behind the walls, not a guess from a table." },
  { h: "What's been added", p: "Every extension, rewire and works project." },
  { h: "The cost to rebuild", p: "The reinstatement figure, not the market value." },
];
const DIFFERENCE_INTRO_DEFAULT =
  "Most insurance is priced by people who never ask a single thing about the house. The House introduces you to a specialist who starts from what the home actually is, so the cover is built on the real risk rather than a guess.";

/** Shared still-life for the burgundy "What Provenance can place" band, on every page. */
const PROVENANCE_IMG = "/insurance/provenance-can-place.webp";
const PROVENANCE_IMG_ALT =
  "A worn ledger lettered Provenance Insurance beside architectural drawings, a brass globe sconce, a fountain pen and a pink peony on a sage sill.";

/** On-page brief for an image not yet supplied: description, size, filename. */
function ImagePlaceholder({
  spec,
  ratio,
}: {
  spec: { description: string; dimensions: string; filename: string };
  ratio: string;
}) {
  return (
    <div className={`${ratio} flex w-full flex-col items-center justify-center border-2 border-dashed border-house-brown/30 bg-house-white/60 p-6 text-center`}>
      <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-[color:var(--ins-ink)]">Image placeholder</p>
      <p className="mt-3 max-w-[42ch] font-sans text-[14px] leading-[1.55] text-house-brown/80">{spec.description}</p>
      <p className="mt-4 font-sans text-[12.5px] leading-[1.5] text-house-brown/55">
        {spec.dimensions}
        <br />
        save as <span className="font-semibold text-house-brown/80">{spec.filename}</span>
      </p>
    </div>
  );
}

export function SpecialistPage({
  data,
  turnstileSiteKey,
}: {
  data: SpecialistPageData;
  turnstileSiteKey: string;
}) {
  return (
    <div className="bg-house-cream text-house-brown">
      {/* 1. Hero — cream, split */}
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
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#enquire"
                data-ga-event="cta_click"
                data-ga-cta="speak_to_specialist"
                className="inline-flex items-center justify-center whitespace-nowrap border border-[color:var(--ins-dark)] bg-[var(--ins-accent)] px-7 py-3.5 font-sans text-[12px] tracking-[0.16em] uppercase text-[color:var(--ins-on)] no-underline transition-[filter] hover:brightness-110"
              >
                {data.heroCta ?? "Speak to a specialist"}
              </a>
              <a
                href={SUPPORT_PHONE_HREF}
                data-ga-event="cta_click"
                data-ga-cta="call_specialist"
                className="inline-flex items-center justify-center whitespace-nowrap border border-house-brown/30 px-7 py-3.5 font-sans text-[12px] tracking-[0.16em] uppercase text-house-brown no-underline transition-colors hover:border-[color:var(--ins-ink)]"
              >
                Call {SUPPORT_PHONE}
              </a>
            </div>
            <ProvenanceLockup className="mt-6" />
          </div>
          {data.image ? (
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image src={data.image} alt={data.imageAlt ?? ""} fill sizes="(min-width: 1120px) 540px, 90vw" priority style={{ objectFit: "cover", objectPosition: "center" }} />
            </div>
          ) : null}
        </div>
      </section>

      {/* 2. Trust strip — dark green band, the top anchor */}
      <InsuranceTrustStrip />

      {/* 3. Why it is different — split with the second image, mid-page */}
      <section className="px-[5vw] py-14">
        <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="max-w-[58ch]">
            <h2 className="font-display text-[clamp(24px,3vw,36px)] leading-[1.12] text-house-black">
              {data.whyDifferent.heading}
            </h2>
            {data.whyDifferent.body.map((para, i) => (
              <p key={i} className="mt-5 font-sans text-[17px] leading-[1.7] text-house-brown/85">{para}</p>
            ))}
          </div>
          {data.whyImage ? (
            <div className="relative aspect-[3/2] w-full overflow-hidden">
              <Image src={data.whyImage} alt={data.whyImageAlt ?? ""} fill sizes="(min-width: 1120px) 520px, 90vw" style={{ objectFit: "cover", objectPosition: "center" }} />
            </div>
          ) : data.whyImageSpec ? (
            <ImagePlaceholder spec={data.whyImageSpec} ratio="aspect-[3/2]" />
          ) : null}
        </div>
      </section>

      {/* 4. Evidence — sage band (if present), with a CTA alongside the figures */}
      {data.evidence && data.evidence.length > 0 ? (
        <section className="px-[5vw] py-11" style={{ background: "var(--color-house-cream-dark)" }}>
          <div className="mx-auto grid max-w-[1120px] items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
            <div>
              <div className="grid gap-6 sm:grid-cols-3">
                {data.evidence.map((e) => (
                  <div key={e.label}>
                    <p className="font-display text-[clamp(28px,3.4vw,44px)] leading-none text-[color:var(--ins-ink)]">{e.stat}</p>
                    <p className="mt-2 font-sans text-[14px] leading-[1.5] text-house-brown/75">{e.label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 font-sans text-[11.5px] text-house-brown/55">Figures are indicative and pending Provenance compliance sign-off.</p>
            </div>
            <div className="lg:border-l lg:border-house-brown/15 lg:pl-12">
              <p className="max-w-[22ch] font-display text-[clamp(18px,2vw,24px)] leading-[1.25] text-house-black">
                Find out where your own cover stands.
              </p>
              <a
                href="#enquire"
                data-ga-event="cta_click"
                data-ga-cta="speak_to_specialist"
                className="mt-4 inline-flex items-center justify-center whitespace-nowrap border border-[color:var(--ins-dark)] bg-[var(--ins-accent)] px-7 py-3.5 font-sans text-[12px] tracking-[0.16em] uppercase text-[color:var(--ins-on)] no-underline transition-[filter] hover:brightness-110"
              >
                Speak to a specialist
              </a>
            </div>
          </div>
        </section>
      ) : null}

      {/* 5. Detail points — white */}
      <section className="px-[5vw] py-14" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto max-w-[1120px]">
          <h2 className="mb-8 max-w-[24ch] font-display text-[clamp(22px,2.8vw,34px)] leading-[1.12] text-house-black">
            {data.detail.title}
          </h2>
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-3">
            {data.detail.points.map((pt) => (
              <div key={pt.h} className="border-t border-house-brown/15 pt-4">
                <h3 className="font-sans text-[14px] font-semibold tracking-[0.04em] text-[color:var(--ins-ink)]">{pt.h}</h3>
                <p className="mt-2 font-sans text-[16.5px] leading-[1.6] text-house-brown/85">{pt.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5b. What is not covered / key limitations — spec §11, this must never be
          buried. Prominent bordered block on a burgundy-tinted surface; every
          cover page shows it (tailored where supplied, else the shared default). */}
      {(() => {
        const lim = data.limitations ?? DEFAULT_LIMITATIONS;
        return (
          <section className="px-[5vw] py-14" style={{ background: "var(--color-house-cream-dark)" }}>
            <div className="mx-auto max-w-[1120px] border-l-4 border-[color:var(--ins-accent)] bg-house-white/70 p-7 sm:p-9">
              <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-[color:var(--ins-ink)]">
                Read this before you rely on cover
              </p>
              <h2 className="mt-3 max-w-[28ch] font-display text-[clamp(24px,3vw,36px)] leading-[1.12] text-house-black">
                {lim.heading ?? "What is not covered, and what to check"}
              </h2>
              {lim.intro ? (
                <p className="mt-4 max-w-[62ch] font-sans text-[16.5px] leading-[1.65] text-house-brown/85">
                  {lim.intro}
                </p>
              ) : null}
              <div className="mt-8 grid gap-x-10 gap-y-7 md:grid-cols-2">
                {lim.points.map((pt) => (
                  <div key={pt.h} className="border-t border-[color:var(--ins-accent)]/40 pt-4">
                    <h3 className="font-sans text-[14px] font-semibold tracking-[0.02em] text-[color:var(--ins-ink)]">{pt.h}</h3>
                    <p className="mt-2 font-sans text-[16px] leading-[1.6] text-house-brown/85">{pt.p}</p>
                  </div>
                ))}
              </div>
              {lim.note ? (
                <p className="mt-7 font-sans text-[13.5px] leading-[1.6] text-house-brown/70">{lim.note}</p>
              ) : null}
            </div>
          </section>
        );
      })()}

      {/* 6. Why a specialist, not a form — sage band (argued from what a specialist asks) */}
      <section className="px-[5vw] py-14" style={{ background: "var(--color-house-cream-dark)" }}>
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="font-sans text-[12px] tracking-[0.24em] uppercase text-[color:var(--ins-ink)]">The difference</p>
              <h2 className="mt-3 max-w-[26ch] font-display text-[clamp(24px,3vw,38px)] leading-[1.1] text-house-black">
                The questions a comparison form never asks.
              </h2>
              <p className="mt-4 max-w-[52ch] font-sans text-[16px] leading-[1.7] text-house-brown/85">
                {data.differenceIntro ?? DIFFERENCE_INTRO_DEFAULT}
              </p>
            </div>
            {data.differenceImage ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image src={data.differenceImage} alt={data.differenceImageAlt ?? ""} fill sizes="(min-width: 1120px) 540px, 90vw" style={{ objectFit: "cover", objectPosition: "center" }} />
              </div>
            ) : (
              <ImagePlaceholder
                spec={{
                  description: "This page's own landscape image for the 'questions a comparison form never asks' section, chosen to suit this cover.",
                  dimensions: "1600 × 1067px landscape (3:2), WebP",
                  filename: `/insurance/${data.slug}-difference.webp`,
                }}
                ratio="aspect-[4/3]"
              />
            )}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(data.readiness ?? READINESS_DEFAULT).map((r) => (
              <div key={r.h} className="border border-house-brown/12 bg-house-white p-5">
                <p className="font-display text-[18px] leading-tight text-house-black">{r.h}</p>
                <p className="mt-2 font-sans text-[14.5px] leading-[1.5] text-house-stone">{r.p}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
            <p className="max-w-[44ch] font-display text-[clamp(19px,2.2vw,26px)] italic leading-[1.3] text-[color:var(--ins-ink)]">
              A specialist asks. A comparison engine assumes.
            </p>
            <a
              href="#enquire"
              data-ga-event="cta_click"
              data-ga-cta="speak_to_specialist"
              className="inline-flex items-center justify-center whitespace-nowrap border border-[color:var(--ins-dark)] bg-[var(--ins-accent)] px-7 py-3.5 font-sans text-[12px] tracking-[0.16em] uppercase text-[color:var(--ins-on)] no-underline transition-[filter] hover:brightness-110"
            >
              {data.heroCta ?? "Speak to a specialist"}
            </a>
          </div>
        </div>
      </section>

      {/* 6b. Related covers — optional cross-sell grid (e.g. the everyday covers) */}
      {data.relatedCovers ? (
        <section className="px-[5vw] py-14" style={{ background: "var(--color-house-white)" }}>
          <div className="mx-auto max-w-[1120px]">
            <h2 className="mb-8 font-display text-[clamp(22px,2.8vw,34px)] leading-[1.12] text-house-black">
              {data.relatedCovers.title}
            </h2>
            <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {data.relatedCovers.items.filter((c) => !c.href.endsWith(`/${data.slug}`)).slice(0, 3).map((c) => (
                <Link
                  key={c.name}
                  href={c.href}
                  className="group flex flex-col overflow-hidden border border-house-brown/12 bg-house-cream no-underline transition-[border-color,box-shadow] hover:border-[color:var(--ins-ink)] hover:shadow-[0_14px_40px_-24px_rgba(0,0,0,0.4)]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image src={c.image} alt={c.imageAlt ?? ""} fill sizes="(max-width: 640px) 100vw, 260px" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-[19px] leading-tight text-house-black transition-colors group-hover:text-[color:var(--ins-ink)]">{c.name}</h3>
                    {c.body ? <p className="mt-2 font-sans text-[14.5px] leading-[1.55] text-house-stone">{c.body}</p> : null}
                    <span className="mt-4 font-sans text-[12px] tracking-[0.16em] uppercase text-[color:var(--ins-ink)]">View cover →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 7. What Provenance can place — dark burgundy band, the bottom anchor.
          Split with the shared "Provenance Insurance" still-life on every page. */}
      <section className="px-[5vw] py-14 text-house-cream" style={{ background: "var(--ins-accent)" }}>
        <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-[1fr_0.66fr] lg:gap-16">
          <div className="max-w-[64ch]">
            <h2 className="font-display text-[clamp(24px,3vw,38px)] leading-[1.12] text-house-cream">
              {data.placed.heading}
            </h2>
            <p className="mt-5 font-sans text-[17px] leading-[1.7] text-house-cream/85">{data.placed.body}</p>
            <p className="mt-5 font-sans text-[15px] leading-[1.6] text-house-cream/70">
              Provenance is authorised and regulated by the FCA (FRN {PROVENANCE.frn}), and part of the {PROVENANCE.group} group, within the {PROVENANCE.backer} group, which is charity-owned and gives its available profits to good causes.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#enquire"
                data-ga-event="cta_click"
                data-ga-cta="speak_to_specialist"
                className="inline-flex items-center justify-center whitespace-nowrap border border-house-cream bg-house-cream px-7 py-3.5 font-sans text-[12px] tracking-[0.16em] uppercase text-[color:var(--ins-accent)] no-underline transition-[filter] hover:brightness-95"
              >
                {data.heroCta ?? "Speak to a specialist"}
              </a>
              <a
                href={SUPPORT_PHONE_HREF}
                data-ga-event="cta_click"
                data-ga-cta="call_specialist"
                className="inline-flex items-center justify-center whitespace-nowrap border border-house-cream/40 px-7 py-3.5 font-sans text-[12px] tracking-[0.16em] uppercase text-house-cream no-underline transition-colors hover:border-house-cream"
              >
                Call {SUPPORT_PHONE}
              </a>
            </div>
            {data.crossLinks && data.crossLinks.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 p-0">
                {data.crossLinks.map((l) => (
                  <li key={l.href} className="list-none">
                    <Link href={l.href} className="font-sans text-[15px] text-house-gold-light underline underline-offset-2 hover:text-house-cream">
                      {l.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
            {/* Provenance lockup — cream chip so the navy mark reads on burgundy */}
            <ProvenanceLockup variant="onDark" className="mt-8" />
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image src={PROVENANCE_IMG} alt={PROVENANCE_IMG_ALT} fill sizes="(min-width: 1120px) 420px, 90vw" style={{ objectFit: "cover", objectPosition: "center" }} />
          </div>
        </div>
      </section>

      {/* 8. Enquiry — cream-dark, left-aligned to the container */}
      <section id="enquire" className="scroll-mt-20 px-[5vw] py-14" style={{ background: "var(--color-house-cream-dark)" }}>
        <div className="mx-auto max-w-[1120px]">
          <div className="max-w-[620px]">
            <p className="font-sans text-[12px] tracking-[0.28em] uppercase text-[color:var(--ins-ink)]">{data.enquiry?.eyebrow ?? "Speak to a specialist"}</p>
            <h2 className="mt-3 font-display text-[clamp(24px,3vw,38px)] leading-[1.1] text-house-black">
              {data.enquiry?.heading ?? "A short conversation, not a comparison engine."}
            </h2>
            <p className="mt-4 mb-8 max-w-[54ch] font-sans text-[16px] leading-[1.6] text-house-stone">
              {data.enquiry?.body ?? "Leave your details and a specialist will call. We ask only what we need to make the introduction, nothing about sums insured, contents or your current insurer. That conversation belongs on your first call with Provenance."}
            </p>
            <InsuranceEnquiryForm
              enquiryType={data.enquiryType}
              turnstileSiteKey={turnstileSiteKey}
              sourcePage={data.sourcePath ?? `/insurance/${data.slug}`}
              submitLabel={data.enquiry?.submitLabel}
              withCompany={data.enquiry?.withCompany}
              withProjectStart={data.enquiry?.withProjectStart}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
