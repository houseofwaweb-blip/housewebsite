import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
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
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Gardening", value: "gardening" },
          { title: "Window cleaning", value: "window-cleaning" },
          { title: "Cleaning", value: "cleaning" },
          { title: "Gutter cleaning", value: "gutter-cleaning" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "lede",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(240),
    }),
    defineField({ name: "hero", type: "heroBlock" }),
    defineField({
      name: "sections",
      type: "array",
      of: [{ type: "serviceSection" }],
    }),
    defineField({
      name: "recurring",
      type: "boolean",
      description: "Available as a Steward Plan (recurring managed care).",
      initialValue: false,
    }),
    defineField({
      name: "availableAreas",
      type: "array",
      of: [{ type: "string" }],
      description: "Postcode areas (e.g. SW, W, KT).",
    }),
    defineField({
      name: "linkedPackages",
      type: "array",
      of: [{ type: "reference", to: [{ type: "servicePackage" }] }],
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
});
