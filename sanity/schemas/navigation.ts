import { defineField, defineType } from "sanity";

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "headerItems",
      type: "array",
      of: [{ type: "navItem" }],
      description: "Primary desktop nav (intent-led, 7 items).",
    }),
    defineField({
      name: "footerGroups",
      type: "array",
      of: [{ type: "navGroup" }],
    }),
    defineField({
      name: "mobileOrder",
      type: "array",
      of: [{ type: "navItem" }],
      description: "Override ordering for mobile drawer if different from header.",
    }),
  ],
});
