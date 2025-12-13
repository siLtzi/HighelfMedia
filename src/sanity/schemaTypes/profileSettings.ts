import { defineField, defineType } from "sanity";

const languages = [
  { id: "en", title: "English", isDefault: true },
  { id: "fi", title: "Finnish" },
];

export const profileSettings = defineType({
  name: "profileSettings",
  title: "Founder Profile / About",
  type: "document",
  fields: [
    // 1. Heading (e.g. "The Founder")
    defineField({
      name: "heading",
      title: "Heading (Small Tagline)",
      type: "object",
      fields: languages.map((lang) => ({
        name: lang.id,
        title: lang.title,
        type: "string",
      })),
    }),

    // 2. Name (e.g. "Matti Meikäläinen")
    defineField({
      name: "name",
      title: "Name",
      type: "object",
      fields: languages.map((lang) => ({
        name: lang.id,
        title: lang.title,
        type: "string",
      })),
    }),

    // 3. Bio (The main paragraph)
    defineField({
      name: "bio",
      title: "Biography",
      type: "object",
      fields: languages.map((lang) => ({
        name: lang.id,
        title: lang.title,
        type: "text", // 'text' allows for multi-line input
        rows: 4,
      })),
    }),

    // 4. Portrait Image
    defineField({
      name: "image",
      title: "Portrait Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Important for SEO and accessibility.",
        }),
      ],
    }),

    // 5. Stats Array (The grid of numbers)
    defineField({
      name: "stats",
      title: "Statistics",
      type: "array",
      of: [
        {
          type: "object",
          title: "Stat Item",
          fields: [
            // Value (e.g. "15+")
            defineField({
              name: "value",
              title: "Value",
              type: "object",
              fields: languages.map((lang) => ({
                name: lang.id,
                title: lang.title,
                type: "string",
              })),
            }),
            // Label (e.g. "Years Experience")
            defineField({
              name: "label",
              title: "Label",
              type: "object",
              fields: languages.map((lang) => ({
                name: lang.id,
                title: lang.title,
                type: "string",
              })),
            }),
          ],
          preview: {
            select: {
              title: "value.en",
              subtitle: "label.en",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name.en",
      subtitle: "heading.en",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "No Name Set",
        subtitle: subtitle || "Founder Profile",
        media: media,
      };
    },
  },
});