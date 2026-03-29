import { TRPCProvider } from '@chalkboard/shared-frontend'
import { PortalHost } from '@rn-primitives/portal'
import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import '../../global.css'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <TRPCProvider>
        <PortalHost />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
      </TRPCProvider>
    </SafeAreaProvider>
  )
}
