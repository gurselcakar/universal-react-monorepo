# Oracle — History

## Project Context

**Project:** universal-react-monorepo
**Tech stack:** Expo (React Native) + Next.js + tRPC + Drizzle ORM + better-auth + NativeWind + Tailwind CSS — Nx monorepo managed with pnpm workspaces.
**User:** Harry Twigg
**Team universe:** The Matrix

### Key structure (testing focus)
- `apps/mobile` — Expo app (tests run via Jest/Expo)
- `apps/web` — Next.js app
- `apps/ui-demo` — Vite + TanStack Router
- `packages/api` — tRPC + Drizzle (integration tests need DB)
- `packages/shared-frontend` — shared components (need cross-platform testing)

### Testing considerations
- Cross-platform: components in `shared-frontend` must work on both web and native
- tRPC type safety must be verified end-to-end
- Auth flows need both happy-path and error-case coverage
- NativeWind styling may behave differently on web vs native

## Learnings
