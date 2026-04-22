import { defineType, defineField } from "sanity";

export default defineType({
  name: "howaFeature",
  title: "HoWA Feature",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({ name: "icon", title: "Icon (SVG)", type: "image" }),
    defineField({
      name: "tier",
      title: "Available in tiers",
      type: "array",
      of: [{ type: "string" }],
      options: { list: [
        { title: "Free", value: "free" },
        { title: "HoWA+", value: "plus" },
        { title: "Steward", value: "steward" },
      ] },
    }),
    defineField({ name: "linkHref", title: "Link (optional)", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
