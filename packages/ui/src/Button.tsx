import { Pressable, Text } from 'react-native'
import { tv } from 'tailwind-variants'

const buttonVariants = tv({
  slots: {
    button: 'px-5 py-2.5 rounded-md active:opacity-80',
    text: 'text-center font-medium text-sm',
  },
  variants: {
    variant: {
      primary: {
        button: 'bg-gray-900',
        text: 'text-white',
      },
      secondary: {
        button: 'bg-gray-100',
        text: 'text-gray-900',
      },
      outline: {
        button: 'bg-transparent border border-gray-300',
        text: 'text-gray-700',
      },
    },
    disabled: {
      true: {
        button: 'opacity-50',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    disabled: false,
  },
})

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  disabled?: boolean
}

export const Button = ({ title, onPress, variant = 'primary', disabled = false }: ButtonProps) => {
  const { button, text } = buttonVariants({ variant, disabled })

  return (
    <Pressable onPress={onPress} disabled={disabled} className={button()}>
      <Text className={text()}>{title}</Text>
    </Pressable>
  )
}
