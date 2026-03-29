import { expo } from '@better-auth/expo'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { organization } from 'better-auth/plugins'

import { db } from '../db'
import { apiEnv } from '../env'

const trustedOrigins = [
  apiEnv.BETTER_AUTH_URL,
  'mobile://',
  ...(process.env.NODE_ENV === 'development'
    ? ['exp://', 'exp://**', 'exp://192.168.*.*:*/**']
    : []),
]

export const auth = betterAuth({
  baseURL: apiEnv.BETTER_AUTH_URL,
  secret: apiEnv.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, { provider: 'sqlite' }),
  trustedOrigins,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    ...(apiEnv.GOOGLE_CLIENT_ID && apiEnv.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: apiEnv.GOOGLE_CLIENT_ID,
            clientSecret: apiEnv.GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),
  },
  plugins: [
    expo(),
    organization(),
    nextCookies(), // must be last
  ],
})

export type Auth = typeof auth
