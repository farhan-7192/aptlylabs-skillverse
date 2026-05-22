import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { toast } from 'sonner'

import { env } from '@/config/env'
import { captureError } from '@/lib/observability'
import { toAppHttpError } from '@/lib/httpError'
import { shouldRetryGet } from '@/lib/shouldRetryGet'
import { clearUser } from '@/redux/slice/user'

function resolveRequestUrl(args: string | FetchArgs): string {
  if (typeof args === 'string') return args
  return args.url
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: env.apiBaseUrl,
  credentials: 'include',
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json')
    return headers
  },
})

const baseQueryWithErrorHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const isGet =
    typeof args === 'string' ||
    !args.method ||
    args.method === 'GET' ||
    args.method === 'get'

  let result = await rawBaseQuery(args, api, extraOptions)

  if (result.error && isGet && shouldRetryGet(result.error)) {
    result = await rawBaseQuery(args, api, extraOptions)
  }

  if (result.error) {
    const mapped = toAppHttpError(result.error)
    const isSessionRequest = resolveRequestUrl(args).includes('auth/session')
    if (mapped.status === 401) {
      if (!isSessionRequest) {
        api.dispatch(clearUser())
      }
    } else {
      captureError(mapped, { url: resolveRequestUrl(args), status: mapped.status })
      toast.error(mapped.message, { duration: 4500 })
    }
  }

  return result
}

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Session'],
  endpoints: () => ({}),
})
