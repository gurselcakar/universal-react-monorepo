# Morpheus — History

## Project Context

**Project:** universal-react-monorepo
**Tech stack:** Expo (React Native) + Next.js + tRPC + Drizzle ORM + better-auth + NativeWind + Tailwind CSS — Nx monorepo managed with pnpm workspaces.
**User:** Harry Twigg
**Team universe:** The Matrix

### Key structure
- `apps/mobile` — Expo app (React Native, NativeWind, expo-router)
- `apps/web` — Next.js app (App Router)
- `apps/ui-demo` — Vite + TanStack Router component demo
- `packages/api` — tRPC, Drizzle ORM, better-auth
- `packages/shared-frontend` — shared React components (NativeWind compatible)
- `packages/theme` — Tailwind preset + design tokens

## Learnings

- **2026-03-29 — shared-frontend is native-first, owned by Trinity.** `packages/shared-frontend` has `react-native` as a peer dep and uses `@rn-primitives/*` + NativeWind. It must satisfy React Native constraints above all. Trinity owns implementation; Mouse owns visual design spec; Neo and Trinity (app) are consumers. When a new shared component is needed, Trinity implements with Mouse sign-off.
