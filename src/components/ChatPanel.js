import React from 'react';
import ChatForm from "./ChatForm";
import ChatList from './ChatList';
import JsonApiResponseParser from '../utils/jsonApiResponseParser';
import { findChats, messageMarkAsRead } from '../services/chat';

const parseMessage = (label, args) => {
  const content = `[${new Date().toLocaleTimeString()}]${label}: ${JSON.stringify(args)}`;
  return content;
}

class ChatPanel extends React.PureComponent {
  componentDidMount() {
    this.handleSubscribeChannels();
  }

  handleSubscribeChannels = () => {
    const { batchSubscribe } = this.props;

    batchSubscribe([{
      channel: 'ChatSummaryChannel',
      onInitialized: (...args) => this.handleLogServerMessages('onInitialized', args),
      onConnected: (...args) => this.handleLogServerMessages('onConnected', args),
      onReceived: (...args) => this.handleChatSummaryReceived('onReceived', args),
      onDisconnected: (...args) => this.handleLogServerMessages('onDisconnected', args),
      onRejected: (...args) => this.handleLogServerMessages('onRejected', args),
    }, {
      channel: 'ChatMessageChannel',
      onInitialized: (...args) => this.handleLogServerMessages('onInitialized', args),
      onConnected: (...args) => this.handleLogServerMessages('onConnected', args),
      onReceived: (...args) => this.handleChatMessageReceived('onReceived', args),
      onDisconnected: (...args) => this.handleLogServerMessages('onDisconnected', args),
      onRejected: (...args) => this.handleLogServerMessages('onRejected', args),
    }, {
      channel: 'ChatListChannel',
      onInitialized: (...args) => this.handleLogServerMessages('onInitialized', args),
      onConnected: (...args) => this.handleChatListConnected('onConnected', args),
      onReceived: (...args) => this.handleChatListReceived('onReceived', args),
      onDisconnected: (...args) => this.handleLogServerMessages('onDisconnected', args),
      onRejected: (...args) => this.handleLogServerMessages('onRejected', args),
    }]);
  }

  handleChatSummaryReceived = (event, args) => {
    const { dispatch } = this.props;

    dispatch(
      'Chat/updateSummary',
      args,
    );

    this.handleLogServerMessages(event, args)
  }

  handleChatListConnected = (event, args) => {
    findChats();
    this.handleLogServerMessages(event, args);
  }

  handleChatMessageReceived = (event, args) => {
    const { dispatch, Chat: { currentChat } } = this.props;
    const payload = args[1] && args[1][0];

    if (payload && currentChat) {
      const record = JsonApiResponseParser(payload);

      if (currentChat.target.id === record.sender.id) {
        dispatch(
          'Chat/pushMessage',
          record,
        );

        messageMarkAsRead({
          chatId: currentChat.id,
        });
      }
    }

    this.handleLogServerMessages(event, args)
  }

  handleChatListReceived = (event, args) => {
    const { dispatch } = this.props;
    const payload = args[1] && args[1][0];
    if (payload) {
      const chatList = JsonApiResponseParser(payload);

      dispatch(
        'Chat/updateChatList',
        chatList,
      );
    }

    this.handleLogServerMessages(event, args)
  }

  handleLogServerMessages = (event, args) => {
    const { dispatch } = this.props;

    dispatch(
      'Server/pushMessage',
      parseMessage(event, args),
    );
  }

  render() {
    const { dispatch, Chat: { messages, chatList, summary, currentChat } } = this.props;

    return (
      <fieldset>
        <legend>Chat Panel</legend>
        <ChatList dataSource={chatList} extra={summary} dispatch={dispatch} currentChat={currentChat} />
        <div style={{ width: '100%', height: 5 }}></div>
        <ChatForm messages={messages} dispatch={dispatch} currentChat={currentChat} />
      </fieldset>
    );
  }
}

export default ChatPanel;
