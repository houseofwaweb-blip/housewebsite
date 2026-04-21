import { defineField, defineType } from "sanity";

export const redirect = defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  description:
    "Source of truth for URL redirects. Build script emits to next.config.ts + proxy.ts.",
  fields: [
    defineField({
      name: "from",
      type: "string",
      description: "Source path with leading slash (e.g. /shop/candles).",
      validation: (r) =>
        r.required().custom((v) =>
          typeof v === "string" && v.startsWith("/") ? true : "Must start with /",
        ),
    }),
    defineField({
      name: "to",
      type: "string",
      description: "Destination path or absolute URL.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "status",
      type: "number",
      options: { list: [301, 302, 307, 308] },
      initialValue: 301,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "note",
      type: "string",
      description: "Why this redirect exists (WP migration, rebrand, etc.).",
    }),
  ],
  preview: {
    select: { title: "from", subtitle: "to" },
  },
});
