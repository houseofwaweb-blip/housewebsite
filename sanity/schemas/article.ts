import { defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "lede",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(280),
    }),
    defineField({
      name: "hero",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", validation: (r) => r.required() },
        { name: "caption", type: "string" },
      ],
    }),
    defineField({
      name: "body",
      type: "portableText",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "articleCategory" }],
    }),
    defineField({
      name: "author",
      type: "string",
      description: "Byline — House voice or named contributor.",
      initialValue: "House of Willow Alexander",
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "isPremium",
      type: "boolean",
      description: "Gated behind HoWA+ (indexed, paywall signal in JSON-LD).",
      initialValue: false,
    }),
    defineField({
      name: "season",
      type: "string",
      options: {
        list: ["Spring", "Summer", "Autumn", "Winter", "Timeless"],
      },
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  orderings: [
    {
      title: "Published (newest first)",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
