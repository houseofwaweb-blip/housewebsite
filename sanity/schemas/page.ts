import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
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
      name: "section",
      type: "string",
      description: "Visual/voice mode for the page.",
      options: {
        list: [
          { title: "The House (editorial)", value: "house" },
          { title: "HoWA (operational)", value: "howa" },
          { title: "Design", value: "design" },
          { title: "Services", value: "services" },
          { title: "Protect", value: "protect" },
          { title: "Shop", value: "shop" },
          { title: "Journal", value: "journal" },
          { title: "Legal", value: "legal" },
        ],
      },
    }),
    defineField({ name: "hero", type: "heroBlock" }),
    defineField({ name: "body", type: "portableText" }),
    defineField({ name: "seo", type: "seo" }),
  ],
});
