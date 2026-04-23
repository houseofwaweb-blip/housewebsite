import { defineField, defineType } from "sanity";

export const megaLink = defineType({
  name: "megaLink",
  title: "Mega menu link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "string", description: "Short description shown below the label." }),
    defineField({ name: "external", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
