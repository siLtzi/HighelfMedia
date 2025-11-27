import { defineType, defineField } from "sanity";

export default defineType({
  name: "heroSettings",
  title: "Hero – taustakuvat",
  type: "document",
  fields: [
    defineField({
      name: "backgroundPairs",
      title: "Taustaparit (ylä + ala)",
      type: "array",
      of: [
        defineField({
          name: "pair",
          title: "Taustakuva pari",
          type: "object",
          fields: [
            defineField({
              name: "top",
              title: "Yläkuva",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "bottom",
              title: "Alakuva",
              type: "image",
              options: { hotspot: true },
            }),
          ],
        }),
      ],
    }),
  ],
});
