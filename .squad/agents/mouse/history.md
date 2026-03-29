# Mouse — History

## Project Context

**Project:** universal-react-monorepo
**Tech stack:** Expo (React Native) + Next.js + tRPC + Drizzle ORM + better-auth + NativeWind + Tailwind CSS — Nx monorepo managed with pnpm workspaces.
**User:** Harry Twigg
**Team universe:** The Matrix

### Key structure (design focus)
- `packages/theme` — source of truth for design tokens
  - `src/tailwind-preset.ts` — Tailwind preset (shared config)
  - `src/theme.ts` — theme values (colors, spacing, typography)
  - `src/index.ts` — package entry
- `packages/shared-frontend` — shared components (must work NativeWind + web Tailwind)
  - `src/badge.tsx`, `src/card.tsx`, `src/input.tsx`, etc.
  - `src/ui/` — UI primitives
- `apps/ui-demo` — component showcase (visual verification)

### Design constraints
- All components in `shared-frontend` use NativeWind (className-based Tailwind for React Native)
- Design tokens must be defined in `packages/theme` — no one-off color values in components
- Typography and spacing must be consistent across mobile and web
- Accessible contrast ratios required for all color combinations

## Learnings
