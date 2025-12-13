import { defineField, defineType } from "sanity";

const languages = [
  { id: "en", title: "English", isDefault: true },
  { id: "fi", title: "Finnish" },
];

export const manifestoSettings = defineType({
  name: "manifestoSettings",
  title: "Manifesto Section",
  type: "document",
  fields: [
    // 1. Localized Title (The small uppercase heading)
    defineField({
      name: "title",
      title: "Heading / Label",
      type: "object",
      fields: languages.map((lang) => ({
        name: lang.id,
        title: lang.title,
        type: "string", 
      })),
      description: "The small label above the text (e.g. 'MANIFESTO')",
    }),

    // 2. Localized Description (The large animated text)
    defineField({
      name: "description",
      title: "Statement",
      type: "object",
      fields: languages.map((lang) => ({
        name: lang.id,
        title: lang.title,
        type: "text",
        rows: 6,
      })),
      description: "Write your statement here. Use periods (.) to separate the animated lines.",
    }),
  ],

  preview: {
    select: {
      titleEn: "title.en",
      titleFi: "title.fi",
    },
    prepare({ titleEn, titleFi }) {
      return {
        title: titleEn || titleFi || "Manifesto",
        subtitle: "Text Animation Section",
      };
    },
  },
});