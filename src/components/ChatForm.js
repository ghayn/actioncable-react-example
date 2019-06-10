import React from 'react';
import { sendMessage } from "../services/chat";

class ChatForm extends React.PureComponent {
  state = {
    content: '',
  }

  handleSendMessage = () => {
    const { currentChat } = this.props;
    const { content } = this.state;

    sendMessage({
      chatId: currentChat.id,
      chat_message: {
        content: content,
        content_type: 'text',
      },
    }, 'Chat/pushMessage');

    this.setState({
      content: '',
    });
  }

  renderMessages = (messages) => {
    const { currentChat } = this.props;
    return messages.map(message => {
      return <li
        key={message.id}
        style={{ float: currentChat.owner.id === message.sender.id ? 'right' : 'left', clear: 'both' }}
      >
        {message.content} [{message.created_at}]
      </li>
     });
  }

  render() {
    const { currentChat, messages } = this.props;
    const { content } = this.state;
    return (
      <>
        <div style={{ borderStyle: 'solid', borderWidth: 2, width: '100%', height: 350, boxSizing: 'border-box', padding: 15, overflowY: 'scroll' }}>
          <ul>
            {this.renderMessages(messages)}
          </ul>
        </div>
        <div style={{ borderStyle: 'solid', borderWidth: 2, width: '100%', padding: 10, boxSizing: 'border-box' }}>
          <textarea
            style={{ width: '100%', border: 0, outline: 'none', resize: 'none', overflowY: 'scroll' }}
            rows={3}
            value={content}
            onChange={({ target: { value } }) => { this.setState({ content: value }) }} />
        </div>
        <button
          style={{ fontSize: '14px', float: 'right', marginTop: 5 }}
          disabled={!currentChat}
          onClick={this.handleSendMessage}
        >
          Submit
        </button>
      </>
    );
  }
}

export default ChatForm;
