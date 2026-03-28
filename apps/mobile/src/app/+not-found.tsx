import { Link } from 'expo-router'
import { View, Text, Pressable } from 'react-native'

export default function NotFoundScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white p-5">
      <Text className="mb-2 text-2xl font-bold text-slate-900">Page Not Found</Text>
      <Text className="mb-8 text-center text-base text-slate-600">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </Text>

      <Link href="/" asChild>
        <Pressable className="rounded-lg bg-blue-500 px-6 py-3">
          <Text className="text-base font-semibold text-white">Go Home</Text>
        </Pressable>
      </Link>
    </View>
  )
}
