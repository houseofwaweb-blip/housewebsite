import { defineField, defineType } from "sanity";

/**
 * News item — press recognition, awards, announcements.
 * Content pulled from WP category "News" (post type: post).
 * Presentation at /news is factual and minimal, not editorial.
 */
export const newsItem = defineType({
  name: "newsItem",
  title: "News",
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
    }),
    defineField({
      name: "author",
      type: "string",
      initialValue: "House of Willow Alexander",
    }),
    defineField({
      name: "externalUrl",
      type: "url",
      description: "Original source / press coverage URL, if any.",
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
