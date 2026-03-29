import { router } from 'expo-router'
import { KeyboardAvoidingView, Platform, View } from 'react-native'

import { SignUpForm } from '@chalkboard/shared-frontend'

import { authClient } from '../../lib/auth-client'

export default function SignUpScreen() {
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="flex-1 justify-center px-6">
        <SignUpForm
          onEmailSignUp={async (name, email, password) => {
            const { error } = await authClient.signUp.email({
              name,
              email,
              password,
              callbackURL: '/(tabs)/(home)',
            })
            if (error) return error.message ?? 'Sign up failed'
            router.replace('/(tabs)/(home)')
            return null
          }}
          onGoogleSignUp={async () => {
            const { error } = await authClient.signIn.social({
              provider: 'google',
              callbackURL: '/(tabs)/(home)',
            })
            return error?.message ?? null
          }}
          onNavigateToSignIn={() => router.push('/(auth)/sign-in')}
        />
      </View>
    </KeyboardAvoidingView>
  )
}
