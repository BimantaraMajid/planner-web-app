import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { LoginRequest, LoginResponse } from "../../model/auth"
import { postLogin } from "./authAPI"
import { AxiosError } from "axios"

interface AuthState {
  isLogged: boolean
  user: any
  token: string | null
  error: string | null | undefined
  loading: boolean
}

const initialState: AuthState = {
  isLogged: false,
  user: null,
  token: null,
  error: null,
  loading: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLogged = false
      state.user = null
      state.token = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actionLogin.pending, (state) => {
        state.loading = true
      })
      .addCase(actionLogin.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.data.token
        state.user = action.payload.data.username
        state.isLogged = true
      })
      .addCase(actionLogin.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const actionLogin = createAsyncThunk(
  "auth/login",
  async (payload: LoginRequest) => {
    try {
      const response = await postLogin(payload)
      return response as LoginResponse
    } catch (error) {
      if (error instanceof AxiosError) {
        const response = error.response?.data as unknown as LoginResponse
        error.message = response.message
      }
      throw error
    }
  },
)

export const { logout } = authSlice.actions
export const getLogged = (state: RootState) => state.auth.isLogged
export const getAuthLoading = (state: RootState) => state.auth.loading
export const getAuthError = (state: RootState) => state.auth.error

export default authSlice.reducer
