import { reactNative, withTypeChecking } from '@tooling/eslint-config-react-native'

export default [
  ...reactNative,
  ...withTypeChecking(import.meta.dirname),
  // RN uses require() for image/asset loading — allow it despite strictTypeChecked
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  {
    ignores: ['dist/*', 'node_modules/**', '*.config.mjs'],
  },
]
