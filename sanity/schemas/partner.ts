import { defineField, defineType } from "sanity";

export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "type",
      type: "string",
      options: {
        list: [
          { title: "Design studio", value: "design-studio" },
          { title: "Interior designer", value: "interior-designer" },
          { title: "Garden designer", value: "garden-designer" },
          { title: "Gardener", value: "gardener" },
          { title: "Cleaner", value: "cleaner" },
          { title: "Window cleaner", value: "window-cleaner" },
          { title: "Handyman", value: "handyman" },
          { title: "Craftsman", value: "craftsman" },
          { title: "Artisan maker", value: "artisan-maker" },
          { title: "Brand partner", value: "brand-partner" },
          { title: "Shop supplier", value: "shop-supplier" },
        ],
        layout: "dropdown",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "shortBio",
      type: "text",
      rows: 2,
      validation: (r) => r.required().max(240),
    }),
    defineField({ name: "longBio", type: "portableText" }),
    defineField({
      name: "founderPortrait",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", validation: (r) => r.required() }],
    }),
    defineField({
      name: "heroImage",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", validation: (r) => r.required() }],
    }),
    defineField({
      name: "portfolio",
      type: "array",
      of: [{ type: "portfolioItem" }],
    }),
    defineField({ name: "specialties", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "serviceAreas", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "website", type: "url" }),
    defineField({ name: "instagram", type: "string" }),
    defineField({
      name: "contactRoute",
      type: "string",
      options: {
        list: [
          { title: "In-site consultation form", value: "consultation" },
          { title: "Direct email (via form)", value: "direct" },
          { title: "External site", value: "external" },
        ],
      },
      initialValue: "consultation",
    }),
    defineField({
      name: "designDisciplines",
      title: "Design disciplines",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Interior design", value: "interiors" },
          { title: "Garden design", value: "gardens" },
        ],
      },
      description: "Tick which design pages this partner should appear on.",
    }),
    defineField({
      name: "houseApprovedSeal",
      type: "boolean",
      description: "Display House Approved seal on profile.",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      type: "boolean",
      description: "Surface on homepage / landing pages.",
      initialValue: false,
    }),
    defineField({ name: "order", type: "number" }),
    defineField({
      name: "consentConfirmed",
      type: "boolean",
      description: "Partner has signed off on published profile copy + imagery.",
      initialValue: false,
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  orderings: [
    {
      title: "Manual order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
