import { sanityFetch } from "./fetch";

/**
 * Homepage V2 CMS read.
 * Singleton document (id: "homepageV2"). One fetch returns the whole page.
 */

interface SanityImage {
  asset: { _ref: string };
  alt?: string;
}

interface CtaPair { label?: string; href?: string }

export interface Temperament {
  name: string;
  image?: SanityImage;
  imageUrl?: string;
  href?: string;
  ctaLabel?: string;
}

export interface PhoneScreen {
  tier: string;
  image?: SanityImage;
  imageUrl?: string;
  imageAlt?: string;
  hoverImageUrl?: string;
  hoverImageAlt?: string;
}

export interface HoWAFeature {
  icon: string;
  heading: string;
  body: string;
}

export interface Pillar {
  name: string;
  headline: string;
  body: string;
  image?: SanityImage;
  imageUrl?: string;
  imageAlt?: string;
  hoverImageUrl?: string;
  hoverImageAlt?: string;
  sublinks?: { label: string; href: string }[];
  ctaLabel?: string;
  ctaHref?: string;
}

export interface WorkflowStep {
  heading: string;
  sub: string;
}

export interface Stat {
  num: string;
  label: string;
}

export interface PoweredItem {
  icon: string;
  label: string;
}

export interface HomepageV2 {
  // hero
  heroEyebrow?: string;
  heroHeadline: string;
  heroLede: string;
  heroPrimaryCtaLabel: string;
  heroPrimaryCtaHref: string;
  heroSecondaryCtaLabel: string;
  heroSecondaryCtaSub?: string;
  heroSecondaryCtaHref: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  heroOverlayHeading?: string;
  heroOverlayTagline?: string;

  // temperaments
  temperamentsTitle: string;
  temperaments: Temperament[];

  // howa
  howaSubtitle?: string;
  howaLede: string;
  howaLinkLabel?: string;
  howaLinkHref?: string;
  howaPhones: PhoneScreen[];
  howaFeatures: HoWAFeature[];
  howaCtaLabel?: string;
  howaCtaHref?: string;

  // pillars
  pillars: Pillar[];

  // workflow + stats
  workflowLeadIcon?: string;
  workflowSteps: WorkflowStep[];
  stats: Stat[];

  // powered by
  poweredByTitle: string;
  poweredByItems: PoweredItem[];

  // final cta
  finalCtaStatement: string;
  finalCtaSub?: string;
  finalCtaPrimaryLabel: string;
  finalCtaPrimaryHref: string;
  finalCtaSecondaryLabel?: string;
  finalCtaSecondaryHref?: string;
}

const homepageV2Query = /* groq */ `*[_id == "homepageV2"][0]{
  heroEyebrow, heroHeadline, heroLede,
  heroPrimaryCtaLabel, heroPrimaryCtaHref,
  heroSecondaryCtaLabel, heroSecondaryCtaSub, heroSecondaryCtaHref,
  "heroImageUrl": heroImage.asset->url,
  "heroImageAlt": heroImage.alt,
  heroOverlayHeading, heroOverlayTagline,

  temperamentsTitle,
  "temperaments": temperaments[]{
    name,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    href, ctaLabel
  },

  howaSubtitle, howaLede, howaLinkLabel, howaLinkHref,
  "howaPhones": howaPhones[]{
    tier,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  },
  "howaFeatures": howaFeatures[]{ icon, heading, body },
  howaCtaLabel, howaCtaHref,

  "pillars": pillars[]{
    name, headline, body,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    "sublinks": sublinks[]{ label, href },
    ctaLabel, ctaHref
  },

  workflowLeadIcon,
  "workflowSteps": workflowSteps[]{ heading, sub },
  "stats": stats[]{ num, label },

  poweredByTitle,
  "poweredByItems": poweredByItems[]{ icon, label },

  finalCtaStatement, finalCtaSub,
  finalCtaPrimaryLabel, finalCtaPrimaryHref,
  finalCtaSecondaryLabel, finalCtaSecondaryHref
}`;

export async function getHomepageV2(): Promise<HomepageV2 | null> {
  return sanityFetch<HomepageV2 | null>({
    query: homepageV2Query,
    tags: ["homepageV2"],
  });
}
