import request from "./request";
import { stringify } from "qs";
import { apiUrl, token } from "../config";

export default function ApiRequest(resource, options = {}) {
  return request(`${apiUrl}${resource}`, {
    headers: {
      'Authorization': token,
      ...options.headers,
    },
    ...options,
  });
}

export const buildQueryString = (params) => {
  if (params) return `?${stringify(params)}`
  return "";
}
