import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export function shouldRetryGet(error: FetchBaseQueryError): boolean {
  if (error.status === 'FETCH_ERROR' || error.status === 'PARSING_ERROR') {
    return true
  }
  if (typeof error.status === 'number') {
    return error.status >= 500 || error.status === 408 || error.status === 429
  }
  return false
}
