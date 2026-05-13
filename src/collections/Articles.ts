import type { CollectionConfig } from 'payload/types'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const Articles: CollectionConfig = {
  slug: 'articles',
  labels: { singular: 'Article', plural: 'Articles' },
  admin: {
    useAsTitle:   'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name:     'title',
      type:     'text',
      required: true,
      label:    'Title',
    },
    {
      name:     'slug',
      type:     'text',
      unique:   true,
      required: true,
      label:    'Slug',
      admin: {
        description: 'Auto-generated from title. URL-safe, lowercase, hyphenated.',
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
        { label: 'Draft',     value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name:  'publishedAt',
      type:  'date',
      label: 'Published at',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat:    'd MMM yyyy, HH:mm',
        },
        condition: (_, siblingData) => siblingData?.status === 'published',
      },
    },
    {
      name:     'category',
      type:     'select',
      required: true,
      options: [
        { label: 'Automation',   value: 'Automation' },
        { label: 'Intelligence', value: 'Intelligence' },
        { label: 'Integration',  value: 'Integration' },
        { label: 'Strategy',     value: 'Strategy' },
        { label: 'Platform',     value: 'Platform' },
      ],
    },
    {
      name:       'teaser',
      type:       'textarea',
      required:   true,
      label:      'Teaser',
      maxLength:  160,
      admin: {
        description: 'Used in card previews. Max 160 characters.',
      },
    },
    {
      name:     'heroImage',
      type:     'upload',
      label:    'Hero image',
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
      name:       'author',
      type:       'relationship',
      label:      'Author',
      relationTo: 'users',
      admin: {
        description: 'Auto-filled with the logged-in user.',
        readOnly:    true,
      },
      hooks: {
        beforeChange: [
          ({ req, value }) => {
            if (req.user && !value) return req.user.id
            return value
          },
        ],
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
        {
          name:       'ogImage',
          type:       'upload',
          label:      'OG image',
          relationTo: 'media',
        },
      ],
    },
  ],
}

export default Articles
