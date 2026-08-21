import Image from "next/image";
import Link from "next/link";
import type { BusinessPage as BusinessPageData } from "@/lib/insurance/business-pages";
import { InsuranceEnquiryForm } from "./InsuranceEnquiryForm";

/**
 * BusinessPage, shared template for the Group E business pages. B2B tone: a
 * "silent review" device on the hub, and a 6-field enquiry (adds company) with
 * a "Request a review" action. No advice language, no urgency; introducer only.
 */
export function BusinessPage({
  data,
  turnstileSiteKey,
}: {
  data: BusinessPageData;
  turnstileSiteKey: string;
}) {
  return (
    <div className="ins-business bg-house-cream text-house-brown">
      {/* Hero, split: text left, image right */}
      <section className="px-[5vw] pt-20 pb-12">
        <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-sans text-[14px] tracking-[0.28em] uppercase text-[color:var(--ins-ink)]">Insurance · {data.hero.eyebrow}</p>
            <h1 className="mt-4 font-display text-[clamp(35px,5vw,61px)] leading-[1.04] text-house-black">{data.hero.heading}</h1>
            <p className="mt-6 max-w-[54ch] font-sans text-[21px] leading-[1.62] text-house-stone">{data.hero.lede}</p>
            <div className="mt-8">
              <a href="#enquire" className="inline-flex items-center justify-center whitespace-nowrap border border-[color:var(--ins-dark)] bg-[var(--ins-accent)] px-7 py-3.5 font-sans text-[14px] tracking-[0.16em] uppercase text-[color:var(--ins-on)] no-underline transition-[filter] hover:brightness-110">
                Request a review
              </a>
            </div>
            {data.subLinks && data.subLinks.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 p-0">
                {data.subLinks.map((l) => (
                  <li key={l.href} className="list-none">
                    <Link href={l.href} className="font-sans text-[18px] text-[color:var(--ins-ink)] underline underline-offset-2 hover:text-house-brown">{l.label} →</Link>
                  </li>
                ))}
              </ul>
            ) : null}
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

      {/* Who, split: image left, text right */}
      <section className="border-t border-house-brown/10 px-[5vw] py-12">
        <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {data.whoImage ? (
            <div className="relative order-last aspect-[4/5] w-full overflow-hidden lg:order-first">
              <Image
                src={data.whoImage}
                alt={data.whoImageAlt ?? ""}
                fill
                sizes="(min-width: 1120px) 480px, 90vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          ) : null}
          <div className="max-w-[560px]">
            <h2 className="font-display text-[clamp(27px,3vw,39px)] leading-[1.12] text-house-black">{data.who.heading}</h2>
            {data.who.body.map((p, i) => (
              <p key={i} className="mt-5 font-sans text-[20px] leading-[1.7] text-house-brown/85">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Detail (silent review on E1) */}
      <section className="border-t border-house-brown/10 px-[5vw] py-12" style={data.silentReview ? { background: "var(--color-house-cream-dark)" } : undefined}>
        <div className="mx-auto max-w-[880px]">
          <h2 className="mb-8 font-display text-[clamp(25px,2.8vw,37px)] leading-[1.12] text-house-black">{data.detail.title}</h2>
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-3">
            {data.detail.points.map((pt) => (
              <div key={pt.h}>
                <h3 className="font-sans text-[17px] font-semibold tracking-[0.04em] text-[color:var(--ins-ink)]">{pt.h}</h3>
                <p className="mt-2 font-sans text-[18.5px] leading-[1.6] text-house-brown/85">{pt.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Provenance places */}
      <section className="border-t border-house-brown/10 px-[5vw] py-12">
        <div className="mx-auto max-w-[760px]">
          <h2 className="font-display text-[clamp(25px,2.8vw,37px)] leading-[1.12] text-house-black">{data.placed.heading}</h2>
          <p className="mt-5 font-sans text-[20px] leading-[1.7] text-house-brown/85">{data.placed.body}</p>
        </div>
      </section>

      {/* Enquiry, 6 fields (adds company) */}
      <section id="enquire" className="scroll-mt-20 border-t border-house-brown/10 px-[5vw] py-14" style={{ background: "var(--color-house-cream-dark)" }}>
        <div className="mx-auto max-w-[620px]">
          <p className="font-sans text-[14px] tracking-[0.28em] uppercase text-[color:var(--ins-ink)]">Request a review</p>
          <h2 className="mt-3 font-display text-[clamp(27px,3vw,41px)] leading-[1.1] text-house-black">Ask for a review of your existing cover.</h2>
          <p className="mt-4 mb-8 max-w-[54ch] font-sans text-[19px] leading-[1.6] text-house-stone">
            Leave the details needed for the introduction and a Provenance specialist will contact you about the review.
          </p>
          <InsuranceEnquiryForm
            enquiryType={data.enquiryType}
            turnstileSiteKey={turnstileSiteKey}
            sourcePage={data.slug === "business" ? "/insurance/business" : `/insurance/business/${data.slug}`}
            submitLabel="Request a review"
            withCompany
          />
        </div>
      </section>
    </div>
  );
}
