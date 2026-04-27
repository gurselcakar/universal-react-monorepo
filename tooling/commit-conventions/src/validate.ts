const BRANCH_PATTERN = /^(main|staging|feature\/.+)$/
const AUTO_COMMIT_PATTERN = /^(Merge|Revert|Amend|fixup!|squash!)/
const TICKET_PATTERN = /URM-[0-9]+/

/**
 * Checks whether a branch name follows the allowed naming conventions.
 *
 * Allowed patterns: main, staging, feature/<name> (including feature/URM-<digits>*)
 */
export const isValidBranchName = (branch: string): boolean => BRANCH_PATTERN.test(branch)

/**
 * Extracts the first URM-<digits> ticket ID from a branch name, or null if none is found.
 */
export const extractTicketId = (branch: string): string | null => {
  const match = branch.match(TICKET_PATTERN)
  return match ? match[0] : null
}

/**
 * Checks whether a commit message is an auto-generated commit (Merge, Revert, Amend, fixup!, squash!).
 */
export const isAutoCommit = (message: string): boolean => AUTO_COMMIT_PATTERN.test(message)

/**
 * Validates a commit message against the conventions for the given branch.
 *
 * Returns `{ valid: true }` when the message is acceptable, or
 * `{ valid: false, error: string }` with a human-readable explanation when it is not.
 */
export const validateCommitMessage = (
  branch: string,
  message: string,
): { valid: boolean; error?: string } => {
  // Branch name must be valid first
  if (!isValidBranchName(branch)) {
    return {
      valid: false,
      error: `Branch name '${branch}' does not follow naming conventions. Allowed: main, staging, feature/<name>`,
    }
  }

  // Auto-commits always pass
  if (isAutoCommit(message)) {
    return { valid: true }
  }

  // Ticket branch: message must start with URM-<digits>: <description>
  const ticket = extractTicketId(branch)
  if (ticket) {
    const pattern = new RegExp(`^${ticket}: .+`)
    if (!pattern.test(message)) {
      return {
        valid: false,
        error: `Commit message format error. Branch: ${branch}, Expected: ${ticket}: <description>, Actual: ${message}`,
      }
    }
    return { valid: true }
  }

  // Non-ticket branch (feature/ or protected): message must start with <branch>: <description>
  const escapedBranch = branch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const branchPattern = new RegExp(`^${escapedBranch}: .+`)
  if (!branchPattern.test(message)) {
    return {
      valid: false,
      error: `Commit message format error. Branch: ${branch}, Expected: ${branch}: <description>, Actual: ${message}`,
    }
  }

  return { valid: true }
}
