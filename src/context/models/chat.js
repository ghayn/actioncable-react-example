export default {
  namespace: 'Chat',
  state: {
    messages: [],
    summary: [],
    chatList: [],
    currentChat: null,
  },
  reducers: {
    updateMessages: (_, messages) => {
      return {
        messages: messages,
      }
    },
    pushMessages: ({ messages: prevMessages }, message) => {
      return {
        messages: [
          ...prevMessages,
          message,
        ],
      };
    },
    updateSummary: (_, summary) => {
      console.log(summary);

      return {
        summary,
      };
    }
  }
};
