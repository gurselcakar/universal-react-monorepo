# Tank — History

## Project Context

**Project:** universal-react-monorepo
**Tech stack:** Expo (React Native) + Next.js + tRPC + Drizzle ORM + better-auth + NativeWind + Tailwind CSS — Nx monorepo managed with pnpm workspaces.
**User:** Harry Twigg
**Team universe:** The Matrix

### Key structure (API/backend focus)
- `packages/api` — core backend package
  - `src/auth/` — better-auth configuration
  - `src/db/` — Drizzle schema and client
  - `src/trpc/` — tRPC routers and procedures
  - `src/env.ts` — environment variable validation (Zod)
  - `src/index.ts` — package entry
  - `drizzle/` — migration SQL files
  - `drizzle.config.ts` — Drizzle Kit config

## Learnings
