import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GhostLink } from "@/components/primitives/GhostLink";
import { NewsletterInline } from "@/components/marketing/NewsletterInline";
import { getNewsletterBlock } from "@/lib/cms/newsletter";
import { getPageSections, cms } from "@/lib/cms/page-sections";
import { getPartnersByDiscipline } from "@/lib/cms/partners";
import { LAUNCH_PARTNERS } from "@/lib/partners-data";
import { PartnerCarousel, type PartnerCardData } from "@/components/marketing/PartnerCarousel";

export const metadata = {
  title: "Design · Gardens",
  description:
    "Landscape design, planting plans, and bespoke garden commissions from the House of Willow Alexander design collective.",
};

const PROJECTS = [
  {
    src: "/design/gardens/hand-drawn.jpg",
    alt: "Hand-drawn garden plans — pencil sketches with planting annotations",
    caption: "Hand-Drawn Plans",
    span: "col-span-2 row-span-2",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/design/gardens/planting-plans.jpg",
    alt: "Planting plan — detailed layout with seasonal palette",
    caption: "Planting Plans",
    span: "col-span-1 row-span-1",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/design/gardens/lighting-plans.jpg",
    alt: "Garden lighting plan — fixture map and circuit guide",
    caption: "Lighting Plans",
    span: "col-span-1 row-span-1",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/design/gardens/concept-plans.jpg",
    alt: "Concept plan — layout, materials palette, and planting inspiration",
    caption: "Concept Plans",
    span: "col-span-1 row-span-1",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/design/gardens/collaboration.jpg",
    alt: "Design collaboration — creative partnership from concept to build",
    caption: "Signature Collaboration",
    span: "col-span-2 row-span-1",
    aspect: "aspect-[16/9]",
  },
];

interface GardenPlan {
  title: string;
  price: string;
  image: string;
  description: string;
  href?: string;
  comingSoon?: boolean;
}

const PLANS: GardenPlan[] = [
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
];

/* ── Fallback partners when Sanity is empty ── */
const GARDENS_FALLBACK = [LAUNCH_PARTNERS["willow-alexander-gardens"]];

export default async function GardensPage() {
  const [nlBlock, sanityPartners, sections] = await Promise.all([
    getNewsletterBlock("design-gardens"),
    getPartnersByDiscipline("gardens"),
    getPageSections("design-gardens"),
  ]);
  const s = (name: string) => sections.get(name);

  /* Build partner card data for the carousel */
  const partnerCards: PartnerCardData[] = sanityPartners.length > 0
    ? sanityPartners.map((p) => ({
        slug: p.slug,
        name: p.name,
        type: p.type ?? "design-studio",
        shortBio: p.shortBio,
        specialties: p.specialties ?? [],
        houseApprovedSeal: p.houseApprovedSeal ?? false,
      }))
    : GARDENS_FALLBACK.map((p) => ({
        slug: p.slug,
        name: p.name,
        type: p.type,
        shortBio: p.shortBio,
        specialties: p.specialties,
        houseApprovedSeal: p.houseApprovedSeal,
      }));

  return (
    <>
      {/* ─── 1. Hero ─── */}
      <section className="relative min-h-[85vh] flex items-end">
        <Image
          src="/design/gardens/hero.jpg"
          alt="Estate grounds and landscape overview"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="relative z-10 px-[5vw] pb-[8vh] max-w-[880px]">
          <Eyebrow className="text-white/70">Design · Gardens</Eyebrow>
          <h1 className="font-display font-medium text-[clamp(44px,7vw,84px)] leading-[1.02] tracking-[-0.015em] text-white mt-4">
            {cms(s("hero"), "headline", "Garden Design")}
          </h1>
          <p className="font-display italic text-[clamp(20px,2.4vw,30px)] leading-[1.3] text-white/85 mt-3">
            {cms(s("hero"), "subheadline", "A Collective of Creativity")}
          </p>
          <p className="font-sans text-[17px] leading-[1.65] text-white/75 mt-6 max-w-[56ch]">
            {cms(s("hero"), "body", "The House of Willow Alexander has always been devoted to the art of living beautifully, inside and out. Our love of design, and our respect for the natural world, have led us to bring together a collective of exceptional landscape designers and studios under one roof.")}
          </p>
          <div className="mt-8 flex items-center gap-4 flex-wrap">
            <Link
              href="/book-consultation?service=design-gardens"
              className="inline-block font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-[var(--house-gold-dark)] border border-[var(--house-gold-dark)] px-6 py-3.5 no-underline transition-colors duration-[var(--t-slow)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
            >
              Start a consultation
            </Link>
            <GhostLink href="#plans" className="text-white border-white/40 hover:border-white">
              View plans
            </GhostLink>
          </div>
        </div>
      </section>

      {/* ─── 2. Our Designers — Dark carousel band ─── */}
      <PartnerCarousel
        partners={partnerCards}
        heading="The collective behind your garden."
        headingEm="garden."
        lede="Each studio is selected for their craft, ecology, and aesthetic harmony with the House."
        dark
      />

      {/* ─── 3. Image breath — full-bleed strip ─── */}
      <section className="relative h-[35vh] md:h-[45vh]">
        <Image
          src="/design/gardens/collaboration.jpg"
          alt="Signature garden collaboration — mature planting, crafted hardscape"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-house-brown/20 to-transparent" />
      </section>

      {/* ─── 4. Garden Plans — Featured + grid ─── */}
      <section id="plans" className="bg-house-cream px-[5vw] py-[88px]">
        <div className="max-w-[1320px] mx-auto">
          <div className="mb-14">
            <Eyebrow>Garden Plans</Eyebrow>
            <h2 className="font-display font-medium text-[clamp(28px,3.6vw,46px)] leading-[1.1] mt-4 max-w-[24ch]">
              {cms(s("plans"), "headline", "Commission a plan.")}
            </h2>
          </div>

          {/* Featured plan — Concept Plans, hero-scale */}
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-0 mb-8 bg-white border border-house-brown/10 overflow-hidden">
            <div className="relative min-h-[360px] md:min-h-0">
              <Image
                src={PLANS[2].image}
                alt={`${PLANS[2].title} — garden design plan`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 55vw"
              />
            </div>
            <div className="p-10 md:p-12 flex flex-col justify-center">
              <span className="block font-sans text-[11px] tracking-[0.2em] uppercase mb-3" style={{ color: "var(--house-gold-dark)" }}>
                Featured
              </span>
              <h3 className="font-display font-medium text-[clamp(28px,3vw,38px)] leading-[1.1] text-house-brown mb-2">
                {PLANS[2].title}
              </h3>
              <span className="block font-sans text-[16px] text-house-brown/70 mb-6">
                {PLANS[2].price}
              </span>
              <p className="font-sans text-[15px] leading-[1.6] text-house-brown/70 mb-8 max-w-[440px]">
                {PLANS[2].description}
              </p>
              {PLANS[2].href && (
                <Link
                  href={PLANS[2].href}
                  className="inline-block self-start font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-[var(--house-gold-dark)] border border-[var(--house-gold-dark)] px-6 py-3.5 no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
                >
                  Enquire
                </Link>
              )}
            </div>
          </div>

          {/* Remaining plans — grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLANS.filter((_, i) => i !== 2).map((plan) => (
              <div
                key={plan.title}
                className="group bg-white border border-house-brown/10 overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={plan.image}
                    alt={`${plan.title} — garden design plan`}
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
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="font-display font-medium text-[20px] leading-[1.2] mb-1">
                    {plan.title}
                  </h3>
                  <p className="font-sans text-[12px] tracking-[0.15em] uppercase text-[var(--house-gold-dark)] mb-3">
                    {plan.price}
                  </p>
                  <p className="font-sans text-[14px] leading-[1.6] text-house-brown/70 mb-5 flex-1">
                    {plan.description}
                  </p>
                  {plan.href && !plan.comingSoon && (
                    <GhostLink href={plan.href}>
                      {plan.title === "Full Design & Build" ? "Visit the studio" : "Enquire"}
                    </GhostLink>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. Our Projects — Asymmetric masonry gallery ─── */}
      <section className="bg-white px-[5vw] py-[88px] border-t border-house-brown/8">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-14">
            <Eyebrow>Our Projects</Eyebrow>
            <h2 className="font-display font-medium text-[clamp(28px,3.6vw,46px)] leading-[1.1] mt-4">
              Gardens that <em className="italic">grow</em> with their people.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {PROJECTS.map((p) => (
              <div key={p.src} className={`group relative overflow-hidden ${p.span}`}>
                <div className={`relative w-full h-full ${p.aspect}`}>
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute bottom-0 left-0 right-0 px-4 py-3 font-sans text-[12px] tracking-[0.12em] uppercase text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    {p.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. Interstitial — full-width image band ─── */}
      <section className="relative h-[40vh] md:h-[50vh]">
        <Image
          src="/design/gardens/hand-drawn.jpg"
          alt="Hand-drawn garden plans — pencil detail"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-display italic text-[clamp(22px,3vw,36px)] text-white text-center leading-[1.3] px-6 max-w-[36ch]">
            &ldquo;A garden deserves a mood, not just a hand.&rdquo;
          </p>
        </div>
      </section>

      {/* ─── 5. Companion / HoWA ─── */}
      <section className="bg-house-white px-[5vw] py-[80px] border-t border-house-brown/8">
        <div className="max-w-[1080px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
          <div>
            <span className="block mb-5 font-sans text-[11px] tracking-[0.22em] uppercase text-howa-teal-dark">
              HoWA · Companion
            </span>
            <h2 className="font-sans font-normal text-[clamp(28px,3.2vw,42px)] leading-[1.12] tracking-[-0.015em] text-house-brown mb-[14px]">
              Start with the{" "}
              <em className="italic font-light text-howa-teal-dark">
                Companion.
              </em>
            </h2>
            <p className="max-w-[480px] mb-[10px] font-sans text-[16px] leading-[1.65] text-house-brown/70">
              Capture your garden&apos;s light, soil, aspect, maintenance
              appetite, and budget. The Companion builds a brief that any
              designer in the collective can work from — or you can take it to
              your own.
            </p>
            <p className="max-w-[480px] mb-[26px] font-sans text-[15px] leading-[1.65] text-house-brown/70 italic">
              Available to all HoWA members.
            </p>
            <Link
              href="/api/howa-bounce?source=gardens-companion"
              className="inline-block px-[26px] py-[13px] font-sans text-[12px] tracking-[0.16em] uppercase no-underline bg-[var(--house-gold-dark)] text-white border border-[var(--house-gold-dark)] transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
            >
              Start the Companion
            </Link>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/design/gardens/concept-plans.jpg"
              alt="Garden concept plan — the kind of brief the Companion helps you build"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ─── 7. Newsletter ─── */}
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

      {/* ─── 8. Tagline ─── */}
      <div className="text-center border-t border-house-brown/10 bg-house-cream px-5 py-6">
        <p className="font-sans italic text-[14px] text-house-brown/70 tracking-[0.04em]">
          A garden is not a project. It is a relationship with the land.
        </p>
      </div>
    </>
  );
}
