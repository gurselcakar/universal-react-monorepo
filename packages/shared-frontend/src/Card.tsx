import { View } from 'react-native'
import { tv } from 'tailwind-variants'

const cardVariants = tv({
  base: 'p-5 rounded-lg border',
  variants: {
    variant: {
      default: 'bg-white border-gray-200',
      elevated: 'bg-white border-gray-100 shadow-md',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface CardProps {
  children?: React.ReactNode
  variant?: 'default' | 'elevated'
}

export const Card = ({ children, variant = 'default' }: CardProps) => (
  <View className={cardVariants({ variant })}>{children}</View>
)
