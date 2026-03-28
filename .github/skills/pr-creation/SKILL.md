---
name: pr-creation
description: Guide for preparing and creating a pull request. USE WHEN the user wants to create a PR, open a pull request, submit a PR, prepare code for review, or says "ready for review". Runs format, lint, typecheck, and tests before opening the PR.
---

# PR Creation

This skill guides you through preparing and submitting a pull request. All quality checks must pass before the PR is opened.

This workspace uses **pnpm** and **Nx**. Prefix all Nx commands with `pnpm exec nx ...`.

---

## Steps

### 1. Discover Available Targets

Confirm the standard targets exist before running them:

```bash
pnpm exec nx show projects --json
```

The expected targets in this workspace are `lint`, `typecheck`, `test`, and `build`. If a target is missing from some projects, skip it only for those projects — do not skip it globally.

---

### 2. Format Code

Auto-fix formatting across all files:

```bash
pnpm exec nx format:write
```

---

### 3. Fix Lint Issues

Run lint with auto-fix across all projects (results are Nx-cached — only changed projects re-run):

```bash
pnpm exec nx run-many -t lint --configuration=fix
```

If lint errors remain that cannot be auto-fixed, **stop and report** the specific errors (file path + line number) to the user before continuing.

---

### 4. TypeCheck

Run TypeScript type checking across all projects:

```bash
pnpm exec nx run-many -t typecheck
```

Fix all type errors before proceeding. If a type error is in generated or third-party code, report it to the user.

---

### 5. Run Tests

Run all tests across the workspace:

```bash
pnpm exec nx run-many -t test
```

If tests fail, investigate and fix them. If a failure is pre-existing and unrelated to your changes, call it out explicitly — do not silently skip.

---

### 6. Build

Run the build to catch bundler or emit errors. This matches what CI runs:

```bash
pnpm exec nx run-many -t build
```

Build results are Nx-cached, so only projects with changes will rebuild.

---

### 7. Stage Changed Files Safely

**Never use `git add -A` or `git add .`** — these risk committing the user's unrelated work-in-progress or secrets.

Instead, review changes and stage named files explicitly:

```bash
# Review what changed (includes format/lint auto-fixes)
git status --short
git diff --name-only

# Stage specific files only
git add path/to/file1 path/to/file2
```

Commit with a [Conventional Commits](https://www.conventionalcommits.org/) message:

```bash
git commit -m "feat: describe your change here"
```

Common prefixes: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `test:`.

---

### 8. Fill in the PR Template

This repository has a PR template at `.github/pull_request_template.md`. Read it, then populate **every section**:

| Section               | What to write                                                               |
| --------------------- | --------------------------------------------------------------------------- |
| **Summary**           | One or two sentences: what the PR does and why                              |
| **Type of Change**    | Check all boxes that apply                                                  |
| **Changes Made**      | Bullet list of key implementation details                                   |
| **Affected Projects** | Check every app/package with changed files                                  |
| **Testing**           | How the changes were tested (unit tests, manual testing)                    |
| **Checklist**         | Mark each item — steps 2–6 above cover format, lint, typecheck, test, build |

---

### 9. Create the PR

**Option A — `gh` CLI (preferred):**

```bash
gh pr create \
  --title "feat: your PR title here" \
  --base main \
  --body "$(cat .github/pull_request_template.md)"
```

Replace the title and base branch as appropriate. If you want to edit the body interactively, use `--fill` instead and edit in the editor.

**Option B — MCP GitHub tools (if available):**

Use `mcp_github_create_pull_request` with:

- `title`: conventional commit-style title
- `body`: the populated PR template content
- `base`: `main` (or the target branch)
- `head`: the current branch (`git branch --show-current`)

---

## Troubleshooting

### Format/lint auto-fixes create unexpected diffs

Run `git diff` after each fix step to review what changed. If something looks wrong, commit the intentional code change first, then commit the auto-fix separately so the history stays readable.

### Build fails in an unrelated project

Nx caching means only changed projects rebuild. If a previously-passing project now fails, it's likely a broken import or type caused by your changes — check the dependency graph:

```bash
pnpm exec nx graph
```

### Tests fail on CI but pass locally

Check whether the test uses a fixed seed, file system, or environment variable. The CI workflow is at `.github/workflows/ci.yml` — compare its environment with your local setup.
