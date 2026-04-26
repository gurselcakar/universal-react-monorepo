'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { Platform, Pressable, View } from 'react-native'

import { cn } from '../lib/cn'

import { Text } from './text'

// ─── Card Root ───────────────────────────────────────────────────────────────

const cardVariants = cva(
  'bg-background-raised rounded-md border border-border overflow-hidden',
  {
    variants: {
      shadow: {
        none: '',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
      },
    },
    defaultVariants: {
      shadow: 'md',
    },
  },
)

type CardEntity = 'none' | 'task' | 'habit' | 'goal'

const entityAccent: Record<CardEntity, string | null> = {
  none: null,
  task: 'bg-task',
  habit: 'bg-habit',
  goal: 'bg-goal',
}

const entitySurfaceTint: Record<CardEntity, string> = {
  none: '',
  task: 'bg-task-light',
  habit: 'bg-habit-light',
  goal: 'bg-goal-light',
}

interface CardContextValue {
  entity: CardEntity
  tinted: boolean
}

const CardContext = React.createContext<CardContextValue>({ entity: 'none', tinted: false })

interface CardProps extends VariantProps<typeof cardVariants> {
  entity?: CardEntity
  tinted?: boolean
  onPress?: () => void
  children?: React.ReactNode
  className?: string
}

const Card = ({ entity = 'none', tinted = false, shadow, onPress, children, className }: CardProps) => {
  const accent = entityAccent[entity]
  const surfaceTint = tinted ? entitySurfaceTint[entity] : ''

  const inner = (
    <CardContext.Provider value={{ entity, tinted }}>
      <View className={cn(cardVariants({ shadow }), surfaceTint, className)}>
        {accent && <View className={cn('h-[3px] w-full', accent)} />}
        {children}
      </View>
    </CardContext.Provider>
  )

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        className={cn(
          'rounded-md active:opacity-80',
          Platform.select({
            web: 'transition-all duration-150 hover:shadow-lg hover:-translate-y-px cursor-pointer select-none',
          }),
        )}
        accessibilityRole="button"
      >
        {inner}
      </Pressable>
    )
  }

  return inner
}

// ─── CardHeader ──────────────────────────────────────────────────────────────

interface CardHeaderProps {
  children?: React.ReactNode
  className?: string
}

const CardHeader = ({ children, className }: CardHeaderProps) => (
  <View className={cn('gap-1 px-4 pb-2 pt-4', className)}>{children}</View>
)

// ─── CardTitle ───────────────────────────────────────────────────────────────

interface CardTitleProps {
  children?: React.ReactNode
  className?: string
}

const CardTitle = ({ children, className }: CardTitleProps) => (
  <Text variant="h2" className={cn('text-foreground', className)}>
    {children}
  </Text>
)

// ─── CardDescription ─────────────────────────────────────────────────────────

interface CardDescriptionProps {
  children?: React.ReactNode
  className?: string
}

const CardDescription = ({ children, className }: CardDescriptionProps) => (
  <Text variant="small" className={cn('text-foreground-muted', className)}>
    {children}
  </Text>
)

// ─── CardContent ─────────────────────────────────────────────────────────────

interface CardContentProps {
  children?: React.ReactNode
  className?: string
}

const CardContent = ({ children, className }: CardContentProps) => (
  <View className={cn('px-4 py-3', className)}>{children}</View>
)

// ─── CardSeparator ───────────────────────────────────────────────────────────

interface CardSeparatorProps {
  className?: string
}

const CardSeparator = ({ className }: CardSeparatorProps) => (
  <View className={cn('h-px w-full bg-border', className)} />
)

// ─── CardFooter ──────────────────────────────────────────────────────────────

interface CardFooterProps {
  children?: React.ReactNode
  className?: string
}

const CardFooter = ({ children, className }: CardFooterProps) => (
  <View className={cn('flex-row items-center justify-between px-4 pb-4 pt-3', className)}>
    {children}
  </View>
)

// ─── Exports ─────────────────────────────────────────────────────────────────

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardSeparator,
  CardTitle,
}

export type {
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardSeparatorProps,
  CardTitleProps,
}
