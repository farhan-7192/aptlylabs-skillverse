import { z } from 'zod'

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().min(1, 'VITE_API_BASE_URL is required').pipe(z.url()),
  VITE_APP_NAME: z.string().min(1).optional(),
  VITE_ENABLE_ERROR_REPORTING: z
    .enum(['true', 'false', '1', '0'])
    .optional()
    .transform((value) => value === 'true' || value === '1'),
  VITE_SENTRY_DSN: z.union([z.string().url(), z.literal('')]).optional(),
  VITE_SENTRY_TRACES_SAMPLE_RATE: z
    .string()
    .optional()
    .transform((value) => {
      if (value === undefined || value === '') return 0.1
      const parsed = Number(value)
      if (Number.isNaN(parsed) || parsed < 0 || parsed > 1) {
        return 0.1
      }
      return parsed
    }),
})

export type AppEnv = {
  apiBaseUrl: string
  appName: string
  enableErrorReporting: boolean
  sentryDsn?: string
  sentryTracesSampleRate: number
}

export function formatEnvIssues(issues: z.ZodIssue[]): string {
  return issues
    .map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join('.') : 'env'
      return `  - ${path}: ${issue.message}`
    })
    .join('\n')
}

export function parseAppEnv(raw: Record<string, string | boolean | undefined>): AppEnv {
  const result = envSchema.safeParse(raw)

  if (!result.success) {
    throw new Error(
      `Invalid environment configuration:\n${formatEnvIssues(result.error.issues)}`,
    )
  }

  const sentryDsn = result.data.VITE_SENTRY_DSN?.trim()

  return {
    apiBaseUrl: result.data.VITE_API_BASE_URL,
    appName: result.data.VITE_APP_NAME ?? 'Aptlylabs React Starter Project',
    enableErrorReporting: result.data.VITE_ENABLE_ERROR_REPORTING,
    sentryDsn: sentryDsn || undefined,
    sentryTracesSampleRate: result.data.VITE_SENTRY_TRACES_SAMPLE_RATE,
  }
}

export const env = parseAppEnv(import.meta.env)
