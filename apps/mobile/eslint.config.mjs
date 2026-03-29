import { reactNative, withTypeChecking } from '@chalkboard/eslint-config-react-native'

export default [
  ...reactNative,
  ...withTypeChecking(import.meta.dirname),
  // RN uses require() for image/asset loading — allow it despite strictTypeChecked
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  // UIText is a custom Text wrapper component — allow raw text inside it
  {
    files: ['**/*.{ts,tsx}'],
    rules: { 'react-native/no-raw-text': ['warn', { skip: ['UIText'] }] },
  },
  {
    ignores: ['dist/*', 'scripts/**'],
  },
]
