/** @typedef {{ ok: true }} GitCheckOk */
/** @typedef {{ ok: false; message: string }} GitCheckFail */
/** @typedef {GitCheckOk | GitCheckFail} GitCheckResult */

/** Branch prefixes that require `{PROJECT_CODE}-{TICKET_NUMBER}-slug`. */
const BRANCH_TYPES_WITH_TICKET = ['feature', 'bugfix']

/** Branch prefixes that use `prefix/slug` only (no ticket). */
const BRANCH_TYPES_WITHOUT_TICKET = ['hotfix', 'cleanup', 'chore']

/** Commit tags that require `[Type: PROJECT-123]: subject`. */
const COMMIT_TYPES_WITH_TICKET = ['Feature', 'Bugfix']

/** Commit tags that use `[Type]: subject` only (no ticket). */
const COMMIT_TYPES_WITHOUT_TICKET = ['Hotfix', 'Cleanup', 'Chore']

/** Branches that skip naming rules (e.g. default trunk). */
const SKIP_BRANCH_NAMES = new Set(['main', 'master', 'develop'])

/** Uppercase project code + ticket number (e.g. THS3-001). */
const PROJECT_TICKET = '[A-Z][A-Z0-9]*-\\d+'
const SLUG = '[a-z0-9]+(?:-[a-z0-9]+)*'

const branchWithTicketRe = new RegExp(
  `^(${BRANCH_TYPES_WITH_TICKET.join('|')})/(${PROJECT_TICKET})-(${SLUG})$`,
)
const branchWithoutTicketRe = new RegExp(
  `^(${BRANCH_TYPES_WITHOUT_TICKET.join('|')})/(${SLUG})$`,
)

const commitWithTicketRe = new RegExp(
  `^\\[(${COMMIT_TYPES_WITH_TICKET.join('|')}): (${PROJECT_TICKET})\\]: .+`,
)
const commitWithoutTicketRe = new RegExp(
  `^\\[(${COMMIT_TYPES_WITHOUT_TICKET.join('|')})\\]: .+`,
)

const MERGE_COMMIT_RE = /^Merge /

/**
 * @param {string} branch
 * @returns {GitCheckResult}
 */
function validateBranchName(branch) {
  if (!branch || branch === 'HEAD') {
    return { ok: false, message: 'Could not determine the current branch name.' }
  }

  if (SKIP_BRANCH_NAMES.has(branch)) {
    return { ok: true }
  }

  if (branchWithTicketRe.test(branch) || branchWithoutTicketRe.test(branch)) {
    return { ok: true }
  }

  return {
    ok: false,
    message: `Invalid branch name "${branch}".`,
  }
}

/**
 * @param {string} header First line of the commit message (subject).
 * @returns {GitCheckResult}
 */
function validateCommitHeader(header) {
  const subject = header.trim()

  if (!subject || MERGE_COMMIT_RE.test(subject)) {
    return { ok: true }
  }

  if (commitWithTicketRe.test(subject) || commitWithoutTicketRe.test(subject)) {
    return { ok: true }
  }

  return {
    ok: false,
    message: `Invalid commit subject: "${subject}".`,
  }
}

/**
 * @param {string[]} bodyLines Lines after the subject (may be empty).
 * @param {number} [maxLength]
 * @returns {GitCheckResult}
 */
function validateCommitBodyLines(bodyLines, maxLength = 500) {
  for (const [index, line] of bodyLines.entries()) {
    if (line.length > maxLength) {
      return {
        ok: false,
        message: `Commit body line ${index + 1} exceeds ${maxLength} characters (${line.length}).`,
      }
    }
  }

  return { ok: true }
}

function branchNamingHelp() {
  return [
    'Branch naming:',
    `  With ticket:    {feature|bugfix}/{PROJECT_CODE}-{NUMBER}-short-title`,
    '                  (prefix and slug lowercase; ticket uppercase, e.g. feature/THS3-001-login-form)',
    `  Without ticket: {hotfix|cleanup|chore}/short-title`,
    '                  e.g. hotfix/prod-api-url',
    `  Exempt:         ${[...SKIP_BRANCH_NAMES].join(', ')}`,
  ].join('\n')
}

function commitMessageHelp() {
  return [
    'Commit subject (first line):',
    '  With ticket:    [Feature: THS3-001]: Short description',
    '                    [Bugfix: THS3-042]: Fix session handling',
    '  Without ticket: [Hotfix]: Patch production API URL',
    '                    [Cleanup]: Remove dead exports',
    '                    [Chore]: Bump dependencies',
    '  Merge commits are exempt.',
  ].join('\n')
}

module.exports = {
  BRANCH_TYPES_WITH_TICKET,
  BRANCH_TYPES_WITHOUT_TICKET,
  COMMIT_TYPES_WITH_TICKET,
  COMMIT_TYPES_WITHOUT_TICKET,
  SKIP_BRANCH_NAMES,
  validateBranchName,
  validateCommitHeader,
  validateCommitBodyLines,
  branchNamingHelp,
  commitMessageHelp,
}
