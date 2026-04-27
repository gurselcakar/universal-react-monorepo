import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardSeparator,
  CardTitle,
  Input,
  SignInForm,
  Text,
} from '@chalkboard/shared-frontend'
import { TechStack } from '@chalkboard/ui-demo/components'
import { createFileRoute } from '@tanstack/react-router'
import type { ComponentProps } from 'react'
import { useEffect, useState } from 'react'

type TextVariant = NonNullable<ComponentProps<typeof Text>['variant']>
type ButtonVariant = NonNullable<ComponentProps<typeof Button>['variant']>
type ButtonSize = NonNullable<ComponentProps<typeof Button>['size']>

// ─── Dark mode ───────────────────────────────────────────────────────────────

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const stored = localStorage.getItem('ui-demo-dark')
    if (stored !== null) return stored === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('ui-demo-dark', String(isDark))
  }, [isDark])

  return { isDark, toggle: () => setIsDark((v) => !v) }
}

const SunIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
)

const MoonIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

// ─── Data ────────────────────────────────────────────────────────────────────

const TYPE_ROWS: Array<{ variant: TextVariant; sample: string; usage: string }> = [
  { variant: 'display', sample: 'Today', usage: 'Page titles' },
  { variant: 'h1', sample: 'Your Goals', usage: 'Section headings' },
  { variant: 'h2', sample: 'Launch MVP', usage: 'Card titles · Goal names' },
  { variant: 'h3', sample: 'Morning Tasks', usage: 'Group labels · Subsections' },
  {
    variant: 'body',
    sample: 'Track tasks, habits, and goals in one place.',
    usage: 'Body text · Descriptions',
  },
  {
    variant: 'body-strong',
    sample: 'Three entity types. One clear view.',
    usage: 'Emphasized body',
  },
  { variant: 'small', sample: 'Due today · 3 subtasks remaining', usage: 'Metadata · Timestamps' },
  { variant: 'caption', sample: 'Active', usage: 'Badges · Status labels' },
  { variant: 'mono', sample: '87%  ·  14 day streak', usage: 'Progress · Streaks · Dates' },
  { variant: 'muted', sample: 'Created 12 Jan · Linked to Launch MVP', usage: 'Secondary info' },
  { variant: 'faint', sample: 'Add a description...', usage: 'Placeholders · Disabled' },
  { variant: 'task', sample: 'Design sprint kickoff', usage: 'Task entity label' },
  { variant: 'habit', sample: 'Drink 2L Water', usage: 'Habit entity label' },
  { variant: 'goal', sample: 'Launch MVP by Q2', usage: 'Goal entity label' },
  { variant: 'overdue', sample: '2 days overdue', usage: 'Overdue task state' },
  { variant: 'missed', sample: 'Missed yesterday', usage: 'Missed habit log' },
  { variant: 'skipped', sample: 'Skipped · streak preserved', usage: 'Skipped habit log' },
  { variant: 'code', sample: 'habit.status = "completed"', usage: 'Inline code' },
  { variant: 'default', sample: 'The quick brown fox', usage: 'Default (font-body 16px)' },
]

const BTN_VARIANTS: Array<{ variant: ButtonVariant; label: string }> = [
  { variant: 'default', label: 'Save' },
  { variant: 'secondary', label: 'Cancel' },
  { variant: 'task', label: 'Add Task' },
  { variant: 'habit', label: 'Log Habit' },
  { variant: 'goal', label: 'Set Goal' },
  { variant: 'ghost', label: 'Show completed' },
  { variant: 'destructive', label: 'Delete' },
  { variant: 'link', label: 'View all →' },
]

const BTN_SIZES: Array<{ size: ButtonSize; label: string }> = [
  { size: 'sm', label: 'sm' },
  { size: 'default', label: 'default' },
  { size: 'lg', label: 'lg' },
]

const COLORS: Array<{
  group: string
  tokens: Array<{ name: string; bg: string; hex: string; bordered?: boolean }>
}> = [
  {
    group: 'Surface & Text',
    tokens: [
      { name: 'background', bg: 'bg-background', hex: '#FAF8F4', bordered: true },
      { name: 'background-raised', bg: 'bg-background-raised', hex: '#F3F0EA', bordered: true },
      { name: 'background-feature', bg: 'bg-background-feature', hex: '#FAF9F6', bordered: true },
      { name: 'foreground', bg: 'bg-foreground', hex: '#2A2623' },
      { name: 'foreground-muted', bg: 'bg-foreground-muted', hex: '#6B6560' },
      { name: 'foreground-faint', bg: 'bg-foreground-faint', hex: '#A39E97' },
      { name: 'border', bg: 'bg-border', hex: '#DDD8D0', bordered: true },
      { name: 'border-strong', bg: 'bg-border-strong', hex: '#C4BEB5', bordered: true },
    ],
  },
  {
    group: 'Entity',
    tokens: [
      { name: 'task', bg: 'bg-task', hex: '#4A6FA5' },
      { name: 'task-light', bg: 'bg-task-light', hex: '#EBF0F7', bordered: true },
      { name: 'habit', bg: 'bg-habit', hex: '#C17A3A' },
      { name: 'habit-light', bg: 'bg-habit-light', hex: '#FBF3E8', bordered: true },
      { name: 'goal', bg: 'bg-goal', hex: '#3A7A5C' },
      { name: 'goal-light', bg: 'bg-goal-light', hex: '#EAF5F0', bordered: true },
    ],
  },
  {
    group: 'Semantic',
    tokens: [
      { name: 'completed', bg: 'bg-completed', hex: '#3A7A5C' },
      { name: 'missed', bg: 'bg-missed', hex: '#B86B5A' },
      { name: 'skipped', bg: 'bg-skipped', hex: '#9B90B8' },
      { name: 'overdue', bg: 'bg-overdue', hex: '#C4704A' },
      { name: 'destructive', bg: 'bg-destructive', hex: '#A84E4E' },
    ],
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionNumber = ({ n }: { n: string }) => (
  <div className="text-foreground-faint mb-1 font-mono text-xs tracking-widest">{n}</div>
)

const SectionHeading = ({ children }: { children: string }) => (
  <h2 className="font-display text-foreground text-4xl font-bold tracking-[-0.025em]">
    {children}
  </h2>
)

const SubLabel = ({ children }: { children: string }) => (
  <p className="text-foreground-faint mb-5 font-mono text-xs">{children}</p>
)

// ─── Sections ────────────────────────────────────────────────────────────────

const TypographySection = () => (
  <section className="py-16" id="typography">
    <div className="mb-10">
      <SectionNumber n="01" />
      <SectionHeading>Typography</SectionHeading>
      <p className="text-foreground-muted font-body mt-2 text-sm">
        Outfit for hierarchy · DM Sans for UI · JetBrains Mono for data
      </p>
    </div>

    <div className="border-border overflow-hidden rounded-md border">
      {TYPE_ROWS.map(({ variant, sample, usage }, i) => (
        <div
          key={variant}
          className={[
            'hover:bg-background-feature flex items-start gap-6 px-6 py-5 transition-colors',
            i !== TYPE_ROWS.length - 1 ? 'border-border border-b' : '',
            i % 2 === 0 ? 'bg-background' : 'bg-background-raised',
          ].join(' ')}
        >
          {/* Token name */}
          <code className="text-foreground-faint mt-[3px] w-32 shrink-0 font-mono text-[11px]">
            {variant}
          </code>

          {/* Sample */}
          <div className="min-w-0 flex-1 overflow-hidden">
            <Text variant={variant}>{sample}</Text>
          </div>

          {/* Usage */}
          <span className="text-foreground-faint mt-[3px] hidden w-52 shrink-0 text-right font-mono text-[11px] sm:block">
            {usage}
          </span>
        </div>
      ))}
    </div>
  </section>
)

const ButtonsSection = () => (
  <section className="border-border border-t py-16" id="buttons">
    <div className="mb-10">
      <SectionNumber n="02" />
      <SectionHeading>Buttons</SectionHeading>
      <p className="text-foreground-muted font-body mt-2 text-sm">
        Entity-aware variants · 3 sizes · full disabled state
      </p>
    </div>

    {/* All variants */}
    <div className="mb-12">
      <SubLabel>Variants</SubLabel>
      <div className="flex flex-wrap items-end gap-x-6 gap-y-8">
        {BTN_VARIANTS.map(({ variant, label }) => (
          <div key={variant} className="flex flex-col items-center gap-3">
            <Button variant={variant}>
              <Text>{label}</Text>
            </Button>
            <code className="text-foreground-faint font-mono text-[11px]">{variant}</code>
          </div>
        ))}
      </div>
    </div>

    {/* Sizes */}
    <div className="mb-12">
      <SubLabel>Sizes — task variant</SubLabel>
      <div className="flex flex-wrap items-end gap-x-6 gap-y-8">
        {BTN_SIZES.map(({ size, label }) => (
          <div key={size} className="flex flex-col items-center gap-3">
            <Button variant="task" size={size}>
              <Text>Add Task</Text>
            </Button>
            <code className="text-foreground-faint font-mono text-[11px]">{label}</code>
          </div>
        ))}
        <div className="flex flex-col items-center gap-3">
          <Button variant="task" size="icon">
            <Text>+</Text>
          </Button>
          <code className="text-foreground-faint font-mono text-[11px]">icon</code>
        </div>
      </div>
    </div>

    {/* Entity context strip */}
    <div className="mb-12">
      <SubLabel>Entity context</SubLabel>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="border-task-light bg-task-light flex items-center justify-between rounded-md border px-4 py-3">
          <Text variant="task">Design sprint kickoff</Text>
          <Button variant="task" size="sm">
            <Text>Done</Text>
          </Button>
        </div>
        <div className="border-habit-light bg-habit-light flex items-center justify-between rounded-md border px-4 py-3">
          <Text variant="habit">Drink 2L Water</Text>
          <Button variant="habit" size="sm">
            <Text>Log</Text>
          </Button>
        </div>
        <div className="border-goal-light bg-goal-light flex items-center justify-between rounded-md border px-4 py-3">
          <Text variant="goal">Launch MVP by Q2</Text>
          <Button variant="goal" size="sm">
            <Text>View</Text>
          </Button>
        </div>
      </div>
    </div>

    {/* Disabled */}
    <div>
      <SubLabel>Disabled state (opacity-50, pointer-events-none)</SubLabel>
      <div className="flex flex-wrap items-end gap-x-6 gap-y-8">
        {BTN_VARIANTS.map(({ variant, label }) => (
          <div key={variant} className="flex flex-col items-center gap-3">
            <Button variant={variant} disabled>
              <Text>{label}</Text>
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
)

const CardSection = () => (
  <section className="border-border border-t py-16" id="cards">
    <div className="mb-10">
      <SectionNumber n="04" />
      <SectionHeading>Cards</SectionHeading>
      <p className="text-foreground-muted font-body mt-2 text-sm">
        Composable surface primitive · entity accent stripe · shadow variants · pressable
      </p>
    </div>

    {/* Shadow variants */}
    <div className="mb-12">
      <SubLabel>Shadow variants</SubLabel>
      <div className="grid gap-4 sm:grid-cols-3">
        {(['none', 'sm', 'md', 'lg'] as const).map((shadow) => (
          <div key={shadow} className="flex flex-col gap-2">
            <Card shadow={shadow}>
              <CardHeader>
                <CardTitle>Launch MVP</CardTitle>
                <CardDescription>Due in 3 days · 4 subtasks</CardDescription>
              </CardHeader>
              <CardContent>
                <Text variant="small" className="text-foreground-muted">
                  Define scope, assign owners, and ship the first working build to staging.
                </Text>
              </CardContent>
            </Card>
            <code className="text-foreground-faint font-mono text-[11px]">{`shadow="${shadow}"`}</code>
          </div>
        ))}
      </div>
    </div>

    {/* Entity accent stripe */}
    <div className="mb-12">
      <SubLabel>Entity variants — accent stripe + tinted surface</SubLabel>
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="flex flex-col gap-2">
          <Card entity="task" tinted>
            <CardHeader>
              <CardTitle>Design sprint kickoff</CardTitle>
              <CardDescription>Due today · 2 subtasks</CardDescription>
            </CardHeader>
            <CardSeparator />
            <CardFooter>
              <Text variant="caption" className="text-task">
                Task
              </Text>
              <Button variant="task" size="sm">
                <Text>Mark done</Text>
              </Button>
            </CardFooter>
          </Card>
          <code className="text-foreground-faint font-mono text-[11px]">entity="task" tinted</code>
        </div>

        <div className="flex flex-col gap-2">
          <Card entity="habit" tinted>
            <CardHeader>
              <CardTitle>Drink 2L Water</CardTitle>
              <CardDescription>14 day streak · logged today</CardDescription>
            </CardHeader>
            <CardSeparator />
            <CardFooter>
              <Text variant="caption" className="text-habit">
                Habit
              </Text>
              <Button variant="habit" size="sm">
                <Text>Log</Text>
              </Button>
            </CardFooter>
          </Card>
          <code className="text-foreground-faint font-mono text-[11px]">entity="habit" tinted</code>
        </div>

        <div className="flex flex-col gap-2">
          <Card entity="goal" tinted>
            <CardHeader>
              <CardTitle>Launch MVP by Q2</CardTitle>
              <CardDescription>87% complete · on track</CardDescription>
            </CardHeader>
            <CardSeparator />
            <CardFooter>
              <Text variant="caption" className="text-goal">
                Goal
              </Text>
              <Button variant="goal" size="sm">
                <Text>View</Text>
              </Button>
            </CardFooter>
          </Card>
          <code className="text-foreground-faint font-mono text-[11px]">entity="goal" tinted</code>
        </div>
      </div>
    </div>

    {/* Accent stripe only (no tint) */}
    <div className="mb-12">
      <SubLabel>Entity accent stripe — no tint</SubLabel>
      <div className="grid gap-4 sm:grid-cols-3">
        {(['task', 'habit', 'goal'] as const).map((entity) => (
          <Card key={entity} entity={entity}>
            <CardHeader>
              <CardTitle>
                {entity === 'task'
                  ? 'Review PRD'
                  : entity === 'habit'
                    ? 'Morning Run'
                    : 'Ship v1.0'}
              </CardTitle>
              <CardDescription>3 items remaining</CardDescription>
            </CardHeader>
            <CardContent>
              <Text variant="small" className="text-foreground-muted">
                Background surface unchanged — only the top accent stripe carries the entity color.
              </Text>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

    {/* Pressable */}
    <div className="mb-12">
      <SubLabel>Pressable — onPress enables hover lift + active opacity</SubLabel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card entity="task" onPress={() => alert('Card pressed')}>
          <CardHeader>
            <CardTitle>Click me</CardTitle>
            <CardDescription>Hover to see lift · click for press state</CardDescription>
          </CardHeader>
          <CardContent>
            <Text variant="small" className="text-foreground-muted">
              Pass <Text variant="code">onPress</Text> to promote the card into a{' '}
              <Text variant="code">Pressable</Text> with built-in hover and active states.
            </Text>
          </CardContent>
        </Card>

        {/* No entity — plain card */}
        <Card shadow="sm">
          <CardHeader>
            <CardTitle>Plain card</CardTitle>
            <CardDescription>No entity · shadow sm · no accent</CardDescription>
          </CardHeader>
          <CardContent>
            <Text variant="small" className="text-foreground-muted">
              Default surface card — no entity stripe, no tint. Clean container for any content.
            </Text>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
)

const ColorsSection = () => (
  <section className="border-border border-t py-16" id="colors">
    <div className="mb-10">
      <SectionNumber n="03" />
      <SectionHeading>Colors</SectionHeading>
      <p className="text-foreground-muted font-body mt-2 text-sm">
        HSL tokens · warm parchment surfaces · entity-semantic palette
      </p>
    </div>

    {COLORS.map(({ group, tokens }) => (
      <div key={group} className="mb-12">
        <SubLabel>{group}</SubLabel>
        <div className="flex flex-wrap gap-5">
          {tokens.map(({ name, bg, hex, bordered }) => (
            <div key={name} className="flex flex-col gap-2">
              <div
                className={[
                  'h-14 w-[116px] rounded-md',
                  bg,
                  bordered ? 'border-border border' : '',
                ].join(' ')}
              />
              <code className="text-foreground-muted font-mono text-[11px]">{name}</code>
              <code className="text-foreground-faint font-mono text-[11px]">{hex}</code>
            </div>
          ))}
        </div>
      </div>
    ))}
  </section>
)

const InputSection = () => (
  <section className="border-border border-t py-16" id="inputs">
    <div className="mb-10">
      <SectionNumber n="05" />
      <SectionHeading>Inputs</SectionHeading>
      <p className="text-foreground-muted font-body mt-2 text-sm">
        Entity-aware focus rings · 3 sizes · warm parchment surface · brand shadows
      </p>
    </div>

    {/* Sizes */}
    <div className="mb-12">
      <SubLabel>Sizes</SubLabel>
      <div className="flex max-w-sm flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Input size="sm" placeholder="Small — 32px height" />
          <code className="text-foreground-faint font-mono text-[11px]">size="sm"</code>
        </div>
        <div className="flex flex-col gap-1.5">
          <Input placeholder="Default — 40px height" />
          <code className="text-foreground-faint font-mono text-[11px]">size="default"</code>
        </div>
        <div className="flex flex-col gap-1.5">
          <Input size="lg" placeholder="Large — 48px height" />
          <code className="text-foreground-faint font-mono text-[11px]">size="lg"</code>
        </div>
      </div>
    </div>

    {/* States */}
    <div className="mb-12">
      <SubLabel>States — click to trigger focus ring</SubLabel>
      <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Input placeholder="Empty placeholder" />
          <code className="text-foreground-faint font-mono text-[11px]">default</code>
        </div>
        <div className="flex flex-col gap-1.5">
          <Input defaultValue="With a pre-filled value" />
          <code className="text-foreground-faint font-mono text-[11px]">with value</code>
        </div>
        <div className="flex flex-col gap-1.5">
          <Input placeholder="Cannot edit this field" editable={false} />
          <code className="text-foreground-faint font-mono text-[11px]">
            editable=false (disabled)
          </code>
        </div>
        <div className="flex flex-col gap-1.5">
          <Input placeholder="Field has an error" errorMessage="This field is required." />
          <code className="text-foreground-faint font-mono text-[11px]">errorMessage</code>
        </div>
      </div>
    </div>

    {/* Entity context — hero */}
    <div className="mb-12">
      <SubLabel>Entity context — focus each input to see entity-tinted rings</SubLabel>
      <div className="grid gap-6 sm:grid-cols-3">
        {/* Task */}
        <div className="bg-task-light border-task/20 flex flex-col gap-4 rounded-md border p-5">
          <div>
            <p className="text-task font-mono text-[10px] uppercase tracking-widest">Task</p>
            <Text variant="h3">New Task</Text>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-foreground-muted font-body text-xs">Title</label>
              <Input entity="task" placeholder="Design the onboarding flow" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-foreground-muted font-body text-xs">Due date</label>
              <Input entity="task" size="sm" placeholder="2026-04-15" />
            </div>
          </div>
          <code className="text-task/50 font-mono text-[10px]">entity="task"</code>
        </div>

        {/* Habit */}
        <div className="bg-habit-light border-habit/20 flex flex-col gap-4 rounded-md border p-5">
          <div>
            <p className="text-habit font-mono text-[10px] uppercase tracking-widest">Habit</p>
            <Text variant="h3">New Habit</Text>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-foreground-muted font-body text-xs">Name</label>
              <Input entity="habit" placeholder="Drink 2L water daily" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-foreground-muted font-body text-xs">Frequency</label>
              <Input entity="habit" size="sm" placeholder="Daily at 08:00" />
            </div>
          </div>
          <code className="text-habit/50 font-mono text-[10px]">entity="habit"</code>
        </div>

        {/* Goal */}
        <div className="bg-goal-light border-goal/20 flex flex-col gap-4 rounded-md border p-5">
          <div>
            <p className="text-goal font-mono text-[10px] uppercase tracking-widest">Goal</p>
            <Text variant="h3">New Goal</Text>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-foreground-muted font-body text-xs">Title</label>
              <Input entity="goal" placeholder="Launch MVP by Q2" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-foreground-muted font-body text-xs">Target date</label>
              <Input entity="goal" size="sm" placeholder="2026-06-30" />
            </div>
          </div>
          <code className="text-goal/50 font-mono text-[10px]">entity="goal"</code>
        </div>
      </div>
    </div>

    {/* Validation */}
    <div className="mb-12">
      <SubLabel>Validation — errorMessage prop (color + ! prefix, no color-only reliance)</SubLabel>
      <div className="grid max-w-2xl gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-foreground font-body text-sm font-medium">
            Task title <span className="text-destructive">*</span>
          </label>
          <Input placeholder="Enter a task title" errorMessage="Task title is required." />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-foreground font-body text-sm font-medium">
            Habit name <span className="text-destructive">*</span>
          </label>
          <Input
            entity="habit"
            defaultValue="hi"
            errorMessage="Name must be at least 3 characters."
          />
        </div>
      </div>
    </div>
  </section>
)

// ─── Page ─────────────────────────────────────────────────────────────────────

const ComponentLibrary = () => {
  const { isDark, toggle } = useDarkMode()

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="bg-foreground sticky top-0 z-50 flex h-14 items-center justify-between border-b border-white/10 px-8">
        <div className="flex items-center gap-3">
          <span className="font-display text-background text-[17px] font-semibold tracking-[-0.015em]">
            Chalkboard
          </span>
          <span className="text-background/30 font-mono text-[11px]">UI</span>
        </div>
        <nav className="hidden items-center gap-6 sm:flex">
          {['Typography', 'Buttons', 'Colors', 'Cards', 'Inputs'].map((label, i) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="text-background/40 hover:text-background/80 font-mono text-xs transition-colors"
            >
              0{i + 1} {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="text-background/50 hover:text-background/90 flex h-7 w-7 items-center justify-center rounded-md transition-colors"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <code className="text-background/25 font-mono text-[11px]">v0.1.0</code>
        </div>
      </header>

      {/* Page hero */}
      <div className="border-border bg-background-raised border-b px-8 py-12">
        <div className="mx-auto max-w-5xl">
          <p className="text-foreground-faint mb-2 font-mono text-xs tracking-widest">
            Design System
          </p>
          <h1 className="font-display text-foreground text-5xl font-bold tracking-[-0.03em]">
            Component Library
          </h1>
          <p className="text-foreground-muted font-body mt-3 max-w-xl text-base leading-relaxed">
            All typography variants, button states, and brand color tokens derived from the Warm
            Modernist design system.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-8">
        <main className="mx-auto max-w-5xl">
          <TypographySection />
          <ButtonsSection />
          <ColorsSection />
          <CardSection />
          <InputSection />
          <SignInForm
            onEmailSignIn={() => Promise.resolve(null)}
            onGoogleSignIn={() => Promise.resolve(null)}
            onNavigateToSignUp={() => null}
          />
          <TechStack />
        </main>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: ComponentLibrary,
})
