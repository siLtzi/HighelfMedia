import { defineField, defineType } from "sanity";

const languages = [
  { id: "en", title: "English", isDefault: true },
  { id: "fi", title: "Finnish" },
];

export const footerSettings = defineType({
  name: "footerSettings",
  title: "Footer Settings",
  type: "document",
  fields: [
    // 1. Contact Info
    defineField({
      name: "email",
      title: "Email Address (Big Text)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location Text",
      description: "E.g. Oulu, Finland",
      type: "object",
      fields: languages.map((lang) => ({
        name: lang.id,
        title: lang.title,
        type: "string",
      })),
    }),

    // 2. CTA texts
    defineField({
      name: "ctaText",
      title: "CTA Headline",
      description: "Main inviting text (e.g. Have a vision? Let's build...)",
      type: "object",
      fields: languages.map((lang) => ({
        name: lang.id,
        title: lang.title,
        type: "string",
      })),
    }),
    defineField({
      name: "buttonText",
      title: "Button Label",
      description: "e.g. Start a Project",
      type: "object",
      fields: languages.map((lang) => ({
        name: lang.id,
        title: lang.title,
        type: "string",
      })),
    }),

    // 3. Social Links
    defineField({
      name: "socials",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Platform Name", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "email",
    },
    prepare({ title }) {
      return {
        title: title || "Footer Settings",
      };
    },
  },
});