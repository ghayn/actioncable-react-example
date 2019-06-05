export default {
  namespace: 'Server',
  state: {
    messages: [],
  },
  reducers: {
    updateMessages: (_, messages) => {
      return {
        messages: messages,
      }
    },
    pushMessage: ({ messages: prevMessages }, message) => {
      return {
        messages: [
          ...prevMessages,
          message,
        ],
      };
    },
  }
};
