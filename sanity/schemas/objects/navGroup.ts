import { defineField, defineType } from "sanity";

export const navGroup = defineType({
  name: "navGroup",
  title: "Nav group",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "items",
      type: "array",
      of: [{ type: "navItem" }],
    }),
  ],
});
