/**
 * GROQ queries.
 * Keep each query narrow and tag-scoped so revalidate works precisely.
 */

export const siteSettingsQuery = /* groq */ `*[_type == "siteSettings"][0]{
  title, phone, contactEmail,
  headerCtaLabelLive, headerCtaLabelFallback,
  footerCopy, socialHandles, defaultSeo
}`;

export const navigationQuery = /* groq */ `*[_type == "navigation"][0]{
  headerItems[]{label, href, external},
  footerGroups[]{heading, items[]{label, href, external}},
  mobileOrder[]{label, href, external}
}`;

export const pageBySlugQuery = /* groq */ `*[_type == "page" && slug.current == $slug][0]{
  title, section, hero, body, seo
}`;

export const partnerBySlugQuery = /* groq */ `*[_type == "partner" && slug.current == $slug][0]{
  name, type, shortBio, longBio,
  founderPortrait, heroImage, portfolio,
  specialties, serviceAreas, website, instagram,
  contactRoute, houseApprovedSeal, featured, seo
}`;

export const featuredPartnersQuery = /* groq */ `*[_type == "partner" && featured == true] | order(order asc){
  _id, name, "slug": slug.current, type, shortBio, founderPortrait, heroImage, houseApprovedSeal
}`;

export const serviceBySlugQuery = /* groq */ `*[_type == "service" && slug.current == $slug][0]{
  name, category, lede, hero, sections,
  recurring, availableAreas,
  "linkedPackages": linkedPackages[]->{_id, name, "slug": slug.current, tier, price, inclusions, bestFor, cta},
  seo
}`;

export const allServicesQuery = /* groq */ `*[_type == "service"]{
  _id, name, "slug": slug.current, category, lede, hero
}`;

export const articleBySlugQuery = /* groq */ `*[_type == "article" && slug.current == $slug][0]{
  title, lede, hero, body,
  "category": category->{name, "slug": slug.current},
  author, tags, publishedAt, isPremium, season, seo
}`;

export const recentArticlesQuery = /* groq */ `*[_type == "article"] | order(publishedAt desc)[0...$limit]{
  _id, title, "slug": slug.current, lede, hero, isPremium, publishedAt,
  "category": category->{name, "slug": slug.current}
}`;

export const redirectsQuery = /* groq */ `*[_type == "redirect"]{from, to, status}`;

export const faqsForPageQuery = /* groq */ `*[_type == "faq" && $slug in pages]{
  _id, question, answer
}`;
