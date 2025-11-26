import { defineField, defineType } from "sanity";

const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "info",
      title: "Tietoa kuvauksesta",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "pricingIntro",
      title: "Hinnoittelun intro",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "portfolioIntro",
      title: "Portfolio – introteksti",
      type: "text",
      rows: 3,
    }),

    // ✅ howItWorks: array of inline object definitions
    defineField({
      name: "howItWorks",
      title: "Miten kuvaus etenee",
      type: "array",
      of: [
        {
          name: "howItWorksStep",
          title: "Vaihe",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Otsikko",
              type: "string",
            }),
            defineField({
              name: "desc",
              title: "Kuvaus",
              type: "text",
              rows: 3,
            }),
          ],
        },
      ],
    }),

    // ✅ faq: array of inline object definitions
    defineField({
      name: "faq",
      title: "Usein kysytyt kysymykset",
      type: "array",
      of: [
        {
          name: "faqItem",
          title: "FAQ-kysymys",
          type: "object",
          fields: [
            defineField({
              name: "q",
              title: "Kysymys",
              type: "string",
            }),
            defineField({
              name: "a",
              title: "Vastaus",
              type: "text",
              rows: 3,
            }),
          ],
        },
      ],
    }),

    // portfolioImages: array of images
    defineField({
      name: "portfolioImages",
      title: "Portfolio – kuvat",
      type: "array",
      of: [
        defineField({
          name: "portfolioImage",
          title: "Kuva",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt-teksti",
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],
});

export default service;