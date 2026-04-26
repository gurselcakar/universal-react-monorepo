import cspellPlugin from '@cspell/eslint-plugin'
import js from '@eslint/js'
import nxPlugin from '@nx/eslint-plugin'
import prettierConfig from 'eslint-config-prettier'
import checkFile from 'eslint-plugin-check-file'
import importX from 'eslint-plugin-import-x'
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions'
import reactCompilerPlugin from 'eslint-plugin-react-compiler'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/**
 * Base ESLint config shared across all packages and apps.
 * Includes: JS recommended, TS recommended, Nx module boundaries,
 * unused-imports, import ordering, arrow functions, file naming, cspell, react-compiler.
 */
export const base = tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: [
      '**/*.config.{js,cjs,mjs}',
      '**/metro.config.*',
      '**/babel.config.*',
      '**/tailwind.config.*',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.commonjs,
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    plugins: { '@nx': nxPlugin },
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
    ignores: ['**/*.config.{js,mjs,cjs,ts,mts,cts}'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          allow: [],
          depConstraints: [{ sourceTag: '*', onlyDependOnLibsWithTags: ['*'] }],
        },
      ],
    },
  },
  // Stricter TypeScript rules (syntactic — no type-checking required)
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off', // delegated to unused-imports
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-non-null-assertion': 'warn',
    },
  },
  // Unused imports
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'unused-imports': unusedImports },
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'all',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  // Import ordering
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: { 'import-x': importX },
    rules: {
      'import-x/no-duplicates': 'error',
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
  // Arrow functions
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: { 'prefer-arrow-functions': preferArrowFunctions },
    rules: {
      'prefer-arrow-functions/prefer-arrow-functions': [
        'warn',
        {
          allowedNames: [],
          allowNamedFunctions: false,
          allowObjectProperties: false,
          classPropertiesAllowed: false,
          disallowPrototype: false,
          returnStyle: 'unchanged',
          singleReturnOnly: false,
        },
      ],
    },
  },
  // Cosmetic style rules
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    rules: {
      'arrow-body-style': ['warn', 'as-needed'],
      'no-useless-return': 'warn',
    },
  },
  // File naming conventions (KEBAB_CASE for all ts/tsx files)
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'check-file': checkFile },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{ts,tsx}': 'KEBAB_CASE',
        },
        { ignoreMiddleExtensions: true },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          'src/components/**/': 'KEBAB_CASE',
          'src/lib/**/': 'KEBAB_CASE',
        },
      ],
    },
  },
  // React Compiler
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: { 'react-compiler': reactCompilerPlugin },
    rules: {
      'react-compiler/react-compiler': 'warn',
    },
  },
  // Spell checking
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: { '@cspell': cspellPlugin },
    rules: {
      '@cspell/spellchecker': ['warn', {}],
    },
  },
  // Must be last — disables ESLint rules that would conflict with Prettier formatting
  prettierConfig,
)

/**
 * Type-checked ESLint config. Call with import.meta.dirname from each project.
 * Adds strictTypeChecked rules that require parserOptions.project (slower but thorough).
 *
 * Usage in eslint.config.mjs:
 *   import { withTypeChecking } from '@chalkboard/eslint-config-base'
 *   export default [...base, ...withTypeChecking(import.meta.dirname)]
 */
export const withTypeChecking = (tsconfigRootDir) =>
  tseslint.config({
    files: ['**/*.{ts,tsx}'],
    ignores: ['**/*.d.ts', '**/*.config.{ts,tsx,js,mjs,cjs}'],
    extends: [...tseslint.configs.strictTypeChecked],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir,
      },
    },
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-duplicate-type-constituents': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-confusing-void-expression': [
        'error',
        { ignoreArrowShorthand: true, ignoreVoidOperator: false },
      ],
      '@typescript-eslint/prefer-nullish-coalescing': [
        'error',
        { ignoreTernaryTests: false, ignoreConditionalTests: false },
      ],
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
      '@typescript-eslint/no-base-to-string': 'error',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true, allowBoolean: false, allowNullish: false, allowRegExp: true },
      ],
      '@typescript-eslint/restrict-plus-operands': [
        'error',
        {
          allowAny: false,
          allowBoolean: false,
          allowNullish: false,
          allowNumberAndString: false,
          allowRegExp: false,
          skipCompoundAssignments: false,
        },
      ],
    },
  })
