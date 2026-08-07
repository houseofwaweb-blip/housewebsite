import { defineField, defineType } from "sanity";
import { createElement } from "react";

/**
 * Cinema film — a video that appears in the Cinema (/cinema).
 *
 * Paste a YouTube link (or the 11-character ID). Title, description and
 * thumbnail pull automatically from YouTube; the overrides are optional. Untick
 * "Show on site" to hide a film without deleting it — the pick-and-choose
 * control the House asked for. The Studio list shows the thumbnail + title so
 * films can be skimmed and curated in one place.
 */
function ytId(url?: string): string | null {
  if (!url) return null;
  const s = url.trim();
  if (/^[\w-]{11}$/.test(s)) return s;
  const m = s.match(/(?:youtu\.be\/|\/shorts\/|[?&]v=|\/embed\/|\/live\/)([\w-]{11})/);
  return m ? m[1] : null;
}

export const cinemaFilm = defineType({
  name: "cinemaFilm",
  title: "Cinema film",
  type: "document",
  fields: [
    defineField({
      name: "youtubeUrl",
      title: "YouTube link or ID",
      type: "string",
      description: "Paste the YouTube link (youtube.com/watch, youtu.be, or /shorts) or the 11-character video ID.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "visible",
      title: "Show on site",
      type: "boolean",
      description: "Untick to hide this film from Cinema without deleting it.",
      initialValue: true,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["Interiors", "Gardens", "Homes", "Makers", "Film"] },
      initialValue: "Film",
    }),
    defineField({
      name: "featured",
      title: "Featured (autoplaying hero)",
      type: "boolean",
      description: "The one film that autoplays at the top of Cinema. Tick only one.",
      initialValue: false,
    }),
    defineField({
      name: "orientation",
      title: "Orientation",
      type: "string",
      options: {
        list: [
          { title: "Landscape (16:9)", value: "landscape" },
          { title: "Portrait / Short (9:16)", value: "portrait" },
        ],
        layout: "radio",
      },
      initialValue: "landscape",
    }),
    defineField({
      name: "titleOverride",
      title: "Title",
      type: "string",
      description: "The YouTube title (auto-filled, hashtags removed). Edit it to override what shows on the site.",
    }),
    defineField({
      name: "descriptionOverride",
      title: "Description (optional)",
      type: "text",
      rows: 4,
      description: "Leave blank to use the YouTube description.",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers show first. Leave blank to order by newest added.",
    }),
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: {
      title: "titleOverride",
      url: "youtubeUrl",
      visible: "visible",
      featured: "featured",
      category: "category",
    },
    prepare({ title, url, visible, featured, category }) {
      const id = ytId(url);
      const flags = [
        visible === false ? "Hidden" : "Shown",
        featured ? "★ Featured" : null,
        category,
      ]
        .filter(Boolean)
        .join(" · ");
      return {
        title: title || url || "Cinema film",
        subtitle: flags,
        media: id
          ? createElement("img", {
              src: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
              alt: "",
              style: { objectFit: "cover", width: "100%", height: "100%" },
            })
          : undefined,
      };
    },
  },
});
