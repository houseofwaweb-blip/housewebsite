import { defineField, defineType } from "sanity";

export const dropCapPara = defineType({
  name: "dropCapPara",
  title: "Drop-cap paragraph",
  type: "object",
  fields: [
    defineField({
      name: "body",
      type: "text",
      rows: 6,
      description: "Opening paragraph rendered with oversized Didot drop cap.",
      validation: (r) => r.required(),
    }),
  ],
});
