import { defineField, defineType } from "sanity";

export const navItem = defineType({
  name: "navItem",
  title: "Nav item",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "external",
      type: "boolean",
      description: "Open in new tab (for HoWA Product links etc).",
      initialValue: false,
    }),
  ],
});
