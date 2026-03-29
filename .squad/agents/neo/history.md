# Neo — History

## Project Context

**Project:** universal-react-monorepo
**Tech stack:** Expo (React Native) + Next.js + tRPC + Drizzle ORM + better-auth + NativeWind + Tailwind CSS — Nx monorepo managed with pnpm workspaces.
**User:** Harry Twigg
**Team universe:** The Matrix

### Key structure (web focus)
- `apps/web` — Next.js App Router application
  - `src/app/` — server components, layouts, routes
  - `src/components/` — web-specific components
  - `src/lib/` — web utilities
- `apps/ui-demo` — Vite + TanStack Router component showcase
  - `src/routes/` — demo routes
  - `src/components/` — demo-specific components
- `packages/shared-frontend` — shared components consumed on web
- `packages/theme` — Tailwind preset

## Learnings

### 2026-03-29: Web auth wrappers migrated to shared components

- Rewrote `apps/web/src/app/(auth)/sign-in/page.tsx` and `sign-up/page.tsx` to consume `<SignInForm>` / `<SignUpForm>` from `@chalkboard/shared-frontend`.
- Both pages are now thin wrappers: they only handle auth client calls, navigation, and pass `googleIcon`. All email/password/loading/error state is owned by the shared components.
- Callback contract: return `null` = success, return `string` = error message rendered by the component.
- Updated heading colour tokens from `text-gray-900` / `text-gray-500` → `text-foreground` / `text-foreground-muted` (theme tokens from `packages/theme`, confirmed in the tailwind preset).
- Updated card border from `border-gray-200` → `border-border` (brand token) for consistency.
- `GoogleIcon` defined as a stable module-level JSX constant (not inside the component) to avoid re-creating on every render.
- TypeScript check (`pnpm exec tsc --noEmit` from `apps/web`) passed clean — import errors for `SignInForm`/`SignUpForm` will surface once Trinity creates `packages/shared-frontend/src/auth/` (expected in parallel).
- `apps/web/tailwind.config.js` confirms it includes `../../packages/shared-frontend/src/**` in content paths, so shared component classes will be scanned correctly.

### 2026-03-29 — Cross-agent note (from Scribe): shared component pattern reference

**Shared component contract (from Trinity's implementation in `packages/shared-frontend/src/auth/`):**
- Components are **stateful shells**: they own all form state (email, password, name, loading, error). Web wrappers supply zero local state.
- **Callback contract:** `Promise<string | null>` — return `null` = success (wrapper must navigate before returning null), return a non-empty string = error message the component displays in the top-of-form banner.
- **`googleIcon?: ReactNode`**: web passes the 4-path inline SVG; the prop is optional so mobile can omit it.
- **No `Platform.select` in shared code.** All cross-platform behaviour is achieved via `returnKeyType` + `onSubmitEditing` + `useRef` focus chains.
- **Ownership:** Trinity owns `packages/shared-frontend`. When Neo needs a new shared component, request goes to Trinity (implementation) with Mouse sign-off on the visual spec.
