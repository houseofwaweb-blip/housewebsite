import { defineField, defineType } from "sanity";

export const pullQuote = defineType({
  name: "pullQuote",
  title: "Pull quote",
  type: "object",
  fields: [
    defineField({
      name: "quote",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({ name: "attribution", type: "string" }),
  ],
});
