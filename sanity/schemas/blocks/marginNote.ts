import { defineField, defineType } from "sanity";

export const marginNote = defineType({
  name: "marginNote",
  title: "Margin note",
  type: "object",
  description: "Sidebar aside rendered in the outer margin at desktop, inline on mobile.",
  fields: [
    defineField({ name: "label", type: "string" }),
    defineField({
      name: "body",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
  ],
});
