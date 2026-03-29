/**
 * Brand color tokens in HSL format.
 * Usage in Tailwind: `color: var(--color-background)` or via utility classes.
 *
 * Palette derived from: docs/brand-guidelines.md
 */

export const lightColors = {
  // Surface
  background: 'hsl(40 37% 97%)', // #FAF8F4 — canvas
  'background-raised': 'hsl(40 27% 94%)', // #F3F0EA — canvas-raised
  'background-sunken': 'hsl(40 20% 91%)', // #EDEAE4 — canvas-sunken

  // Text
  foreground: 'hsl(26 9% 15%)', // #2A2623 — ink
  'foreground-muted': 'hsl(27 5% 40%)', // #6B6560 — ink-muted
  'foreground-faint': 'hsl(35 6% 62%)', // #A39E97 — ink-faint

  // Borders
  border: 'hsl(37 16% 84%)', // #DDD8D0
  'border-strong': 'hsl(36 11% 74%)', // #C4BEB5

  // Entity — Tasks
  task: 'hsl(216 38% 47%)', // #4A6FA5
  'task-light': 'hsl(215 43% 95%)', // #EBF0F7

  // Entity — Habits
  habit: 'hsl(28 54% 49%)', // #C17A3A
  'habit-light': 'hsl(35 70% 95%)', // #FBF3E8

  // Entity — Goals
  goal: 'hsl(152 36% 35%)', // #3A7A5C
  'goal-light': 'hsl(153 35% 94%)', // #EAF5F0

  // Semantic
  completed: 'hsl(152 36% 35%)', // #3A7A5C — shares goal green
  missed: 'hsl(11 40% 54%)', // #B86B5A — muted terracotta
  skipped: 'hsl(256 22% 64%)', // #9B90B8 — soft lavender
  overdue: 'hsl(19 51% 53%)', // #C4704A — warm clay-orange
  destructive: 'hsl(0 37% 48%)', // #A84E4E — danger, reserved

  // Aliases for component compatibility
  primary: 'hsl(216 38% 47%)', // tasks are the primary action
  'primary-foreground': 'hsl(40 37% 97%)',
  secondary: 'hsl(40 27% 94%)',
  'secondary-foreground': 'hsl(26 9% 15%)',
  accent: 'hsl(40 20% 91%)',
  'accent-foreground': 'hsl(26 9% 15%)',
  muted: 'hsl(40 20% 91%)',
  'muted-foreground': 'hsl(27 5% 40%)',
  ring: 'hsl(216 38% 47%)',
  'destructive-foreground': 'hsl(40 37% 97%)',
} as const satisfies Record<string, string>

export const darkColors = {
  // Surface
  background: 'hsl(40 12% 10%)', // #1C1A16 — canvas dark
  'background-raised': 'hsl(24 7% 14%)', // #252220 — canvas-raised dark
  'background-sunken': 'hsl(43 19% 7%)', // #16140F — canvas-sunken dark

  // Text
  foreground: 'hsl(38 23% 91%)', // #EDE9E2 — ink dark
  'foreground-muted': 'hsl(32 6% 58%)', // #9B958E — ink-muted dark
  'foreground-faint': 'hsl(37 7% 34%)', // #5E5951 — ink-faint dark

  // Borders
  border: 'hsl(30 7% 21%)', // #3A3632
  'border-strong': 'hsl(33 8% 28%)', // #4E4943

  // Entity — Tasks
  task: 'hsl(216 38% 47%)', // #4A6FA5 — same in dark
  'task-light': 'hsl(216 38% 12%)', // ~12% opacity over dark canvas

  // Entity — Habits
  habit: 'hsl(28 54% 49%)', // #C17A3A — same in dark
  'habit-light': 'hsl(28 54% 12%)', // ~12% opacity over dark canvas

  // Entity — Goals
  goal: 'hsl(152 36% 35%)', // #3A7A5C — same in dark
  'goal-light': 'hsl(152 36% 12%)', // ~12% opacity over dark canvas

  // Semantic
  completed: 'hsl(152 36% 35%)',
  missed: 'hsl(11 40% 54%)',
  skipped: 'hsl(256 22% 64%)',
  overdue: 'hsl(19 51% 53%)',
  destructive: 'hsl(0 37% 48%)',

  // Aliases for component compatibility
  primary: 'hsl(216 38% 47%)',
  'primary-foreground': 'hsl(40 12% 10%)',
  secondary: 'hsl(24 7% 14%)',
  'secondary-foreground': 'hsl(38 23% 91%)',
  accent: 'hsl(43 19% 7%)',
  'accent-foreground': 'hsl(38 23% 91%)',
  muted: 'hsl(24 7% 14%)',
  'muted-foreground': 'hsl(32 6% 58%)',
  ring: 'hsl(216 38% 47%)',
  'destructive-foreground': 'hsl(40 12% 10%)',
} as const satisfies Record<string, string>

export const colors = {
  light: lightColors,
  dark: darkColors,
} as const
