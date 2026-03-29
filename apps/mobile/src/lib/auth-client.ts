import { expoClient } from '@better-auth/expo/client'
import { sharedFrontendEnv } from '@chalkboard/shared-frontend'
import { organizationClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'
import * as SecureStore from 'expo-secure-store'

export const authClient = createAuthClient({
  baseURL: sharedFrontendEnv.PUBLIC_API_BASE_URL,
  plugins: [
    expoClient({
      scheme: 'mobile',
      storagePrefix: 'mobile',
      storage: SecureStore,
    }),
    organizationClient(),
  ],
})

export const { useSession, signIn, signOut, signUp } = authClient
