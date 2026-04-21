import { defineType, defineArrayMember } from "sanity";

/**
 * Rich-text body used by article, page, legalPage, serviceSection.
 * Custom blocks per review finding D1 (DESIGN.md Part C).
 */
export const portableText = defineType({
  name: "portableText",
  title: "Portable text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Body", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Blockquote", value: "blockquote" },
      ],
      marks: {
        decorators: [
          { title: "Italic", value: "em" },
          { title: "Bold", value: "strong" },
          { title: "Small caps", value: "smallCaps" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              { name: "href", type: "url" },
              { name: "openInNew", type: "boolean", initialValue: false },
            ],
          },
          {
            name: "internalLink",
            type: "object",
            title: "Internal link",
            fields: [
              {
                name: "reference",
                type: "reference",
                to: [
                  { type: "page" },
                  { type: "article" },
                  { type: "service" },
                  { type: "partner" },
                ],
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (r) => r.required(),
        },
        { name: "caption", type: "string", title: "Caption" },
      ],
    }),
    defineArrayMember({ type: "pullQuote" }),
    defineArrayMember({ type: "dropCapPara" }),
    defineArrayMember({ type: "photoEssay" }),
    defineArrayMember({ type: "marginNote" }),
    defineArrayMember({ type: "inlineProduct" }),
    defineArrayMember({ type: "inlineCollection" }),
  ],
});
