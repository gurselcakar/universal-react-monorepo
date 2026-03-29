import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/nativewind')({
  loader: () => redirect({ to: '/' }),
  component: () => null,
})
