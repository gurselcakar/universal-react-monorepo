import { router } from 'expo-router'
import { KeyboardAvoidingView, Platform, View } from 'react-native'

import { SignInForm } from '@chalkboard/shared-frontend'

import { authClient } from '../../lib/auth-client'

export default function SignInScreen() {
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="flex-1 justify-center px-6">
        <SignInForm
          onEmailSignIn={async (email, password) => {
            const { error } = await authClient.signIn.email({
              email,
              password,
              callbackURL: '/(tabs)/(home)',
            })
            if (error) return error.message ?? 'Sign in failed'
            router.replace('/(tabs)/(home)')
            return null
          }}
          onGoogleSignIn={async () => {
            const { error } = await authClient.signIn.social({
              provider: 'google',
              callbackURL: '/(tabs)/(home)',
            })
            return error?.message ?? null
          }}
          onNavigateToSignUp={() => router.push('/(auth)/sign-up')}
        />
      </View>
    </KeyboardAvoidingView>
  )
}
