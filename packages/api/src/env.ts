import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const apiEnv = createEnv({
  server: {
    DATABASE_URL: z.string().min(1).default('file:local.db'),
    DATABASE_AUTH_TOKEN: z.string().optional(),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().url().default('http://localhost:3000'),
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})
