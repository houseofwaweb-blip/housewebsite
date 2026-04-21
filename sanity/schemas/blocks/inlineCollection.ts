import { defineField, defineType } from "sanity";

export const inlineCollection = defineType({
  name: "inlineCollection",
  title: "Inline collection",
  type: "object",
  description: "Shopify collection surfaced inside editorial. Stored by handle.",
  fields: [
    defineField({
      name: "handle",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "limit",
      type: "number",
      description: "Max products to render.",
      initialValue: 4,
      validation: (r) => r.min(1).max(12),
    }),
    defineField({ name: "introCopy", type: "text", rows: 2 }),
  ],
});
