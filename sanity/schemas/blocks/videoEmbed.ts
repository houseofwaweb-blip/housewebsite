import { defineField, defineType } from "sanity";

/**
 * Video block for article bodies — either a self-hosted file (mp4 uploaded into
 * Sanity) or a YouTube URL. Used by the WP import (wp-video shortcodes →
 * self-hosted file; YouTube links → youtubeUrl) and editable in the Studio.
 */
export const videoEmbed = defineType({
  name: "videoEmbed",
  title: "Video",
  type: "object",
  fields: [
    defineField({
      name: "file",
      title: "Video file (mp4)",
      type: "file",
      options: { accept: "video/*" },
      description: "Self-hosted clip. Leave blank if using a YouTube URL.",
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      description: "Use instead of a file. Accepts watch, youtu.be and shorts URLs.",
    }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({
      name: "url",
      title: "Resolved URL",
      type: "url",
      readOnly: true,
      hidden: true,
      description: "Auto-filled CDN URL for the uploaded file. Do not edit.",
    }),
  ],
  preview: {
    select: { caption: "caption", youtubeUrl: "youtubeUrl" },
    prepare: ({ caption, youtubeUrl }) => ({
      title: caption || (youtubeUrl ? "YouTube video" : "Video"),
      subtitle: youtubeUrl ? "YouTube" : "Self-hosted",
    }),
  },
});
