import { Link } from 'expo-router'
import { View, Text, Pressable, Linking } from 'react-native'

interface HeaderProps {
  title?: string
  subtitle?: string
  showNav?: boolean
}

export const Header = ({
  title = 'Universal React Monorepo',
  subtitle,
  showNav = false,
}: HeaderProps) => (
  <View className="border-b border-gray-200 bg-white px-6 py-4">
    <View className="flex-row items-center justify-between">
      <Text className="text-lg font-semibold text-gray-900">{title}</Text>

      {showNav && (
        <View className="flex-row items-center gap-4">
          <Link href="/(tabs)/demo" asChild>
            <Pressable>
              <Text className="text-sm text-gray-600">Components</Text>
            </Pressable>
          </Link>
          <Pressable
            onPress={() =>
              Linking.openURL('https://github.com/gurselcakar/universal-react-monorepo')
            }
          >
            <Text className="text-sm text-gray-600">GitHub</Text>
          </Pressable>
        </View>
      )}
    </View>

    {subtitle && <Text className="mt-1 text-sm text-gray-500">{subtitle}</Text>}
  </View>
)
