import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "homeType", title: "Home type", type: "string", description: 'e.g. "3-bed Victorian, Oxfordshire"' }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({
      name: "product",
      title: "Product tags",
      type: "array",
      of: [{ type: "string" }],
      options: { list: [
        { title: "HoWA", value: "howa" },
        { title: "HoWA+", value: "howa-plus" },
        { title: "Companion", value: "companion" },
        { title: "Steward", value: "steward" },
        { title: "Services", value: "services" },
        { title: "Shop", value: "shop" },
      ] },
    }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "homeType" },
  },
});
