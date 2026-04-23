import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GhostLink } from "@/components/primitives/GhostLink";
import { NewsletterInline } from "@/components/marketing/NewsletterInline";
import { getNewsletterBlock } from "@/lib/cms/newsletter";

export const metadata = {
  title: "Design · Gardens",
  description:
    "Landscape design, planting plans, and bespoke garden commissions from the House of Willow Alexander design collective.",
};

const PLANS = [
  {
    title: "Planting Plans",
    price: "From £495",
    image: "/design/gardens/planting-plans.jpg",
    description:
      "A beautifully detailed planting layout tailored to your garden\u2019s light, soil, and aspect \u2014 with full plant list, placement guide, and seasonal notes.",
    href: "/book-consultation?service=garden-planting-plan",
  },
  {
    title: "Lighting Plans",
    price: "From £395",
    image: "/design/gardens/lighting-plans.jpg",
    description:
      "A professional lighting layout that transforms your garden after dark. Includes fixture map, specification list, and circuit guide.",
    href: "/book-consultation?service=garden-lighting-plan",
  },
  {
    title: "Concept Plans",
    price: "From £1,495",
    image: "/design/gardens/concept-plans.jpg",
    description:
      "An elevated design blueprint combining layout, materials palette, and planting inspiration. Ideal for small to mid-sized projects.",
    href: "/book-consultation?service=garden-concept-plan",
  },
  {
    title: "2D & 3D Plans",
    price: "From £2,950",
    image: "/design/gardens/2d-3d-plans.jpg",
    description:
      "A fully visualised plan with dimensional drawings and 3D renders. Perfect for design-led projects ready for construction.",
    href: "/book-consultation?service=garden-2d-3d-plan",
  },
  {
    title: "Signature Collaboration",
    price: "Coming Soon",
    image: "/design/gardens/collaboration.jpg",
    description:
      "A full creative partnership with one of our leading studios \u2014 combining artistic direction, materials selection, and build liaison.",
    comingSoon: true,
  },
  {
    title: "Full Design & Build",
    price: "Bespoke",
    image: "/design/gardens/full-design.png",
    description:
      "Commission a full bespoke design, with on-site consultation and build management. Visit our flagship studio at Willow Alexander Gardens.",
    href: "/partners/willow-alexander-gardens",
  },
] as const;

export default async function GardensPage() {
  const nlBlock = await getNewsletterBlock("design-gardens");

  return (
    <article className="bg-house-cream text-house-brown">
      {/* ─── Hero ─── */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <Image
          src="/design/gardens/hero.jpg"
          alt="Estate grounds and landscape overview"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-house-brown/80 via-house-brown/25 to-transparent"
          aria-hidden="true"
        />
        {/* Floral accent — top-right corner */}
        <div
          className="pointer-events-none absolute top-0 right-0 w-[400px] h-[400px] opacity-[0.04] mix-blend-multiply"
          aria-hidden="true"
        >
          <Image
            src="/hearth/pattern-gold.png"
            alt=""
            fill
            className="object-contain object-top-right"
            sizes="400px"
          />
        </div>
        <div className="relative z-10 px-[5vw] pb-16 pt-32 max-w-[880px]">
          <Eyebrow colour="cream" className="mb-4">
            Design · Gardens
          </Eyebrow>
          <h1 className="font-display font-medium text-[clamp(48px,7vw,84px)] leading-[1.02] tracking-[-0.015em] text-house-cream">
            Garden Design
          </h1>
          <p className="font-display italic text-[clamp(22px,3vw,32px)] leading-[1.3] text-house-cream/85 mt-3">
            A collective of creativity
          </p>
          <p className="font-sans text-[17px] leading-[1.7] text-house-cream/75 mt-6 max-w-[54ch]">
            The House of Willow Alexander has always been devoted to the art of
            living beautifully, inside and out. Our love of design, and our
            respect for the natural world, have led us to bring together a
            collective of exceptional landscape designers and studios under one
            roof.
          </p>
          <div className="mt-8 flex items-center gap-4 flex-wrap">
            <Link
              href="/book-consultation?service=design-gardens"
              className="inline-block font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-[var(--house-gold-dark)] border border-[var(--house-gold-dark)] px-6 py-3.5 no-underline transition-colors duration-[var(--t-slow)] ease-out hover:bg-house-gold hover:border-house-gold"
            >
              Start a consultation
            </Link>
            <GhostLink href="/partners/willow-alexander-gardens" dark>
              See Willow Alexander Gardens
            </GhostLink>
          </div>
        </div>
      </section>

      {/* ─── Meet Your Designers ─── */}
      <section className="px-[5vw] py-20 border-t border-house-brown/10">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <Eyebrow colour="teal" className="mb-4">
              Meet Your Designers
            </Eyebrow>
            <h2 className="font-display font-medium text-[clamp(28px,3.6vw,42px)] leading-[1.15] mb-6 max-w-[20ch]">
              A garden deserves a mind, not just a hand.
            </h2>
            <p className="font-sans text-[17px] leading-[1.7] text-house-brown/70 mb-4 max-w-[48ch]">
              Our design collective represents the finest minds in landscape and
              garden design, each selected for their craft, ethics, and
              aesthetic harmony with the House.
            </p>
            <p className="font-sans text-[17px] leading-[1.7] text-house-brown/70 mb-8 max-w-[48ch]">
              Willow Alexander Gardens is the founding studio &mdash; the
              practice that began everything. Their work is rooted in the
              English landscape tradition, with an eye for the contemporary
              and an instinct for place.
            </p>
            <GhostLink href="/partners/willow-alexander-gardens">
              Visit Willow Alexander Gardens
            </GhostLink>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/design/gardens/hand-drawn.jpg"
              alt="Hand-drawn garden plans from Willow Alexander Gardens"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ─── Digital Plans Grid ─── */}
      <section className="relative px-[5vw] py-20 bg-white border-t border-house-brown/10 overflow-hidden">
        {/* Floral accent — bottom-left */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-[360px] h-[360px] opacity-[0.03] mix-blend-multiply rotate-180"
          aria-hidden="true"
        >
          <Image
            src="/hearth/pattern-gold.png"
            alt=""
            fill
            className="object-contain"
            sizes="360px"
          />
        </div>

        <div className="relative z-10 max-w-[1320px] mx-auto">
          <div className="text-center mb-14">
            <Eyebrow colour="gold" className="mb-4">
              Garden Plans
            </Eyebrow>
            <h2 className="font-display font-medium text-[clamp(28px,3.6vw,42px)] leading-[1.15] mb-4">
              Commission a plan.
            </h2>
            <p className="font-sans text-[16px] leading-[1.6] text-house-brown/70 max-w-[52ch] mx-auto">
              Six ways into a considered garden &mdash; from a single planting
              scheme to a full bespoke design and build.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PLANS.map((plan) => (
              <div
                key={plan.title}
                className="group flex flex-col bg-house-cream border border-house-brown/8 overflow-hidden"
              >
                {/* Card image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={plan.image}
                    alt={plan.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  />
                  {plan.comingSoon && (
                    <div className="absolute top-4 right-4 bg-house-brown/80 text-house-cream font-sans text-[10px] tracking-[0.2em] uppercase px-3 py-1.5">
                      Coming Soon
                    </div>
                  )}
                </div>
                {/* Card body */}
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="font-display font-medium text-[22px] leading-[1.2] mb-1">
                    {plan.title}
                  </h3>
                  <p className="font-sans text-[12px] tracking-[0.15em] uppercase text-[var(--house-gold-dark)] mb-3">
                    {plan.price}
                  </p>
                  <p className="font-sans text-[15px] leading-[1.6] text-house-brown/70 mb-5 flex-1">
                    {plan.description}
                  </p>
                  {plan.href && !plan.comingSoon && (
                    <GhostLink href={plan.href}>
                      {plan.title === "Full Design & Build"
                        ? "Visit the studio"
                        : "Enquire"}
                    </GhostLink>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Companion / HoWA ─── */}
      <section className="px-[5vw] py-20 border-t border-house-brown/10">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/3] overflow-hidden lg:order-2">
            <Image
              src="/partners/hero.png"
              alt="Drawing room with garden views"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 50vw"
            />
          </div>
          <div className="lg:order-1">
            <Eyebrow colour="teal" className="mb-4">
              The Companion
            </Eyebrow>
            <h2 className="font-display font-medium text-[clamp(28px,3.6vw,42px)] leading-[1.15] mb-6 max-w-[22ch]">
              Start with what you know.
            </h2>
            <p className="font-sans text-[17px] leading-[1.7] text-house-brown/70 mb-4 max-w-[48ch]">
              The HoWA Companion can help create your plan with the right
              designer. Start with the Companion to capture your garden&apos;s
              context &mdash; light, soil, aspect, maintenance appetite, budget.
            </p>
            <p className="font-sans text-[17px] leading-[1.7] text-house-brown/70 mb-8 max-w-[48ch]">
              It builds a brief that any designer in the collective can work
              from &mdash; or you can take it to your own.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                href={`${process.env.NEXT_PUBLIC_HOWA_APP_URL ?? "/howa/coming-soon"}/companion`}
                className="inline-block font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-[var(--house-gold-dark)] border border-[var(--house-gold-dark)] px-6 py-3.5 no-underline transition-colors duration-[var(--t-slow)] ease-out hover:bg-house-gold hover:border-house-gold"
              >
                Start with the Companion
              </Link>
              <GhostLink href="/howa/companion">
                How it works
              </GhostLink>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Newsletter ─── */}
      <NewsletterInline
        variant={nlBlock?.variant ?? "dark"}
        sourcePage="/design/gardens"
        eyebrow={nlBlock?.eyebrow ?? "The Hearth"}
        headline={nlBlock?.headline ?? "Notes on gardens and growing."}
        body={
          nlBlock?.body ??
          "Seasonal letters from The Hearth: planting notes, design thinking, and the quiet rhythms of a well-tended garden."
        }
        {...(nlBlock ?? {})}
      />

      {/* ─── Tagline ─── */}
      <div className="text-center border-t border-house-brown/10 bg-house-cream px-5 py-6">
        <p className="font-display italic text-[14px] text-house-brown/50 tracking-[0.04em]">
          A garden is not a project. It is a relationship with the land.
        </p>
      </div>
    </article>
  );
}
