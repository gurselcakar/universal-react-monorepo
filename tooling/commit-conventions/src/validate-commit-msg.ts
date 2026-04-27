#!/usr/bin/env tsx
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

import { validateCommitMessage } from './validate'

const commitMsgFile = process.argv[2]
if (!commitMsgFile) {
  console.error('Usage: validate-commit-msg.ts <commit-msg-file>')
  process.exit(1)
}

const commitMsg = readFileSync(commitMsgFile, 'utf-8').trim()

let branch: string
try {
  branch = execSync('git symbolic-ref --short HEAD', { encoding: 'utf-8' }).trim()
} catch {
  branch = 'HEAD'
}

const result = validateCommitMessage(branch, commitMsg)

if (!result.valid) {
  console.error(`❌ ${result.error ?? ''}`)
  process.exit(1)
}

console.log('✅ Commit message format OK.')
process.exit(0)
