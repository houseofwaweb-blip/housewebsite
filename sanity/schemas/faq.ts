import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "answer",
      type: "portableText",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          "general",
          "howa",
          "services",
          "design",
          "protect",
          "shop",
          "billing",
          "privacy",
        ],
      },
    }),
    defineField({
      name: "pages",
      type: "array",
      of: [{ type: "string" }],
      description: "Page slugs this FAQ should surface on.",
    }),
  ],
});
