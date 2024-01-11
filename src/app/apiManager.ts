import axios, { AxiosInstance } from "axios"
import { logout } from "../features/auth/authSlice"
import { store } from "./store"

class ApiManager {
  private static instance: ApiManager
  private axiosInstance: AxiosInstance
  private refreshAttempt: number = 0

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      timeout: 10000,
    })

    // Add interceptor to handle token refresh
    this.axiosInstance.interceptors.response.use(undefined, async (error) => {
      if (error.config && error.response && error.response.status === 401) {
        const refreshToken = localStorage.getItem("refreshToken")
        if (refreshToken && this.refreshAttempt < 2) {
          this.refreshAttempt++

          const newToken = await this.refreshAccessToken(refreshToken)
          localStorage.setItem("token", newToken)

          this.setHeader("Authorization", `Bearer ${newToken}`)
          error.config.headers["Authorization"] = `Bearer ${newToken}`

          return this.axiosInstance(error.config)
        } else {
          store.dispatch(logout())
        }
      }
      return Promise.reject(error)
    })
  }

  setHeader(name: string, value: string) {
    this.axiosInstance.defaults.headers.common[name] = value
  }

  private async refreshAccessToken(refreshToken: string) {
    const response = await this.axiosInstance.post("/auth/refresh", {
      refreshToken,
    })
    if (response.data) {
      return response.data?.data?.token
    }
    return ""
  }

  public static getInstance(): ApiManager {
    if (!ApiManager.instance) {
      ApiManager.instance = new ApiManager()
    }
    return ApiManager.instance
  }

  public async get(endpoint: string, params?: any) {
    const response = await this.axiosInstance.get(endpoint, { params })
    return response.data
  }

  public async post(endpoint: string, data?: any) {
    const response = await this.axiosInstance.post(endpoint, data)
    return response.data
  }

  public async put(endpoint: string, data?: any) {
    const response = await this.axiosInstance.put(endpoint, data)
    return response.data
  }

  public async patch(endpoint: string, data?: any) {
    const response = await this.axiosInstance.patch(endpoint, data)
    return response.data
  }

  public async delete(endpoint: string) {
    const response = await this.axiosInstance.delete(endpoint)
    return response.data
  }
}

export default ApiManager
