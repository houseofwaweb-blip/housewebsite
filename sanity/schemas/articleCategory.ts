import { defineField, defineType } from "sanity";

export const articleCategory = defineType({
  name: "articleCategory",
  title: "Article category",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({ name: "order", type: "number" }),
    defineField({
      name: "showOn",
      title: "Show on",
      type: "string",
      description:
        "Which website shows this category. Both sites read the same content.",
      options: {
        list: [
          { title: "Both sites", value: "both" },
          { title: "HoWA only (howa.co.uk)", value: "howa" },
          { title: "House only (willowalexander.co.uk)", value: "house" },
        ],
        layout: "radio",
      },
      initialValue: "both",
    }),
  ],
});
