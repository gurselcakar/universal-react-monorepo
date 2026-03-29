import { TRPCProvider } from '@chalkboard/shared-frontend'
import { PortalHost } from '@rn-primitives/portal'
import { Stack, useRouter, useSegments } from 'expo-router'
import { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { authClient } from '../lib/auth-client'

import '../../global.css'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isPending } = authClient.useSession()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (isPending) return

    const inAuthGroup = segments[0] === '(auth)'

    if (!session && !inAuthGroup) {
      router.replace('/(auth)/sign-in')
    } else if (session && inAuthGroup) {
      router.replace('/(tabs)/(home)')
    }
  }, [session, isPending, segments, router])

  return <>{children}</>
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <TRPCProvider>
        <AuthGuard>
          <PortalHost />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" options={{ headerShown: false }} />
          </Stack>
        </AuthGuard>
      </TRPCProvider>
    </SafeAreaProvider>
  )
}
