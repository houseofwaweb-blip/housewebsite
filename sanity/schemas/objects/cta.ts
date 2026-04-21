import { defineField, defineType } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "action",
      type: "string",
      options: {
        list: [
          { title: "Internal link", value: "internal" },
          { title: "External URL", value: "external" },
          { title: "Book consultation", value: "book" },
          { title: "Pay now", value: "pay" },
          { title: "Quote entry", value: "quote" },
          { title: "Application only", value: "application" },
          { title: "Register interest", value: "waitlist" },
          { title: "Start HoWA", value: "howa" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "internalRef",
      type: "reference",
      to: [
        { type: "page" },
        { type: "service" },
        { type: "servicePackage" },
        { type: "article" },
        { type: "partner" },
      ],
      hidden: ({ parent }) => parent?.action !== "internal",
    }),
    defineField({
      name: "externalUrl",
      type: "url",
      hidden: ({ parent }) => parent?.action !== "external",
    }),
    defineField({
      name: "variant",
      type: "string",
      options: {
        list: ["gold", "outline", "outline-light", "teal", "ghost"],
      },
      initialValue: "gold",
    }),
  ],
});
