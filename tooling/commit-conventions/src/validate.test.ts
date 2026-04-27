import fc from 'fast-check'
import { describe, it, expect } from 'vitest'

import { isValidBranchName, extractTicketId, isAutoCommit, validateCommitMessage } from './validate'

// ---------------------------------------------------------------------------
// Property-Based Tests
// ---------------------------------------------------------------------------

describe('Property 1: branch name validation accepts all valid patterns and rejects all others', () => {
  /**
   * **Validates: Requirements 4.2, 4.3, 4.4**
   * Feature: commit-conventions, Property 1: branch name validation accepts all valid patterns and rejects all others
   */

  const BRANCH_REGEX = /^(main|staging|feature\/.+)$/

  it('accepts any string that matches the allowed branch pattern', () => {
    const validBranch = fc.oneof(
      fc.constant('main'),
      fc.constant('staging'),
      // feature/<at least one char> (includes feature/URM-123-foo)
      fc.string({ minLength: 1 }).map((s) => `feature/${s}`),
      // explicit ticket branch: feature/URM-<digits>-<suffix>
      fc
        .tuple(fc.integer({ min: 0, max: 99999 }), fc.string())
        .map(([n, suffix]) => `feature/URM-${n}${suffix}`),
    )

    fc.assert(
      fc.property(validBranch, (branch) => {
        expect(isValidBranchName(branch)).toBe(true)
      }),
      { numRuns: 100 },
    )
  })

  it('rejects any string that does not match the allowed branch pattern', () => {
    fc.assert(
      fc.property(fc.string(), (branch) => {
        fc.pre(!BRANCH_REGEX.test(branch))
        expect(isValidBranchName(branch)).toBe(false)
      }),
      { numRuns: 100 },
    )
  })
})

describe('Property 2: auto-commit prefix bypass', () => {
  /**
   * **Validates: Requirements 5.1**
   * Feature: commit-conventions, Property 2: auto-commit prefix bypass
   */

  const AUTO_PREFIXES = ['Merge', 'Revert', 'Amend', 'fixup!', 'squash!'] as const

  it('any message starting with an auto-commit prefix is accepted regardless of branch', () => {
    const autoMessage = fc
      .tuple(fc.constantFrom(...AUTO_PREFIXES), fc.string())
      .map(([prefix, rest]) => `${prefix}${rest}`)

    const validBranch = fc.oneof(
      fc.constant('main'),
      fc.constant('staging'),
      fc.string({ minLength: 1 }).map((s) => `feature/${s}`),
      fc.integer({ min: 0, max: 99999 }).map((n) => `feature/URM-${n}`),
    )

    fc.assert(
      fc.property(validBranch, autoMessage, (branch, message) => {
        const result = validateCommitMessage(branch, message)
        expect(result.valid).toBe(true)
      }),
      { numRuns: 100 },
    )
  })
})

describe('Property 3: ticket branch commit message validation', () => {
  /**
   * **Validates: Requirements 5.2, 5.4, 5.5**
   * Feature: commit-conventions, Property 3: ticket branch commit message validation
   */

  it('accepts iff message matches ^URM-<digits>: .+', () => {
    const ticketNum = fc.integer({ min: 0, max: 99999 })
    const description = fc.string({ minLength: 1 })
    const arbitraryMessage = fc.string()

    fc.assert(
      fc.property(ticketNum, arbitraryMessage, description, (num, rawMsg, desc) => {
        const branch = `feature/URM-${num}`
        const ticket = `URM-${num}`
        const validPattern = new RegExp(`^${ticket}: .+`)

        // Test with a known-valid message
        const validMessage = `${ticket}: ${desc}`
        const validResult = validateCommitMessage(branch, validMessage)
        expect(validResult.valid).toBe(validPattern.test(validMessage))

        // Test with an arbitrary message (skip auto-commits as they always pass)
        if (!isAutoCommit(rawMsg)) {
          const arbitraryResult = validateCommitMessage(branch, rawMsg)
          expect(arbitraryResult.valid).toBe(validPattern.test(rawMsg))
        }
      }),
      { numRuns: 100 },
    )
  })
})

describe('Property 4: feature branch commit message validation', () => {
  /**
   * **Validates: Requirements 5.3, 5.4, 5.5**
   * Feature: commit-conventions, Property 4: feature branch commit message validation
   */

  it('accepts iff message matches ^feature/<name>: .+', () => {
    // Generate feature branch names that do NOT contain a URM ticket ID
    const featureName = fc.string({ minLength: 1 }).filter((s) => !/URM-[0-9]+/.test(s))
    const description = fc.string({ minLength: 1 })
    const arbitraryMessage = fc.string()

    fc.assert(
      fc.property(featureName, arbitraryMessage, description, (name, rawMsg, desc) => {
        const branch = `feature/${name}`
        const escapedBranch = branch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const validPattern = new RegExp(`^${escapedBranch}: .+`)

        // Test with a known-valid message
        const validMessage = `${branch}: ${desc}`
        const validResult = validateCommitMessage(branch, validMessage)
        expect(validResult.valid).toBe(validPattern.test(validMessage))

        // Test with an arbitrary message (skip auto-commits as they always pass)
        if (!isAutoCommit(rawMsg)) {
          const arbitraryResult = validateCommitMessage(branch, rawMsg)
          expect(arbitraryResult.valid).toBe(validPattern.test(rawMsg))
        }
      }),
      { numRuns: 100 },
    )
  })
})

// ---------------------------------------------------------------------------
// Example-Based Unit Tests
// ---------------------------------------------------------------------------

describe('Example-based unit tests', () => {
  describe('isValidBranchName', () => {
    it.each(['main', 'staging'])('accepts protected branch "%s"', (branch) => {
      expect(isValidBranchName(branch)).toBe(true)
    })

    it('rejects old branch names that are no longer allowed', () => {
      expect(isValidBranchName('master')).toBe(false)
      expect(isValidBranchName('develop')).toBe(false)
    })

    it('rejects bare URM-<digits> branches (must be under feature/)', () => {
      expect(isValidBranchName('URM-123')).toBe(false)
    })

    it('accepts feature branches', () => {
      expect(isValidBranchName('feature/login-page')).toBe(true)
    })

    it('accepts ticket branches under feature/', () => {
      expect(isValidBranchName('feature/URM-123')).toBe(true)
      expect(isValidBranchName('feature/URM-4567-some-description')).toBe(true)
    })

    it('rejects invalid branch names', () => {
      expect(isValidBranchName('bugfix/something')).toBe(false)
      expect(isValidBranchName('random')).toBe(false)
      expect(isValidBranchName('')).toBe(false)
    })
  })

  describe('extractTicketId', () => {
    it('extracts ticket ID from feature/URM branch name', () => {
      expect(extractTicketId('feature/URM-123')).toBe('URM-123')
      expect(extractTicketId('feature/URM-123-some-feature')).toBe('URM-123')
    })

    it('returns null when no ticket ID is present', () => {
      expect(extractTicketId('feature/login')).toBeNull()
      expect(extractTicketId('main')).toBeNull()
    })
  })

  describe('isAutoCommit', () => {
    it('detects auto-commit prefixes', () => {
      expect(isAutoCommit("Merge branch 'main'")).toBe(true)
      expect(isAutoCommit('Revert "some commit"')).toBe(true)
      expect(isAutoCommit('Amend previous commit')).toBe(true)
      expect(isAutoCommit('fixup! some commit')).toBe(true)
      expect(isAutoCommit('squash! some commit')).toBe(true)
    })

    it('rejects non-auto-commit messages', () => {
      expect(isAutoCommit('URM-123: add feature')).toBe(false)
      expect(isAutoCommit('feature/login: add form')).toBe(false)
    })
  })

  describe('validateCommitMessage', () => {
    it('accepts URM-123: x on a feature/URM-123 branch', () => {
      const result = validateCommitMessage('feature/URM-123', 'URM-123: x')
      expect(result.valid).toBe(true)
    })

    it('rejects URM-123: (missing description) on a feature/URM-123 branch', () => {
      const result = validateCommitMessage('feature/URM-123', 'URM-123:')
      expect(result.valid).toBe(false)
      expect(result.error).toBeDefined()
    })

    it('rejects commits on invalid branch names', () => {
      const result = validateCommitMessage('invalid-branch', 'some message')
      expect(result.valid).toBe(false)
      expect(result.error).toContain('does not follow naming conventions')
    })
  })
})
