#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const {
  commitMessageHelp,
  validateCommitBodyLines,
  validateCommitHeader,
} = require('./git-conventions.cjs')

const commitMsgFile = process.argv[2]

if (!commitMsgFile) {
  console.error('Usage: node scripts/validate-commit-message.mjs <commit-msg-file>')
  process.exit(1)
}

const raw = readFileSync(commitMsgFile, 'utf8')
const lines = raw.split(/\r?\n/)
const nonCommentLines = lines.filter(
  (line) => line.trim() !== '' && !line.startsWith('#'),
)

if (nonCommentLines.length === 0) {
  process.exit(0)
}

const [header, ...body] = nonCommentLines

const headerResult = validateCommitHeader(header)
if (!headerResult.ok) {
  console.error(headerResult.message)
  console.error('')
  console.error(commitMessageHelp())
  process.exit(1)
}

const bodyResult = validateCommitBodyLines(body)
if (!bodyResult.ok) {
  console.error(bodyResult.message)
  process.exit(1)
}

process.exit(0)
