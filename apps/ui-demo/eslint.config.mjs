import { base, withTypeChecking } from '@chalkboard/eslint-config-base'

export default [
  ...base,
  ...withTypeChecking(import.meta.dirname),
  { ignores: ['dist', 'src/routeTree.gen.ts'] },
  // TanStack Router uses file-based routing with special naming (e.g. __root.tsx)
  {
    files: ['src/routes/**/*.{ts,tsx}'],
    rules: {
      'check-file/filename-naming-convention': 'off',
    },
  },
]
