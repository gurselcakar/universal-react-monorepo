# Universal React Monorepo

Write React components once, run them on web, iOS, and Android. A Turborepo + NativeWind template with shared UI out of the box.

![Demo](./universal-react-monorepo-demo.png)

> **New to monorepos?** Follow the [step-by-step guide](https://www.gurselcakar.com/monorepo) that built this template.

## Tech Stack

**Apps:** Next.js 16 or Vite (web), Expo SDK 54 (mobile)
**UI:** React Native + NativeWind (Tailwind for RN)
**Build:** Turborepo, pnpm workspaces, TypeScript

## Project Structure

```
├── apps/
│   ├── mobile/     # Expo React Native app
│   ├── web/        # Next.js web app
│   └── web-vite/   # Vite web app (alternative)
├── packages/
│   └── ui/         # Shared component library
└── turbo.json      # Turborepo config
```

### Choosing a Web Framework

Both `web` (Next.js) and `web-vite` (Vite + TanStack Router) are included. Remove the one you don't need:

**Keep Next.js only:**
```bash
rm -rf apps/web-vite
pnpm install
```

**Keep Vite only:**
```bash
rm -rf apps/web
mv apps/web-vite apps/web
# Update "name" in apps/web/package.json from "web-vite" to "web"
pnpm install
```

## Getting Started

**Prerequisites**: Node.js 18+, pnpm 10+, and optionally Xcode/Android Studio for mobile development.

```bash
# Clone and install
git clone https://github.com/gurselcakar/universal-react-monorepo.git
cd universal-react-monorepo
pnpm install

# Start all apps
pnpm dev

# Or run individually
pnpm --filter web dev       # Next.js at localhost:3000
pnpm --filter web-vite dev  # Vite at localhost:5173
pnpm --filter mobile dev    # Expo Metro bundler
```

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps |
| `pnpm build` | Build all apps |
| `pnpm lint` | Lint all workspaces |
| `pnpm typecheck` | TypeScript type checking |

## How It Works

- **Shared Components**: `packages/ui/` contains React Native components styled with NativeWind
- **Web**: Next.js uses react-native-web to render React Native components as HTML
- **Mobile**: Expo renders components natively on iOS/Android

## Resources

- [Build guide](https://www.gurselcakar.com/monorepo) — step-by-step walkthrough
- [Turborepo docs](https://turbo.build/repo/docs)
- [NativeWind docs](https://www.nativewind.dev/)
- [Expo docs](https://docs.expo.dev/)
- [Next.js docs](https://nextjs.org/docs)

## Author

Built by [Gürsel Çakar](https://x.com/gurselcakar) — also the creator of [Hukora](https://hukora.com), a logic-based puzzle game.

## Licence

MIT
