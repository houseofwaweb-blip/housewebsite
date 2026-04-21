import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "Overrides default page title (max 60 chars).",
      validation: (r) => r.max(60),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 2,
      description: "Meta description (max 160 chars).",
      validation: (r) => r.max(160),
    }),
    defineField({
      name: "ogImage",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "noindex",
      type: "boolean",
      description: "Prevent search engines from indexing.",
      initialValue: false,
    }),
  ],
});
