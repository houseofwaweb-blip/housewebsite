import Image from "next/image";
import Link from "next/link";
import s from "./insurance.module.css";

/**
 * /insurance — the Insurance hub (REVISIONS v3 §8).
 *
 * v3 makes Insurance a PARENT hub with two principal routes, Home and Pet.
 * This page must:
 *   - explain the House's role;
 *   - identify the authorised insurance provider or partner;
 *   - present Home Insurance and Pet Insurance as separate choices;
 *   - state whether the action is an introduction, enquiry or quotation;
 *   - avoid implying the House underwrites, arranges or advises.
 *
 * A Home Protection Review is an operational House service and is kept clearly
 * apart from the regulated insurance products (§8).
 *
 * Forbidden here (§11 do-not-use): "House Approved Insurance", generic
 * statements implying all insurance is the same product, claims-management
 * promises, and any suggestion HoWA gives regulated advice.
 *
 * COMPLIANCE GATE: all insurance copy requires approval from the authorised
 * insurance partner before launch.
 */

export const metadata = {
  title: "Insurance introductions from the House",
  description:
    "House of Willow Alexander introduces you to an authorised, FCA-regulated insurance partner. Two separate routes: Home Insurance and Pet Insurance.",
};

const ROUTES = [
  {
    title: "Home Insurance",
    lede: "For period homes, listed fabric, non-standard construction and contents that need valuing properly.",
    body: "A named specialist who reads the house rather than the postcode, and who can work with the things a high-street policy quietly excludes.",
    href: "/insurance/home",
    cta: "Request a Home Insurance introduction",
    image: "/home-v4/protect-insurance.webp",
    alt: "An Edwardian London townhouse at golden hour",
    pos: "center",
  },
  {
    title: "Pet Insurance",
    lede: "For dogs, cats, older animals and pets other insurers have already declined.",
    body: "Lifetime, maximum benefit, time-limited and accident-only cover explained plainly, so the choice is not made on price alone.",
    href: "/insurance/pet",
    cta: "Request a Pet Insurance introduction",
    image: "/services/subbrands/dog-walking.webp",
    alt: "A dog lead, waste-bag holder and travel bowl laid out on a wooden table",
    pos: "center bottom",
  },
];

const ROLE = [
  { k: "What the House does", v: "Makes an introduction, and passes on what you have told us with your consent. That is the whole of our role." },
  { k: "What the House does not do", v: "We do not underwrite, arrange or advise on insurance, we do not quote, and we do not handle claims." },
  { k: "Who does the regulated work", v: "Provenance Insurance Brokers, authorised and regulated by the Financial Conduct Authority." },
  { k: "What the action is", v: "An introduction. Not a quotation, and not a policy. Any quote comes from the partner after they have spoken to you." },
];

export default function InsuranceHubPage() {
  return (
    <div className={s.page}>
      {/* Hub hero — the House's role, stated first. */}
      <section className="px-[5vw] pt-[clamp(48px,6vw,96px)] pb-[clamp(36px,4.5vw,68px)]">
        <div className="mx-auto max-w-[880px] text-center">
          <p className="mb-5 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">
            Insurance · Introduced by the House
          </p>
          <h1 className="font-display text-[clamp(32px,5vw,60px)] leading-[1.06] text-house-brown">
            We make the introduction. <em>They do the regulated work.</em>
          </h1>
          <p className="mx-auto mt-7 max-w-[64ch] font-sans text-[17px] leading-[1.65] text-house-stone">
            House of Willow Alexander introduces you to an authorised,
            FCA-regulated insurance partner. Home and Pet are two different
            products with two different conversations, so they have two
            different routes below.
          </p>
        </div>
      </section>

      {/* The two principal routes (§8) — never one generic insurance card. */}
      <section className="px-[5vw] pb-[clamp(48px,6vw,92px)]">
        <div className="mx-auto grid max-w-[1180px] gap-5 md:grid-cols-2">
          {ROUTES.map((r) => (
            <Link
              key={r.title}
              href={r.href}
              className="group flex flex-col border border-house-brown/12 bg-house-white no-underline transition-colors hover:border-house-gold"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-house-cream-dark">
                <Image
                  src={r.image}
                  alt={r.alt}
                  fill
                  sizes="(min-width: 768px) 44vw, 100vw"
                  style={{ objectPosition: r.pos }}
                  className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-8">
                <h2 className="mb-3 font-display text-[28px] leading-tight text-house-brown">{r.title}</h2>
                <p className="mb-3 font-sans text-[16px] leading-[1.55] text-house-brown">{r.lede}</p>
                <p className="mb-7 flex-1 font-sans text-[15px] leading-[1.55] text-house-stone">{r.body}</p>
                <span className="font-sans text-[12px] tracking-[0.18em] uppercase text-house-gold-ink transition-colors group-hover:text-house-brown">
                  {r.cta} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* The House's role, in plain terms (§8 hub requirements). */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(44px,5.5vw,84px)]" style={{ background: "var(--color-house-cream)" }}>
        <div className="mx-auto max-w-[1080px]">
          <p className="mb-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">Our role</p>
          <h2 className="mb-9 font-display text-[clamp(24px,3vw,38px)] leading-[1.1] text-house-brown">
            So there is no confusion about who does what.
          </h2>
          <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {ROLE.map((r) => (
              <div key={r.k} className="border-t border-house-brown/15 pt-4">
                <dt className="mb-2 font-sans text-[11px] tracking-[0.22em] uppercase text-house-gold-ink">{r.k}</dt>
                <dd className="m-0 font-sans text-[15px] leading-[1.6] text-house-stone">{r.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Home Protection Review — a House SERVICE, kept clearly apart from the
          regulated insurance products (§8). */}
      <section className="border-t border-house-brown/10 px-[5vw] py-[clamp(44px,5.5vw,84px)]" style={{ background: "var(--color-house-white)" }}>
        <div className="mx-auto max-w-[880px]">
          <p className="mb-3 font-sans text-[12px] tracking-[0.28em] uppercase text-house-gold-ink">
            A House service, not an insurance product
          </p>
          <h2 className="mb-4 font-display text-[clamp(23px,2.8vw,36px)] leading-[1.1] text-house-brown">
            Home Protection Review
          </h2>
          <p className="mb-6 max-w-[62ch] font-sans text-[16px] leading-[1.65] text-house-stone">
            An in-person review of the property by House-vetted specialists: a
            condition survey, an evidence pack and a prioritised works list,
            filed to your Home Record in HoWA. It is a service you book from the
            House. It is not insurance, it is not regulated, and it is not a
            condition of any introduction.
          </p>
          <Link
            href="/insurance/home-protection"
            className="inline-flex items-center gap-2 border border-house-brown/25 px-7 py-3.5 font-sans text-[12px] tracking-[0.18em] uppercase text-house-brown no-underline transition-colors hover:border-house-gold"
          >
            See Home Protection Review <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* Regulatory disclosure. */}
      <section className={s.fca}>
        <p>
          House of Willow Alexander acts as an introducer only. Insurance
          products arranged via Provenance Insurance Brokers, authorised and
          regulated by the FCA. We do not advise on, arrange, or conduct
          regulated insurance activity. Introductions are passed to
          FCA-authorised partners for any subsequent discussion, quotation, or
          contract.{" "}
          See our <Link href="/legal/privacy">privacy page</Link> for how your details are handled.
        </p>
      </section>
    </div>
  );
}
