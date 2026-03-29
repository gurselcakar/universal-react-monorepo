# Squad Decisions

## Active Decisions

---

### 2026-03-29: Auth screen unification — design spec (Mouse)

**By:** Mouse (Designer) — requested by Harry Twigg

1. **Brand palette, no generic grays.** Use theme tokens exclusively: `border` (#DDD8D0) for input borders, `foreground` (#2A2623) for body text, `foreground-muted` (#6B6560) for labels, `background` (#FAF8F4) for canvas.
2. **Primary blue (`#4A6FA5`) for submit CTA.** Auth is a moment of commitment — must feel like the product.
3. **Google SVG icon parity.** `googleIcon?: ReactNode` render prop; web passes 4-path SVG, mobile omits (text-only fallback).
4. **Error as top-of-form banner.** `bg-red-50 border-red-200` banner for server errors. Field-level validation (empty, bad email) handled by guards, not inline field errors.
5. **`gap-*` only — never `space-y-*`.** NativeWind does not support `space-y-*`.
6. **Platform-differentiated card treatment.** Web: `rounded-lg border border-[#DDD8D0] bg-white shadow-sm p-8`. Native: plain `View` with `px-6 pt-8 pb-10`. `Platform.OS` check inside `AuthCard` is the only platform-specific code allowed in shared components.
7. **Font families via tokens.** Headings: `font-display` (Outfit). Labels/body/error: `font-body` (DM Sans).

---

### 2026-03-29: Auth shared components architecture (Morpheus)

**By:** Morpheus (Lead/Architect) — requested by Harry Twigg

1. **Stateful shared components.** Form state (email, password, name, loading, error) lives in the shared component. Platform wrappers inject async callbacks.
2. **Flat individual callbacks, not authActions object.** Props: `onEmailSignIn`, `onGoogleSignIn`, `onNavigateToSignUp/SignIn`. Each returns `Promise<string | null>` — null = success (wrapper navigated), error string = shown by component.
3. **`googleIcon?: React.ReactNode` render prop.** Web passes 4-path SVG. Mobile omits (text-only). Avoids `react-native-svg` dependency in shared code.
4. **`KeyboardAvoidingView` stays in mobile wrappers.** Shared components render form internals only.
5. **Auth sub-directory, barrel re-exported from root.** `packages/shared-frontend/src/auth/index.ts` → `src/index.ts`. Consumers: `import { SignInForm, SignUpForm } from '@chalkboard/shared-frontend'`.
6. **`onNavigateToAuthAlt` as `() => void`.** Rendered as `Pressable`. Not a render prop unless Mouse's spec requires a true `<a>` tag (deferred).

---

### 2026-03-29: `packages/shared-frontend` ownership (Morpheus)

**By:** Morpheus — requested by Harry Twigg

Trinity owns `packages/shared-frontend` — implementation. Mouse owns its visual design spec. Neo and Trinity (mobile) are consumers. The package is native-first: `react-native` is a peer dependency, it uses `@rn-primitives/portal` and `@rn-primitives/slot`, and NativeWind is a dev dependency. Every component must satisfy React Native constraints first; web compatibility is secondary. When Neo needs a new shared component, the request goes to Trinity (implementation) with Mouse sign-off on the visual spec.

---

### 2026-03-29: Shared auth components — implementation (Trinity)

**By:** Trinity (Mobile Developer) — requested by Harry Twigg

- Components own all form state — no state drilling from platform wrappers.
- Callback contract: `Promise<string | null>` — null = success with navigation already done by wrapper; non-null string = error message to show in banner.
- `googleIcon?: ReactNode` — web passes SVG, mobile omits (text-only fallback).
- Form content only — no outer card, heading, subtitle, or `KeyboardAvoidingView` (platform concerns).
- `returnKeyType` + `onSubmitEditing` + `useRef` for keyboard submit chain (cross-platform, no `Platform.select`).
- Theme tokens: `bg-primary`, `text-foreground`, `text-foreground-muted`, `text-foreground-faint`, `bg-background`, `border-border`, `text-primary-foreground`.
- `gap-*` spacing throughout (NativeWind-safe).

---

### 2026-03-29: Web auth wrappers migrated to shared components (Neo)

**By:** Neo (Frontend Developer) — requested by Harry Twigg

- `apps/web/src/app/(auth)/sign-in/page.tsx` and `sign-up/page.tsx` rewritten as thin wrappers.
- All form state delegated to `<SignInForm>` / `<SignUpForm>` from `@chalkboard/shared-frontend`.
- `GoogleIcon` declared as stable module-level JSX constant (not inside the component).
- Heading colour tokens: `text-gray-900` / `text-gray-500` → `text-foreground` / `text-foreground-muted`.
- Card border: `border-gray-200` → `border-border`.
- `apps/web/tailwind.config.js` includes `../../packages/shared-frontend/src/**` — shared classes scanned correctly.

---

### 2026-03-29: Mobile auth screens migrated to shared components (Trinity)

**By:** Trinity (Mobile Developer) — requested by Harry Twigg

- `apps/mobile/src/app/(auth)/sign-in.tsx` and `sign-up.tsx` rewritten as thin wrappers.
- All local state removed from mobile screens.
- `googleIcon` prop omitted — `SignInForm`/`SignUpForm` render text-only Google button on mobile.
- `router.replace('/(tabs)/(home)')` called on success before returning `null`.
- Background: `bg-background` (theme token, not hardcoded `bg-white`).

---

### 2026-03-29: QA review — auth screen unification (Oracle)

**By:** Oracle (QA/Tester) — requested by Harry Twigg

Two warnings found and fixed before commit:

1. **Empty field validation** — `handleEmailSignIn`/`handleEmailSignUp` had no guard. Fixed: trim-based guard added at top of each handler (`setError` + early return before `setLoading(true)`).
2. **`disabled:opacity-50` on Google button** — NativeWind may not support the `disabled:` variant on `Pressable`. Fixed: replaced with conditional opacity expression.

State safety (leave-loading-true-on-success) confirmed clean. No navigation calls after null return.

---

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
