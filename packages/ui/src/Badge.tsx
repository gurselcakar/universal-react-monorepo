import { View, Text } from 'react-native'
import { tv } from 'tailwind-variants'

const badgeVariants = tv({
  slots: {
    container: 'px-2.5 py-1 rounded-full self-start',
    text: 'text-xs font-medium',
  },
  variants: {
    variant: {
      default: {
        container: 'bg-gray-100',
        text: 'text-gray-700',
      },
      success: {
        container: 'bg-green-100',
        text: 'text-green-700',
      },
      warning: {
        container: 'bg-amber-100',
        text: 'text-amber-700',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface BadgeProps {
  label: string
  variant?: 'default' | 'success' | 'warning'
}

export const Badge = ({ label, variant = 'default' }: BadgeProps) => {
  const { container, text } = badgeVariants({ variant })

  return (
    <View className={container()}>
      <Text className={text()}>{label}</Text>
    </View>
  )
}
