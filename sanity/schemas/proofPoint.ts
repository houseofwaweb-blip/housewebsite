import { defineField, defineType } from "sanity";

export const proofPoint = defineType({
  name: "proofPoint",
  title: "Proof point",
  type: "document",
  fields: [
    defineField({
      name: "type",
      type: "string",
      options: {
        list: [
          { title: "Testimonial", value: "testimonial" },
          { title: "Press", value: "press" },
          { title: "Award", value: "award" },
          { title: "Standard", value: "standard" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 3 }),
    defineField({
      name: "logo",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string" }],
    }),
    defineField({ name: "source", type: "string" }),
    defineField({ name: "url", type: "url" }),
    defineField({ name: "order", type: "number" }),
  ],
});
