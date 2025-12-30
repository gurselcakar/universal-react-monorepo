# Web App (Vite)

Vite web application with React Native Web integration for cross-platform component sharing.

## Tech Stack

- **Vite 6** - Fast build tool with HMR
- **React 19** - Latest React
- **TanStack Router** - Type-safe file-based routing
- **React Native Web** - Renders React Native components as HTML
- **NativeWind** - Cross-platform Tailwind CSS styling
- **Shared UI Components** - From `packages/ui/` workspace

## Development

```bash
pnpm dev          # Start development server (localhost:5173)
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
pnpm typecheck    # TypeScript type checking
```

## Key Features

### Cross-Platform Component Support
The app uses React Native Web to share components with the mobile app. Both HTML elements and React Native components work seamlessly together:

```tsx
import { Button } from 'ui'

export default function Page() {
  return (
    <div className="container">
      <Button title="Shared Component" onPress={() => {}} />
    </div>
  );
}
```

### Vite Configuration
The `vite.config.ts` handles React Native Web integration:
- Uses `vite-plugin-react-native-web` for RN compatibility
- Configures `jsxImportSource: 'nativewind'` for styling
- TanStack Router plugin for file-based routing

### File-Based Routing
Routes are defined in `src/routes/` using TanStack Router:

```
src/routes/
├── __root.tsx      # Root layout
├── index.tsx       # / (landing page)
└── nativewind.tsx  # /nativewind (components demo)
```

### NativeWind Styling
Tailwind CSS classes work on both HTML elements and React Native components, enabling consistent styling across platforms.

## Structure

```
apps/web-vite/
├── src/
│   ├── routes/            # TanStack Router pages
│   ├── components/        # App-specific components
│   └── main.tsx           # App entry point
├── vite.config.ts         # Vite + RN Web config
├── tailwind.config.js     # Tailwind configuration
└── package.json           # Dependencies & scripts
```

## Learn More

- [Vite Documentation](https://vite.dev/)
- [TanStack Router](https://tanstack.com/router)
- [React Native Web](https://necolas.github.io/react-native-web/)
- [NativeWind](https://www.nativewind.dev/)
