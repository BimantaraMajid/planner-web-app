import ApiManager from "../../app/apiManager"
import { LoginRequest } from "../../model/auth"
const API = ApiManager.getInstance()

export function postLogin(payload: LoginRequest) {
  return API.post("/auth/login", {
    username: payload.username,
    password: payload.password,
  })
}

export function setHeaderAuthorize(token: string) {
  API.setAuthorize(token)
}
