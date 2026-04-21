import { defineField, defineType } from "sanity";

/**
 * Musing — free blog post.
 * Content pulled from WP "advice" CPT (currently labelled Advices).
 * Distinct from `article` (Hearth, premium/editorial) and `newsItem` (press).
 * Musings sit at /musings and are always free to read.
 */
export const musing = defineType({
  name: "musing",
  title: "Musing",
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
      validation: (r) => r.max(300),
    }),
    defineField({
      name: "hero",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt text" },
        { name: "caption", type: "string" },
      ],
    }),
    defineField({
      name: "body",
      type: "portableText",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author",
      type: "string",
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
