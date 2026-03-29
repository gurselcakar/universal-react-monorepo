import { base, withTypeChecking } from '@chalkboard/eslint-config-base'

export default [...base, ...withTypeChecking(import.meta.dirname)]
