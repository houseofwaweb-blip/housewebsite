import { defineField, defineType } from "sanity";

/**
 * pageSection — CMS-controlled content block for any page.
 *
 * Each document controls ONE section on ONE page. Editors can update
 * headlines, body text, CTAs, and feature lists without touching code.
 *
 * The `page` + `section` fields form the lookup key. The component
 * fetches by these fields and falls back to hardcoded defaults if
 * no Sanity document exists.
 *
 * Example: page="homepage", section="hero" controls the homepage hero.
 */
export const pageSection = defineType({
  name: "pageSection",
  title: "Page Section",
  type: "document",
  icon: () => "📄",
  fields: [
    defineField({
      name: "page",
      title: "Page",
      type: "string",
      description: 'Which page this section belongs to (e.g. "homepage", "howa", "howa-steward", "design-interiors").',
      validation: (r) => r.required(),
      options: {
        list: [
          { title: "Homepage", value: "homepage" },
          { title: "HoWA Landing", value: "howa" },
          { title: "HoWA Steward", value: "howa-steward" },
          { title: "HoWA Plans", value: "howa-plans" },
          { title: "HoWA+", value: "howa-plus" },
          { title: "HoWA Companion", value: "howa-companion" },
          { title: "HoWA How It Works", value: "howa-how-it-works" },
          { title: "HoWA FAQ", value: "howa-faq" },
          { title: "Design Interiors", value: "design-interiors" },
          { title: "Design Gardens", value: "design-gardens" },
          { title: "Services Landing", value: "services" },
          { title: "Protect", value: "protect" },
          { title: "The House", value: "the-house" },
          { title: "The Artwork", value: "the-house-artwork" },
          { title: "Partners", value: "partners" },
        ],
      },
    }),
    defineField({
      name: "section",
      title: "Section",
      type: "string",
      description: 'Section identifier within the page (e.g. "hero", "system-split", "closing-cta").',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Small caps label above the headline.",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "Main heading for this section.",
    }),
    defineField({
      name: "headlineEm",
      title: "Headline italic word(s)",
      type: "string",
      description: "The word(s) in the headline to render in italic (the House signature accent).",
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "string",
      description: "Secondary heading or tagline.",
    }),
    defineField({
      name: "body",
      title: "Body text",
      type: "text",
      rows: 4,
      description: "Main paragraph(s) for this section.",
    }),
    defineField({
      name: "body2",
      title: "Second body paragraph",
      type: "text",
      rows: 3,
      description: "Optional second paragraph.",
    }),
    defineField({
      name: "items",
      title: "List items",
      type: "array",
      of: [{ type: "string" }],
      description: "Bullet points, features, or proof points for this section.",
    }),
    defineField({
      name: "ctaLabel",
      title: "Primary CTA label",
      type: "string",
    }),
    defineField({
      name: "ctaHref",
      title: "Primary CTA link",
      type: "string",
    }),
    defineField({
      name: "cta2Label",
      title: "Secondary CTA label",
      type: "string",
    }),
    defineField({
      name: "cta2Href",
      title: "Secondary CTA link",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string" }],
    }),
    defineField({
      name: "caption",
      title: "Image caption",
      type: "string",
    }),
  ],
  preview: {
    select: { page: "page", section: "section", headline: "headline" },
    prepare({ page, section, headline }) {
      return {
        title: `${page} / ${section}`,
        subtitle: headline ?? "(no headline)",
      };
    },
  },
  orderings: [
    {
      title: "By page",
      name: "pageAsc",
      by: [
        { field: "page", direction: "asc" },
        { field: "section", direction: "asc" },
      ],
    },
  ],
});
