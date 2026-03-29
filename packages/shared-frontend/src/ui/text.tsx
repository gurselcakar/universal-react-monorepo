'use client'

import * as Slot from '@rn-primitives/slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { Platform, Text as RNText, type Role } from 'react-native'

import { cn } from '../lib/cn'

const textVariants = cva(
  cn(
    'text-foreground font-body text-base leading-[1.55]',
    Platform.select({
      web: 'select-text',
    }),
  ),
  {
    variants: {
      variant: {
        default: '',

        // Display — Outfit 700 / 36px / page titles ("Today", "Goals")
        display: cn(
          'font-display text-4xl font-bold leading-[1.15] tracking-[-0.025em]',
          Platform.select({ web: 'scroll-m-20 text-balance' }),
        ),

        // H1 — Outfit 600 / 28px / section headings
        h1: cn(
          'font-display text-[28px] font-semibold leading-[1.2] tracking-[-0.02em]',
          Platform.select({ web: 'scroll-m-20' }),
        ),

        // H2 — Outfit 600 / 22px / card titles, goal names
        h2: cn(
          'font-display text-[22px] font-semibold leading-[1.25] tracking-[-0.015em]',
          Platform.select({ web: 'scroll-m-20' }),
        ),

        // H3 — DM Sans 600 / 18px / subsection headings, group labels
        h3: cn(
          'text-lg font-semibold leading-[1.35] tracking-[-0.005em]',
          Platform.select({ web: 'scroll-m-20' }),
        ),

        // Body — DM Sans 400 / 16px (default base, so just line-height)
        body: 'leading-[1.55]',

        // Body Strong — DM Sans 600 / 16px
        'body-strong': 'font-semibold leading-[1.55]',

        // Small — DM Sans 400 / 14px / metadata, helper text, timestamps
        small: 'text-sm leading-[1.45] tracking-[0.005em]',

        // Caption — DM Sans 500 / 12px / labels, badges, streak counters
        caption: 'text-xs font-medium uppercase leading-[1.4] tracking-[0.02em]',

        // Mono — JetBrains Mono 500 / 13px / progress numbers, streaks, dates
        mono: 'font-mono text-[13px] font-medium leading-[1.5] tracking-[0.03em]',

        // Muted — DM Sans 400 / 14px  / secondary info
        muted: 'text-foreground-muted text-sm leading-[1.45]',

        // Faint — for placeholders, disabled
        faint: 'text-foreground-faint text-sm leading-[1.45]',

        // Semantic entity labels
        task: 'text-task text-sm font-medium',
        habit: 'text-habit text-sm font-medium',
        goal: 'text-goal text-sm font-medium',

        // Overdue / missed / skipped states
        overdue: 'text-overdue text-sm font-medium',
        missed: 'text-missed text-sm font-medium',
        skipped: 'text-skipped text-sm font-medium',

        // Code — monospace inline
        code: cn(
          'bg-accent relative rounded px-[0.3rem] py-[0.2rem] font-mono text-[13px] font-medium',
        ),
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type TextVariantProps = VariantProps<typeof textVariants>

type TextVariant = NonNullable<TextVariantProps['variant']>

const ROLE: Partial<Record<TextVariant, Role>> = {
  display: 'heading',
  h1: 'heading',
  h2: 'heading',
  h3: 'heading',
  code: Platform.select({ web: 'code' as Role }),
}

const ARIA_LEVEL: Partial<Record<TextVariant, string>> = {
  display: '1',
  h1: '1',
  h2: '2',
  h3: '3',
}

const TextClassContext = React.createContext<string | undefined>(undefined)

const Text = ({
  className,
  asChild = false,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof RNText> &
  TextVariantProps & {
    asChild?: boolean
  }) => {
  const textClass = React.useContext(TextClassContext)
  const Component = asChild ? Slot.Slot : RNText
  return (
    <Component
      className={cn(textVariants({ variant }), textClass, className)}
      role={variant ? ROLE[variant] : undefined}
      aria-level={variant ? ARIA_LEVEL[variant] : undefined}
      {...props}
    />
  )
}

export { Text, TextClassContext }
