import { cva, type VariantProps } from 'class-variance-authority'
import { Platform, Pressable } from 'react-native'

import { cn } from '../lib/cn'

import { TextClassContext } from './text'

const buttonVariants = cva(
  cn(
    'group shrink-0 flex-row items-center justify-center gap-2 rounded-sm font-body shadow-none',
    Platform.select({
      web: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    }),
  ),
  {
    variants: {
      variant: {
        default: cn(
          'bg-foreground active:bg-foreground/90',
          Platform.select({ web: 'hover:bg-foreground/90' }),
        ),
        secondary: cn(
          'border-border-strong border bg-transparent active:bg-accent',
          Platform.select({ web: 'hover:bg-accent' }),
        ),
        task: cn('bg-task active:bg-task/90', Platform.select({ web: 'hover:bg-task/90' })),
        habit: cn('bg-habit active:bg-habit/90', Platform.select({ web: 'hover:bg-habit/90' })),
        goal: cn('bg-goal active:bg-goal/90', Platform.select({ web: 'hover:bg-goal/90' })),
        ghost: cn(
          'active:bg-accent dark:active:bg-accent/50',
          Platform.select({ web: 'hover:bg-accent dark:hover:bg-accent/50' }),
        ),
        destructive: cn(
          'bg-destructive active:bg-destructive/90',
          Platform.select({
            web: 'hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
          }),
        ),
        link: '',
      },
      size: {
        default: cn('h-11 px-4 py-2', Platform.select({ web: 'has-[>svg]:px-3' })),
        sm: cn('h-9 gap-1.5 px-3', Platform.select({ web: 'has-[>svg]:px-2.5' })),
        lg: cn('h-12 px-6', Platform.select({ web: 'has-[>svg]:px-4' })),
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

const buttonTextVariants = cva(
  cn(
    'text-foreground font-body text-sm font-semibold',
    Platform.select({ web: 'pointer-events-none transition-colors' }),
  ),
  {
    variants: {
      variant: {
        default: 'text-background',
        secondary: 'text-foreground',
        task: 'text-background',
        habit: 'text-background',
        goal: 'text-background',
        ghost: cn(
          'text-foreground-muted group-active:text-foreground',
          Platform.select({ web: 'group-hover:text-foreground' }),
        ),
        destructive: 'text-background',
        link: cn(
          'text-task group-active:underline',
          Platform.select({ web: 'underline-offset-4 hover:underline group-hover:underline' }),
        ),
      },
      size: {
        default: '',
        sm: '',
        lg: '',
        icon: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonProps = React.ComponentProps<typeof Pressable> & VariantProps<typeof buttonVariants>

const Button = ({ className, variant, size, ...props }: ButtonProps) => (
  <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
    <Pressable
      className={cn(props.disabled && 'opacity-50', buttonVariants({ variant, size }), className)}
      role="button"
      {...props}
    />
  </TextClassContext.Provider>
)

export { Button, buttonTextVariants, buttonVariants }
export type { ButtonProps }
