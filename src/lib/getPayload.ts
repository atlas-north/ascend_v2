import payload from 'payload'
import config from '@/payload.config'

let initialized = false

export async function getPayloadClient() {
  if (!initialized) {
    await payload.init({
      secret: process.env.PAYLOAD_SECRET as string,
      config,
      local:  true,
    })
    initialized = true
  }
  return payload
}
