import { createSlice } from '@reduxjs/toolkit'

import type { User } from '@/@types/user'
import { authApi } from '@/redux/api/auth'

type UserState = {
  user: User | null
  bootstrapped: boolean
}

const initialState: UserState = {
  user: null,
  bootstrapped: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null
      state.bootstrapped = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.getSession.matchPending, (state) => {
        if (!state.user) {
          state.bootstrapped = false
        }
      })
      .addMatcher(authApi.endpoints.getSession.matchFulfilled, (state, { payload }) => {
        state.user = payload.user
        state.bootstrapped = true
      })
      .addMatcher(authApi.endpoints.getSession.matchRejected, (state) => {
        state.user = null
        state.bootstrapped = true
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.user = payload.user
        state.bootstrapped = true
      })
      .addMatcher(authApi.endpoints.signup.matchFulfilled, (state, { payload }) => {
        state.user = payload.user
        state.bootstrapped = true
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null
        state.bootstrapped = true
      })
  },
})

export const { clearUser } = userSlice.actions
export default userSlice.reducer

export const selectUser = (state: { user: UserState }) => state.user.user
export const selectIsAuthenticated = (state: { user: UserState }) =>
  state.user.user !== null
export const selectAuthBootstrapped = (state: { user: UserState }) =>
  state.user.bootstrapped
