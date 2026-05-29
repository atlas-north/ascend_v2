#!/bin/bash
export NODE_ENV=development
export PAYLOAD_CONFIG_PATH=/root/ascend_v2/src/payload.config.ts

# Inject env vars from .env.local (durable, won't break on __dirname issues)
export NEXT_PUBLIC_SITE_URL=https://ascend-v2.atlasascend.ai

export PAYLOAD_PUBLIC_SERVER_URL=https://ascend-v2.atlasascend.ai

cd /root/ascend_v2
exec /root/ascend_v2/node_modules/.bin/tsx /root/ascend_v2/server-payload.ts
