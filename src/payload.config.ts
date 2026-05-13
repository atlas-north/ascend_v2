import { buildConfig } from 'payload/config'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import path from 'path'

import Articles  from '@/collections/Articles'
import Cases     from '@/collections/Cases'
import Campaigns from '@/collections/Campaigns'
import Media     from '@/collections/Media'

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',

  admin: {
    bundler: webpackBundler(),
    user:    'users',
    meta: {
      titleSuffix: '— AtlasAscend',
      favicon:     '/favicon.ico',
      ogImage:     '/images/hero-home.jpg',
    },
  },

  editor: lexicalEditor({
    features: ({ defaultFeatures }) => defaultFeatures,
  }),

  collections: [Articles, Cases, Campaigns, Media],

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI as string,
    },
  }),

  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },

  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
    disable: true,
  },

  telemetry: false,
})
