import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react'

import type { AuthCredentials, SignupPayload } from '@/@types/auth'
import type { User } from '@/@types/user'
import { fromUnknownApiError } from '@/lib/httpError'
import {
  useGetSessionQuery,
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
} from '@/redux/api/auth'
import {
  selectAuthBootstrapped,
  selectIsAuthenticated,
  selectUser,
} from '@/redux/slice/user'
import { useAppSelector } from '@/redux/store'

type AuthContextValue = {
  user: User | null
  isAuthenticated: boolean
  isBootstrapping: boolean
  login: (credentials: AuthCredentials) => Promise<void>
  signup: (payload: SignupPayload) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  useGetSessionQuery()
  const user = useAppSelector(selectUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const bootstrapped = useAppSelector(selectAuthBootstrapped)
  const [loginMutation] = useLoginMutation()
  const [signupMutation] = useSignupMutation()
  const [logoutMutation] = useLogoutMutation()

  const login = useCallback(
    async (credentials: AuthCredentials) => {
      const result = await loginMutation(credentials)
      if (result.error) {
        throw fromUnknownApiError(result.error)
      }
    },
    [loginMutation],
  )

  const signup = useCallback(
    async (payload: SignupPayload) => {
      const result = await signupMutation(payload)
      if (result.error) {
        throw fromUnknownApiError(result.error)
      }
    },
    [signupMutation],
  )

  const logout = useCallback(async () => {
    const result = await logoutMutation()
    if (result.error) {
      throw fromUnknownApiError(result.error)
    }
  }, [logoutMutation])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated,
      isBootstrapping: !bootstrapped,
      login,
      signup,
      logout,
    }),
    [user, isAuthenticated, bootstrapped, login, signup, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
