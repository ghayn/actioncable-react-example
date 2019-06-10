export default {
  namespace: 'Chat',
  state: {
    messages: [],
    summary: {},
    chatList: [],
    currentChat: null,
  },
  reducers: {
    refreshMessages: (_, messages) => {
      return {
        messages: messages,
      }
    },
    pullMessages: ({ messages: prevMessages}, messages) => {
      return {
        messages: prevMessages.concat(messages),
      }
    },
    pushMessage: ({ messages: prevMessages }, message) => {
      return {
        messages: [
          message,
          ...prevMessages,
        ],
      };
    },
    updateChatList: ({ currentChat }, chatList) => {
      return {
        chatList: chatList.map(chat => {
          if (currentChat && currentChat.id === chat.id) {
            return {
              ...chat,
              unread_count: 0,
            }
          }

          return chat;
        }),
      };
    },
    updateSummary: (_, summary) => {
      return {
        summary,
      };
    },
    updateCurrentChat: (_, chat) => {
      return {
        currentChat: chat,
        messages: [],
      }
    },
    leaveChat: () => {
      return {
        messages: [],
        currentChat: null,
      }
    },
  }
};
