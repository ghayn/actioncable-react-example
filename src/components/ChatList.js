import React from 'react';

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
      onReceived: (...args) => this.handleLogServerMessages('onReceived', args),
      onDisconnected: (...args) => this.handleLogServerMessages('onConnected', args),
      onRejected: (...args) => this.handleLogServerMessages('onRejected', args),
    }, {
      channel: 'ChatMessageChannel',
      onInitialized: (...args) => this.handleLogServerMessages('onInitialized', args),
      onConnected: (...args) => this.handleLogServerMessages('onConnected', args),
      onReceived: (...args) => this.handleLogServerMessages('onReceived', args),
      onDisconnected: (...args) => this.handleLogServerMessages('onConnected', args),
      onRejected: (...args) => this.handleLogServerMessages('onRejected', args),
    }]);
  }

  handleLogServerMessages = (event, args) => {
    const { dispatch } = this.props;

    dispatch(
      'Server/pushMessage',
      parseMessage(event, args),
    );
  }

  render() {
    return (
      <fieldset>
        <legend>ChatList</legend>
        <div style={{ borderStyle: 'solid', borderWidth: 2, width: '100%', minHeight: 200, boxSizing: 'border-box' }}></div>
        <div style={{ borderStyle: 'solid', borderWidth: 2, width: '100%', padding: 10, boxSizing: 'border-box' }}>
          <textarea style={{ width: '100%', border: 0, outline: 'none' }} rows={3} />
        </div>
        <button style={{ fontSize: '14px', float: 'right', marginTop: 5 }}>Submit</button>
      </fieldset>
    );
  }
}

export default ChatPanel;
