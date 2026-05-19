#!/usr/bin/env node
import { execSync } from 'node:child_process'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { branchNamingHelp, validateBranchName } = require('./git-conventions.cjs')

const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim()
const result = validateBranchName(branch)

if (result.ok) {
  process.exit(0)
}

console.error(result.message)
console.error('')
console.error(branchNamingHelp())
process.exit(1)
