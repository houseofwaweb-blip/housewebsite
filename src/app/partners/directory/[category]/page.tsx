import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { StateBadge } from "@/components/primitives/StateBadge";
import { GhostLink } from "@/components/primitives/GhostLink";
import { getPartnersByType, type DesignPartner } from "@/lib/cms/partners";
import { LAUNCH_PARTNERS, PARTNER_ORDER } from "@/lib/partners-data";

/**
 * /partners/directory/[category] — filterable partner directory.
 *
 * Categories: design, services, marketplace.
 * Pulls from Sanity first, falls back to hardcoded launch partners.
 */

const CATEGORIES: Record<string, {
  title: string;
  titleEm: string;
  description: string;
  types: string[];
}> = {
  design: {
    title: "Design directory.",
    titleEm: "directory.",
    description: "Interior designers, garden designers, and design studios. Every partner carries the House Approved seal.",
    types: ["design-studio", "interior-designer", "garden-designer"],
  },
  services: {
    title: "Service providers.",
    titleEm: "providers.",
    description: "Gardeners, cleaners, window cleaners, and handymen. Vetted, insured, and held to the House standard.",
    types: ["gardener", "cleaner", "window-cleaner", "handyman"],
  },
  marketplace: {
    title: "Makers & suppliers.",
    titleEm: "suppliers.",
    description: "Artisan makers, curated suppliers, and brand partners. Selected by the House for craft, quality, and sustainability.",
    types: ["craftsman", "artisan-maker", "shop-supplier", "brand-partner"],
  },
};

const TYPE_LABELS: Record<string, string> = {
  "design-studio": "Design Studio",
  "interior-designer": "Interior Designer",
  "garden-designer": "Garden Designer",
  gardener: "Gardener",
  cleaner: "Cleaner",
  "window-cleaner": "Window Cleaner",
  handyman: "Handyman",
  craftsman: "Craftsman",
  "artisan-maker": "Artisan Maker",
  "brand-partner": "Brand Partner",
  "shop-supplier": "Shop Supplier",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES[category];
  if (!cat) return { title: "Directory" };
  return { title: `${cat.title.replace(".", "")} — Partners`, description: cat.description };
}

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export default async function DirectoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = CATEGORIES[category];
  if (!cat) notFound();

  // Fetch from Sanity
  let partners = await getPartnersByType(cat.types);

  // Fallback to hardcoded launch partners filtered by type
  if (partners.length === 0) {
    partners = PARTNER_ORDER
      .map((slug) => LAUNCH_PARTNERS[slug])
      .filter((p) => cat.types.includes(p.type))
      .map((p) => ({
        _id: p.slug,
        name: p.name,
        slug: p.slug,
        type: p.type,
        shortBio: p.shortBio,
        specialties: p.specialties,
        serviceAreas: p.serviceAreas,
        houseApprovedSeal: p.houseApprovedSeal,
      }));
  }

  return (
    <article className="bg-house-cream text-house-brown">
      {/* Hero */}
      <section className="px-[5vw] pt-[12vh] pb-14">
        <div className="max-w-[880px] mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <GhostLink href="/partners" arrow={false}>&larr; All partners</GhostLink>
          </div>
          <Eyebrow>Partners</Eyebrow>
          <h1 className="em-accent font-display font-medium text-[clamp(44px,6vw,76px)] leading-[1.05] tracking-[-0.01em] mt-4">
            {cat.title.replace(cat.titleEm, "")}<em>{cat.titleEm}</em>
          </h1>
          <p className="font-sans text-[19px] leading-[1.6] text-house-brown/70 mt-6 max-w-[58ch]">
            {cat.description}
          </p>
        </div>
      </section>

      {/* Partner grid */}
      <section className="px-[5vw] pb-20">
        <div className="max-w-[1200px] mx-auto">
          {partners.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display italic text-[20px] text-house-brown/50 mb-4">
                No partners in this category yet.
              </p>
              <p className="font-sans text-[15px] text-house-brown/50">
                We're growing the House Approved network. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((p) => (
                <Link
                  key={p.slug}
                  href={`/partners/${p.slug}`}
                  className="group block bg-white border border-house-brown/10 p-8 no-underline transition-all duration-[var(--t-slow)] ease-out hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(48,35,28,0.08)] hover:border-[var(--house-gold-dark)]"
                >
                  {/* Type + seal */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="font-sans text-[11px] tracking-[0.2em] uppercase"
                      style={{ color: "var(--house-gold-dark)" }}
                    >
                      {TYPE_LABELS[p.type] ?? p.type}
                    </span>
                    {p.houseApprovedSeal && (
                      <StateBadge state="live">House Approved</StateBadge>
                    )}
                  </div>

                  {/* Name + gold rule */}
                  <h2 className="font-display font-medium text-[26px] leading-[1.15] text-house-brown mb-2">
                    {p.name}
                  </h2>
                  <div
                    className="h-px w-7 mb-4 transition-[width] duration-[var(--t-slow)] ease-out group-hover:w-16"
                    style={{ background: "var(--house-gold-dark)" }}
                  />

                  {/* Bio */}
                  <p className="font-sans text-[15px] leading-[1.6] text-house-brown/70 mb-5">
                    {p.shortBio}
                  </p>

                  {/* Specialties */}
                  {p.specialties && p.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {p.specialties.slice(0, 4).map((spec) => (
                        <span
                          key={spec}
                          className="font-sans text-[10px] tracking-[0.06em] text-house-brown/55 border border-house-brown/12 px-2 py-0.5"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Service areas */}
                  {p.serviceAreas && p.serviceAreas.length > 0 && (
                    <p className="font-sans text-[12px] text-house-brown/50 mb-4">
                      {p.serviceAreas.join(" · ")}
                    </p>
                  )}

                  {/* CTA */}
                  <span
                    className="inline-flex items-center gap-2 font-sans text-[12px] tracking-[0.16em] uppercase transition-colors duration-[var(--t-base)] group-hover:text-[var(--house-gold-dark)]"
                    style={{ color: "var(--house-gold-dark)" }}
                  >
                    View profile
                    <span className="inline-block transition-transform duration-[var(--t-slow)] ease-out group-hover:translate-x-2">&rarr;</span>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Become a partner */}
      <section className="bg-house-brown text-house-cream px-[5vw] py-16 text-center">
        <p className="font-sans italic text-[18px] leading-[1.5] max-w-[56ch] mx-auto mb-4">
          Interested in becoming a House Approved partner?
        </p>
        <Link
          href="/contact"
          className="font-sans text-[12px] tracking-[0.16em] uppercase text-house-cream border border-house-cream/40 px-6 py-3 no-underline transition-all duration-[var(--t-base)] hover:bg-house-cream hover:text-house-brown"
        >
          Write to the House
        </Link>
      </section>
    </article>
  );
}
