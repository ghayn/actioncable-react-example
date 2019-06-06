import React from 'react';

class Message extends React.PureComponent {
  state = {
    content: '',
  }

  handleSendMessage = () => {

  }

  render() {
    const { content } = this.state;
    return (
      <>
        <div style={{ borderStyle: 'solid', borderWidth: 2, width: '100%', minHeight: 200, boxSizing: 'border-box' }}></div>
        <div style={{ borderStyle: 'solid', borderWidth: 2, width: '100%', padding: 10, boxSizing: 'border-box' }}>
          <textarea
            style={{ width: '100%', border: 0, outline: 'none', resize: 'none', overflowY: 'scroll' }}
            rows={3}
            value={content}
            onChange={({ target: { value } }) => { this.setState({ content: value }) }} />
        </div>
        <button style={{ fontSize: '14px', float: 'right', marginTop: 5 }}>Submit</button>
      </>
    );
  }
}

export default Message;
