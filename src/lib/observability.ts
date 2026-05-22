import { env } from '@/config/env'

export type ErrorContext = Record<string, unknown>

declare global {
  interface Window {
    __captureError?: (payload: {
      error: unknown
      context?: ErrorContext
      timestamp: string
    }) => void
  }
}

function serializeError(error: unknown): unknown {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    }
  }
  return error
}

export function captureError(error: unknown, context?: ErrorContext): void {
  const payload = {
    error: serializeError(error),
    context,
    timestamp: new Date().toISOString(),
  }

  const shouldLogToConsole =
    import.meta.env.MODE !== 'test' && (import.meta.env.DEV || env.enableErrorReporting)

  if (shouldLogToConsole) {
    console.error('[captureError]', payload)
  }

  if (!import.meta.env.DEV && (env.enableErrorReporting || window.__captureError)) {
    window.__captureError?.({
      error,
      context,
      timestamp: payload.timestamp,
    })
  }
}

export function getPublicErrorMessage(error: Error | null): string {
  if (!error) {
    return 'Unexpected application error.'
  }

  if (import.meta.env.DEV) {
    return error.message || 'Unexpected application error.'
  }

  return 'Something went wrong. Please try again.'
}
