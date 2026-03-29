import { apiEnv } from '@chalkboard/api/env'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'turso',
  dbCredentials: {
    url: apiEnv.DATABASE_URL,
    authToken: apiEnv.DATABASE_AUTH_TOKEN,
  },
})
