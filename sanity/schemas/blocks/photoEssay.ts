import { defineField, defineType } from "sanity";

export const photoEssay = defineType({
  name: "photoEssay",
  title: "Photo essay",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({
      name: "layout",
      type: "string",
      options: {
        list: [
          { title: "Full-bleed", value: "full" },
          { title: "Two-up grid", value: "duo" },
          { title: "Three-up grid", value: "trio" },
        ],
      },
      initialValue: "duo",
    }),
    defineField({
      name: "images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", validation: (r) => r.required() },
            { name: "caption", type: "string" },
          ],
        },
      ],
      validation: (r) => r.min(2),
    }),
  ],
});
