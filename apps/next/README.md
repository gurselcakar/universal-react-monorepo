# Web App

Next.js web application with React Native Web integration for cross-platform component sharing.

## Tech Stack

- **Next.js 16.1.0** - React framework with App Router
- **React 19** - Latest React with Server Components
- **React Native Web** - Renders React Native components as HTML
- **NativeWind** - Cross-platform Tailwind CSS styling
- **Shared UI Components** - From `packages/ui/` workspace

## Development

```bash
pnpm dev          # Start development server (localhost:3000)
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm typecheck  # TypeScript type checking
```

## Key Features

### Cross-Platform Component Support
The app uses React Native Web to share components with the mobile app. Both HTML elements and React Native components work seamlessly together:

```tsx
export default function Page() {
  return (
    <div className="container">
      <Button title="Shared Component" onPress={() => {}} />
    </div>
  );
}
```

### Next.js Configuration
The `next.config.ts` handles React Native Web integration:
- Transpiles React Native packages
- Aliases `react-native` to `react-native-web`
- Supports platform-specific extensions (`.web.tsx`, `.web.ts`)

### NativeWind Styling
Tailwind CSS classes work on both HTML elements and React Native components, enabling consistent styling across platforms.

## Structure

```
apps/web/
├── src/app/
│   ├── page.tsx           # Landing page
│   ├── nativewind/        # Shared components demo
│   └── layout.tsx         # Root layout
├── next.config.ts         # Next.js + RN Web config
├── tailwind.config.js     # Tailwind configuration
└── package.json           # Dependencies & scripts
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Native Web](https://necolas.github.io/react-native-web/)
- [NativeWind](https://www.nativewind.dev/)
