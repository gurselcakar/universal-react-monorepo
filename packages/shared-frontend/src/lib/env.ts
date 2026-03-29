import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const sharedFrontendEnv = createEnv({
  clientPrefix: 'PUBLIC_',
  client: {
    PUBLIC_API_BASE_URL: z.string().url().default('http://localhost:3000'),
  },
  runtimeEnv: {
    PUBLIC_API_BASE_URL:
      process.env.PUBLIC_API_BASE_URL ??
      process.env.EXPO_PUBLIC_API_BASE_URL ??
      process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  emptyStringAsUndefined: true,
})
