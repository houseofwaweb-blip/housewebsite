import { defineField, defineType } from "sanity";

/**
 * artworkPage — singleton-style document for /the-house/artwork.
 *
 * An origin-story page with ten ordered chapters. Each chapter has a roman
 * numeral marker, a kicker, a headline, a multi-paragraph body, and an
 * optional pull quote. Layout (split, atmosphere, palette shift, volumes,
 * ecosystem) is fixed in code; this document owns the editable copy.
 */
export const artworkPage = defineType({
  name: "artworkPage",
  title: "The Artwork of the House",
  type: "document",
  icon: () => "🎨",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero eyebrow",
      type: "string",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero title",
      type: "string",
      description: "Main heading without the italic accent (e.g. ‘The Artwork’).",
    }),
    defineField({
      name: "heroTitleEm",
      title: "Hero title italic word(s)",
      type: "string",
      description: "The italic accent inside the headline (e.g. ‘of the House.’).",
    }),
    defineField({
      name: "heroLede",
      title: "Hero lede",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroScrollCue",
      title: "Hero scroll cue",
      type: "string",
      description: "Small cue line below the lede (e.g. ‘↓ ten chapters’).",
    }),
    defineField({
      name: "chapters",
      title: "Chapters",
      type: "array",
      description:
        "Ordered list of chapters (10 by default). Each chapter has a roman numeral, kicker, headline, body paragraphs, and an optional pull quote. The layout is fixed in code.",
      of: [
        {
          type: "object",
          name: "artworkChapter",
          title: "Chapter",
          fields: [
            {
              name: "roman",
              title: "Roman numeral",
              type: "string",
              description: "One of I–X.",
              validation: (r) => r.required(),
            },
            { name: "kicker", title: "Kicker line", type: "string" },
            { name: "headline", title: "Headline", type: "string" },
            {
              name: "body",
              title: "Body paragraphs",
              type: "array",
              of: [{ type: "text", rows: 4 }],
              description: "Each item is one paragraph.",
            },
            { name: "pullQuote", title: "Pull quote (optional)", type: "string" },
          ],
          preview: {
            select: { title: "headline", subtitle: "roman" },
            prepare({ title, subtitle }) {
              return { title: title ?? "(no headline)", subtitle: `Chapter ${subtitle ?? "?"}` };
            },
          },
        },
      ],
    }),
    defineField({
      name: "closingKicker",
      title: "Closing kicker",
      type: "string",
    }),
    defineField({
      name: "closingStatement",
      title: "Closing statement (text)",
      type: "text",
      rows: 3,
      description: "Full statement; italic accent and line break are fixed in code.",
    }),
    defineField({
      name: "closingStatementEm",
      title: "Closing statement italic word(s)",
      type: "string",
      description: "The italic accent inside the closing statement.",
    }),
    defineField({
      name: "closingCtaPrimary",
      title: "Primary CTA label",
      type: "string",
    }),
    defineField({
      name: "closingCtaPrimaryHref",
      title: "Primary CTA href",
      type: "string",
    }),
    defineField({
      name: "closingCtaSecondary",
      title: "Secondary CTA label",
      type: "string",
    }),
    defineField({
      name: "closingCtaSecondaryHref",
      title: "Secondary CTA href",
      type: "string",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "The closing line under the colophon (e.g. ‘Ownership is passive. Stewardship is intentional.’).",
    }),
    defineField({
      name: "taglineEm",
      title: "Tagline italic word(s)",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "heroTitle" },
    prepare({ title }) {
      return { title: "The Artwork of the House", subtitle: title ?? "(no hero title)" };
    },
  },
});
