import React from 'react';
import ChatForm from "./ChatForm";
import ChatList from './ChatList';

const parseMessage = (label, args) => {
  const content = `[${new Date().toLocaleTimeString()}]${label}: ${JSON.stringify(args)}`;
  return content;
}

class ChatPanel extends React.PureComponent {
  componentDidMount() {
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
      onReceived: (...args) => this.handleLogServerMessages('onReceived', args),
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

  handleLogServerMessages = (event, args) => {
    const { dispatch } = this.props;

    dispatch(
      'Server/pushMessage',
      parseMessage(event, args),
    );
  }

  render() {
    const { Chat: { messages, summary } } = this.props;

    return (
      <fieldset>
        <legend>Chat Panel</legend>
        <ChatList messages={summary} />
        <div style={{ width: '100%', height: 5 }}></div>
        <ChatForm messages={messages} />
      </fieldset>
    );
  }
}

export default ChatPanel;
