import { defineField, defineType } from "sanity";

// Simple localization helper
const languages = [
  { id: "en", title: "English", isDefault: true },
  { id: "fi", title: "Finnish" },
];

export const heroSettings = defineType({
  name: "heroSettings",
  title: "Hero Section",
  type: "document",
  fields: [
    // 1. Localized Title
    defineField({
      name: "title",
      title: "Main Title",
      type: "object",
      fields: languages.map((lang) => ({
        name: lang.id,
        title: lang.title,
        type: "string",
      })),
    }),

    // 2. Localized Subtitle
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "object",
      fields: languages.map((lang) => ({
        name: lang.id,
        title: lang.title,
        type: "string",
      })),
    }),

    // 3. Background Image
    defineField({
      name: "backgroundImage",
      title: "Background Image (Poster)",
      type: "image",
      options: {
        hotspot: true, // Allows you to select the focal point
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Important for SEO and Accessibility",
        }),
      ],
    }),

    // 4. Background Video (NEW FIELD)
    defineField({
      name: "backgroundVideo",
      title: "Background Video (MP4)",
      type: "file",
      options: {
        accept: "video/mp4", // Restrict to MP4 files
      },
      description: "Upload a short, optimized MP4 loop (max 10MB recommended).",
    }),
  ],

  // 5. Smart Preview (Shows the title in the Studio list)
  preview: {
    select: {
      titleEn: "title.en",
      titleFi: "title.fi",
      media: "backgroundImage",
    },
    prepare({ titleEn, titleFi, media }) {
      return {
        title: titleEn || titleFi || "Hero Section",
        subtitle: "Homepage Hero",
        media: media,
      };
    },
  },
});