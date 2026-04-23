import { defineField, defineType } from "sanity";

export const megaGroup = defineType({
  name: "megaGroup",
  title: "Mega menu group",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "links", type: "array", of: [{ type: "megaLink" }] }),
  ],
  preview: {
    select: { title: "heading" },
  },
});
