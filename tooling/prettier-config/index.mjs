/**
 * Shared Prettier config for the entire monorepo.
 * Projects extend this via their .prettierrc.mjs:
 *
 *   export { default } from '@tooling/prettier-config';
 */

/** @type {import('prettier').Config} */
const config = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  plugins: ['prettier-plugin-tailwindcss'],
}

export default config
