import { Text as RNText } from 'react-native'
import { tv } from 'tailwind-variants'

const textVariants = tv({
  base: 'text-gray-900',
  variants: {
    variant: {
      title: 'text-xl font-semibold',
      body: 'text-base',
      caption: 'text-sm text-gray-500',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
})

interface TextProps {
  children: React.ReactNode
  variant?: 'title' | 'body' | 'caption'
}

export const Text = ({ children, variant = 'body' }: TextProps) => (
  <RNText className={textVariants({ variant })}>{children}</RNText>
)
