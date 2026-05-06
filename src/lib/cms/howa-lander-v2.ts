import { sanityFetch } from "./fetch";

/**
 * HoWA Lander V2 CMS read.
 * Singleton document (id: "howaLanderV2").
 */

interface SanityImageRef {
  asset: { _ref: string };
  alt?: string;
}

export interface HoWANav { label: string; href: string }
export interface HoWAAnnotation { label: string; value: string }
export interface HoWATierFeature { icon: string; label: string }
export interface HoWATier {
  numeral: string;
  name: string;
  tagline: string;
  phoneImage?: SanityImageRef;
  phoneImageUrl?: string;
  phoneImageAlt?: string;
  features: HoWATierFeature[];
}
export interface HoWAStep { heading: string; sub: string }
export interface HoWAPoweredItem { icon: string; label: string }

export interface HoWALanderV2 {
  // header
  headerLogoCaption?: string;
  headerNavItems: HoWANav[];
  headerCtaLabel: string;
  headerCtaHref: string;

  // hero
  heroEyebrow?: string;
  heroHeadline: string;
  heroSubEyebrow?: string;
  heroLede: string;
  heroPrimaryCtaLabel: string;
  heroPrimaryCtaHref: string;
  heroSecondaryCtaLabel?: string;
  heroSecondaryCtaHref?: string;
  heroNextCare?: { label?: string; day?: string; time?: string };
  heroImageUrl?: string;
  heroImageAlt?: string;
  heroAnnotationsTop?: string[];
  heroAnnotationsLeft?: HoWAAnnotation[];
  heroAnnotationsRight?: HoWAAnnotation[];

  // tiers
  tiersTitle: string;
  tiers: HoWATier[];

  // workflow
  workflowTitle?: string;
  workflowLeadIcon?: string;
  workflowSteps: HoWAStep[];
  workflowSideImageUrl?: string;
  workflowSideImageAlt?: string;

  // powered
  poweredByTitle: string;
  poweredByItems: HoWAPoweredItem[];

  // final
  finalHeadline: string;
  finalSub?: string;
  finalCtaLabel: string;
  finalCtaHref: string;
}

const howaLanderV2Query = /* groq */ `*[_id == "howaLanderV2"][0]{
  headerLogoCaption,
  "headerNavItems": headerNavItems[]{ label, href },
  headerCtaLabel, headerCtaHref,

  heroEyebrow, heroHeadline, heroSubEyebrow, heroLede,
  heroPrimaryCtaLabel, heroPrimaryCtaHref,
  heroSecondaryCtaLabel, heroSecondaryCtaHref,
  heroNextCare,
  "heroImageUrl": heroImage.asset->url,
  "heroImageAlt": heroImage.alt,
  heroAnnotationsTop,
  "heroAnnotationsLeft": heroAnnotationsLeft[]{ label, value },
  "heroAnnotationsRight": heroAnnotationsRight[]{ label, value },

  tiersTitle,
  "tiers": tiers[]{
    numeral, name, tagline,
    "phoneImageUrl": phoneImage.asset->url,
    "phoneImageAlt": phoneImage.alt,
    "features": features[]{ icon, label }
  },

  workflowTitle, workflowLeadIcon,
  "workflowSteps": workflowSteps[]{ heading, sub },
  "workflowSideImageUrl": workflowSideImage.asset->url,
  "workflowSideImageAlt": workflowSideImage.alt,

  poweredByTitle,
  "poweredByItems": poweredByItems[]{ icon, label },

  finalHeadline, finalSub, finalCtaLabel, finalCtaHref
}`;

export async function getHoWALanderV2(): Promise<HoWALanderV2 | null> {
  return sanityFetch<HoWALanderV2 | null>({
    query: howaLanderV2Query,
    tags: ["howaLanderV2"],
  });
}
