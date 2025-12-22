# Universal React Monorepo

A Turborepo template for building cross-platform applications with shared React Native components that run on web, iOS, and Android.

![Demo](./universal-react-monorepo-demo.png)

## Tech Stack

| Technology | Version |
|------------|---------|
| Turborepo | 2.7.x |
| Next.js | 16.x |
| Expo SDK | 54.x |
| React | 19.x |
| React Native | 0.81.x |
| NativeWind | 4.x |
| Tailwind CSS | 3.4.x |
| TypeScript | 5.x |
| pnpm | 10.x |

## Project Structure

```
├── apps/
│   ├── mobile/     # Expo React Native app
│   └── web/        # Next.js web app
├── packages/
│   └── ui/         # Shared component library
└── turbo.json      # Turborepo config
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
pnpm --filter web dev      # Next.js at localhost:3000
pnpm --filter mobile dev   # Expo Metro bundler
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

- [Guide](https://www.gurselcakar.com/writing/monorepo-guide) - Detailed walkthrough
- [Next.js](https://nextjs.org/docs) | [Expo](https://docs.expo.dev/) | [NativeWind](https://www.nativewind.dev/) | [Turborepo](https://turbo.build/repo/docs)

## Author

Built by [Gursel Cakar](https://x.com/gurselcakar) — also the creator of [Hukora](https://hukora.com), a logic-based puzzle game.

## License

MIT
