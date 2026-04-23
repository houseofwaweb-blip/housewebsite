/**
 * GROQ queries.
 * Keep each query narrow and tag-scoped so revalidate works precisely.
 */

// ─── Site settings ─────────────────────────────────────────────────────────
export const siteSettingsQuery = /* groq */ `*[_type == "siteSettings"][0]{
  title, phone, contactEmail,
  headerCtaLabelLive, headerCtaLabelFallback,
  footerCopy, socialHandles, defaultSeo
}`;

// ─── Navigation ────────────────────────────────────────────────────────────
export const navigationQuery = /* groq */ `*[_type == "navigation"][0]{
  primaryNav[]{
    trigger, triggerHref,
    groups[]{
      heading,
      links[]{label, href, description, external}
    },
    "previewImage": previewImage.asset->url,
    "previewAlt": previewImage.alt,
    previewTag, previewHeading, previewHref
  },
  footerGroups[]{heading, items[]{label, href, external}},
  mobileOrder[]{label, href, external}
}`;

// ─── Pages ─────────────────────────────────────────────────────────────────
export const pageBySlugQuery = /* groq */ `*[_type == "page" && slug.current == $slug][0]{
  title, section, hero, body, seo
}`;

// ─── Services ──────────────────────────────────────────────────────────────
export const allServicesQuery = /* groq */ `*[_type == "service"] | order(order asc){
  _id,
  "slug": slug.current,
  name,
  category,
  lede,
  hero,
  headline,
  eyebrow,
  recurring,
  availableAreas,
  included,
  howItWorks,
  order
}`;

export const serviceBySlugQuery = /* groq */ `*[_type == "service" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  category,
  lede,
  headline,
  eyebrow,
  hero,
  recurring,
  availableAreas,
  included,
  howItWorks,
  sections,
  order,
  seo
}`;

export const servicePackagesQuery = /* groq */ `*[_type == "servicePackage" && service._ref == $serviceId] | order(order asc){
  _id,
  title,
  "slug": slug.current,
  tier,
  price,
  bestFor,
  inclusions,
  order
}`;

export const allServicePackagesQuery = /* groq */ `*[_type == "servicePackage" && defined(service)] | order(order asc){
  _id,
  title,
  "slug": slug.current,
  "serviceSlug": service->slug.current,
  tier,
  price,
  bestFor,
  inclusions,
  order
}`;

// ─── Partners ──────────────────────────────────────────────────────────────
export const allPartnersQuery = /* groq */ `*[_type == "partner"] | order(order asc){
  _id,
  name,
  "slug": slug.current,
  partnerType,
  typeLabel,
  shortBio,
  heroEyebrow,
  heroHeadline,
  heroSub,
  role,
  specialties,
  serviceAreas,
  instagram,
  houseApprovedSeal,
  order
}`;

export const partnerBySlugQuery = /* groq */ `*[_type == "partner" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  partnerType,
  typeLabel,
  shortBio,
  bio,
  heroEyebrow,
  heroHeadline,
  heroSub,
  role,
  founded,
  basedIn,
  founderPortrait,
  heroImage,
  portfolio,
  specialties,
  serviceAreas,
  website,
  instagram,
  houseApprovedSeal,
  order,
  seo
}`;

// Partners by design discipline (interiors / gardens)
export const partnersByDisciplineQuery = /* groq */ `*[_type == "partner" && $discipline in designDisciplines] | order(order asc){
  _id,
  name,
  "slug": slug.current,
  type,
  shortBio,
  founderPortrait,
  heroImage,
  specialties,
  serviceAreas,
  houseApprovedSeal,
  order
}`;

export const featuredPartnersQuery = /* groq */ `*[_type == "partner" && featured == true] | order(order asc){
  _id,
  name,
  "slug": slug.current,
  partnerType,
  shortBio,
  founderPortrait,
  heroImage,
  houseApprovedSeal
}`;

// ─── Steward Plans ─────────────────────────────────────────────────────────
export const stewardPlansQuery = /* groq */ `*[_type == "servicePackage" && _id match "stewardPlan.*"] | order(order asc){
  _id,
  title,
  "slug": slug.current,
  tier,
  price,
  bestFor,
  inclusions,
  category,
  featured,
  order
}`;

// ─── FAQs ──────────────────────────────────────────────────────────────────
export const faqsByCategoryQuery = /* groq */ `*[_type == "faq" && category == $category]{
  _id,
  question,
  answer
}`;

export const faqsForPageQuery = /* groq */ `*[_type == "faq" && $slug in pages]{
  _id, question, answer
}`;

// ─── Legal ─────────────────────────────────────────────────────────────────
export const legalPageBySlugQuery = /* groq */ `*[_type == "legalPage" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  body,
  lastUpdated
}`;

export const allLegalPagesQuery = /* groq */ `*[_type == "legalPage"]{
  title,
  "slug": slug.current
}`;

// ─── Articles (Hearth) ────────────────────────────────────────────────────
export const articleBySlugQuery = /* groq */ `*[_type == "article" && slug.current == $slug][0]{
  title, lede, hero, body,
  "category": category->{name, "slug": slug.current},
  author, tags, publishedAt, isPremium, season, seo
}`;

export const recentArticlesQuery = /* groq */ `*[_type == "article"] | order(publishedAt desc)[0...$limit]{
  _id, title, "slug": slug.current, lede, hero, isPremium, publishedAt,
  "category": category->{name, "slug": slug.current}
}`;

// ─── News & Musings ────────────────────────────────────────────────────────
export const allNewsQuery = /* groq */ `*[_type == "newsItem"] | order(publishedAt desc){
  _id, title, "slug": slug.current, lede, body, publishedAt, hero
}`;

export const newsBySlugQuery = /* groq */ `*[_type == "newsItem" && slug.current == $slug][0]{
  title, "slug": slug.current, lede, body, publishedAt, hero, seo
}`;

export const allMusingsQuery = /* groq */ `*[_type == "musing"] | order(publishedAt desc){
  _id, title, "slug": slug.current, lede, body, publishedAt, hero
}`;

export const musingBySlugQuery = /* groq */ `*[_type == "musing" && slug.current == $slug][0]{
  title, "slug": slug.current, lede, body, publishedAt, hero, seo
}`;

// ─── Page sections (CMS-controlled content blocks) ───────────────────────
export const pageSectionsQuery = /* groq */ `*[_type == "pageSection" && page == $page]{
  section, eyebrow, headline, headlineEm, subheadline, body, body2,
  items, ctaLabel, ctaHref, cta2Label, cta2Href, caption,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt
}`;

export const pageSectionQuery = /* groq */ `*[_type == "pageSection" && page == $page && section == $section][0]{
  section, eyebrow, headline, headlineEm, subheadline, body, body2,
  items, ctaLabel, ctaHref, cta2Label, cta2Href, caption,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt
}`;

// ─── Newsletter blocks ────────────────────────────────────────────────────
export const newsletterBlockByPlacementQuery = /* groq */ `*[_type == "newsletterBlock" && placement == $placement][0]{
  placement, variant, eyebrow, headline, body,
  namePlaceholder, emailPlaceholder, buttonLabel, successMessage, legalNote
}`;

// ─── Search (unified cross-content) ───────────────────────────────────────
// GROQ `match` is word-prefix matching. Append `*` for partial match.
export const unifiedSearchQuery = /* groq */ `{
  "services": *[_type == "service" && (name match $q || lede match $q)] | order(order asc)[0...10]{
    _id, name, "slug": slug.current, lede, "type": "Service"
  },
  "partners": *[_type == "partner" && (name match $q || shortBio match $q)] | order(order asc)[0...10]{
    _id, name, "slug": slug.current, shortBio, "type": "Partner"
  },
  "articles": *[_type == "article" && (title match $q || lede match $q)] | order(publishedAt desc)[0...10]{
    _id, title, "slug": slug.current, lede, isPremium, "type": "Journal",
    "category": category->{name, "slug": slug.current}
  },
  "news": *[_type == "newsItem" && (title match $q || lede match $q)] | order(publishedAt desc)[0...5]{
    _id, title, "slug": slug.current, lede, "type": "The House"
  },
  "musings": *[_type == "musing" && (title match $q || lede match $q)] | order(publishedAt desc)[0...5]{
    _id, title, "slug": slug.current, lede, "type": "The House"
  }
}`;

// ─── Redirects ─────────────────────────────────────────────────────────────
export const redirectsQuery = /* groq */ `*[_type == "redirect"]{from, to, status}`;
