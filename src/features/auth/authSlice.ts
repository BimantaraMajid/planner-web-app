import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { LoginRequest, LoginResponse } from "../../model/auth"
import { postLogin } from "./authAPI"
import { AxiosError } from "axios"

interface AuthState {
  isLogged: boolean
  error: string | null | undefined
  loading: boolean
}

const initialState: AuthState = {
  isLogged: false,
  error: undefined,
  loading: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLogged = false
      localStorage.removeItem("token")
      localStorage.removeItem("refreshToken")
    },
    checkToken(state) {
      const token = localStorage.getItem("token")
      if (token) {
        state.isLogged = true
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actionLogin.pending, (state) => {
        state.loading = true
      })
      .addCase(actionLogin.fulfilled, (state, action) => {
        state.loading = false
        localStorage.setItem("token", action.payload.data.token)
        localStorage.setItem("refreshToken", action.payload.data.refreshToken)
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

export const { logout, checkToken } = authSlice.actions
export const getLogged = (state: RootState) => state.auth.isLogged
export const getAuthLoading = (state: RootState) => state.auth.loading
export const getAuthError = (state: RootState) => state.auth.error

export default authSlice.reducer
