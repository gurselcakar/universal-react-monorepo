import { Button, Card, Text as Text, Badge, Input } from '@chalkboard/shared-frontend'
import { useState } from 'react'
import { View, Alert, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header } from '../../../components'

const ComponentSection = ({
  title,
  importStatement,
  children,
}: {
  title: string
  importStatement: string
  children: React.ReactNode
}) => (
  <View className="border-b border-gray-100 py-6">
    <View className="mb-4 flex-row items-center justify-between">
      <Text className="text-base font-semibold text-gray-900">{title}</Text>
      <View className="rounded bg-gray-50 px-2 py-1">
        <Text className="font-mono text-xs text-gray-500">{importStatement}</Text>
      </View>
    </View>
    {children}
  </View>
)

export default function Demo() {
  const [inputValue, setInputValue] = useState('')

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <Header title="Shared UI Components" subtitle="Cross-platform components with NativeWind" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-6"
      >
        <Text className="mb-2 mt-4 text-sm text-gray-400">
          These same components render on web via React Native Web.
        </Text>
        <Text className="mb-4 text-sm text-gray-400">
          Add, modify, or reorganize these components however you like.
        </Text>

        <ComponentSection title="Button" importStatement="from '@chalkboard/shared-frontend'">
          <View className="flex-row flex-wrap gap-3">
            <Button onPress={() => Alert.alert('Pressed', 'Primary button')}>
              <Text>Primary</Text>
            </Button>
            <Button variant="secondary" onPress={() => {}}>
              <Text>Secondary</Text>
            </Button>
            <Button variant="ghost" onPress={() => {}}>
              <Text>Outline</Text>
            </Button>
          </View>
        </ComponentSection>

        <ComponentSection title="Card" importStatement="from '@chalkboard/shared-frontend'">
          <View className="gap-3">
            <Card>
              <Text variant="body">Default card with subtle border styling.</Text>
            </Card>
            <Card>
              <Text variant="body">Elevated card with shadow for emphasis.</Text>
            </Card>
          </View>
        </ComponentSection>

        <ComponentSection title="Text" importStatement="from '@chalkboard/shared-frontend'">
          <View className="gap-2">
            <Text variant="h3">Title variant</Text>
            <Text variant="body">Body variant for regular content.</Text>
            <Text variant="caption">Caption variant for secondary information.</Text>
          </View>
        </ComponentSection>

        <ComponentSection title="Badge" importStatement="from '@chalkboard/shared-frontend'">
          <View className="flex-row flex-wrap gap-3">
            <Badge label="Default" />
            <Badge label="Success" variant="success" />
            <Badge label="Warning" variant="warning" />
          </View>
        </ComponentSection>

        <ComponentSection title="Input" importStatement="from '@chalkboard/shared-frontend'">
          <Input placeholder="you@example.com" value={inputValue} onChangeText={setInputValue} />
        </ComponentSection>
      </ScrollView>
    </SafeAreaView>
  )
}
