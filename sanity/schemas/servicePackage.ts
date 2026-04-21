import { defineField, defineType } from "sanity";

export const servicePackage = defineType({
  name: "servicePackage",
  title: "Service package",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tier",
      type: "string",
      options: {
        list: [
          { title: "One-off", value: "one-off" },
          { title: "Care", value: "care" },
          { title: "Steward", value: "steward" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "price",
      type: "string",
      description: "Display string e.g. 'from £95' or 'From £16.99/mo'.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "priceValue",
      type: "number",
      description: "Machine-readable price (for JSON-LD Offer).",
    }),
    defineField({
      name: "priceCurrency",
      type: "string",
      initialValue: "GBP",
    }),
    defineField({
      name: "inclusions",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.min(1),
    }),
    defineField({ name: "bestFor", type: "string" }),
    defineField({
      name: "appliesTo",
      type: "reference",
      to: [{ type: "service" }],
    }),
    defineField({
      name: "cta",
      type: "string",
      options: {
        list: [
          { title: "Book now", value: "bookNow" },
          { title: "Pay now", value: "payNow" },
          { title: "Quote entry", value: "quoteEntry" },
          { title: "Application only", value: "applicationOnly" },
          { title: "Register interest", value: "waitlist" },
        ],
      },
      validation: (r) => r.required(),
    }),
  ],
});
