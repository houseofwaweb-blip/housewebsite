import { defineField, defineType } from "sanity";

export const inlineProduct = defineType({
  name: "inlineProduct",
  title: "Inline product",
  type: "object",
  description: "Shopify product surfaced inside editorial. Stored by handle.",
  fields: [
    defineField({
      name: "handle",
      type: "string",
      description: "Shopify product handle (slug in Shopify admin).",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "display",
      type: "string",
      options: {
        list: [
          { title: "Card", value: "card" },
          { title: "Inline mention", value: "inline" },
        ],
      },
      initialValue: "card",
    }),
    defineField({ name: "houseNote", type: "text", rows: 2 }),
  ],
});
