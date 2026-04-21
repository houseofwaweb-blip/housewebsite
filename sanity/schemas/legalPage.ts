import { defineField, defineType } from "sanity";

export const legalPage = defineType({
  name: "legalPage",
  title: "Legal page",
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
      name: "body",
      type: "portableText",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "updatedAt",
      type: "datetime",
      validation: (r) => r.required(),
    }),
  ],
});
