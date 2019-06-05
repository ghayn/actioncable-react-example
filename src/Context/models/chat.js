export default {
  namespace: 'Chat',
  state: {
    messages: [],
    summary: {},
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
      return {
        summary,
      };
    }
  }
};
