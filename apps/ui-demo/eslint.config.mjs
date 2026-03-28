import { base, withTypeChecking } from '@tooling/eslint-config-base'

export default [
  ...base,
  ...withTypeChecking(import.meta.dirname),
  { ignores: ['dist', 'src/routeTree.gen.ts'] },
]
