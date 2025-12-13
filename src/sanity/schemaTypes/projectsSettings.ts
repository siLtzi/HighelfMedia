import { defineField, defineType } from "sanity";

const languages = [
  { id: "en", title: "English", isDefault: true },
  { id: "fi", title: "Finnish" },
];

export const projectsSettings = defineType({
  name: "projectsSettings",
  title: "Projects Section",
  type: "document",
  fields: [
    // 1. Section Title
    defineField({
      name: "title",
      title: "Section Title",
      type: "object",
      fields: languages.map((lang) => ({
        name: lang.id,
        title: lang.title,
        type: "string",
      })),
    }),

    // 2. Section Subtitle
    defineField({
      name: "subtitle",
      title: "Section Subtitle",
      type: "object",
      fields: languages.map((lang) => ({
        name: lang.id,
        title: lang.title,
        type: "string",
      })),
    }),

    // 3. THE MISSING PIECE: List of Projects
    defineField({
      name: "selectedProjects",
      title: "Selected Projects",
      type: "array", // <--- Allows multiple items
      description: "Add, edit, and reorder your projects here.",
      of: [
        {
          type: "object",
          title: "Project",
          fields: [
            defineField({
              name: "title",
              title: "Project Title",
              type: "object",
              fields: languages.map((lang) => ({
                name: lang.id,
                title: lang.title,
                type: "string",
              })),
            }),
            defineField({
              name: "category",
              title: "Category",
              type: "object",
              fields: languages.map((lang) => ({
                name: lang.id,
                title: lang.title,
                type: "string",
              })),
            }),
            defineField({
              name: "slug",
              title: "Link Slug",
              type: "slug",
              options: { source: "title.en" }, // Auto-generate from English title
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "image",
              title: "Main Image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: {
              title: "title.en",
              subtitle: "category.en",
              media: "image",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      titleEn: "title.en",
      titleFi: "title.fi",
    },
    prepare({ titleEn, titleFi }) {
      return {
        title: titleEn || titleFi || "Projects Section",
      };
    },
  },
});