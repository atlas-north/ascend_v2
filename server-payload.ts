import express from 'express'
import payload from 'payload'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Manually inject env variables BEFORE payload.init()
const envContent = readFileSync(resolve(__dirname, '.env.local'), 'utf-8')
for (const line of envContent.split('\n')) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) continue
  const eqIdx = trimmed.indexOf('=')
  if (eqIdx === -1) continue
  const key = trimmed.slice(0, eqIdx).trim()
  const val = trimmed.slice(eqIdx + 1).trim()
  if (!process.env[key]) process.env[key] = val
}

// Ensure serverURL env var is set BEFORE anything touches it
process.env.PAYLOAD_PUBLIC_SERVER_URL = process.env.PAYLOAD_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
process.env.NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

const app = express()
const PORT = 3003

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || '',
    express: app,
    onInit: async () => {
      payload.logger.info(`✅ Payload Admin running on http://localhost:${PORT}/admin — serverURL: ${process.env.NEXT_PUBLIC_SITE_URL}`)
    },
  })

  app.listen(PORT, () => {
    console.log(`✅ Payload Admin ready on port ${PORT}`)
  })
}

start()
