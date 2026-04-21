import { defineField, defineType } from "sanity";

export const portfolioItem = defineType({
  name: "portfolioItem",
  title: "Portfolio item",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "year", type: "string" }),
    defineField({ name: "location", type: "string" }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "alt",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "caption", type: "text", rows: 2 }),
  ],
});
