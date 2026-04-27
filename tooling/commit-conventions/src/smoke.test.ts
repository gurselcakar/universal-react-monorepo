import fs from 'node:fs'
import path from 'node:path'

import { describe, it, expect } from 'vitest'

// Repo root is three levels up from this file: src/ → commit-conventions/ → tooling/ → root
const REPO_ROOT = path.resolve(import.meta.dirname, '..', '..', '..')

describe('Smoke tests: hook script structure', () => {
  // ---------------------------------------------------------------------------
  // 6.1 — package.json contains "prepare": "husky" in scripts
  // ---------------------------------------------------------------------------
  describe('package.json scripts', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'package.json'), 'utf-8')) as {
      scripts: Record<string, string>
      'lint-staged': Record<string, string[]>
    }

    it('contains "prepare": "husky" in scripts', () => {
      expect(pkg.scripts).toBeDefined()
      expect(pkg.scripts.prepare).toBe('husky')
    })
  })

  // ---------------------------------------------------------------------------
  // 6.2 — package.json contains lint-staged key with correct globs and commands
  // ---------------------------------------------------------------------------
  describe('package.json lint-staged', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'package.json'), 'utf-8')) as {
      scripts: Record<string, string>
      'lint-staged': Record<string, string[]>
    }

    it('has a lint-staged configuration key', () => {
      expect(pkg['lint-staged']).toBeDefined()
    })

    it('runs eslint --fix and prettier --write on JS/TS files', () => {
      const jsTsGlob = pkg['lint-staged']['**/*.{js,jsx,ts,tsx}']
      expect(jsTsGlob).toEqual(['eslint --fix', 'prettier --write'])
    })

    it('runs prettier --write on JSON/YAML/MD files', () => {
      const otherGlob = pkg['lint-staged']['**/*.{json,yaml,yml,md}']
      expect(otherGlob).toEqual(['prettier --write'])
    })
  })

  // ---------------------------------------------------------------------------
  // 6.3 — .husky/pre-commit structure
  // ---------------------------------------------------------------------------
  describe('.husky/pre-commit', () => {
    const preCommitPath = path.join(REPO_ROOT, '.husky', 'pre-commit')
    const content = fs.readFileSync(preCommitPath, 'utf-8')

    it('exists on disk', () => {
      expect(fs.existsSync(preCommitPath)).toBe(true)
    })

    it('contains the NVM bootstrap snippet', () => {
      expect(content).toContain('export NVM_DIR="$HOME/.nvm"')
      expect(content).toContain('[ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"')
    })

    it('contains npx lint-staged', () => {
      expect(content).toContain('npx lint-staged')
    })

    it('contains pnpm typecheck', () => {
      expect(content).toContain('pnpm typecheck')
    })

    it('runs npx lint-staged before pnpm typecheck', () => {
      const lintStagedIndex = content.indexOf('npx lint-staged')
      const typecheckIndex = content.indexOf('pnpm typecheck')
      expect(lintStagedIndex).toBeGreaterThan(-1)
      expect(typecheckIndex).toBeGreaterThan(-1)
      expect(lintStagedIndex).toBeLessThan(typecheckIndex)
    })

    it('does NOT contain --skip-nx-cache', () => {
      expect(content).not.toContain('--skip-nx-cache')
    })
  })

  // ---------------------------------------------------------------------------
  // 6.4 — .husky/commit-msg structure
  // ---------------------------------------------------------------------------
  describe('.husky/commit-msg', () => {
    const commitMsgPath = path.join(REPO_ROOT, '.husky', 'commit-msg')
    const content = fs.readFileSync(commitMsgPath, 'utf-8')

    it('exists on disk', () => {
      expect(fs.existsSync(commitMsgPath)).toBe(true)
    })

    it('contains the NVM bootstrap snippet', () => {
      expect(content).toContain('export NVM_DIR="$HOME/.nvm"')
      expect(content).toContain('[ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"')
    })

    it('delegates to tsx validate-commit-msg.ts', () => {
      expect(content).toContain('npx tsx tooling/commit-conventions/src/validate-commit-msg.ts')
    })
  })

  // ---------------------------------------------------------------------------
  // 6.5 — NVM bootstrap conditional form
  // ---------------------------------------------------------------------------
  describe('NVM bootstrap conditional form', () => {
    const preCommitContent = fs.readFileSync(path.join(REPO_ROOT, '.husky', 'pre-commit'), 'utf-8')
    const commitMsgContent = fs.readFileSync(path.join(REPO_ROOT, '.husky', 'commit-msg'), 'utf-8')

    it('pre-commit uses the conditional NVM source form', () => {
      expect(preCommitContent).toContain('[ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"')
    })

    it('commit-msg uses the conditional NVM source form', () => {
      expect(commitMsgContent).toContain('[ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"')
    })
  })
})
