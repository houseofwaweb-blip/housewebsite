import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GhostLink } from "@/components/primitives/GhostLink";

/**
 * Homepage — locked direction: Variant B (Georgian Photography).
 *
 * 8 sections per direction guide homepage spec:
 *   1. Hero — full-bleed Georgian photograph, Didot headline, House mode
 *   2. Action rail — Use HoWA / Design / Book care / Protect
 *   3. House / HoWA split — The House is the world. HoWA is the system.
 *   4. Design & Services — editorial lead-in + two calm product cards
 *   5. Protect — calm stewardship layer, not a fear play
 *   6. Shop & Journal — taste and inspiration
 *   7. Proof strip — standards, partners, sustainability
 *   8. Closing CTA — "For homes with soul..."
 *
 * Orientation rule: "Orient first, invite second, explain third."
 * "It should feel like a British House with technological clarity beneath it,
 * not a dashboard collage."
 */
export default function HomePage() {
  return (
    <>
      {/* ================================================================
          1. HERO — Full-bleed Georgian photograph, House mode.
          Eyebrow: "For homes with soul"
          ================================================================ */}
      <section
        aria-label="Welcome"
        className="relative min-h-[calc(100vh-76px)] flex items-center justify-center text-center overflow-hidden"
      >
        <Image
          src="/home/hero-georgian.png"
          alt="A Georgian terrace in Notting Hill at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(245,240,232,0.08)_0%,rgba(245,240,232,0)_25%,rgba(48,35,28,0.5)_100%)]"
        />

        <div className="relative z-10 max-w-[780px] px-6 text-house-cream">
          <span className="block mb-7 font-sans text-[11px] tracking-[0.22em] uppercase text-house-cream/80">
            For homes with soul
          </span>
          <h1
            className="em-accent font-display font-medium leading-[1.02] tracking-[-0.01em] mb-6 text-house-cream drop-shadow-[0_2px_24px_rgba(29,29,27,0.3)]"
            style={{ fontSize: "clamp(52px, 7vw, 96px)" }}
          >
            Beautiful living,
            <br />
            <em>intelligently</em> stewarded.
          </h1>
          <p className="mx-auto max-w-[600px] text-[18px] leading-[1.65] text-house-cream/90 drop-shadow-[0_1px_14px_rgba(29,29,27,0.3)] mb-10">
            The House of Willow Alexander brings design, care, protection, and
            trusted services into one clear world. HoWA is the stewardship system
            behind it — keeping the living record, plans, tasks, and protection
            of the home in one calm place.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/api/howa-bounce?source=hero-primary"
              className="inline-block px-7 py-3.5 font-sans text-[12px] tracking-[0.16em] uppercase no-underline border border-house-cream/90 text-house-cream bg-transparent transition-colors duration-[var(--t-med)] ease-out hover:bg-house-cream hover:text-house-brown"
            >
              Start HoWA
            </Link>
            <Link
              href="/the-house"
              className="inline-block px-7 py-3.5 font-sans text-[12px] tracking-[0.16em] uppercase no-underline border border-house-cream/40 text-house-cream/85 bg-transparent transition-colors duration-[var(--t-med)] ease-out hover:bg-house-cream hover:text-house-brown hover:border-house-cream"
            >
              Explore the House
            </Link>
          </div>

          <p className="mt-6 text-[12px] text-house-cream/50">
            <Link href="/book-consultation" className="underline decoration-house-cream/25 underline-offset-4 text-house-cream/50 hover:text-house-cream/80 transition-colors">
              Or book a consultation
            </Link>
          </p>
        </div>

        <div className="absolute bottom-5 right-6 z-10 font-sans text-[10px] tracking-[0.16em] uppercase text-house-cream/50">
          Notting Hill &middot; Golden Hour
        </div>
      </section>

      {/* ================================================================
          2. ACTION RAIL — Four cards: Use HoWA, Design, Care, Protect.
          "How can the House help today?"
          ================================================================ */}
      <section
        aria-label="Ways to begin"
        className="bg-house-cream border-t border-house-brown/10"
      >
        <div className="px-[5vw] py-3 text-center">
          <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-house-brown/40">
            How can the House help today?
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-[5vw] border-t border-house-brown/6">
          {[
            {
              eyebrow: "Use HoWA",
              title: "Start with the living record",
              desc: "A guided Companion captures your home, recommends what it needs, and builds a record that remembers everything.",
              cta: "Begin",
              href: "/api/howa-bounce?source=action-rail",
            },
            {
              eyebrow: "Design a space",
              title: "Commission something beautiful",
              desc: "Interiors and gardens shaped by taste and craft. Browse portfolios, start a brief, or let HoWA match you.",
              cta: "See design",
              href: "/design",
            },
            {
              eyebrow: "Book care",
              title: "Maintain the home properly",
              desc: "Gardening, cleaning, windows, gutters. Recurring or one-off, configured through HoWA and delivered by the House.",
              cta: "Book care",
              href: "/services",
            },
            {
              eyebrow: "Protect the home",
              title: "Reduce risk, build evidence",
              desc: "Home Protection Review, ongoing care plans, and insurance via Provenance. Calm prevention, not alarm.",
              cta: "Protect",
              href: "/protect",
            },
          ].map((card, i) => (
            <article
              key={card.eyebrow}
              className={`group relative px-6 pt-7 pb-8 ${i > 0 ? "lg:border-l border-house-brown/6" : ""}`}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-6 right-6 h-px opacity-0 transition-opacity duration-[var(--t-base)] ease-out group-hover:opacity-100"
                style={{ background: "var(--house-gold-dark)" }}
              />
              <span
                className="block font-sans text-[11px] tracking-[0.18em] uppercase mb-2"
                style={{ color: "var(--house-gold-dark)" }}
              >
                {card.eyebrow}
              </span>
              <h3 className="font-display text-[22px] font-medium leading-[1.15] text-house-brown mb-2">
                {card.title}
              </h3>
              <p className="font-sans text-[13px] leading-[1.55] text-house-brown/70 mb-3">
                {card.desc}
              </p>
              <GhostLink href={card.href}>{card.cta}</GhostLink>
            </article>
          ))}
        </div>
      </section>

      {/* ================================================================
          3. THE HOUSE / HoWA SPLIT
          "The House is the world. HoWA is the system."
          ================================================================ */}
      <section className="bg-house-white px-[5vw] py-24 border-t border-house-brown/8">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16">
            <Eyebrow>How it works</Eyebrow>
            <h2
              className="em-accent font-display font-medium leading-[1.1] tracking-[-0.01em] text-house-brown mt-4"
              style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
            >
              The House is the world.
              <br />
              HoWA is the <em>system.</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* The House */}
            <div>
              <span
                className="block font-sans text-[11px] tracking-[0.2em] uppercase mb-3"
                style={{ color: "var(--house-gold-dark)" }}
              >
                The House
              </span>
              <h3 className="font-display font-medium text-[22px] text-house-brown mb-3 leading-[1.2]">
                Taste, trust, cultural authority.
              </h3>
              <p className="font-sans text-[14px] leading-[1.6] text-house-brown/70">
                The visible, human layer. The standard setter, the curator, the
                validator of quality and taste. Editorial voice (The Hearth),
                House Approved seal, partner curation.
              </p>
            </div>

            {/* HoWA */}
            <div>
              <span className="block font-sans text-[11px] tracking-[0.2em] uppercase text-howa-teal-dark mb-3">
                HoWA
              </span>
              <h3 className="font-display font-medium text-[22px] text-house-brown mb-3 leading-[1.2]">
                Remembers. Guides. Protects.
              </h3>
              <p className="font-sans text-[14px] leading-[1.6] text-house-brown/70">
                The intelligence layer. Captures the home, recommends the next
                right action, connects you to the right hands, and keeps every
                outcome in one living record. Memory that compounds.
              </p>
            </div>

            {/* The Ecosystem */}
            <div>
              <span
                className="block font-sans text-[11px] tracking-[0.2em] uppercase mb-3"
                style={{ color: "var(--house-gold-dark)" }}
              >
                The Ecosystem
              </span>
              <h3 className="font-display font-medium text-[22px] text-house-brown mb-3 leading-[1.2]">
                House teams. Approved partners.
              </h3>
              <p className="font-sans text-[14px] leading-[1.6] text-house-brown/70">
                Owned services, approved contractors, certified suppliers,
                insurance partners, curated commerce. Fulfilment runs through
                the ecosystem. Everything writes back to the record.
              </p>
            </div>
          </div>

          <div className="text-center mt-14">
            <GhostLink href="/howa">See how HoWA works</GhostLink>
          </div>
        </div>
      </section>

      {/* ================================================================
          4. DESIGN & SERVICES — Editorial lead-in with two product cards.
          ================================================================ */}
      <section className="bg-house-cream px-[5vw] py-24 border-t border-house-brown/8">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <Eyebrow>Design &amp; Care</Eyebrow>
            <h2 className="em-accent font-display font-medium text-[clamp(32px,4.5vw,48px)] leading-[1.1] tracking-[-0.01em] text-house-brown mt-4">
              Spaces shaped by taste. Homes kept by <em>discipline.</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Design */}
            <div className="bg-house-white border border-house-brown/8 p-10 flex flex-col">
              <span
                className="block font-sans text-[11px] tracking-[0.2em] uppercase mb-3"
                style={{ color: "var(--house-gold-dark)" }}
              >
                Design
              </span>
              <h3 className="font-display font-medium text-[28px] text-house-brown mb-3 leading-[1.15]">
                Interiors &amp; Gardens
              </h3>
              <p className="font-sans text-[15px] leading-[1.6] text-house-brown/70 mb-6 flex-1">
                Whole-house renovations and single-room reads. Planting schemes
                and landscape work. Browse featured designers, start a brief
                through the Companion, or let HoWA match you to the right studio.
              </p>
              <div className="flex flex-wrap gap-4">
                <GhostLink href="/design/interiors">Interiors</GhostLink>
                <GhostLink href="/design/gardens">Gardens</GhostLink>
              </div>
            </div>

            {/* Services */}
            <div className="bg-house-white border border-house-brown/8 p-10 flex flex-col">
              <span
                className="block font-sans text-[11px] tracking-[0.2em] uppercase mb-3"
                style={{ color: "var(--house-gold-dark)" }}
              >
                Care
              </span>
              <h3 className="font-display font-medium text-[28px] text-house-brown mb-3 leading-[1.15]">
                Services &amp; Maintenance
              </h3>
              <p className="font-sans text-[15px] leading-[1.6] text-house-brown/70 mb-6 flex-1">
                Gardening, cleaning, window cleaning, gutter clearing. Recurring
                plans or one-off bookings, all routed through HoWA. The House
                coordinates the partners. The record remembers everything.
              </p>
              <GhostLink href="/services">See services</GhostLink>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          5. PROTECT — Calm stewardship layer, not a fear play.
          ================================================================ */}
      <section className="bg-house-white px-[5vw] py-24 border-t border-house-brown/8">
        <div className="max-w-[900px] mx-auto grid md:grid-cols-[1.2fr_1fr] gap-14 items-start">
          <div>
            <Eyebrow>Protect</Eyebrow>
            <h2 className="em-accent font-display font-medium text-[clamp(32px,4vw,44px)] leading-[1.1] tracking-[-0.01em] text-house-brown mt-4 mb-5">
              Care recorded is <em>risk reduced.</em>
            </h2>
            <p className="font-sans text-[16px] leading-[1.65] text-house-brown/70 mb-6">
              Home Protection Review, ongoing care plans, insurance via Provenance.
              A maintained, documented home is a cheaper home to insure. HoWA
              holds the evidence. No other platform does.
            </p>
            <p className="font-sans text-[14px] leading-[1.6] text-house-brown/70 mb-8">
              The Protect family connects review, plan, insurance, and reminders
              into one calm stewardship layer. No alarm. No fear. Just
              foresight, evidence, and continuity.
            </p>
            <GhostLink href="/protect">Protect the home</GhostLink>
          </div>

          <div className="space-y-4">
            {[
              { title: "Home Protection Review", state: "Steward tier", desc: "In-person whole-home preventative assessment." },
              { title: "Ongoing Protection Plan", state: "HoWA+", desc: "Regular verification, reminders, recorded oversight." },
              { title: "Insurance via Provenance", state: "Register interest", desc: "Cover that understands period homes. FCA-regulated." },
            ].map((item) => (
              <div key={item.title} className="border-t border-house-brown/8 pt-4">
                <div className="flex items-baseline justify-between mb-1">
                  <h4 className="font-sans font-medium text-[15px] text-house-brown">{item.title}</h4>
                  <span className="font-sans text-[10px] tracking-[0.16em] uppercase text-house-brown/50">{item.state}</span>
                </div>
                <p className="font-sans text-[13px] text-house-brown/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          6. SHOP & JOURNAL — Taste and inspiration.
          ================================================================ */}
      <section className="bg-house-cream px-[5vw] py-24 border-t border-house-brown/8">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-8">
          {/* Shop */}
          <Link
            href="/shop"
            className="group block bg-house-white border border-house-brown/8 p-10 no-underline transition-shadow duration-[var(--t-slow)] ease-out hover:shadow-[0_12px_40px_rgba(48,35,28,0.08)]"
          >
            <span
              className="block font-sans text-[11px] tracking-[0.2em] uppercase mb-3"
              style={{ color: "var(--house-gold-dark)" }}
            >
              Shop
            </span>
            <h3 className="font-display font-medium text-[28px] text-house-brown mb-3 leading-[1.15] transition-colors duration-[var(--t-base)] group-hover:text-[var(--house-gold-dark)]">
              House Approved Objects
            </h3>
            <p className="font-sans text-[15px] leading-[1.6] text-house-brown/70">
              Curated homeware, garden tools, and objects for the home. Selected
              by the House. Verified through HoWA. Not a marketplace. A
              considered edit.
            </p>
          </Link>

          {/* Journal */}
          <Link
            href="/journal"
            className="group block bg-house-white border border-house-brown/8 p-10 no-underline transition-shadow duration-[var(--t-slow)] ease-out hover:shadow-[0_12px_40px_rgba(48,35,28,0.08)]"
          >
            <span
              className="block font-sans text-[11px] tracking-[0.2em] uppercase mb-3"
              style={{ color: "var(--house-gold-dark)" }}
            >
              The Hearth
            </span>
            <h3 className="font-display font-medium text-[28px] text-house-brown mb-3 leading-[1.15] transition-colors duration-[var(--t-base)] group-hover:text-[var(--house-gold-dark)]">
              Writing on Homes
            </h3>
            <p className="font-sans text-[15px] leading-[1.6] text-house-brown/70">
              Long-form writing on the craft of looking after a place properly.
              Seasonal features, design profiles, garden notes, and the things
              that matter when you live somewhere you love.
            </p>
          </Link>
        </div>
      </section>

      {/* ================================================================
          7. PROOF STRIP — Standards, partners, sustainability.
          "Three to five signals only."
          ================================================================ */}
      <section className="bg-house-white px-[5vw] py-16 border-t border-house-brown/8">
        <div className="max-w-[1000px] mx-auto flex flex-wrap justify-center gap-x-14 gap-y-6 text-center">
          {[
            { num: "247", label: "homes stewarded" },
            { num: "4", label: "launch partners" },
            { num: "4.9", label: "average rating" },
            { num: "0", label: "net emissions" },
          ].map((s) => (
            <div key={s.label}>
              <span className="block font-display text-[36px] font-medium text-house-brown leading-none mb-1">
                {s.num}
              </span>
              <span className="font-sans text-[11px] tracking-[0.16em] uppercase text-house-brown/50">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
          8. CLOSING CTA — "For homes with soul..."
          "Primary CTA back to HoWA with a sentence about proper care
          not being left to memory alone."
          ================================================================ */}
      <section className="bg-house-cream px-[5vw] py-24 border-t border-house-brown/8 text-center">
        <div className="max-w-[640px] mx-auto">
          <p className="font-display italic text-[clamp(22px,3vw,30px)] leading-[1.4] text-house-brown mb-4">
            For homes with soul, proper care should never be left to memory alone.
          </p>
          <p className="font-sans text-[15px] text-house-brown/70 mb-10">
            The House defines what good looks like.{" "}
            <span style={{ color: "var(--house-gold-dark)" }}>
              HoWA ensures it happens.
            </span>
          </p>
          <Link
            href="/api/howa-bounce?source=homepage-footer"
            className="inline-block px-8 py-4 font-sans text-[12px] tracking-[0.18em] uppercase no-underline text-house-cream transition-all duration-[var(--t-base)] ease-out hover:opacity-90"
            style={{ background: "var(--house-gold-dark)" }}
          >
            Start HoWA
          </Link>
        </div>
      </section>

      {/* Tagline */}
      <div className="text-center border-t border-house-brown/8 bg-house-cream px-5 py-6">
        <p className="font-display italic text-[14px] text-house-brown/50 tracking-[0.04em]">
          Ownership is passive. Stewardship is intentional.
        </p>
      </div>
    </>
  );
}
