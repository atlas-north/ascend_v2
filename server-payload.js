const express = require('express')
const path = require('path')
const payload = require('payload')

require('dotenv').config({ path: '.env.local' })

const app = express()
const PORT = 3001

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin running on http://localhost:${PORT}/admin`)
    },
  })

  app.listen(PORT, () => {
    console.log(`Payload standalone server on port ${PORT}`)
  })
}

start()
