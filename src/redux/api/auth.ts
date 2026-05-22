import type { AuthCredentials, SignupPayload } from '@/@types/auth'
import type { User } from '@/@types/user'

import { baseApi } from '@/redux/api/baseApi'

export type SessionResponse = {
  user: User | null
}

export type ForgotPasswordResponse = {
  ok: boolean
  sentTo: string
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSession: build.query<SessionResponse, void>({
      query: () => 'auth/session',
      providesTags: ['Session'],
    }),
    login: build.mutation<SessionResponse, AuthCredentials>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_credentials, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) =>
            dispatch(authApi.util.upsertQueryData('getSession', undefined, data)),
          )
          .catch(() => undefined)
      },
    }),
    signup: build.mutation<SessionResponse, SignupPayload>({
      query: (body) => ({
        url: 'auth/signup',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_payload, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) =>
            dispatch(authApi.util.upsertQueryData('getSession', undefined, data)),
          )
          .catch(() => undefined)
      },
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      transformResponse: () => undefined,
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            authApi.util.updateQueryData('getSession', undefined, (draft) => {
              draft.user = null
            }),
          )
        } catch {
          return
        }
      },
    }),
    forgotPassword: build.mutation<ForgotPasswordResponse, { email: string }>({
      query: (body) => ({
        url: 'auth/forgot',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetSessionQuery,
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
} = authApi
