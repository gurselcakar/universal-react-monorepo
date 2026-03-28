import { base, withTypeChecking } from '@tooling/eslint-config-base'
import expoConfig from 'eslint-config-expo/flat.js'
import reactNativePlugin from 'eslint-plugin-react-native'

/**
 * ESLint config for React Native / Expo projects.
 * Extends base config + Expo rules.
 * Use in: mobile, ui, and any universal React Native package.
 */
export const reactNative = [
  ...base,
  ...expoConfig,
  // Additional React Native rules — register plugin explicitly since flat config
  // does not auto-share plugin registrations across config array entries
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'react-native': reactNativePlugin },
    rules: {
      'react-native/no-unused-styles': 'error',
      'react-native/no-inline-styles': 'off',
      'react-native/no-color-literals': 'off',
      'react-native/no-raw-text': 'warn',
      'react-native/no-single-element-style-arrays': 'error',
      'react-native/split-platform-components': 'warn',
      'react-native/sort-styles': 'warn',
    },
  },
  // Expo Router uses file-based routing with special naming conventions
  // (e.g. _layout.tsx, +not-found.tsx, (tabs)/) — disable check-file for app dir
  {
    files: ['src/app/**/*.{ts,tsx}', 'app/**/*.{ts,tsx}'],
    rules: {
      'check-file/filename-naming-convention': 'off',
      'check-file/folder-naming-convention': 'off',
    },
  },
]

// Re-export for convenience so mobile projects only need @tooling/eslint-config-react-native
export { withTypeChecking }
