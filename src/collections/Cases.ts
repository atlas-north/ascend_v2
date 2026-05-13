import type { CollectionConfig } from 'payload/types'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const Cases: CollectionConfig = {
  slug: 'cases',
  labels: { singular: 'Case', plural: 'Cases' },
  admin: {
    useAsTitle:     'clientName',
    defaultColumns: ['clientName', 'industry', 'headline', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name:     'clientName',
      type:     'text',
      required: true,
      label:    'Client name',
    },
    {
      name:     'industry',
      type:     'select',
      required: true,
      options: [
        { label: 'E-commerce',  value: 'E-commerce' },
        { label: 'Legal',       value: 'Legal' },
        { label: 'SaaS',        value: 'SaaS' },
        { label: 'Finance',     value: 'Finance' },
        { label: 'Operations',  value: 'Operations' },
        { label: 'Other',       value: 'Other' },
      ],
    },
    {
      name:     'headline',
      type:     'text',
      required: true,
      label:    'Headline',
      admin: {
        description: 'e.g. "14 hours saved per week"',
      },
    },
    {
      name:     'slug',
      type:     'text',
      unique:   true,
      required: true,
      label:    'Slug',
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            if (data?.clientName) {
              return (data.clientName as string)
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_]+/g, '-')
            }
            return value
          },
        ],
      },
    },
    {
      name:         'status',
      type:         'select',
      required:     true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft',     value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name:  'tags',
      type:  'array',
      label: 'Tags',
      fields: [
        {
          name:    'tag',
          type:    'select',
          options: [
            { label: 'Automation',   value: 'automation' },
            { label: 'Intelligence', value: 'intelligence' },
            { label: 'Integration',  value: 'integration' },
          ],
        },
      ],
    },
    {
      name:  'resultMetric',
      type:  'text',
      label: 'Result metric',
      admin: {
        description: 'e.g. "14 hrs/week saved" — displayed prominently on cards',
      },
    },
    {
      name:       'heroImage',
      type:       'upload',
      label:      'Hero image',
      relationTo: 'media',
    },
    {
      name:  'body',
      type:  'richText',
      label: 'Body',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => defaultFeatures,
      }),
    },
    {
      name:  'testimonialQuote',
      type:  'textarea',
      label: 'Testimonial quote',
    },
    {
      name:  'testimonialAuthor',
      type:  'text',
      label: 'Testimonial author',
    },
    {
      name:  'seo',
      type:  'group',
      label: 'SEO',
      fields: [
        {
          name:      'metaTitle',
          type:      'text',
          label:     'Meta title',
          maxLength: 60,
        },
        {
          name:      'metaDescription',
          type:      'textarea',
          label:     'Meta description',
          maxLength: 155,
        },
      ],
    },
  ],
}

export default Cases
