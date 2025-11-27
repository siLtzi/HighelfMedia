import { defineType, defineField } from "sanity";

export default defineType({
  name: "pricingCalculator",
  title: "Pricing calculator",
  type: "document",
  fields: [
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [
        {
          type: "object",
          name: "pricingService",
          title: "Service pricing",
          fields: [
            {
              name: "slug",
              title: "Slug",
              type: "string",
              description:
                "Matches service slug (e.g. yrityskuvaus, haakuvaus)",
            },
            {
              name: "base",
              title: "Base price (€)",
              type: "number",
            },
            {
              name: "hourly",
              title: "Hourly rate (€ / h)",
              type: "number",
            },
            {
              name: "perPhoto",
              title: "Price per photo (€)",
              type: "number",
            },
            {
              name: "extras",
              title: "Extras",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "pricingExtra",
                  title: "Extra option",
                  fields: [
                    {
                      name: "id",
                      title: "ID",
                      type: "string",
                      description: "Example: aerial, floorplan, twilight…",
                    },
                    {
                      name: "price",
                      title: "Price (€)",
                      type: "number",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
