# Requirements Document

## Introduction

This feature migrates the existing shell-based git hooks (`pre-commit` and `commit-msg`) into a
managed, version-controlled setup using **husky** and **lint-staged**. The goal is to replace
ad-hoc shell scripts with a reproducible, NX-monorepo-aware configuration that:

- Runs ESLint and Prettier only on staged files via lint-staged
- Enforces branch naming conventions before a commit is accepted
- Validates commit message format based on the active branch name / ticket ID
- Works reliably from GUI editors (VS Code, etc.) where the shell `PATH` may not include nvm or
  the system Node.js

The existing behaviour of the shell hooks is preserved exactly; this is a migration, not a
redesign of the conventions themselves.

---

## Glossary

- **Hook_Manager**: The husky package responsible for installing and running git hooks from the
  repository's version-controlled `.husky/` directory.
- **Lint_Staged**: The lint-staged package that receives the list of staged files from git and
  dispatches them to configured linters/formatters.
- **Pre_Commit_Hook**: The git `pre-commit` hook script managed by husky, which invokes
  Lint_Staged and the typecheck target.
- **Commit_Msg_Hook**: The git `commit-msg` hook script managed by husky, which validates branch
  naming and commit message format.
- **Branch_Convention**: The rule that branch names must match one of the allowed patterns:
  `main`, `staging`, or `feature/<anything>` (including `feature/URM-<digits>*`).
- **Ticket_Branch**: A `feature/` branch whose name contains a Jira-style ticket ID matching
  `feature/URM-<digits>`.
- **Non_Ticket_Branch**: A `feature/` branch that does not contain a ticket ID.
- **Auto_Commit**: A commit whose message begins with `Merge`, `Revert`, `Amend`, `fixup!`, or
  `squash!`.
- **NVM_Bootstrap**: The shell snippet that sources `$NVM_DIR/nvm.sh` so that `node` and `pnpm`
  are available in GUI-editor environments.
- **Staged_Files**: Files listed by `git diff --cached --name-only --diff-filter=ACMR`.
- **Typecheck_Target**: The NX `typecheck` target run across all projects via `pnpm typecheck`.
- **NX_Cache**: NX's built-in computation cache. When inputs to a target (source files, tsconfig,
  env files) have not changed since the last run, NX replays the cached result instead of
  re-executing the compiler, making subsequent runs near-instant.

---

## Requirements

### Requirement 1: Hook Manager Installation

**User Story:** As a developer, I want husky to manage git hooks from a version-controlled
directory, so that every team member gets the same hooks automatically after `pnpm install`.

#### Acceptance Criteria

1. THE Hook_Manager SHALL store all hook scripts under a `.husky/` directory at the repository
   root.
2. WHEN a developer runs `pnpm install`, THE Hook_Manager SHALL install the git hooks into the
   local `.git/hooks/` directory without requiring a separate manual step.
3. THE Hook_Manager SHALL be configured via the root `package.json` `prepare` script so that
   hook installation is triggered automatically by the package manager lifecycle.
4. IF the `prepare` script is executed in a CI environment where git hooks are not desired, THEN
   THE Hook_Manager SHALL support being bypassed via the `HUSKY=0` environment variable.

---

### Requirement 2: Staged-File Linting and Formatting

**User Story:** As a developer, I want ESLint and Prettier to run automatically on staged files
before each commit, so that only clean, consistently formatted code enters the repository.

#### Acceptance Criteria

1. WHEN a commit is initiated, THE Lint_Staged SHALL run ESLint with `--fix` on all Staged_Files
   matching the glob `**/*.{js,jsx,ts,tsx}`.
2. WHEN a commit is initiated, THE Lint_Staged SHALL run Prettier with `--write` on all
   Staged_Files matching the glob `**/*.{js,jsx,ts,tsx,json,yaml,yml,md}`.
3. WHEN ESLint or Prettier modifies a file, THE Lint_Staged SHALL re-stage the modified file
   before the commit proceeds.
4. IF ESLint exits with a non-zero code after auto-fix, THEN THE Pre_Commit_Hook SHALL abort the
   commit and display the ESLint error output to the developer.
5. THE Lint_Staged configuration SHALL be defined in the root `package.json` under the
   `lint-staged` key so that it is co-located with other tooling configuration.
6. WHERE the NX monorepo contains projects in `apps/`, `packages/`, and `tooling/` subdirectories,
   THE Lint_Staged SHALL apply the same linting and formatting rules to Staged_Files in all
   subdirectories without per-project overrides.

---

### Requirement 3: TypeScript Type Checking on Commit

**User Story:** As a developer, I want TypeScript type checking to run on every commit, so that
type errors are caught before code reaches the remote repository.

#### Acceptance Criteria

1. WHEN a commit is initiated, THE Pre_Commit_Hook SHALL execute the Typecheck_Target via
   `pnpm typecheck` after Lint_Staged completes successfully.
2. IF the Typecheck_Target exits with a non-zero code, THEN THE Pre_Commit_Hook SHALL abort the
   commit and display the typecheck error output to the developer.
3. WHILE Lint_Staged is running, THE Pre_Commit_Hook SHALL NOT execute the Typecheck_Target
   concurrently, ensuring linting and formatting complete before type checking begins.
4. THE Pre_Commit_Hook SHALL invoke the Typecheck_Target without `--skip-nx-cache`, allowing
   NX_Cache to serve cached results when project inputs are unchanged, so that repeated commits
   on the same code are fast.
5. WHEN NX_Cache produces a cache hit for all projects, THE Typecheck_Target SHALL complete
   without re-invoking the TypeScript compiler, and the Pre_Commit_Hook SHALL treat this as a
   successful typecheck.

---

### Requirement 4: Branch Naming Convention Enforcement

**User Story:** As a developer, I want the commit hook to reject commits on branches that violate
the naming convention, so that all branches follow the agreed `main`, `staging`, or `feature/`
pattern.

#### Acceptance Criteria

1. WHEN a commit is attempted, THE Commit_Msg_Hook SHALL read the current branch name via
   `git symbolic-ref --short HEAD`.
2. WHEN the branch name does not match the pattern
   `^(main|staging|feature/.+)$`, THEN THE Commit_Msg_Hook SHALL exit
   with code 1 and print an error message that includes the violating branch name and a suggested
   rename command.
3. WHEN the branch name matches the allowed pattern, THE Commit_Msg_Hook SHALL proceed to commit
   message validation without printing a branch error.
4. THE Commit_Msg_Hook SHALL treat `main` and `staging` as protected
   branches that are exempt from the `feature/` prefix requirement.

---

### Requirement 5: Commit Message Format Validation

**User Story:** As a developer, I want commit messages to be automatically prefixed with the
ticket ID or branch name, so that every commit is traceable to a branch or ticket.

#### Acceptance Criteria

1. WHEN the commit message begins with `Merge`, `Revert`, `Amend`, `fixup!`, or `squash!`, THEN
   THE Commit_Msg_Hook SHALL skip all validation and exit with code 0.
2. WHEN the current branch is a Ticket_Branch, THE Commit_Msg_Hook SHALL require the commit
   message to match the pattern `^URM-<digits>: .+` where `<digits>` is the ticket number
   extracted from the branch name.
3. WHEN the current branch is a Non_Ticket_Branch, THE Commit_Msg_Hook SHALL require the commit
   message to match the pattern `^<branch-name>: .+` where `<branch-name>` is the full branch
   name.
4. IF the commit message does not match the required pattern, THEN THE Commit_Msg_Hook SHALL exit
   with code 1 and print an error message that includes the branch name, the expected format, the
   actual message, and a correctly formatted example.
5. WHEN the commit message matches the required pattern, THE Commit_Msg_Hook SHALL print a
   success confirmation and exit with code 0.

---

### Requirement 6: GUI Editor PATH Compatibility

**User Story:** As a developer using VS Code or another GUI editor, I want git hooks to locate
`node` and `pnpm` correctly, so that hooks do not fail silently due to a missing PATH.

#### Acceptance Criteria

1. THE Pre_Commit_Hook SHALL source the NVM_Bootstrap snippet
   (`[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"`) before invoking any Node.js or pnpm
   commands.
2. THE Commit_Msg_Hook SHALL source the NVM_Bootstrap snippet before invoking any Node.js or
   pnpm commands.
3. WHEN `NVM_DIR` is not set or the nvm script is absent, THE Hook_Manager SHALL continue hook
   execution without error, relying on whatever `node` and `pnpm` are available on the system
   PATH.
4. WHERE a developer's environment uses a Node.js version manager other than nvm (e.g., fnm,
   volta), THE hook scripts SHALL remain functional provided that `node` and `pnpm` are on the
   system PATH at hook execution time.

---

### Requirement 7: Developer Experience and Bypass

**User Story:** As a developer, I want a documented way to bypass hooks in exceptional
circumstances, so that I am not blocked when I need to commit work-in-progress or emergency
fixes.

#### Acceptance Criteria

1. THE Hook_Manager SHALL support the standard `git commit --no-verify` flag to bypass all hooks
   for a single commit.
2. THE Pre_Commit_Hook SHALL exit with code 0 and skip all checks WHEN the `HUSKY=0` environment
   variable is set to `0`.
3. THE Hook_Manager configuration SHALL be documented in the repository `README.md` with
   instructions covering: initial setup, normal usage, and the bypass mechanism.
