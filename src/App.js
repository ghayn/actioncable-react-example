import React from 'react';
import { ActionCableContextProvider, ActionCableContextConsumer } from './context/ActionCableContext';
import ChatForm from './components/ChatPanel';
import ServerMessages from './components/ServerMessages';
import { StoreContextProvider, StoreContextConsumer } from './context/StoreContext';
import Setting from './components/Setting';

class App extends React.Component {
  render() {
    return (
      <StoreContextProvider>
        <ActionCableContextProvider>
          <Setting />
          <StoreContextConsumer>
            {
              ({ dispatch, Chat }) =>
                <ActionCableContextConsumer>
                  {
                    (actionCableContextProps) => <ChatForm dispatch={dispatch} Chat={Chat} {...actionCableContextProps} />
                  }
                </ActionCableContextConsumer>
            }
          </StoreContextConsumer>
          <StoreContextConsumer>
            {
              ({ Server: { messages } }) => <ServerMessages messages={messages} />
            }
          </StoreContextConsumer>
        </ActionCableContextProvider>
      </StoreContextProvider>
    );

  }
}

export default App;
