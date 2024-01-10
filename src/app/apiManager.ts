import axios, { Axios } from "axios"

class ApiManager {
  private static instance: ApiManager
  private axiosInstance: Axios

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: 10000,
    })
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

  // Add other methods like put, delete as per your requirement
}

export default ApiManager
