import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GhostLink } from "@/components/primitives/GhostLink";
import { PartnerCarousel, type PartnerCardData } from "@/components/marketing/PartnerCarousel";
import { NewsletterInline } from "@/components/marketing/NewsletterInline";
import { getNewsletterBlock } from "@/lib/cms/newsletter";
import { getPageSections, cms } from "@/lib/cms/page-sections";
import { getAllPartners } from "@/lib/cms/partners";
import { LAUNCH_PARTNERS, PARTNER_ORDER } from "@/lib/partners-data";

export const metadata = {
  title: "Partners & Marketplace",
  description:
    "House Approved designers, service providers, craftsmen, and curated goods. Every partner vetted, insured, and held to the House standard.",
};

const CATEGORIES = [
  {
    id: "design",
    eyebrow: "Design Studios",
    title: "The designers behind the House.",
    titleEm: "House.",
    lede: "Interior and garden designers selected for their craft, ethics, and aesthetic harmony with the House.",
    types: ["design-studio", "interior-designer", "garden-designer"],
    directoryHref: "/partners/directory/design",
    image: "/design/interiors/project-tunbridge-1.webp",
  },
  {
    id: "services",
    eyebrow: "House Services",
    title: "The hands that care for your home.",
    titleEm: "home.",
    lede: "Gardeners, cleaners, window cleaners, handymen. Vetted, insured, and held to the standard we'd hold ourselves to.",
    types: ["gardener", "cleaner", "window-cleaner", "handyman"],
    directoryHref: "/partners/directory/services",
    image: "/services/gardening.png",
    subbrandGrid: true,
  },
  {
    id: "marketplace",
    eyebrow: "Marketplace",
    title: "Objects worth keeping.",
    titleEm: "keeping.",
    lede: "Artisan makers, curated suppliers, and the things we believe in. Selected by the House, verified through HoWA.",
    types: ["craftsman", "artisan-maker", "shop-supplier", "brand-partner"],
    directoryHref: "/partners/directory/marketplace",
    image: "/services/cleaning.png",
  },
];

const SUBBRAND_TILES = [
  { slug: "gardeners", name: "Gardeners", image: "/services/subbrands/gardeners.jpg", href: "/services/gardening" },
  { slug: "cleaners", name: "Cleaners", image: "/services/subbrands/cleaners.jpg", href: "/services/cleaning" },
  { slug: "window-cleaners", name: "Window\nCleaners", image: "/services/subbrands/window-cleaner.jpg", href: "/services/window-cleaning" },
  { slug: "handyman", name: "Handyman", image: "/services/subbrands/handyman.jpg", href: "/services/handyman" },
  { slug: "housekeeping", name: "Housekeeping", image: "/services/subbrands/housekeeping.jpg", href: "/services" },
  { slug: "removals", name: "Removals", image: "/services/subbrands/removals.jpg", href: "/services/removals" },
  { slug: "electrical", name: "Electrical", image: "/services/subbrands/electrical.jpg", href: "/services" },
  { slug: "dog-walking", name: "Dog\nWalking", image: "/services/subbrands/dog-walking.jpg", href: "/services" },
];

export default async function PartnersHub() {
  const [nlBlock, sections] = await Promise.all([
    getNewsletterBlock("partners"),
    getPageSections("partners"),
  ]);
  const s = (name: string) => sections.get(name);

  // Build partner cards from hardcoded data (Sanity partners are fetched by the carousel dynamically)
  const allPartners: PartnerCardData[] = PARTNER_ORDER.map((slug) => {
    const p = LAUNCH_PARTNERS[slug];
    return {
      slug: p.slug,
      name: p.name,
      type: p.type,
      shortBio: p.shortBio,
      specialties: p.specialties,
      houseApprovedSeal: p.houseApprovedSeal,
    };
  });

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <Image
          src="/partners/hero.png"
          alt="A sun-filled room with garden views — the kind of home our partners look after"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

        {/* Floral pattern accent */}
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: "url(/hearth/pattern-gold.png)",
            backgroundSize: "600px",
            backgroundPosition: "top right",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 px-[5vw] pb-[8vh] max-w-[880px]">
          <span className="block mb-4 font-sans text-[11px] tracking-[0.22em] uppercase text-white/70">
            {cms(s("hero"), "eyebrow", "House Approved Partners")}
          </span>
          <h1
            className="font-display font-medium leading-[1.04] tracking-[-0.015em] text-white mb-5"
            style={{ fontSize: "clamp(44px, 6vw, 76px)" }}
          >
            {cms(s("hero"), "headline", "The people behind the House.")}
          </h1>
          <p className="font-sans text-[17px] leading-[1.65] text-white/80 max-w-[56ch]">
            {cms(s("hero"), "body", "Every partner below holds a House Approved seal. That means we know them, we've seen their work in person, and we'd point a family member at them. The list grows slowly, on purpose.")}
          </p>
        </div>
      </section>

      {/* Category sections */}
      {CATEGORIES.map((cat, i) => {
        const catPartners = allPartners.filter((p) =>
          cat.types.includes(p.type),
        );

        return (
          <div key={cat.id}>
            {/* Category header */}
            <section className={`${i % 2 === 0 ? "bg-house-cream" : "bg-house-white"} px-[5vw] py-20`}>
              <div className="max-w-[1200px] mx-auto">
                {cat.subbrandGrid ? (
                  /* Services: subbrand image grid */
                  <>
                    <div className="mb-12">
                      <span className="block font-sans text-[11px] tracking-[0.22em] uppercase mb-4" style={{ color: "var(--house-gold-dark)" }}>
                        {cat.eyebrow}
                      </span>
                      <h2 className="em-accent font-display font-medium text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-[-0.01em] text-house-brown mb-4">
                        {cat.title.replace(cat.titleEm, "")}<em className="italic">{cat.titleEm}</em>
                      </h2>
                      <p className="font-sans text-[16px] leading-[1.65] text-house-brown/70 max-w-[440px]">
                        {cat.lede}
                      </p>
                    </div>
                    {/* Desktop grid */}
                    <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      {SUBBRAND_TILES.map((svc) => (
                        <Link key={svc.slug} href={svc.href} className="group relative block aspect-[3/4] overflow-hidden no-underline">
                          <Image src={svc.image} alt={svc.name.replace("\n", " ")} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/5 group-hover:from-black/60 transition-opacity duration-[var(--t-slow)]" />
                          <div className="absolute bottom-0 left-0 p-5">
                            <h3 className="font-display font-medium text-[clamp(22px,2.2vw,30px)] leading-[1.1] text-white whitespace-pre-line tracking-[-0.01em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
                              {svc.name}
                            </h3>
                          </div>
                        </Link>
                      ))}
                    </div>
                    {/* Mobile carousel */}
                    <div className="flex sm:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-[5vw] px-[5vw]" style={{ scrollbarWidth: "none" }}>
                      {SUBBRAND_TILES.map((svc) => (
                        <Link key={svc.slug} href={svc.href} className="group relative flex-none w-[70vw] aspect-[3/4] snap-start overflow-hidden no-underline">
                          <Image src={svc.image} alt={svc.name.replace("\n", " ")} fill sizes="70vw" className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/5" />
                          <div className="absolute bottom-0 left-0 p-5">
                            <h3 className="font-display font-medium text-[28px] leading-[1.1] text-white whitespace-pre-line tracking-[-0.01em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
                              {svc.name}
                            </h3>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4 mt-6">
                      <Link href={cat.directoryHref} className="inline-block font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-[var(--house-gold-dark)] border border-[var(--house-gold-dark)] px-6 py-3 no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light">
                        Browse all service providers
                      </Link>
                      <GhostLink href="/services">See services</GhostLink>
                    </div>
                  </>
                ) : (
                  /* Standard: image + copy layout */
                  <div className="grid md:grid-cols-[1fr_1.1fr] gap-12 items-center">
                    <div className={i % 2 !== 0 ? "md:order-2" : ""}>
                      <span className="block font-sans text-[11px] tracking-[0.22em] uppercase mb-4" style={{ color: "var(--house-gold-dark)" }}>
                        {cat.eyebrow}
                      </span>
                      <h2 className="em-accent font-display font-medium text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-[-0.01em] text-house-brown mb-4">
                        {cat.title.replace(cat.titleEm, "")}<em className="italic">{cat.titleEm}</em>
                      </h2>
                      <p className="font-sans text-[16px] leading-[1.65] text-house-brown/70 mb-8 max-w-[440px]">
                        {cat.lede}
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <Link href={cat.directoryHref} className="inline-block font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-[var(--house-gold-dark)] border border-[var(--house-gold-dark)] px-6 py-3 no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light">
                          Browse all
                        </Link>
                        {cat.id === "design" && <GhostLink href="/design/interiors">Interior design</GhostLink>}
                        {cat.id === "marketplace" && <GhostLink href="/shop">Visit the shop</GhostLink>}
                      </div>
                    </div>
                    <div className={`relative aspect-[4/3] overflow-hidden ${i % 2 !== 0 ? "md:order-1" : ""}`}>
                      <Image src={cat.image} alt={cat.eyebrow} fill className="object-cover" sizes="50vw" />
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Partner carousel for this category (skip for subbrand grid) */}
            {!cat.subbrandGrid && catPartners.length > 0 && (
              <PartnerCarousel
                partners={catPartners}
                heading={`Our ${cat.eyebrow.toLowerCase()}`}
                headingEm={cat.eyebrow.toLowerCase().split(" ").pop() ?? ""}
                dark={i === 0}
              />
            )}
          </div>
        );
      })}

      {/* Become a partner */}
      <section className="bg-house-brown text-house-cream px-[5vw] py-20 text-center">
        <div className="max-w-[600px] mx-auto">
          <p className="font-display italic text-[clamp(20px,2.8vw,28px)] leading-[1.35] text-house-cream/80 mb-6">
            Interested in becoming a House Approved partner?
          </p>
          <p className="font-sans text-[15px] text-house-cream/60 mb-8">
            We review partner applications quarterly. Write to the House with
            your portfolio and we'll be in touch.
          </p>
          <Link
            href="/contact"
            className="inline-block font-sans text-[12px] tracking-[0.18em] uppercase text-house-cream border border-house-cream/40 px-6 py-3 no-underline transition-all duration-[var(--t-base)] hover:bg-house-cream hover:text-house-brown"
          >
            Apply to join
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterInline
        variant={nlBlock?.variant ?? "cream"}
        sourcePage="/partners"
        {...(nlBlock ?? {})}
      />

      {/* Tagline */}
      <div className="text-center border-t border-house-brown/8 bg-house-cream px-5 py-6">
        <p className="font-display italic text-[14px] text-house-brown/50 tracking-[0.04em]">
          Ownership is passive. Stewardship is intentional.
        </p>
      </div>
    </>
  );
}
