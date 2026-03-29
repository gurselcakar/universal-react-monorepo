'use client'

import { useRef, useState } from 'react'
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native'

import type { SignUpFormProps } from './types'

export const SignUpForm = ({
  onEmailSignUp,
  onGoogleSignUp,
  onNavigateToSignIn,
  googleIcon,
}: SignUpFormProps) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)

  const handleEmailSignUp = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    setError(null)
    const result = await onEmailSignUp(name, email, password)
    if (result !== null) {
      setError(result)
      setLoading(false)
    }
    // If null, navigation is happening — leave loading=true
  }

  const handleGoogleSignUp = async () => {
    setLoading(true)
    setError(null)
    const result = await onGoogleSignUp()
    if (result !== null) {
      setError(result)
      setLoading(false)
    }
  }

  return (
    <View className="gap-4">
      {/* Google button */}
      <Pressable
        onPress={handleGoogleSignUp}
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

      {/* Name field */}
      <View className="gap-1.5">
        <Text className="text-foreground-muted text-sm font-medium">Name</Text>
        <TextInput
          className="border-border text-foreground rounded-md border bg-white px-4 py-3 text-base"
          value={name}
          onChangeText={setName}
          autoComplete="name"
          autoCapitalize="words"
          autoCorrect={false}
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()}
          placeholder="Your name"
          placeholderTextColor="#A39E97"
        />
      </View>

      {/* Email field */}
      <View className="gap-1.5">
        <Text className="text-foreground-muted text-sm font-medium">Email</Text>
        <TextInput
          ref={emailRef}
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
          autoComplete="new-password"
          returnKeyType="go"
          onSubmitEditing={handleEmailSignUp}
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
        onPress={handleEmailSignUp}
        disabled={loading}
        className="bg-primary w-full items-center justify-center rounded-lg px-4 py-3.5 active:opacity-90"
      >
        {loading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text className="text-primary-foreground text-base font-semibold">Create account</Text>
        )}
      </Pressable>

      {/* Footer link */}
      <Pressable onPress={onNavigateToSignIn} className="mt-2 items-center">
        <Text className="text-foreground-muted text-sm">
          {'Already have an account? '}
          <Text className="text-foreground font-semibold">Sign in</Text>
        </Text>
      </Pressable>
    </View>
  )
}
