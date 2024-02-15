import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { LoginRequest, LoginResponse } from "../../model/auth"
import { postLogin, setHeaderAuthorize } from "./authAPI"
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
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
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
      const response: LoginResponse = await postLogin(payload)
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("refreshToken", response.data.refreshToken)
      setHeaderAuthorize(response.data.token)

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
export const setAuthError = authSlice.actions.setError
export const getLogged = (state: RootState) => state.auth.isLogged
export const getAuthLoading = (state: RootState) => state.auth.loading
export const getAuthError = (state: RootState) => state.auth.error

export default authSlice.reducer
