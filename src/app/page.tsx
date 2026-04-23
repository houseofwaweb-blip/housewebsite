import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GhostLink } from "@/components/primitives/GhostLink";
import { NewsletterInline } from "@/components/marketing/NewsletterInline";
import { getNewsletterBlock } from "@/lib/cms/newsletter";
import { getPageSections, cms } from "@/lib/cms/page-sections";

/**
 * Homepage — locked direction: Variant B (Georgian Photography).
 *
 * Photography-led. Every section either has imagery as background,
 * inline, or as an asymmetric accent. The gold floral pattern frames
 * key moments. The page feels like walking through a House editorial,
 * not reading a product spec.
 *
 * 8 sections per direction guide homepage spec.
 * "Orient first, invite second, explain third."
 */
export default async function HomePage() {
  const [nlBlock, sections] = await Promise.all([
    getNewsletterBlock("homepage"),
    getPageSections("homepage"),
  ]);
  const s = (name: string) => sections.get(name);

  return (
    <>
      {/* ================================================================
          1. HERO — Full-bleed Georgian photograph.
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
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(245,240,232,0.06)_0%,rgba(245,240,232,0)_20%,rgba(48,35,28,0.55)_100%)]"
        />

        <div className="relative z-10 max-w-[780px] px-6 text-house-cream">
          <span className="block mb-7 font-sans text-[11px] tracking-[0.22em] uppercase text-house-cream/75">
            {cms(s("hero"), "eyebrow", "For homes with soul")}
          </span>
          <h1
            className="em-accent font-display font-medium leading-[1.02] tracking-[-0.01em] mb-6 text-house-cream drop-shadow-[0_2px_28px_rgba(29,29,27,0.35)]"
            style={{ fontSize: "clamp(52px, 7vw, 96px)" }}
          >
            {cms(s("hero"), "headline", "Beautiful living,")}
            <br />
            <em>{cms(s("hero"), "headlineEm", "intelligently")}</em> {cms(s("hero"), "subheadline", "stewarded.")}
          </h1>
          <p className="mx-auto max-w-[580px] text-[18px] leading-[1.65] text-house-cream/88 drop-shadow-[0_1px_14px_rgba(29,29,27,0.3)] mb-10">
            {cms(s("hero"), "body", "The House of Willow Alexander brings design, care, protection, and trusted services into one clear world. HoWA is the stewardship system behind it.")}
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
              className="inline-block px-7 py-3.5 font-sans text-[12px] tracking-[0.16em] uppercase no-underline border border-house-cream/35 text-house-cream/80 bg-transparent transition-colors duration-[var(--t-med)] ease-out hover:bg-house-cream hover:text-house-brown hover:border-house-cream"
            >
              Explore the House
            </Link>
          </div>

          <p className="mt-6 text-[12px] text-house-cream/45">
            <Link href="/book-consultation" className="underline decoration-house-cream/20 underline-offset-4 text-house-cream/45 hover:text-house-cream/75 transition-colors">
              Or book a consultation
            </Link>
          </p>
        </div>

        <div className="absolute bottom-5 right-6 z-10 font-sans text-[10px] tracking-[0.16em] uppercase text-house-cream/40">
          Notting Hill &middot; Golden Hour
        </div>
      </section>

      {/* ================================================================
          2. ACTION RAIL — Four cards with imagery accents.
          ================================================================ */}
      <section aria-label="Ways to begin" className="bg-house-cream border-t border-house-brown/10">
        <div className="px-[5vw] py-3 text-center">
          <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-house-brown/40">
            How can the House help today?
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-[5vw] border-t border-house-brown/6">
          {[
            { eyebrow: "Use HoWA", title: "Start with the living record", desc: "A guided Companion captures your home, recommends what it needs, and builds a record that remembers everything.", cta: "Begin", href: "/api/howa-bounce?source=action-rail" },
            { eyebrow: "Design a space", title: "Commission something beautiful", desc: "Interiors and gardens shaped by taste and craft. Browse portfolios, start a brief, or let HoWA match you.", cta: "See design", href: "/design" },
            { eyebrow: "Book care", title: "Maintain the home properly", desc: "Gardening, cleaning, windows, gutters. Recurring or one-off, configured through HoWA and delivered by the House.", cta: "Book care", href: "/services" },
            { eyebrow: "Protect the home", title: "Reduce risk, build evidence", desc: "Home Protection Review, ongoing care plans, and insurance via Provenance. Calm prevention, not alarm.", cta: "Protect", href: "/protect" },
          ].map((card, i) => (
            <article key={card.eyebrow} className={`group relative px-6 pt-7 pb-8 ${i > 0 ? "lg:border-l border-house-brown/6" : ""}`}>
              <span aria-hidden="true" className="absolute top-0 left-6 right-6 h-px opacity-0 transition-opacity duration-[var(--t-base)] ease-out group-hover:opacity-100" style={{ background: "var(--house-gold-dark)" }} />
              <span className="block font-sans text-[11px] tracking-[0.18em] uppercase mb-2" style={{ color: "var(--house-gold-dark)" }}>{card.eyebrow}</span>
              <h3 className="font-display text-[22px] font-medium leading-[1.15] text-house-brown mb-2">{card.title}</h3>
              <p className="font-sans text-[13px] leading-[1.55] text-house-brown/70 mb-3">{card.desc}</p>
              <GhostLink href={card.href}>{card.cta}</GhostLink>
            </article>
          ))}
        </div>
      </section>

      {/* ================================================================
          3. THE HOUSE / HoWA — Full-bleed image split.
          Left: Georgian room photograph. Right: copy.
          ================================================================ */}
      <section className="bg-house-white border-t border-house-brown/8">
        <div className="grid md:grid-cols-2 min-h-[600px]">
          {/* Left — full-height photograph */}
          <div className="relative min-h-[400px] md:min-h-0">
            <Image
              src="/partners/project-3.jpg"
              alt="A Georgian drawing room with afternoon light, linen sofa, and marble fireplace"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>

          {/* Right — copy */}
          <div className="px-[5vw] md:px-14 py-20 flex flex-col justify-center">
            <Eyebrow>The world &amp; the system</Eyebrow>
            <h2
              className="em-accent font-display font-medium leading-[1.08] tracking-[-0.01em] text-house-brown mt-5 mb-6"
              style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
            >
              {cms(s("system-split"), "headline", "The House is the world.")}
              <br />
              {cms(s("system-split"), "subheadline", "HoWA is the")} <em>{cms(s("system-split"), "headlineEm", "system.")}</em>
            </h2>
            <p className="font-sans text-[16px] leading-[1.65] text-house-brown/70 mb-6 max-w-[440px]">
              {cms(s("system-split"), "body", "The House defines what good looks like: the taste, the standards, the editorial eye. HoWA is the intelligence beneath it: the Companion that captures the home, the system that recommends, connects, and remembers.")}
            </p>
            <p className="font-sans text-[15px] leading-[1.6] text-house-brown/70 mb-8 max-w-[440px]">
              {cms(s("system-split"), "body2", "Story lives on the House. Decision, configuration, booking, and continuity live in HoWA. Fulfilment runs through the ecosystem. Everything writes back to the record.")}
            </p>
            <GhostLink href="/howa">See how HoWA works</GhostLink>
          </div>
        </div>
      </section>

      {/* ================================================================
          4. DESIGN — Asymmetric image + copy with botanical pattern accent.
          ================================================================ */}
      <section className="relative bg-house-cream overflow-hidden">
        {/* Floral pattern accent — top-right corner, faded */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "url(/hearth/pattern-gold.png)",
            backgroundSize: "800px",
            backgroundPosition: "top right",
            mixBlendMode: "multiply",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-[5vw] py-24">
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-center">
            {/* Left — stacked images */}
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/partners/hero.png"
                  alt="A sun-filled drawing room with garden views through Georgian windows"
                  fill
                  sizes="60vw"
                  className="object-cover"
                />
              </div>
              {/* Smaller offset image */}
              <div className="hidden md:block absolute -bottom-8 -right-6 w-[45%] aspect-[3/4] border-4 border-house-cream overflow-hidden shadow-[0_16px_48px_rgba(48,35,28,0.12)]">
                <Image
                  src="/services/cleaning.png"
                  alt="A warm kitchen with copper pans, green cabinetry, and afternoon light"
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right — copy */}
            <div className="md:pl-6">
              <Eyebrow>Design &amp; Care</Eyebrow>
              <h2 className="em-accent font-display font-medium text-[clamp(32px, 4.5vw, 48px)] leading-[1.1] tracking-[-0.01em] text-house-brown mt-4 mb-5">
                {cms(s("design-care"), "headline", "Spaces shaped by taste. Homes kept by")} <em>{cms(s("design-care"), "headlineEm", "discipline.")}</em>
              </h2>
              <p className="font-sans text-[16px] leading-[1.65] text-house-brown/70 mb-8">
                {cms(s("design-care"), "body", "Interior and garden design by House-approved studios. Recurring care by House teams. Browse portfolios, start a brief through the Companion, or let HoWA match you to the right hands.")}
              </p>

              <div className="space-y-5 mb-8">
                <div className="border-t border-house-brown/8 pt-4">
                  <h3 className="font-display font-medium text-[20px] text-house-brown mb-1">Interiors &amp; Gardens</h3>
                  <p className="font-sans text-[14px] text-house-brown/60">Whole-house renovations, single-room reads, planting schemes, landscape work.</p>
                </div>
                <div className="border-t border-house-brown/8 pt-4">
                  <h3 className="font-display font-medium text-[20px] text-house-brown mb-1">Services &amp; Maintenance</h3>
                  <p className="font-sans text-[14px] text-house-brown/60">Gardening, cleaning, windows, gutters. Recurring plans or one-off bookings.</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <GhostLink href="/design/interiors">Interiors</GhostLink>
                <GhostLink href="/design/gardens">Gardens</GhostLink>
                <GhostLink href="/services">Services</GhostLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          5. PROTECT — Dark band with the Steward hero image.
          Calm stewardship, not fear.
          ================================================================ */}
      <section className="relative bg-house-brown text-house-cream overflow-hidden">
        {/* Background: Steward annotated house, faded */}
        <Image
          src="/services/gardening.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-house-brown/75" aria-hidden="true" />

        {/* Floral pattern frame — bottom-left */}
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: "url(/hearth/pattern-gold.png)",
            backgroundSize: "700px",
            backgroundPosition: "bottom left",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[1000px] mx-auto px-[5vw] py-24">
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-14 items-start">
            <div>
              <span className="block font-sans text-[11px] tracking-[0.2em] uppercase text-house-gold-light mb-4">
                Protect
              </span>
              <h2 className="em-accent font-display font-medium text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-[-0.01em] text-house-cream mt-1 mb-6">
                {cms(s("protect"), "headline", "Care recorded is")} <em>{cms(s("protect"), "headlineEm", "risk reduced.")}</em>
              </h2>
              <p className="font-sans text-[16px] leading-[1.65] text-house-cream/75 mb-6 max-w-[440px]">
                {cms(s("protect"), "body", "A maintained, documented home is a cheaper home to insure. HoWA holds the evidence. Home Protection Review, ongoing care plans, and insurance via Provenance. No other platform does this.")}
              </p>
              <Link
                href="/protect"
                className="inline-block px-6 py-3 font-sans text-[12px] tracking-[0.16em] uppercase no-underline border border-house-cream/50 text-house-cream transition-colors duration-[var(--t-med)] ease-out hover:bg-house-cream hover:text-house-brown"
              >
                Protect the home
              </Link>
            </div>

            <div className="space-y-4">
              {[
                { title: "Home Protection Review", tier: "Steward", desc: "In-person whole-home preventative assessment. Risk items resolved and recorded." },
                { title: "Ongoing Protection Plan", tier: "HoWA+", desc: "Regular verification, reminders, and recorded oversight." },
                { title: "Insurance via Provenance", tier: "Register interest", desc: "Cover that understands period homes. FCA-regulated introducer model." },
              ].map((item) => (
                <div key={item.title} className="border-t border-house-cream/15 pt-4">
                  <div className="flex items-baseline justify-between mb-1">
                    <h4 className="font-sans font-medium text-[15px] text-house-cream">{item.title}</h4>
                    <span className="font-sans text-[10px] tracking-[0.14em] uppercase text-house-gold-light">{item.tier}</span>
                  </div>
                  <p className="font-sans text-[13px] text-house-cream/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          6. SHOP & JOURNAL — Two cards with image headers.
          ================================================================ */}
      <section className="bg-house-cream px-[5vw] py-24">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-6">
          {/* Shop */}
          <Link href="/shop" className="group block bg-house-white border border-house-brown/8 overflow-hidden no-underline transition-shadow duration-[var(--t-slow)] ease-out hover:shadow-[0_16px_48px_rgba(48,35,28,0.1)]">
            <div className="relative h-[240px] overflow-hidden">
              <Image
                src="/services/cleaning.png"
                alt="Curated homeware in a warm kitchen setting"
                fill
                sizes="50vw"
                className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-8">
              <span className="block font-sans text-[11px] tracking-[0.2em] uppercase mb-2" style={{ color: "var(--house-gold-dark)" }}>Shop</span>
              <h3 className="font-display font-medium text-[26px] text-house-brown mb-2 leading-[1.15] transition-colors duration-[var(--t-base)] group-hover:text-[var(--house-gold-dark)]">
                House Approved Objects
              </h3>
              <p className="font-sans text-[14px] leading-[1.6] text-house-brown/70">
                Curated homeware, garden tools, and objects for the home. Selected by
                the House, verified through HoWA. Not a marketplace. A considered edit.
              </p>
            </div>
          </Link>

          {/* Journal */}
          <Link href="/journal" className="group block bg-house-white border border-house-brown/8 overflow-hidden no-underline transition-shadow duration-[var(--t-slow)] ease-out hover:shadow-[0_16px_48px_rgba(48,35,28,0.1)]">
            <div className="relative h-[240px] overflow-hidden">
              <Image
                src="/partners/hero.png"
                alt="A sun-filled room with layered textiles and garden views"
                fill
                sizes="50vw"
                className="object-cover transition-transform duration-[var(--t-xslow)] ease-out group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-8">
              <span className="block font-sans text-[11px] tracking-[0.2em] uppercase mb-2" style={{ color: "var(--house-gold-dark)" }}>The Hearth</span>
              <h3 className="font-display font-medium text-[26px] text-house-brown mb-2 leading-[1.15] transition-colors duration-[var(--t-base)] group-hover:text-[var(--house-gold-dark)]">
                Writing on Homes
              </h3>
              <p className="font-sans text-[14px] leading-[1.6] text-house-brown/70">
                Long-form writing on the craft of looking after a place properly.
                Seasonal features, design profiles, garden notes, and the things that
                matter when you live somewhere you love.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* ================================================================
          7. PROOF STRIP — Over the Steward image, faded.
          ================================================================ */}
      <section className="relative bg-house-white border-t border-house-brown/8 overflow-hidden">
        <div className="relative z-10 max-w-[1000px] mx-auto px-[5vw] py-16 flex flex-wrap justify-center gap-x-16 gap-y-8 text-center">
          {[
            { num: "247", label: "homes stewarded" },
            { num: "4", label: "launch partners" },
            { num: "4.9", label: "average rating" },
            { num: "0", label: "net emissions" },
          ].map((s) => (
            <div key={s.label}>
              <span className="block font-display text-[40px] font-medium text-house-brown leading-none mb-1">{s.num}</span>
              <span className="font-sans text-[11px] tracking-[0.16em] uppercase text-house-brown/50">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
          8. NEWSLETTER — Dark band, The Hearth.
          ================================================================ */}
      <NewsletterInline
        variant={nlBlock?.variant ?? "dark"}
        sourcePage="/"
        eyebrow={nlBlock?.eyebrow}
        headline={nlBlock?.headline ?? "Seasonal notes on home and garden."}
        body={nlBlock?.body ?? "A single letter from the editors of The Hearth. Every Friday. Unsubscribe at any time."}
        namePlaceholder={nlBlock?.namePlaceholder}
        emailPlaceholder={nlBlock?.emailPlaceholder}
        buttonLabel={nlBlock?.buttonLabel}
        successMessage={nlBlock?.successMessage}
        legalNote={nlBlock?.legalNote}
      />

      {/* ================================================================
          9. CLOSING CTA — Pattern-framed, full-bleed cream.
          "For homes with soul, proper care should never be left to
          memory alone."
          ================================================================ */}
      <section className="relative bg-house-cream overflow-hidden">
        {/* Floral pattern — both sides, framing the CTA */}
        <div
          className="absolute top-0 left-0 w-[350px] h-full opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: "url(/hearth/pattern-gold.png)",
            backgroundSize: "700px",
            backgroundPosition: "center left",
            mixBlendMode: "multiply",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute top-0 right-0 w-[350px] h-full opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: "url(/hearth/pattern-gold.png)",
            backgroundSize: "700px",
            backgroundPosition: "center right",
            mixBlendMode: "multiply",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[640px] mx-auto px-[5vw] py-28 text-center">
          <p className="font-display italic text-[clamp(24px,3.5vw,34px)] leading-[1.35] text-house-brown mb-5">
            {cms(s("closing-cta"), "headline", "For homes with soul, proper care should never be left to memory alone.")}
          </p>
          <p className="font-sans text-[15px] text-house-brown/70 mb-10">
            {cms(s("closing-cta"), "body", "The House defines what good looks like.")}{" "}
            <span style={{ color: "var(--house-gold-dark)" }}>{cms(s("closing-cta"), "subheadline", "HoWA ensures it happens.")}</span>
            <br />
            {cms(s("closing-cta"), "body2", "One House. One standard. One system of care.")}
          </p>
          <Link
            href="/api/howa-bounce?source=homepage-footer"
            className="inline-block px-9 py-4 font-sans text-[12px] tracking-[0.18em] uppercase no-underline text-house-cream transition-all duration-[var(--t-base)] ease-out hover:opacity-90"
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
