import { defineField, defineType } from "sanity";

/**
 * newsletterBlock — CMS-controlled newsletter signup content.
 *
 * Each document represents one placement on the site (homepage, /howa, /services, etc.).
 * The `placement` slug identifies which page fetches it. Editors control headline,
 * body, button label, variant (cream/dark/paper), and success message.
 *
 * Component: NewsletterInline reads these via GROQ and falls back to hardcoded
 * defaults if no Sanity doc exists for a given placement.
 */
export const newsletterBlock = defineType({
  name: "newsletterBlock",
  title: "Newsletter Block",
  type: "document",
  icon: () => "📬",
  fields: [
    defineField({
      name: "placement",
      title: "Placement",
      type: "string",
      description:
        'Unique slug identifying where this block appears (e.g. "homepage", "howa", "services", "the-house", "protect", "howa-plus").',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "variant",
      title: "Visual variant",
      type: "string",
      options: {
        list: [
          { title: "Cream (light pages)", value: "cream" },
          { title: "Dark (brown band)", value: "dark" },
          { title: "Paper (parchment with tracing lines)", value: "paper" },
        ],
        layout: "radio",
      },
      initialValue: "cream",
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow label",
      type: "string",
      initialValue: "The Hearth",
      description: "Small caps label above the headline.",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "Main heading. Rendered in italic Didot.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Body text",
      type: "text",
      rows: 3,
      description: "One or two sentences below the headline.",
    }),
    defineField({
      name: "namePlaceholder",
      title: "Name field placeholder",
      type: "string",
      initialValue: "Your name",
      description: "Placeholder for the name input.",
    }),
    defineField({
      name: "emailPlaceholder",
      title: "Email field placeholder",
      type: "string",
      initialValue: "your@email.co.uk",
      description: "Placeholder for the email input.",
    }),
    defineField({
      name: "buttonLabel",
      title: "Button label",
      type: "string",
      initialValue: "Subscribe",
    }),
    defineField({
      name: "successMessage",
      title: "Success message",
      type: "string",
      initialValue: "Welcome to The Hearth. The first letter arrives Friday.",
      description: "Shown after successful submission.",
    }),
    defineField({
      name: "legalNote",
      title: "Legal note",
      type: "string",
      initialValue: "Free · GDPR compliant",
      description: "Small text below the form. Privacy link is appended automatically.",
    }),
  ],
  preview: {
    select: { title: "placement", subtitle: "headline" },
    prepare({ title, subtitle }) {
      return {
        title: `Newsletter: ${title}`,
        subtitle,
      };
    },
  },
});
