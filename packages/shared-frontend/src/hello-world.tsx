'use client'

import { Alert, Pressable, Text, View } from 'react-native'

import { trpc } from './lib/trpc'

export const HelloWorld = () => {
  const { data, isLoading } = trpc.hello.greet.useQuery()

  const handlePress = () => {
    if (data?.message) {
      Alert.alert('tRPC says:', data.message)
    }
  }

  return (
    <View className="items-center gap-4 py-6">
      <Text className="text-base text-gray-500">
        {isLoading ? 'Loading…' : (data?.message ?? '—')}
      </Text>
      <Pressable
        className="rounded-lg bg-gray-900 px-5 py-3 active:opacity-70"
        onPress={handlePress}
        disabled={isLoading}
      >
        <Text className="text-sm font-semibold text-white">Say Hello (tRPC)</Text>
      </Pressable>
    </View>
  )
}
