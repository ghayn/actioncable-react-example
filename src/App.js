import React from 'react';
import { ActionCableContextProvider, ActionCableContextConsumer } from './context/ActionCableContext';
import ChatPanel from './components/ChatList';
import ServerMessages from './components/ServerMessages';
import { StoreContextProvider, StoreContextConsumer } from './context/StoreContext';

const TOKEN_KEY = "token";
const token = localStorage.getItem(TOKEN_KEY);//"96d4eac5f39a90d1df02c4f9408ad835%7CtsLJ9F1NHG1muFntWsmP+UbvwMl3Mpd1Wtzm4zR3d7m/uNnn2OkYyn4FBX/uTJpgm7QsYcC793sBY47vVv40Gg=="

const connectUri = `http://admin.meilala_mall.127-0-0-1.w.nip.ink/cable?http_authorization_token=${token}`

function persistTokenToLocalStorage(token) {
  localStorage.setItem(TOKEN_KEY, token);
  window.location.reload();
}

function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  window.location.reload();
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentToken: token || '',
    };
  }

  render() {
    const { currentToken } = this.state;

    return (
      <StoreContextProvider>
        <ActionCableContextProvider url={connectUri}>
          <div>
            <fieldset>
              <legend>Auth Token</legend>
              <input
                value={currentToken}
                style={{ width: '100%' }}
                onChange={({ target: { value } }) => { this.setState({ currentToken: value }) }}>
              </input>
              <br />
              <button onClick={() => { persistTokenToLocalStorage(currentToken) }} style={{ fontSize: '14px', margin: 5 }}>Update</button>
              <button onClick={() => { clearToken() }} style={{ fontSize: '14px', margin: 5 }}>Clear</button>
            </fieldset>
            <StoreContextConsumer>
              {
                ({ dispatch, Chat }) =>
                  <ActionCableContextConsumer>
                    {
                      (actionCableContextProps) => <ChatPanel dispatch={dispatch} Chat={Chat} {...actionCableContextProps} />
                    }
                  </ActionCableContextConsumer>
              }
            </StoreContextConsumer>
            <StoreContextConsumer>
              {
                ({ Server: { messages } }) => <ServerMessages messages={messages} />
              }
            </StoreContextConsumer>
          </div>
        </ActionCableContextProvider>
      </StoreContextProvider>
    );

  }
}

export default App;
