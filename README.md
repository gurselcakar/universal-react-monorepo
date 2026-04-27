# Universal React Monorepo

Build React components once, run on web, iOS, and Android. A Turborepo + NativeWind monorepo template with shared UI.

![Demo](./universal-react-monorepo-demo.png)

> **New to monorepos?** Follow the [step-by-step guide](https://www.gurselcakar.com/monorepo) that built this template.

## Getting Started

**Prerequisites:** Node.js 18+, pnpm 10+, and optionally Xcode/Android Studio for mobile.

```bash
git clone https://github.com/gurselcakar/universal-react-monorepo.git
cd universal-react-monorepo
pnpm install
pnpm dev              # Start all apps
```

Run individually:

```bash
pnpm --filter web dev       # Next.js → localhost:3000
pnpm --filter ui-demo dev  # Vite → localhost:5173
pnpm --filter mobile dev    # Expo Metro bundler
```

Other commands: `pnpm build`, `pnpm lint`, `pnpm typecheck`

## Tech Stack

| Layer     | Technology                             |
| --------- | -------------------------------------- |
| Web       | Next.js 16 or Vite + TanStack Router   |
| Mobile    | Expo SDK 54 (React Native)             |
| Shared UI | React Native + NativeWind              |
| Build     | Turborepo, pnpm workspaces, TypeScript |

Components in `packages/shared-frontend/` are written once with React Native + NativeWind. On web, `react-native-web` renders them as HTML. On mobile, Expo renders them natively.

## Project Structure

```
├── apps/
│   ├── mobile/     # Expo React Native app
│   ├── web/        # Next.js web app
│   └── ui-demo/    # Vite web app (alternative)
├── packages/
│   └── ui/         # Shared component library
└── turbo.json      # Turborepo config
```

### Choosing a Web Framework

Both `web` (Next.js) and `ui-demo` (Vite + TanStack Router) are included. Remove the one you don't need:

**Keep Next.js only:**

```bash
rm -rf apps/ui-demo
pnpm install
```

**Keep Vite only:**

```bash
rm -rf apps/web
mv apps/ui-demo apps/web
# Update "name" in apps/web/package.json from "ui-demo" to "web"
pnpm install
```

## Git Hooks

This repository uses [husky](https://typicode.github.io/husky/) to enforce code quality and commit conventions via git hooks.

### Setup

Hooks are installed automatically when you run:

```bash
pnpm install
```

No additional setup is required.

### Usage

Hooks run transparently on every `git commit`:

1. **Pre-commit** — runs ESLint and Prettier on staged files via lint-staged, then runs `pnpm typecheck`.
2. **Commit-msg** — validates the branch name and commit message format.

### Bypass

In exceptional cases (WIP commits, emergency fixes), you can skip hooks:

```bash
git commit --no-verify          # skip all hooks for a single commit
HUSKY=0 git commit              # disable husky entirely (useful in CI)
```

### Branch Naming Convention

Branch names must match one of the following patterns:

| Pattern                 | Example                 |
| ----------------------- | ----------------------- |
| `main`                  | `main`                  |
| `staging`               | `staging`               |
| `feature/<name>`        | `feature/login-page`    |
| `feature/URM-<digits>*` | `feature/URM-123-login` |

Commits on branches that don't follow this convention will be rejected.

### Commit Message Format

The required format depends on the branch type:

- **Ticket branches** (`feature/URM-<digits>*`): `URM-<digits>: <description>`
  ```
  URM-123: add login form validation
  ```
- **Feature branches** (`feature/<name>`): `<branch-name>: <description>`
  ```
  feature/login-page: add form validation
  ```

Messages starting with `Merge`, `Revert`, `Amend`, `fixup!`, or `squash!` are accepted automatically.

## Author

Built by [Gürsel Çakar](https://x.com/gurselcakar). Check out my games: [Hukora](https://hukora.com) and [Arithmego](https://arithmego.com).
