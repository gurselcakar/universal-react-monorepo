import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const apiEnv = createEnv({
  server: {
    DATABASE_URL: z.string().min(1).default('file:local.db'),
    DATABASE_AUTH_TOKEN: z.string().optional(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})
