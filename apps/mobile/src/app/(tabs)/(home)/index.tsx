import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { Text, View, ScrollView, Pressable, Linking } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header } from '../../../components'

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const technologies = [
  {
    name: 'Turborepo',
    description: 'High-performance build system with intelligent caching',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports
    image: require('../../../../assets/images/turborepo-dark.svg'),
  },
  {
    name: 'Next.js 16',
    description: 'React framework with App Router for the web',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports
    image: require('../../../../assets/images/next.svg'),
  },
  {
    name: 'Expo SDK 54',
    description: 'React Native framework with Expo Router',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports
    image: require('../../../../assets/images/expo-wordmark.png'),
  },
  {
    name: 'NativeWind',
    description: 'Tailwind CSS for React Native',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports
    image: require('../../../../assets/images/nativewind-logo.jpeg'),
  },
]

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <Header showNav />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View className="items-center px-6 py-12">
          <Text className="mb-4 text-center text-4xl font-bold tracking-tight text-gray-900">
            Build once, run everywhere
          </Text>
          <Text className="mb-8 text-center text-lg leading-relaxed text-gray-600">
            A production-ready monorepo template for building cross-platform applications with
            shared components between React Native and Next.js.
          </Text>

          <View className="flex-row flex-wrap justify-center gap-3">
            <Pressable
              className="rounded-md bg-gray-900 px-5 py-2.5 active:opacity-80"
              onPress={() =>
                Linking.openURL('https://github.com/gurselcakar/universal-react-monorepo')
              }
            >
              <Text className="text-sm font-medium text-white">Star on GitHub</Text>
            </Pressable>
            <Pressable
              className="rounded-md border border-gray-300 px-5 py-2.5 active:opacity-80"
              onPress={() => Linking.openURL('https://gurselcakar.com/monorepo')}
            >
              <Text className="text-sm font-medium text-gray-700">Read Blog Post</Text>
            </Pressable>
            <Link href="/(tabs)/demo" asChild>
              <Pressable className="px-5 py-2.5 active:opacity-80">
                <Text className="text-sm font-medium text-gray-500">View Components</Text>
              </Pressable>
            </Link>
          </View>
        </View>

        {/* Tech Stack */}
        <View className="border-t border-gray-100 px-6 pb-8 pt-8">
          <Text className="mb-8 text-center text-2xl font-semibold text-gray-900">Tech Stack</Text>
          <View className="flex-row flex-wrap gap-6">
            {technologies.map((tech) => (
              <View key={tech.name} className="w-[45%] flex-row items-center gap-4">
                <View className="h-16 w-16 items-center justify-center">
                  <Image
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    source={tech.image}
                    style={{ width: 64, height: 64 }}
                    contentFit="contain"
                  />
                </View>
                <View className="flex-1">
                  <Text className="font-medium text-gray-900">{tech.name}</Text>
                  <Text className="text-sm text-gray-500">{tech.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Start */}
        <View className="border-t border-gray-100 px-6 pb-8 pt-8">
          <Text className="mb-8 text-center text-2xl font-semibold text-gray-900">Quick Start</Text>
          <View className="rounded-lg bg-gray-900 p-5">
            <Text className="mb-2 font-mono text-sm text-gray-400"># Clone and install</Text>
            <Text className="mb-1 font-mono text-sm text-gray-100">
              <Text className="text-gray-500">$ </Text>git clone
              https://github.com/gurselcakar/universal-react-monorepo.git
            </Text>
            <Text className="mb-1 font-mono text-sm text-gray-100">
              <Text className="text-gray-500">$ </Text>cd universal-react-monorepo
            </Text>
            <Text className="mb-3 font-mono text-sm text-gray-100">
              <Text className="text-gray-500">$ </Text>pnpm install
            </Text>
            <Text className="mb-2 font-mono text-sm text-gray-400"># Start development</Text>
            <Text className="font-mono text-sm text-gray-100">
              <Text className="text-gray-500">$ </Text>pnpm dev
            </Text>
          </View>
          <Text className="mt-4 text-center text-sm text-gray-500">
            Runs both web and mobile apps simultaneously with hot reload
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
