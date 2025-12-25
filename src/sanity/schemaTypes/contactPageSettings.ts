import { defineField, defineType } from "sanity";

const languages = [
  { id: "en", title: "English", isDefault: true },
  { id: "fi", title: "Finnish" },
];

export const contactPageSettings = defineType({
  name: "contactPageSettings",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "object",
      fields: languages.map((lang) => ({
        name: lang.id,
        title: lang.title,
        type: "string",
      })),
      description: "The big heading (e.g., 'CONTACT' or 'OTA YHTEYTTÄ')",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "object",
      fields: languages.map((lang) => ({
        name: lang.id,
        title: lang.title,
        type: "text",
        rows: 3,
      })),
      description: "The text underneath the heading (e.g., 'Tell us about your vision...')",
    }),
  ],
  preview: {
    select: {
      title: "title.fi",
    },
    prepare({ title }) {
      return {
        title: title || "Contact Page Settings",
      };
    },
  },
});