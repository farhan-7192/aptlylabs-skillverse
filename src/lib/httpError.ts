import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export type AppHttpError = {
  status?: number
  message: string
}

export function toAppHttpError(error: FetchBaseQueryError): AppHttpError {
  if (typeof error.status === 'number') {
    const data = error.data as { message?: string } | undefined
    return {
      status: error.status,
      message: data?.message ?? `Request failed (${error.status})`,
    }
  }
  if (error.status === 'FETCH_ERROR') {
    return { message: 'Network error' }
  }
  if (error.status === 'PARSING_ERROR') {
    return { message: 'Failed to parse response' }
  }
  if (error.status === 'CUSTOM_ERROR') {
    return { message: error.error ?? 'Request failed' }
  }
  return { message: 'Request failed' }
}

export function fromUnknownApiError(error: unknown): AppHttpError {
  if (isAppHttpError(error)) {
    return error
  }

  if (typeof error === 'object' && error !== null) {
    if ('error' in error && typeof (error as { error: unknown }).error === 'object') {
      return toAppHttpError((error as { error: FetchBaseQueryError }).error)
    }

    if ('status' in error) {
      return toAppHttpError(error as FetchBaseQueryError)
    }
  }

  return { message: 'Request failed' }
}

export function isAppHttpError(err: unknown): err is AppHttpError {
  return (
    typeof err === 'object' &&
    err !== null &&
    'message' in err &&
    typeof (err as AppHttpError).message === 'string'
  )
}
