# Tasks

## Task List

- [x] 1. Install husky and lint-staged dependencies
  - [x] 1.1 Add `husky` as a root devDependency (pinned version)
  - [x] 1.2 Add `lint-staged` as a root devDependency (pinned version)
  - [x] 1.3 Run `pnpm install` to update `pnpm-lock.yaml`

- [x] 2. Configure package.json
  - [x] 2.1 Add `"prepare": "husky"` to the `scripts` section of root `package.json`
  - [x] 2.2 Add `lint-staged` configuration key to root `package.json` with globs:
    - `**/*.{js,jsx,ts,tsx}` → `["eslint --fix", "prettier --write"]`
    - `**/*.{json,yaml,yml,md}` → `["prettier --write"]`

- [x] 3. Initialise husky and create hook scripts
  - [x] 3.1 Run `pnpm exec husky init` (or `npx husky init`) to create the `.husky/` directory and install the git hook shims
  - [x] 3.2 Write `.husky/pre-commit` with:
    - NVM bootstrap snippet (`export NVM_DIR="$HOME/.nvm"` + conditional source)
    - `npx lint-staged`
    - `pnpm typecheck` (no `--skip-nx-cache`)
    - Ensure the file is executable (`chmod +x`)
  - [x] 3.3 Write `.husky/commit-msg` with:
    - NVM bootstrap snippet
    - Delegation to `tsx tooling/commit-conventions/src/validate-commit-msg.ts "$1"`
    - Ensure the file is executable (`chmod +x`)

- [x] 4. Remove old manual git hook scripts
  - [x] 4.1 Delete any non-sample files in `.git/hooks/` that were manually maintained (pre-commit, commit-msg without `.sample` extension) — these are replaced by husky shims

- [x] 5. Create `tooling/commit-conventions` NX package and write validation logic + tests
  - [x] 5.1 Scaffold the `tooling/commit-conventions` package following the same pattern as `tooling/image-indexer`:
    - `package.json` with `name: "@chalkboard/commit-conventions"`, `"private": true`, `"type": "module"`, `"main": "./src/index.ts"`, and `"exports": { ".": "./src/index.ts" }`
    - `tsconfig.json` extending `../../tsconfig.base.json` with `"composite": true`, `"outDir": "./dist"`, `"rootDir": "./src"`, and `"include": ["src"]`
    - `project.json` with `"name": "commit-conventions"`, `"projectType": "library"`, and a `typecheck` target using `nx:run-commands` with `tsc --noEmit`, `"cwd": "tooling/commit-conventions"`, `"cache": true`, and `"inputs": ["default", "^default", "{projectRoot}/tsconfig.json"]`
    - `eslint.config.mjs` importing from `@chalkboard/eslint-config-base` (same as `tooling/image-indexer/eslint.config.mjs`)
    - `src/index.ts` re-exporting everything from `src/validate.ts`
  - [x] 5.2 Write `tooling/commit-conventions/src/validate.ts` exporting pure TypeScript functions that mirror the shell regex logic:
    - `isValidBranchName(branch: string): boolean` — matches `^(main|master|staging|develop|feature\/.+|URM-[0-9]+.*)$`
    - `extractTicketId(branch: string): string | null` — extracts `URM-<digits>` from branch name
    - `isAutoCommit(message: string): boolean` — matches `^(Merge|Revert|Amend|fixup!|squash!)`
    - `validateCommitMessage(branch: string, message: string): { valid: boolean; error?: string }` — full validation returning structured result
  - [x] 5.3 Add `fast-check` as a devDependency in `tooling/commit-conventions/package.json` and add a `test` target to `project.json` using `nx:run-commands` with `vitest run`, `"cwd": "tooling/commit-conventions"`, `"cache": true`; also add `vitest` config (`vitest.config.ts`) in the package
  - [x] 5.3 Write property test for Property 1 (branch name validation):
    - _For any_ string, the validator accepts it iff it matches an allowed branch pattern
    - Tag: `Feature: commit-conventions, Property 1: branch name validation accepts all valid patterns and rejects all others`
    - Minimum 100 iterations
  - [x] 5.4 Write property test for Property 2 (auto-commit bypass):
    - _For any_ message starting with `Merge`, `Revert`, `Amend`, `fixup!`, or `squash!`, validation exits 0
    - Tag: `Feature: commit-conventions, Property 2: auto-commit prefix bypass`
    - Minimum 100 iterations
  - [x] 5.5 Write property test for Property 3 (ticket branch message validation):
    - _For any_ `URM-<digits>` branch and any commit message, accepts iff message matches `^URM-<digits>: .+`
    - Tag: `Feature: commit-conventions, Property 3: ticket branch commit message validation`
    - Minimum 100 iterations
  - [x] 5.6 Write property test for Property 4 (feature branch message validation):
    - _For any_ `feature/<name>` branch and any commit message, accepts iff message matches `^feature/<name>: .+`
    - Tag: `Feature: commit-conventions, Property 4: feature branch commit message validation`
    - Minimum 100 iterations
  - [x] 5.7 Write example-based unit tests:
    - Each protected branch name (`main`, `master`, `staging`, `develop`) is accepted
    - `URM-123: x` is accepted on a `URM-123` branch
    - `URM-123:` (missing description) is rejected on a `URM-123` branch

- [x] 6. Write smoke tests for hook script structure
  - [x] 6.1 Verify `package.json` contains `"prepare": "husky"` in scripts
  - [x] 6.2 Verify `package.json` contains `lint-staged` key with correct globs and commands
  - [x] 6.3 Verify `.husky/pre-commit` exists, contains NVM bootstrap, `npx lint-staged`, `pnpm typecheck` in order, and does NOT contain `--skip-nx-cache`
  - [x] 6.4 Verify `.husky/commit-msg` exists, contains NVM bootstrap, and uses `git symbolic-ref --short HEAD`
  - [x] 6.5 Verify NVM bootstrap uses the conditional form `[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"`

- [x] 7. Update README.md
  - [x] 7.1 Add a "Git Hooks" section to `README.md` covering:
    - Initial setup: `pnpm install` installs hooks automatically
    - Normal usage: hooks run transparently on every `git commit`
    - Bypass: `git commit --no-verify` or `HUSKY=0 git commit`
    - Branch naming convention: `main`, `master`, `staging`, `develop`, `feature/<name>`, `URM-<digits>`
    - Commit message format: `URM-<digits>: <description>` on ticket branches; `<branch-name>: <description>` on feature branches

- [x] 8. Verify end-to-end hook behaviour
  - [x] 8.1 Run `pnpm install` on a clean checkout and confirm `.git/hooks/pre-commit` and `.git/hooks/commit-msg` are installed as husky shims
  - [x] 8.2 Make a staged change and run `git commit` to confirm lint-staged and typecheck execute correctly
  - [x] 8.3 Attempt a commit on an invalid branch name and confirm the hook aborts with the expected error message
  - [x] 8.4 Attempt a commit with an invalid message on a ticket branch and confirm the hook aborts with the expected error message
  - [x] 8.5 Confirm `HUSKY=0 git commit` bypasses all hooks
