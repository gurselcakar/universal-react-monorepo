import * as React from 'react'
import { Platform, Text, TextInput, View } from 'react-native'

import { cn } from '../lib/cn'

type InputEntity = 'task' | 'habit' | 'goal'
type InputSize = 'sm' | 'default' | 'lg'

interface InputProps extends React.ComponentProps<typeof TextInput> {
  entity?: InputEntity
  size?: InputSize
  isInvalid?: boolean
  /** Error message rendered below the input. Also sets invalid state automatically. */
  errorMessage?: string
  /** Class applied to the outer wrapper View. */
  containerClassName?: string
}

const SIZE_CLASSES: Record<InputSize, string> = {
  sm: 'h-8 px-3 text-sm',
  default: 'h-10 px-3 text-base',
  lg: 'h-12 px-4 text-base',
}

const ENTITY_FOCUS_WEB: Record<InputEntity, string> = {
  task: 'focus-visible:border-task focus-visible:ring-task/25',
  habit: 'focus-visible:border-habit focus-visible:ring-habit/25',
  goal: 'focus-visible:border-goal focus-visible:ring-goal/25',
}

const Input = React.forwardRef<React.ComponentRef<typeof TextInput>, InputProps>(
  (
    {
      className,
      containerClassName,
      entity,
      size = 'default',
      isInvalid = false,
      errorMessage,
      ...props
    },
    ref,
  ) => {
    const invalid = isInvalid || !!errorMessage

    return (
      <View className={cn('w-full', containerClassName)}>
        <TextInput
          ref={ref}
          aria-invalid={invalid}
          className={cn(
            'flex w-full min-w-0 flex-row items-center rounded-sm border leading-5',
            'bg-background-feature border-border text-foreground font-body shadow-sm',
            SIZE_CLASSES[size],
            props.editable === false &&
              cn(
                'opacity-50',
                Platform.select({ web: 'disabled:pointer-events-none disabled:cursor-not-allowed' }),
              ),
            Platform.select({
              web: cn(
                // foreground-muted (~4:1 contrast) instead of foreground-faint (~2.3:1) — WCAG AA
                'placeholder:text-foreground-muted outline-none',
                'selection:bg-primary selection:text-primary-foreground',
                'transition-[color,box-shadow,border-color] duration-150 md:text-sm',
                invalid
                  ? 'border-destructive ring-destructive/20 dark:ring-destructive/40 ring-[3px]'
                  : cn(
                      entity
                        ? ENTITY_FOCUS_WEB[entity]
                        : 'focus-visible:border-border-strong focus-visible:ring-ring/25',
                      'focus-visible:ring-[3px]',
                    ),
              ),
              native: 'placeholder:text-foreground-muted/60',
            }),
            className,
          )}
          {...props}
        />
        {errorMessage ? (
          <Text
            className="text-destructive mt-1.5 font-mono text-xs"
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
          >
            {'! '}
            {errorMessage}
          </Text>
        ) : null}
      </View>
    )
  },
)

Input.displayName = 'Input'

export { Input }
export type { InputEntity, InputSize, InputProps }
