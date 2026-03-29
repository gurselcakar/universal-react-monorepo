'use client'

import { useRef, useState } from 'react'
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native'

import type { SignInFormProps } from './types'

export const SignInForm = ({
  onEmailSignIn,
  onGoogleSignIn,
  onNavigateToSignUp,
  googleIcon,
}: SignInFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const passwordRef = useRef<TextInput>(null)

  const handleEmailSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.')
      return
    }
    setLoading(true)
    setError(null)
    const result = await onEmailSignIn(email, password)
    if (result !== null) {
      setError(result)
      setLoading(false)
    }
    // If null, navigation is happening — leave loading=true
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError(null)
    const result = await onGoogleSignIn()
    if (result !== null) {
      setError(result)
      setLoading(false)
    }
  }

  return (
    <View className="gap-4">
      {/* Google button */}
      <Pressable
        onPress={handleGoogleSignIn}
        disabled={loading}
        className="border-border active:bg-background flex-row items-center justify-center gap-3 rounded-md border bg-white px-4 py-3 shadow-sm disabled:opacity-50"
      >
        {googleIcon}
        <Text className="text-foreground-muted text-sm font-medium">Continue with Google</Text>
      </Pressable>

      {/* Divider */}
      <View className="flex-row items-center gap-3">
        <View className="bg-border h-px flex-1" />
        <Text className="text-foreground-faint text-xs">or</Text>
        <View className="bg-border h-px flex-1" />
      </View>

      {/* Email field */}
      <View className="gap-1.5">
        <Text className="text-foreground-muted text-sm font-medium">Email</Text>
        <TextInput
          className="border-border text-foreground rounded-md border bg-white px-4 py-3 text-base"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          placeholder="you@example.com"
          placeholderTextColor="#A39E97"
        />
      </View>

      {/* Password field */}
      <View className="gap-1.5">
        <Text className="text-foreground-muted text-sm font-medium">Password</Text>
        <TextInput
          ref={passwordRef}
          className="border-border text-foreground rounded-md border bg-white px-4 py-3 text-base"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="current-password"
          returnKeyType="go"
          onSubmitEditing={handleEmailSignIn}
          placeholder="••••••••"
          placeholderTextColor="#A39E97"
        />
      </View>

      {/* Error banner */}
      {error !== null && (
        <View
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3"
          accessibilityRole="alert"
        >
          <Text className="text-sm text-red-700">{error}</Text>
        </View>
      )}

      {/* Submit button */}
      <Pressable
        onPress={handleEmailSignIn}
        disabled={loading}
        className="bg-primary w-full items-center justify-center rounded-lg px-4 py-3.5 active:opacity-90"
      >
        {loading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text className="text-primary-foreground text-base font-semibold">Sign in</Text>
        )}
      </Pressable>

      {/* Footer link */}
      <Pressable onPress={onNavigateToSignUp} className="mt-2 items-center">
        <Text className="text-foreground-muted text-sm">
          {"Don't have an account? "}
          <Text className="text-foreground font-semibold">Sign up</Text>
        </Text>
      </Pressable>
    </View>
  )
}
