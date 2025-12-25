import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title (e.g. Wedding Photography)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL Part)',
      type: 'slug',
      description: 'This MUST match the link in your navbar. e.g. "yrityskuvaus"',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Intro Description',
      type: 'text',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'packages',
      title: 'Pricing Packages',
      type: 'array',
      of: [{
        type: 'object',
        name: 'packageItem', // Added name to fix list issues
        fields: [
          { name: 'name', type: 'string', title: 'Package Name' },
          { name: 'price', type: 'string', title: 'Price (e.g. 1500€)' },
          { name: 'features', type: 'array', of: [{ type: 'string' }], title: 'Features' }
        ]
      }]
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      options: {
        layout: 'grid'
      },
      of: [{ 
        type: 'image',
        options: { hotspot: true }
      }]
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [{
        type: 'object',
        name: 'faqItem', // Added name to fix list issues
        fields: [
          { name: 'question', type: 'string', title: 'Question' },
          { name: 'answer', type: 'text', title: 'Answer' }
        ]
      }]
    })
  ],
})