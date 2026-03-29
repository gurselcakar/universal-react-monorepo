# Trinity — History

## Project Context

**Project:** universal-react-monorepo
**Tech stack:** Expo (React Native) + Next.js + tRPC + Drizzle ORM + better-auth + NativeWind + Tailwind CSS — Nx monorepo managed with pnpm workspaces.
**User:** Harry Twigg
**Team universe:** The Matrix

### Key structure (mobile focus)
- `apps/mobile` — Expo app entry point
  - `src/app/` — expo-router screens (file-based routing)
  - `src/components/` — mobile-specific components
  - `src/lib/auth-client.ts` — better-auth client for mobile
- `packages/shared-frontend` — shared components consumed by mobile
- `packages/theme` — Tailwind preset used via NativeWind

## Learnings

### 2026-03-29 — Shared auth components shipped

- Created `packages/shared-frontend/src/auth/` with `types.ts`, `sign-in-form.tsx`, `sign-up-form.tsx`, `index.ts`
- Components own all form state (email, password, name, loading, error) — platform wrappers only provide callbacks + navigation
- Callback contract: `Promise<string | null>` — null = success (wrapper already navigated), non-null = error string to display
- `googleIcon?: ReactNode` pattern: web passes `<svg>`, mobile omits it (text-only button)
- No `Platform.select` anywhere; cross-platform keyboard submit via `returnKeyType` + `onSubmitEditing` + `useRef` focus chain
- NativeWind classes from theme: `bg-primary`, `text-foreground`, `text-foreground-muted`, `text-foreground-faint`, `bg-background`, `border-border`, `text-primary-foreground`
- `gap-*` for spacing — never `space-y-*` (not supported in NativeWind)
- Components render form internals only — no outer card, heading, or `KeyboardAvoidingView`
- Barrel: `packages/shared-frontend/src/index.ts` re-exports `export * from './auth'`
- TypeScript noEmit check passed clean

### 2026-03-29 — Cross-agent note (from Scribe): Neo updated web wrappers

- Neo rewrote `apps/web/src/app/(auth)/sign-in/page.tsx` and `sign-up/page.tsx` to consume `<SignInForm>` / `<SignUpForm>` from `@chalkboard/shared-frontend`.
- Neo correctly adopted the `Promise<string | null>` callback contract and `googleIcon` render prop without modification to the shared components.
- Neo declared `GoogleIcon` as a stable module-level constant (good pattern).
- Neo and Trinity's work landed cleanly in parallel — no integration issues.

### 2026-03-29 — Mobile auth screens migrated to shared components

- Rewrote `apps/mobile/src/app/(auth)/sign-in.tsx` — now a thin wrapper: `KeyboardAvoidingView` + `<SignInForm>` with three callbacks
- Rewrote `apps/mobile/src/app/(auth)/sign-up.tsx` — same pattern using `<SignUpForm>`
- All local state (email, password, name, loading, error) removed from mobile screens — `SignInForm`/`SignUpForm` own it
- Mobile wrappers do NOT pass `googleIcon` — component renders text-only "Continue with Google" button
- `onEmailSignIn` / `onEmailSignUp` return `null` on success after `router.replace`, error string otherwise
- `onGoogleSignUp` correctly calls `authClient.signIn.social` (not `signUp.social`)
- Background: `bg-background` (theme token) instead of hardcoded `bg-white`
- TypeScript noEmit check passed clean after rewrite
