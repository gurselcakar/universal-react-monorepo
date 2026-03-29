import { base, withTypeChecking } from '@chalkboard/eslint-config-base'
import { globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

const eslintConfig = [
  ...base,
  ...nextVitals,
  ...withTypeChecking(import.meta.dirname),
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'scripts/**']),
]

export default eslintConfig
