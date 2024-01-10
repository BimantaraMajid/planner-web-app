import { BaseResponse } from "./response"

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginData {
  id: number
  username: string
  email: string
  token: string
  refreshToken: string
}

export interface LoginResponse extends BaseResponse<LoginData> {}
