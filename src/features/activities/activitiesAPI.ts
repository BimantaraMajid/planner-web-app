import ApiManager from "../../app/apiManager"
import { getAllParams } from "../../model/request"

const API = ApiManager.getInstance()

export function getActivities(params: getAllParams) {
  return API.get("/activities", params)
}
