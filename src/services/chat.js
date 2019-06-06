import request, { buildQueryString } from "../utils/apiRequest";

export const findAllChats = (params) => {
  request(`/chats${buildQueryString(params)}`)
}
