import request, { buildQueryString } from "../utils/apiRequest";
import { executeRequest } from "./execute";

export function findChats(params, reducerType = 'Chat/updateChatList') {
  executeRequest(
    () => request(`/chats${buildQueryString(params)}`),
    reducerType,
  )
}

export function findChatMessages({ chatId }, reducerType = 'Chat/refreshMessages') {
  executeRequest(
    () => request(`/chats/${chatId}/messages`),
    reducerType
  )
}

export function findChat({ chatId }) {
  executeRequest(
    () => request(`/chats/${chatId}`),
  )
}

export function deleteChat({ chatId }) {
  executeRequest(
    () => request(`/chats/${chatId}`, {
      method: 'DELETE',
    }),
  )
}

export function sendMessage({ chatId, ...restParams }, reducerType) {
  executeRequest(
    () => request(`/chats/${chatId}/messages`, {
      method: 'POST',
      body: restParams,
    }),
    reducerType
  )
}

export function messageMarkAsRead({ chatId }, reducerType) {
  executeRequest(
    () => request(`/chats/${chatId}/mark_as_read`, {
      method: 'PUT',
    }),
    reducerType
  )
}
