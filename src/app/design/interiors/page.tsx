import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GhostLink } from "@/components/primitives/GhostLink";
import { NewsletterInline } from "@/components/marketing/NewsletterInline";
import { getNewsletterBlock } from "@/lib/cms/newsletter";
import { getPartnersByDiscipline } from "@/lib/cms/partners";
import { LAUNCH_PARTNERS } from "@/lib/partners-data";
import { PartnerCarousel, type PartnerCardData } from "@/components/marketing/PartnerCarousel";

export const metadata = {
  title: "Design · Interiors",
  description:
    "Consciously designed interiors through THE HOUSE EDIT. Digital plans, full-home edits, and styling sessions — every scheme House Approved.",
};

const PROJECTS = [
  {
    src: "/design/interiors/project-living-room.webp",
    alt: "Herts living room — layered textures, muted palette, natural light",
    caption: "Herts Living Room Design",
    span: "col-span-2 row-span-2",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/design/interiors/project-bedroom.webp",
    alt: "Buckingham bedroom — deep green walls, brass accents, linen bedding",
    caption: "Buckingham Bedroom Design",
    span: "col-span-1 row-span-1",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/design/interiors/project-dining.webp",
    alt: "Herts dining room — warm timber, candlelight, considered table setting",
    caption: "Herts Dining Room Design",
    span: "col-span-1 row-span-1",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/design/interiors/project-tunbridge-1.webp",
    alt: "Tunbridge Wells — period drawing room with restored mouldings",
    caption: "Tunbridge Wells Project",
    span: "col-span-1 row-span-1",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/design/interiors/project-tunbridge-2.webp",
    alt: "Tunbridge Wells — layered sitting room with heritage palette",
    caption: "Tunbridge Wells Project II",
    span: "col-span-2 row-span-1",
    aspect: "aspect-[16/9]",
  },
];

const PLANS = [
  {
    name: "The House Edit",
    price: "£295",
    image: "/partners/project-3.jpg",
    inclusions: [
      "A 90-minute one-to-one online styling session",
      "Thoughtful guidance on palette, layout and sourcing",
      "A personalised PDF moodboard with curated links",
      "10% House Store discount",
    ],
  },
  {
    name: "Additions to Your Edit",
    price: "from £195",
    image: "/services/cleaning.png",
    inclusions: [
      "Shoppable moodboard",
      "Sourcing per room",
      "Material pack — swatches, samples, scents",
      "30-minute follow-up call",
    ],
  },
  {
    name: "The Full House Edit",
    price: "from £795",
    image: "/design/interiors/project-detail.webp",
    inclusions: [
      "Initial 90-minute consultation",
      "Moodboards for up to three rooms",
      "Sourcing for two rooms",
      "A tactile material pack posted to you",
      "30-minute follow-up call",
      "15% House Store discount",
    ],
  },
];

/* ── Fallback partners when Sanity is empty ── */
const INTERIORS_FALLBACK = [
  LAUNCH_PARTNERS["delve-interiors"],
  LAUNCH_PARTNERS["jessica-durling-mcmahon"],
];

export default async function InteriorsPage() {
  const [nlBlock, sanityPartners] = await Promise.all([
    getNewsletterBlock("design-interiors"),
    getPartnersByDiscipline("interiors"),
  ]);

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
    : INTERIORS_FALLBACK.map((p) => ({
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
          src="/design/interiors/project-tunbridge-1.webp"
          alt="Tunbridge Wells interior — restored period drawing room with garden light"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="relative z-10 px-[5vw] pb-[8vh] max-w-[880px]">
          <Eyebrow className="text-white/70">Design · Interiors</Eyebrow>
          <h1 className="font-display font-medium text-[clamp(44px,7vw,84px)] leading-[1.02] tracking-[-0.015em] text-white mt-4">
            Interior Design
          </h1>
          <p className="font-display italic text-[clamp(20px,2.4vw,30px)] leading-[1.3] text-white/85 mt-3">
            Consciously Designed Interiors
          </p>
          <p className="font-sans text-[17px] leading-[1.65] text-white/75 mt-6 max-w-[56ch]">
            At the House of Willow Alexander, we believe that interiors are
            living expressions of the people who inhabit them. Our love of
            design — and our devotion to craftsmanship — has led us to bring
            together a collective of interior designers and makers who share a
            single philosophy: beauty, balance, and intention.
          </p>
          <div className="mt-8 flex items-center gap-4 flex-wrap">
            <Link
              href="/book-consultation?service=design-interiors"
              className="inline-block font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-[var(--house-gold-dark)] border border-[var(--house-gold-dark)] px-6 py-3.5 no-underline transition-colors duration-[var(--t-slow)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
            >
              Book a consultation
            </Link>
            <GhostLink href="#plans" className="text-white border-white/40 hover:border-white">
              View plans
            </GhostLink>
          </div>
        </div>
      </section>

      {/* ─── 2. Our Designers — Carousel ─── */}
      <PartnerCarousel
        partners={partnerCards}
        heading="The collective behind your home."
        headingEm="home."
        lede="Each studio is selected for their craft, ethics, and aesthetic harmony with the House. Browse profiles, see recent work, and start a brief through HoWA."
      />

      {/* ─── 3. Our Projects — Asymmetric masonry gallery ─── */}
      <section className="bg-white px-[5vw] py-[88px] border-t border-house-brown/8">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-14">
            <Eyebrow>Our Projects</Eyebrow>
            <h2 className="font-display font-medium text-[clamp(28px,3.6vw,46px)] leading-[1.1] mt-4">
              Rooms that <em className="italic">remember</em> their people.
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
          src="/partners/hero.png"
          alt="Drawing room with garden views — natural light, period mouldings"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-display italic text-[clamp(22px,3vw,36px)] text-white text-center leading-[1.3] px-6 max-w-[36ch]">
            &ldquo;A home that carries you. Not a statement you have to keep
            up with.&rdquo;
          </p>
        </div>
      </section>

      {/* ─── 5. Digital Plans ─── */}
      <section id="plans" className="relative bg-house-cream px-[5vw] py-[88px] overflow-hidden">
        <div className="absolute top-0 right-0 w-[280px] h-[280px] opacity-[0.06] pointer-events-none">
          <Image
            src="/hearth/pattern-gold.png"
            alt=""
            fill
            className="object-contain object-right-top"
            sizes="280px"
          />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <Eyebrow>Digital Plans</Eyebrow>
            <h2 className="font-display font-medium text-[clamp(28px,3.6vw,46px)] leading-[1.1] mt-4">
              Three ways to <em className="italic">begin.</em>
            </h2>
            <p className="font-sans text-[16px] leading-[1.65] text-house-brown/70 mt-4 mx-auto max-w-[52ch]">
              Whether you need a single styling session or a layered
              transformation across the home, there is an edit for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className="group bg-white border border-house-brown/10 overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={plan.image}
                    alt={`${plan.name} — interior design plan`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="font-display font-medium text-[24px] text-white leading-[1.15]">
                      {plan.name}
                    </h3>
                    <span className="font-sans text-[14px] text-white/80 mt-1 block">
                      {plan.price}
                    </span>
                  </div>
                </div>
                <div className="flex-1 p-6 flex flex-col">
                  <ul className="flex-1 list-none space-y-2">
                    {plan.inclusions.map((inc) => (
                      <li
                        key={inc}
                        className="relative pl-4 font-sans text-[14px] leading-[1.6] text-house-brown/70 before:content-['—'] before:absolute before:left-0 before:text-[var(--house-gold-dark)]"
                      >
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link
                      href="/book-consultation?service=design-interiors"
                      className="inline-block font-sans text-[11px] tracking-[0.18em] uppercase text-[var(--house-gold-dark)] border border-[var(--house-gold-dark)] px-5 py-3 no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-[var(--house-gold-dark)] hover:text-white"
                    >
                      Book this edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* The Style Diagnostic — Coming Soon */}
          <div className="mt-10 border border-dashed border-house-brown/20 bg-white/50 p-8 md:p-10 text-center max-w-[680px] mx-auto">
            <span className="inline-block font-sans text-[10px] tracking-[0.22em] uppercase text-howa-teal-dark bg-howa-teal-dark/8 px-3 py-1 mb-4">
              Coming Soon
            </span>
            <h3 className="font-display font-medium text-[24px] leading-[1.15] mb-3">
              The Style Diagnostic
            </h3>
            <p className="font-sans text-[15px] leading-[1.65] text-house-brown/70 max-w-[44ch] mx-auto">
              Every great edit begins with understanding your taste. A guided
              style journey that reveals your personal home moodboard.
            </p>
            <div className="mt-5">
              <GhostLink href="/api/howa-bounce?source=style-diagnostic-waitlist">
                Register interest
              </GhostLink>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. Companion / HoWA ─── */}
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
              Capture your room, ambition, timeline, budget, and aesthetic
              direction. The Companion builds a brief that your designer can
              work from on day one — nothing lost, nothing repeated.
            </p>
            <p className="max-w-[480px] mb-[26px] font-sans text-[15px] leading-[1.65] text-house-brown/70 italic">
              Available to all HoWA members.
            </p>
            <Link
              href="/api/howa-bounce?source=interiors-companion"
              className="inline-block px-[26px] py-[13px] font-sans text-[12px] tracking-[0.16em] uppercase no-underline bg-[var(--house-gold-dark)] text-white border border-[var(--house-gold-dark)] transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
            >
              Start the Companion
            </Link>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/design/interiors/project-living-room.webp"
              alt="Living room project — the kind of room the Companion helps you brief"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ─── 7. Newsletter ─── */}
      <NewsletterInline
        variant={nlBlock?.variant ?? "cream"}
        sourcePage="/design/interiors"
        {...(nlBlock ?? {})}
      />

      {/* ─── 8. Tagline ─── */}
      <div className="text-center border-t border-house-brown/10 bg-house-cream px-5 py-6">
        <p className="font-sans italic text-[14px] text-house-brown/70 tracking-[0.04em]">
          Beauty, balance, and intention.
        </p>
      </div>
    </>
  );
}
