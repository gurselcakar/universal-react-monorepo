'use client'

import * as React from 'react'
import { ActivityIndicator, Pressable, View } from 'react-native'

import { Button, Input, Text } from '../ui'

import type { SignUpFormProps } from './types'

export const SignUpForm = ({
  onEmailSignUp,
  onGoogleSignUp,
  onNavigateToSignIn,
  googleIcon,
}: SignUpFormProps) => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const emailRef = React.useRef<React.ComponentRef<typeof Input>>(null)
  const passwordRef = React.useRef<React.ComponentRef<typeof Input>>(null)

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
      <Button
        onPress={handleGoogleSignUp}
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
        <Text variant="small" className="text-foreground-faint">
          or
        </Text>
        <View className="bg-border h-px flex-1" />
      </View>

      {/* Name field */}
      <View className="gap-1.5">
        <Text variant="small" className="text-foreground-muted font-medium">
          Name
        </Text>
        <Input
          value={name}
          onChangeText={setName}
          autoComplete="name"
          autoCapitalize="words"
          autoCorrect={false}
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()}
          placeholder="Your name"
          placeholderTextColor="#A39E97"
          isInvalid={error !== null}
          size="lg"
        />
      </View>

      {/* Email field */}
      <View className="gap-1.5">
        <Text variant="small" className="text-foreground-muted font-medium">
          Email
        </Text>
        <Input
          ref={emailRef}
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
        <Text variant="small" className="text-foreground-muted font-medium">
          Password
        </Text>
        <Input
          ref={passwordRef}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="new-password"
          returnKeyType="go"
          onSubmitEditing={handleEmailSignUp}
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
          <Text variant="small" className="text-destructive">
            {error}
          </Text>
        </View>
      )}

      {/* Submit button */}
      <Button onPress={handleEmailSignUp} disabled={loading} size="lg" className="mt-2 w-full">
        {loading ? <ActivityIndicator color="white" size="small" /> : <Text>Create account</Text>}
      </Button>

      {/* Footer link */}
      <Pressable onPress={onNavigateToSignIn} className="mt-2 items-center">
        <Text variant="small" className="text-foreground-muted">
          {'Already have an account? '}
          <Text variant="small" className="text-foreground font-semibold">
            Sign in
          </Text>
        </Text>
      </Pressable>
    </View>
  )
}
