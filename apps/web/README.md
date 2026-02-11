# Web App (Next.js)

Next.js web app with App Router and React Native Web integration.

## Development

```bash
pnpm dev          # localhost:3000
pnpm build        # Production build
pnpm start        # Start production server
```

## Configuration

- **next.config.ts** — Transpiles RN packages, aliases `react-native` to `react-native-web`, supports `.web.tsx`/`.web.ts` extensions

## Structure

```
src/app/
├── layout.tsx         # Root layout
├── page.tsx           # Landing page
└── nativewind/        # Shared components demo
```
