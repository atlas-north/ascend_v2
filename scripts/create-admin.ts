import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import payload from 'payload'
import config from '../src/payload.config'

async function main() {
  if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) {
    console.error('Missing env vars')
    process.exit(1)
  }

  await payload.init({
    secret: process.env.PAYLOAD_SECRET as string,
    config: config as any,
    local: true,
  })

  const existing = await payload.find({
    collection: 'users',
    limit: 1,
  })

  if (existing.docs.length > 0) {
    console.log('User already exists:', existing.docs[0].email)
  } else {
    const user = await payload.create({
      collection: 'users',
      data: {
        email: process.env.ADMIN_EMAIL || 'jonas@atlasascend.ai',
        password: process.env.ADMIN_PASSWORD || '',
        name: 'Jonas',
      },
    })
    console.log('✓ Admin user created:', user.email)
  }

  process.exit(0)
}

main().catch(err => {
  console.error('Failed:', err)
  process.exit(1)
})
