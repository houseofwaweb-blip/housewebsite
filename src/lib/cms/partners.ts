import { sanityFetch } from "./fetch";
import { allPartnersQuery, partnerBySlugQuery } from "./queries";
import { servicesReady } from "@/lib/env";
import { LAUNCH_PARTNERS, PARTNER_ORDER, type LaunchPartner, type PartnerSlug } from "@/lib/partners-data";

interface SanityPartner {
  _id: string;
  name: string;
  slug: string;
  partnerType: string;
  typeLabel: string;
  shortBio: string;
  bio?: unknown[];
  heroEyebrow: string;
  heroHeadline: string;
  heroSub: string;
  role: string;
  founded?: string;
  basedIn?: string;
  specialties: string[];
  serviceAreas: string[];
  website?: string;
  instagram?: string;
  houseApprovedSeal: boolean;
  order: number;
}

export async function getAllPartners(): Promise<LaunchPartner[]> {
  if (servicesReady.sanity) {
    try {
      const docs = await sanityFetch<SanityPartner[]>({
        query: allPartnersQuery,
        tags: ["partner"],
      });
      if (docs.length > 0) {
        return docs.map((d) => sanityToPartner(d));
      }
    } catch (e) { console.error("[cms/partners]", e); }
  }
  return PARTNER_ORDER.map((slug) => LAUNCH_PARTNERS[slug]);
}

export async function getPartnerBySlug(slug: string): Promise<LaunchPartner | undefined> {
  if (servicesReady.sanity) {
    try {
      const doc = await sanityFetch<SanityPartner | null>({
        query: partnerBySlugQuery,
        params: { slug },
        tags: ["partner"],
      });
      if (doc) return sanityToPartner(doc);
    } catch (e) { console.error("[cms/partners]", e); }
  }
  return LAUNCH_PARTNERS[slug as PartnerSlug];
}

function sanityToPartner(doc: SanityPartner): LaunchPartner {
  const fallback = LAUNCH_PARTNERS[doc.slug as PartnerSlug];
  return {
    ...fallback,
    slug: doc.slug as PartnerSlug,
    name: doc.name,
    type: (doc.partnerType || fallback?.type || "design-studio") as LaunchPartner["type"],
    typeLabel: doc.typeLabel || fallback?.typeLabel || "",
    heroEyebrow: doc.heroEyebrow || fallback?.heroEyebrow || "",
    heroHeadline: doc.heroHeadline || fallback?.heroHeadline || "",
    heroSub: doc.heroSub || fallback?.heroSub || "",
    role: doc.role || fallback?.role || "",
    shortBio: doc.shortBio || fallback?.shortBio || "",
    founded: doc.founded || fallback?.founded || "",
    basedIn: doc.basedIn || fallback?.basedIn || "",
    specialties: doc.specialties || fallback?.specialties || [],
    serviceAreas: doc.serviceAreas || fallback?.serviceAreas || [],
    website: doc.website || fallback?.website,
    instagram: doc.instagram || fallback?.instagram,
    houseApprovedSeal: doc.houseApprovedSeal ?? fallback?.houseApprovedSeal ?? false,
  };
}
