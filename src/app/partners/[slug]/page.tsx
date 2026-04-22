import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/lib/cms/fetch";
import { partnerBySlugQuery } from "@/lib/cms/queries";
import { urlFor } from "@/lib/cms/image";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { StateBadge } from "@/components/primitives/StateBadge";
import { PortableText } from "@/components/cms/PortableText";
import type { PortableTextBlock } from "@portabletext/types";
import {
  LAUNCH_PARTNERS,
  PARTNER_ORDER,
  type LaunchPartner,
  type PartnerSlug,
} from "@/lib/partners-data";
import { getPartnerBySlug, getAllPartners, getAllPartnerSlugs } from "@/lib/cms/partners";

/**
 * /partners/[slug] — Editorial Cover template (variant A).
 * Spec: /ux/03-design-interiors/variant-A.html + _commercial.css.
 *
 * This is the base layout for every launch partner (designer and supplier).
 * Local data drives the 4 launch partners; Sanity fallback handles any new
 * partner authored later.
 *
 * Order:
 *   1. Full-bleed hero cover (image + gradient + cream headlines)
 *   2. Designer block (portrait + copy, House Approved seal, meta row)
 *   3. Transition band (House → HoWA)
 *   4. Packages ladder (3-up, featured middle)
 *   5. Brief Builder band (Companion mock)
 *   6. Projects grid (3-col, 4:5 portraits)
 *   7. FAQ (static Q/A list)
 *   8. Closing poem + CTA
 *   9. Italic tagline
 */

interface SanityPartnerDoc {
  name: string;
  type: "design-studio" | "interior-designer" | "craftsman" | "brand-partner";
  shortBio: string;
  longBio?: PortableTextBlock[];
  founderPortrait?: { asset: { _ref: string }; alt: string };
  heroImage?: { asset: { _ref: string }; alt: string };
  portfolio?: Array<{
    title: string;
    year?: string;
    location?: string;
    image: { asset: { _ref: string } };
    alt: string;
    caption?: string;
  }>;
  specialties?: string[];
  serviceAreas?: string[];
  website?: string;
  instagram?: string;
  houseApprovedSeal?: boolean;
  seo?: { title?: string; description?: string; noindex?: boolean };
}

function isLocalSlug(slug: string): slug is PartnerSlug {
  return PARTNER_ORDER.includes(slug as PartnerSlug);
}

async function loadSanityPartner(slug: string): Promise<SanityPartnerDoc | null> {
  return sanityFetch<SanityPartnerDoc | null>({
    query: partnerBySlugQuery,
    params: { slug },
    tags: [`partner:${slug}`, "type:partner"],
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (isLocalSlug(slug)) {
    const p = LAUNCH_PARTNERS[slug];
    return { title: p.name, description: p.shortBio };
  }
  const partner = await loadSanityPartner(slug);
  if (!partner) return { title: "Partner not found" };
  return {
    title: partner.seo?.title ?? partner.name,
    description: partner.seo?.description ?? partner.shortBio,
    robots: partner.seo?.noindex ? { index: false, follow: true } : undefined,
  };
}

const TYPE_LABEL: Record<SanityPartnerDoc["type"], string> = {
  "design-studio": "Design studio",
  "interior-designer": "Interior designer",
  craftsman: "Craftsman",
  "brand-partner": "Brand partner",
};

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (isLocalSlug(slug)) {
    return <LocalPartnerPage partner={LAUNCH_PARTNERS[slug]} />;
  }

  const partner = await loadSanityPartner(slug);
  if (!partner) notFound();

  return <SanityPartnerPage partner={partner} />;
}

/** Optionally splits `raw` at the `em` substring and italicises the tail. */
function withEm(raw: string, em?: string) {
  if (!em || !raw.includes(em)) return raw;
  const [head, ...rest] = raw.split(em);
  return (
    <>
      {head}
      <em className="italic font-normal">{em}</em>
      {rest.join(em)}
    </>
  );
}

function LocalPartnerPage({ partner: p }: { partner: LaunchPartner }) {
  return (
    <>
      {/* 1. Hero cover — full-bleed image with gradient + centred text */}
      <section className="relative min-h-[720px] flex items-end justify-center text-center px-[5vw] pb-[88px] overflow-hidden">
        <Image
          src={p.heroImage}
          alt={p.heroCaption}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(29,29,27,0.38)_0%,rgba(29,29,27,0.1)_30%,rgba(29,29,27,0.6)_100%)]"
        />

        <div className="relative z-10 max-w-[820px] text-house-cream">
          <span className="block mb-6 font-sans text-[11px] tracking-[0.24em] uppercase text-house-cream/85">
            {p.heroEyebrow}
          </span>
          <h1
            className="mb-5 font-display font-medium leading-[1.04] tracking-[-0.01em] text-house-cream drop-shadow-[0_2px_24px_rgba(29,29,27,0.35)]"
            style={{ fontSize: "clamp(56px, 7.5vw, 108px)" }}
          >
            {withEm(p.heroHeadline, p.heroHeadlineEm)}
          </h1>
          <p className="mx-auto max-w-[620px] mb-9 font-sans text-[18px] text-house-cream/85 drop-shadow-[0_1px_12px_rgba(29,29,27,0.3)]">
            {p.heroSub}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href="#designer-block"
              className="inline-block px-[26px] py-[13px] font-sans text-[12px] tracking-[0.16em] uppercase no-underline text-house-cream border border-house-cream/85 transition-all duration-[var(--t-base)] ease-out hover:bg-house-cream hover:text-house-brown"
            >
              Meet the studio
            </a>
            <Link
              href={`/book-consultation?partner=${p.slug}`}
              className="inline-block px-[26px] py-[13px] font-sans text-[12px] tracking-[0.16em] uppercase no-underline text-house-brown bg-house-cream border border-house-cream transition-all duration-[var(--t-base)] ease-out hover:bg-house-cream-dark hover:border-house-cream-dark"
            >
              Start a brief →
            </Link>
          </div>
        </div>

        <span className="absolute bottom-4 right-6 z-10 font-sans text-[10px] tracking-[0.16em] uppercase text-house-cream/55">
          {p.heroCaption}
        </span>
      </section>

      {/* 2. Designer block */}
      <section
        id="designer-block"
        className="bg-house-cream grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-14 items-center px-[5vw] py-20"
      >
        <div className="relative aspect-[4/5] w-full bg-house-cream-dark border border-house-brown/8 overflow-hidden">
          <Image
            src={p.portraitImage}
            alt={`${p.name} portrait`}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <div className="flex items-center gap-3.5 mb-5 flex-wrap">
            <span className="font-sans text-[11px] tracking-[0.22em] uppercase text-house-gold">
              {p.houseApprovedSeal ? "House Approved Designer" : p.typeLabel}
            </span>
            {p.houseApprovedSeal ? (
              <span className="inline-flex items-center gap-1.5 font-sans text-[10px] tracking-[0.2em] uppercase text-house-gold border border-house-gold px-2.5 py-[3px]">
                ■ House Approved
              </span>
            ) : null}
          </div>
          <h2 className="em-accent font-display font-medium text-[clamp(32px,3.6vw,46px)] leading-[1.1] tracking-[-0.005em] text-house-brown mb-3.5">
            {p.name}.
          </h2>
          <div className="font-sans italic text-[16px] text-house-stone mb-5">
            {p.role}
          </div>
          {p.longBio.map((para, i) => (
            <p
              key={i}
              className={`font-display text-house-brown leading-[1.6] max-w-[520px] mb-5 ${
                i === 0 ? "text-[20px]" : "text-[16px] text-house-stone"
              }`}
            >
              {para}
            </p>
          ))}
          <div className="flex gap-10 border-t border-house-brown/12 pt-5 mt-6 flex-wrap">
            <Meta label="Founded" value={p.founded} />
            <Meta label="Based" value={p.basedIn} />
            <Meta label="Recent" value={p.recent} />
          </div>
        </div>
      </section>

      {/* 3. Transition band */}
      <div
        className="relative text-center px-[5vw] py-[42px] border-t border-house-brown/10 border-b border-house-brown/8"
        style={{
          background:
            "linear-gradient(180deg, var(--house-cream) 0%, var(--house-white) 100%)",
        }}
      >
        <span
          aria-hidden="true"
          className="block w-[120px] h-px mx-auto mb-[14px] bg-house-gold opacity-60"
        />
        <span
          aria-hidden="true"
          className="absolute top-[34px] left-1/2 -translate-x-1/2 font-display text-house-gold text-[18px] leading-none"
        >
          ·
        </span>
        <p className="font-sans italic text-[15px] text-house-stone tracking-[0.04em]">
          The House introduces.{" "}
          <em className="not-italic font-sans text-[11px] tracking-[0.08em] uppercase text-howa-teal ml-2 pl-[10px] border-l border-house-brown/20">
            HoWA configures
          </em>
        </p>
      </div>

      {/* 4. Packages ladder */}
      <section className="bg-house-white px-[5vw] pt-[72px] pb-[96px]">
        <div className="text-center mb-14">
          <span className="block mb-[14px] font-sans text-[11px] tracking-[0.22em] uppercase text-howa-teal">
            HoWA · Package Ladder
          </span>
          <h2 className="font-sans font-normal text-[clamp(32px,3.4vw,44px)] leading-[1.12] tracking-[-0.015em] text-house-brown mb-[10px]">
            {p.packagesHeading}
            {p.packagesHeadingEm ? (
              <>
                {" "}
                <em className="italic font-light text-howa-teal">
                  {p.packagesHeadingEm}
                </em>
              </>
            ) : null}
          </h2>
          <p className="mx-auto max-w-[620px] font-sans text-[15px] text-house-brown/70">
            {p.packagesLede}
          </p>
        </div>

        <div className="mx-auto max-w-[1180px] grid grid-cols-1 md:grid-cols-3">
          {p.packages.map((pkg) => {
            const isFeat = pkg.featured;
            return (
              <div
                key={pkg.tier}
                className={
                  isFeat
                    ? "relative z-10 bg-howa-navy text-house-cream border border-howa-navy p-9 pb-9 flex flex-col md:-translate-y-[16px] shadow-[0_24px_60px_rgba(30,42,58,0.18)]"
                    : `relative bg-white text-house-brown border border-house-brown/18 p-9 pb-9 flex flex-col md:not-last:border-r-0`
                }
              >
                <span
                  className={
                    isFeat
                      ? "font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold-light mb-3.5"
                      : "font-sans text-[10px] tracking-[0.22em] uppercase text-house-gold mb-3.5"
                  }
                >
                  {pkg.tier}
                </span>
                <h4
                  className={`font-display font-medium text-[32px] leading-[1.1] tracking-[-0.005em] mb-1 ${
                    isFeat ? "text-house-cream" : "text-house-brown"
                  }`}
                >
                  {pkg.name}
                </h4>
                <div
                  className={`font-sans text-[13px] mb-5 ${
                    isFeat ? "text-house-cream/65" : "text-house-stone"
                  }`}
                >
                  from{" "}
                  <strong
                    className={`font-medium text-[20px] ${
                      isFeat ? "text-house-gold-light" : "text-house-brown"
                    }`}
                  >
                    {pkg.priceFrom}
                  </strong>{" "}
                  · {pkg.priceUnit}
                </div>
                <div
                  className={`font-sans italic text-[15px] py-3 mb-5 border-t border-b ${
                    isFeat
                      ? "text-house-cream/70 border-house-cream/15"
                      : "text-house-stone border-house-brown/12"
                  }`}
                >
                  {pkg.bestFor}
                </div>
                <ul
                  className={`flex-1 list-none pl-4 text-[13.5px] leading-[1.85] ${
                    isFeat ? "text-house-cream/85" : "text-house-brown"
                  }`}
                >
                  {pkg.inclusions.map((inc) => (
                    <li
                      key={inc}
                      className={`relative py-[2px] before:content-['—'] before:absolute before:-left-4 ${
                        isFeat
                          ? "before:text-house-gold-light"
                          : "before:text-house-gold"
                      }`}
                    >
                      {inc}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link
                    href={`/book-consultation?partner=${p.slug}&package=${encodeURIComponent(pkg.name)}`}
                    className={
                      isFeat
                        ? "inline-block font-sans text-[11px] tracking-[0.16em] uppercase px-5 py-2.5 no-underline text-white bg-house-gold border border-house-gold transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
                        : "inline-block font-sans text-[11px] tracking-[0.16em] uppercase px-5 py-2.5 no-underline text-house-brown border border-house-brown/50 transition-all duration-[var(--t-base)] ease-out hover:bg-house-brown hover:text-house-cream"
                    }
                  >
                    {pkg.ctaLabel}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Brief builder band */}
      <section className="bg-house-white border-t border-house-brown/8 px-[5vw] pt-[72px] pb-[96px] grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-14 items-center">
        <div>
          <span className="block mb-5 font-sans text-[11px] tracking-[0.22em] uppercase text-howa-teal">
            HoWA · Brief Builder
          </span>
          <h2 className="font-sans font-normal text-[clamp(32px,3.4vw,44px)] leading-[1.12] tracking-[-0.015em] text-house-brown mb-3.5">
            Your brief, built by the{" "}
            <em className="italic font-light text-howa-teal">Companion.</em>
          </h2>
          <p className="max-w-[480px] mb-7 font-sans text-[16px] leading-[1.65] text-house-brown/70">
            A short guided conversation captures the home, style, priorities,
            and budget — then routes you to the right designer and package,
            with every answer saved into your home record.
          </p>
          <Link
            href="/api/howa-bounce?source=partner-brief"
            className="inline-block px-[26px] py-[13px] font-sans text-[12px] tracking-[0.16em] uppercase no-underline bg-house-gold text-white border border-house-gold transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
          >
            Start a brief
          </Link>
        </div>

        <div
          className="relative bg-howa-paper border border-house-brown/20 p-6"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0 31px, rgba(48,35,28,0.04) 31px 32px)",
          }}
        >
          {[
            {
              num: "I.",
              label: "Your home",
              val: (
                <>
                  Georgian terrace, Notting Hill ·{" "}
                  <em className="italic text-howa-teal">4 bedrooms</em>
                </>
              ),
            },
            {
              num: "II.",
              label: "Scope",
              val: (
                <>
                  Drawing room + kitchen,{" "}
                  <em className="italic text-howa-teal">considering full house</em>
                </>
              ),
            },
            {
              num: "III.",
              label: "Style",
              val: (
                <>
                  Layered, quiet, <em className="italic text-howa-teal">not minimal</em>
                </>
              ),
            },
            { num: "IV.", label: "Budget", val: <>£15,000 — £25,000</> },
            {
              num: "V.",
              label: "Recommendation",
              val: (
                <em className="italic text-howa-teal">
                  {p.packages[1]?.name ?? "Featured"} · {p.name}
                </em>
              ),
            },
          ].map((s, i, arr) => (
            <div
              key={s.label}
              className={`flex gap-[14px] py-[14px] ${
                i === arr.length - 1
                  ? ""
                  : "border-b border-dashed border-house-brown/20"
              }`}
            >
              <span className="min-w-[20px] font-sans italic text-[16px] text-house-gold">
                {s.num}
              </span>
              <div>
                <div className="mb-1 font-sans text-[10px] tracking-[0.18em] uppercase text-house-stone">
                  {s.label}
                </div>
                <div className="font-sans text-[17px] leading-[1.3] text-house-brown">
                  {s.val}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Projects grid */}
      <section className="bg-house-cream border-t border-house-brown/8 px-[5vw] pt-20 pb-24">
        <div className="text-center mb-12">
          <span className="block mb-3.5 font-sans text-[11px] tracking-[0.22em] uppercase text-house-gold">
            Recent Work
          </span>
          <h2 className="em-accent font-display font-medium text-[42px] leading-[1.1] tracking-[-0.005em] text-house-brown">
            {p.projectsHeading}
            {p.projectsHeadingEm ? (
              <>
                {" "}
                <em className="italic font-normal">{p.projectsHeadingEm}</em>
              </>
            ) : null}
          </h2>
        </div>
        <div className="mx-auto max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {p.projects.map((proj) => (
            <article key={proj.title} className="flex flex-col">
              <div className="relative aspect-[4/5] w-full bg-house-cream-dark mb-3.5 overflow-hidden">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="font-sans text-[10px] tracking-[0.2em] uppercase text-house-gold mb-1">
                {proj.caption}
              </div>
              <div className="font-display font-medium text-[18px] text-house-brown">
                {proj.title}
              </div>
              <div className="font-sans text-[12px] text-house-stone mt-0.5">
                {proj.meta}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="bg-house-white px-[5vw] py-[72px] border-t border-house-brown/8">
        <div className="text-center mb-10">
          <h2 className="font-sans font-normal text-[34px] tracking-[-0.015em] text-house-brown">
            Before you commission,{" "}
            <em className="italic font-light text-howa-teal">some questions.</em>
          </h2>
        </div>
        <div className="mx-auto max-w-[780px]">
          {p.faq.map((f, i) => (
            <div
              key={f.q}
              className={`flex gap-6 items-baseline py-[18px] border-t border-house-brown/12 ${
                i === p.faq.length - 1 ? "border-b" : ""
              }`}
            >
              <div className="flex-1 font-sans text-[20px] text-house-brown">
                {f.q}
              </div>
              <div className="max-w-[260px] font-sans text-[13px] leading-[1.6] text-house-stone">
                {f.a}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Closing poem */}
      <section className="bg-house-cream border-t border-house-brown/8 px-[5vw] py-[88px] text-center">
        <p className="mx-auto max-w-[640px] mb-7 font-display italic text-[24px] leading-[1.3] text-house-brown">
          {withEm(p.closingLine, p.closingLineEm)}
        </p>
        <Link
          href={`/book-consultation?partner=${p.slug}`}
          className="inline-block px-[30px] py-[15px] font-sans text-[13px] tracking-[0.16em] uppercase no-underline bg-house-gold text-white border border-house-gold transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
        >
          Start a design brief
        </Link>
      </section>

      {/* 9. Tagline */}
      <div className="text-center border-t border-house-brown/10 bg-house-cream px-5 py-6">
        <p className="font-sans italic text-[14px] text-house-stone tracking-[0.04em]">
          Ownership is passive. Stewardship is intentional.
        </p>
      </div>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="mb-1 font-sans text-[10px] tracking-[0.18em] uppercase text-house-stone">
        {label}
      </span>
      <span className="font-sans text-[17px] text-house-brown">{value}</span>
    </div>
  );
}

/* --------------------------------------------------------------------------
 * Sanity fallback — kept simple; authored partners can render via this path.
 * -------------------------------------------------------------------------- */
function SanityPartnerPage({ partner }: { partner: SanityPartnerDoc }) {
  return (
    <article className="bg-house-cream text-house-brown">
      <section className="px-[5vw] py-[14vh]">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-[1fr_minmax(360px,480px)] gap-16 items-end">
          <div>
            <Eyebrow>{TYPE_LABEL[partner.type]}</Eyebrow>
            <h1 className="font-display text-[clamp(44px,6vw,88px)] font-medium leading-[1.05] tracking-[-0.01em] mt-4">
              {partner.name}
            </h1>
            <p className="font-sans text-[20px] leading-[1.6] text-house-brown/80 mt-8 max-w-[56ch]">
              {partner.shortBio}
            </p>
            {partner.houseApprovedSeal ? (
              <div className="mt-6">
                <StateBadge state="live">House Approved</StateBadge>
              </div>
            ) : null}
          </div>
          {partner.heroImage ? (
            <Image
              src={urlFor(partner.heroImage).width(960).height(1200).url()}
              alt={partner.heroImage.alt}
              width={960}
              height={1200}
              sizes="(min-width: 1024px) 480px, 100vw"
              className="w-full h-auto"
              priority
            />
          ) : null}
        </div>
      </section>

      {partner.longBio?.length ? (
        <section className="px-[5vw] pb-16">
          <div className="max-w-[720px] mx-auto">
            <PortableText value={partner.longBio} />
          </div>
        </section>
      ) : null}
    </article>
  );
}

export async function generateStaticParams() {
  const slugs = await getAllPartnerSlugs();
  return slugs.map((slug) => ({ slug }));
}
