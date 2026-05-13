import type { CollectionConfig } from 'payload/types'

const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Media', plural: 'Media' },
  access: {
    read: () => true,
  },
  upload: {
    staticURL:  '/media',
    staticDir:  'public/media',
    mimeTypes:  ['image/jpeg', 'image/png', 'image/webp'],
    imageSizes: [
      {
        name:              'thumbnail',
        width:             400,
        height:            undefined,
        position:          'centre',
        withoutEnlargement: true,
        formatOptions:     { format: 'webp' },
      },
      {
        name:              'card',
        width:             800,
        height:            undefined,
        position:          'centre',
        withoutEnlargement: true,
        formatOptions:     { format: 'webp' },
      },
      {
        name:              'hero',
        width:             1920,
        height:            undefined,
        position:          'centre',
        withoutEnlargement: true,
        formatOptions:     { format: 'webp' },
      },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name:     'alt',
      type:     'text',
      required: true,
      label:    'Alt text',
    },
  ],
}

export default Media
