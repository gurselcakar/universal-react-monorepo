'use client'

import { useState } from 'react'
import { View } from 'react-native'
import { Button, Card, Text, Badge, Input } from 'ui'

import { Header, Footer } from '../../components'

const ComponentSection = ({
  title,
  importStatement,
  children,
}: {
  title: string
  importStatement: string
  children: React.ReactNode
}) => (
  <div className="border-b border-gray-100 py-10 last:border-b-0">
    <div className="mb-6 flex items-baseline justify-between">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <code className="rounded bg-gray-50 px-2 py-1 text-xs text-gray-500">{importStatement}</code>
    </div>
    {children}
  </div>
)

export default function ComponentsPage() {
  const [inputValue, setInputValue] = useState('')

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-3 text-3xl font-bold text-gray-900">Shared UI Components</h1>
            <p className="mb-2 text-gray-500">
              Cross-platform components built with React Native primitives and NativeWind.
            </p>
            <p className="text-sm text-gray-400">
              These same components render natively on iOS and Android.
            </p>
            <p className="mt-4 text-sm text-gray-400">
              This is your starting point. Add, modify, or reorganize these components however you
              like.
            </p>
          </div>
        </section>

        <section className="px-6 pb-16">
          <div className="mx-auto max-w-3xl">
            <ComponentSection title="Button" importStatement="import { Button } from 'ui'">
              <View className="flex-row flex-wrap gap-3">
                <Button title="Primary" onPress={() => {}} />
                <Button title="Secondary" variant="secondary" onPress={() => {}} />
                <Button title="Outline" variant="outline" onPress={() => {}} />
              </View>
            </ComponentSection>

            <ComponentSection title="Card" importStatement="import { Card } from 'ui'">
              <View className="gap-4">
                <Card>
                  <Text variant="body">Default card with subtle border styling.</Text>
                </Card>
                <Card variant="elevated">
                  <Text variant="body">Elevated card with shadow for emphasis.</Text>
                </Card>
              </View>
            </ComponentSection>

            <ComponentSection title="Text" importStatement="import { Text } from 'ui'">
              <View className="gap-2">
                <Text variant="title">Title variant</Text>
                <Text variant="body">Body variant for regular content.</Text>
                <Text variant="caption">Caption variant for secondary information.</Text>
              </View>
            </ComponentSection>

            <ComponentSection title="Badge" importStatement="import { Badge } from 'ui'">
              <View className="flex-row flex-wrap gap-3">
                <Badge label="Default" />
                <Badge label="Success" variant="success" />
                <Badge label="Warning" variant="warning" />
              </View>
            </ComponentSection>

            <ComponentSection title="Input" importStatement="import { Input } from 'ui'">
              <View className="max-w-sm">
                <Input
                  label="Email address"
                  placeholder="you@example.com"
                  value={inputValue}
                  onChangeText={setInputValue}
                />
              </View>
            </ComponentSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
