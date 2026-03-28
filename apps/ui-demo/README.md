# Web App (Vite)

Vite web app with TanStack Router and React Native Web integration.

## Development

```bash
pnpm dev          # localhost:5173
pnpm build        # Production build
pnpm preview      # Preview production build
```

## Configuration

- **vite.config.ts** — Uses `vite-plugin-react-native-web`, `jsxImportSource: 'nativewind'`, TanStack Router plugin

## Structure

```
src/
├── routes/
│   ├── __root.tsx      # Root layout
│   ├── index.tsx       # Landing page
│   └── nativewind.tsx  # Shared components demo
├── components/         # App-specific components
└── main.tsx            # Entry point
```
