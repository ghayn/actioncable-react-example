import React from 'react';
import { findChats, findChatMessages, messageMarkAsRead, deleteChat } from "../services/chat";

const ChatCard = ({ chat: { id, title, last_read_at, unread_count }, onChat, onDelete, isCurrent }) => (
  <div style={{ margin: 5, padding: 5, backgroundColor: isCurrent ? 'green' : 'grey', border: 'solid' }}>
    {`[${id}]${title}, last read: ${last_read_at} unread: [${unread_count || 0}] `}
    <button onClick={onChat}>chat</button>
    <button onClick={onDelete}>delete</button>
  </div>
)

class ChatList extends React.PureComponent {
  handleChangeCurrentChat = (chat) => {
    const { dispatch } = this.props;

    dispatch(
      'Chat/updateCurrentChat',
      chat,
    )

    messageMarkAsRead({ chatId: chat.id });
    findChatMessages({ chatId: chat.id });
  }

  handleDeleteChat = chat => {
    deleteChat({
      chatId: chat.id,
    });
  }

  renderChats = () => {
    const { dataSource, currentChat } = this.props;

    return dataSource.map((chat) => (
      <li key={chat.id}>
        <ChatCard
          onChat={() => this.handleChangeCurrentChat(chat)}
          onDelete={()=> this.handleDeleteChat(chat)}
          chat={chat}
          isCurrent={currentChat && chat.id === currentChat.id}
        />
      </li>
    ));
  }

  render() {
    return (
      <fieldset style={{ minHeight: 80, boxSizing: 'border-box', borderStyle: 'solid', margin: 0 }}>
        <legend>Chat List</legend>
        <button onClick={() => findChats()}>Refresh</button>
        <ul>
          {this.renderChats()}
        </ul>
      </fieldset>
    );
  }
}

export default ChatList;
