import ApiManager from "../../app/apiManager"
import { getAllParams } from "../../model/request"

const API = ApiManager.getInstance()

export async function getPlans(params: getAllParams) {
  return API.get("/plans", params)
}
