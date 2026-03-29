import { drizzle } from 'drizzle-orm/libsql'

import { apiEnv } from '../env'

import * as schema from './schema'

export const db = drizzle({
  connection: {
    url: apiEnv.DATABASE_URL,
    authToken: apiEnv.DATABASE_AUTH_TOKEN,
  },
  schema,
})

export type Database = typeof db
