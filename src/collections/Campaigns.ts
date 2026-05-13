import type { CollectionConfig } from 'payload/types'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const Campaigns: CollectionConfig = {
  slug: 'campaigns',
  labels: { singular: 'Campaign', plural: 'Campaigns' },
  admin: {
    useAsTitle:     'title',
    defaultColumns: ['title', 'vertical', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name:     'title',
      type:     'text',
      required: true,
      label:    'Internal title',
    },
    {
      name:     'slug',
      type:     'text',
      unique:   true,
      required: true,
      label:    'Slug',
      admin: {
        description: 'Becomes /campaigns/[slug]',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            if (data?.title) {
              return (data.title as string)
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
        { label: 'Draft',    value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name:     'vertical',
      type:     'select',
      required: true,
      options: [
        { label: 'E-commerce',  value: 'E-commerce' },
        { label: 'Legal',       value: 'Legal' },
        { label: 'SaaS',        value: 'SaaS' },
        { label: 'Finance',     value: 'Finance' },
        { label: 'Operations',  value: 'Operations' },
        { label: 'General',     value: 'General' },
      ],
    },
    {
      name:     'heroHeadline',
      type:     'text',
      required: true,
      label:    'Hero headline',
    },
    {
      name:     'heroSubheading',
      type:     'text',
      required: true,
      label:    'Hero subheading',
    },
    {
      name:     'painPoints',
      type:     'array',
      label:    'Pain points',
      maxRows:  3,
      fields: [
        {
          name:     'title',
          type:     'text',
          required: true,
          label:    'Title',
        },
        {
          name:     'description',
          type:     'textarea',
          required: true,
          label:    'Description',
        },
      ],
    },
    {
      name:  'offerDescription',
      type:  'richText',
      label: 'Offer description',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => defaultFeatures,
      }),
    },
    {
      name:         'ctaLabel',
      type:         'text',
      label:        'CTA label',
      defaultValue: 'Book a free consultation',
    },
    {
      name:  'urgencyNote',
      type:  'text',
      label: 'Urgency note',
      admin: {
        description: 'Optional — e.g. "2 spots available this month"',
      },
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

export default Campaigns
