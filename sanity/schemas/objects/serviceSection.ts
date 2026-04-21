import { defineField, defineType } from "sanity";

export const serviceSection = defineType({
  name: "serviceSection",
  title: "Service section",
  type: "object",
  fields: [
    defineField({
      name: "kind",
      type: "string",
      options: {
        list: [
          { title: "What's included", value: "included" },
          { title: "How it works", value: "how" },
          { title: "FAQ", value: "faq" },
          { title: "Rich text", value: "richText" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "heading", type: "string" }),
    defineField({
      name: "bullets",
      type: "array",
      of: [{ type: "string" }],
      hidden: ({ parent }) => !["included", "how"].includes(parent?.kind as string),
    }),
    defineField({
      name: "faqRefs",
      type: "array",
      of: [{ type: "reference", to: [{ type: "faq" }] }],
      hidden: ({ parent }) => parent?.kind !== "faq",
    }),
    defineField({
      name: "body",
      type: "portableText",
      hidden: ({ parent }) => parent?.kind !== "richText",
    }),
  ],
});
