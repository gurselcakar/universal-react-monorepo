'use client'

import * as React from 'react'
import { ActivityIndicator, Pressable, View } from 'react-native'

import { Button, Input, Text } from '../ui'

import type { SignInFormProps } from './types'

export const SignInForm = ({
  onEmailSignIn,
  onGoogleSignIn,
  onNavigateToSignUp,
  googleIcon,
}: SignInFormProps) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const passwordRef = React.useRef<React.ComponentRef<typeof Input>>(null)

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
      <Button
        onPress={handleGoogleSignIn}
        disabled={loading}
        variant="secondary"
        size="lg"
        className="w-full"
      >
        {googleIcon}
        <Text>Continue with Google</Text>
      </Button>

      {/* Divider */}
      <View className="flex-row items-center gap-3">
        <View className="bg-border h-px flex-1" />
        <Text variant="small" className="text-foreground-faint">or</Text>
        <View className="bg-border h-px flex-1" />
      </View>

      {/* Email field */}
      <View className="gap-1.5">
        <Text variant="small" className="font-medium text-foreground-muted">Email</Text>
        <Input
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
          isInvalid={error !== null}
          size="lg"
        />
      </View>

      {/* Password field */}
      <View className="gap-1.5">
        <Text variant="small" className="font-medium text-foreground-muted">Password</Text>
        <Input
          ref={passwordRef}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="current-password"
          returnKeyType="go"
          onSubmitEditing={handleEmailSignIn}
          placeholder="••••••••"
          placeholderTextColor="#A39E97"
          isInvalid={error !== null}
          size="lg"
        />
      </View>

      {/* Error banner */}
      {error !== null && (
        <View
          className="border-destructive/30 bg-destructive/10 rounded-sm border px-4 py-3"
          accessibilityRole="alert"
        >
          <Text variant="small" className="text-destructive">{error}</Text>
        </View>
      )}

      {/* Submit button */}
      <Button
        onPress={handleEmailSignIn}
        disabled={loading}
        size="lg"
        className="mt-2 w-full"
      >
        {loading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text>Sign in</Text>
        )}
      </Button>

      {/* Footer link */}
      <Pressable onPress={onNavigateToSignUp} className="mt-2 items-center">
        <Text variant="small" className="text-foreground-muted">
          {"Don't have an account? "}
          <Text variant="small" className="text-foreground font-semibold">Sign up</Text>
        </Text>
      </Pressable>
    </View>
  )
}
