import { defineField, defineType } from "sanity";

const languages = [
  { id: "en", title: "English", isDefault: true },
  { id: "fi", title: "Finnish" },
];

export const navbarSettings = defineType({
  name: "navbarSettings",
  title: "Navbar Settings",
  type: "document",
  fields: [
    // 1. Main Navigation Links
    defineField({
      name: "workLabel",
      title: "Work Link Label",
      description: 'Label for "Selected Works" link',
      type: "object",
      fields: languages.map((lang) => ({
        name: lang.id,
        title: lang.title,
        type: "string",
      })),
    }),
    defineField({
      name: "servicesLabel",
      title: "Services Link Label",
      description: 'Label for "Services" link',
      type: "object",
      fields: languages.map((lang) => ({
        name: lang.id,
        title: lang.title,
        type: "string",
      })),
    }),
    defineField({
      name: "aboutLabel",
      title: "About Link Label",
      description: 'Label for "Vision/About" link',
      type: "object",
      fields: languages.map((lang) => ({
        name: lang.id,
        title: lang.title,
        type: "string",
      })),
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      description: 'Label for "Let\'s Talk" button',
      type: "object",
      fields: languages.map((lang) => ({
        name: lang.id,
        title: lang.title,
        type: "string",
      })),
    }),

    // 2. Service Dropdown Links
    defineField({
      name: "serviceLinks",
      title: "Service Dropdown Links",
      description: "Links shown in the Services dropdown menu",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
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
            defineField({
              name: "slug",
              title: "Slug",
              description: "URL path (e.g., 'haakuvaus' for /palvelut/haakuvaus)",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "label.en",
              subtitle: "slug",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Navbar Settings",
      };
    },
  },
});
