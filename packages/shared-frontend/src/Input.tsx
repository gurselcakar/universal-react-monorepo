import { View, Text, TextInput } from 'react-native'

interface InputProps {
  label: string
  placeholder?: string
  value?: string
  onChangeText?: (text: string) => void
}

export const Input = ({ label, placeholder, value, onChangeText }: InputProps) => (
  <View className="gap-1.5">
    <Text className="bg-red-50 text-sm font-medium text-gray-700">{label}</Text>
    <TextInput
      className="rounded-md border border-gray-300 px-3 py-2.5 text-base text-gray-900"
      placeholder={placeholder}
      placeholderTextColor="#9ca3af"
      value={value}
      onChangeText={onChangeText}
    />
  </View>
)
