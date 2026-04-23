import { defineField, defineType } from "sanity";

export const megaPanel = defineType({
  name: "megaPanel",
  title: "Mega menu panel",
  type: "object",
  fields: [
    defineField({ name: "trigger", type: "string", description: "Nav bar label (e.g. 'The House').", validation: (r) => r.required() }),
    defineField({ name: "triggerHref", type: "string", description: "Link when nav item is clicked directly." }),
    defineField({ name: "groups", type: "array", of: [{ type: "megaGroup" }] }),
    defineField({
      name: "previewImage",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string" }],
      description: "Optional preview image shown in the mega panel.",
    }),
    defineField({ name: "previewTag", type: "string" }),
    defineField({ name: "previewHeading", type: "string" }),
    defineField({ name: "previewHref", type: "string" }),
  ],
  preview: {
    select: { title: "trigger" },
  },
});
