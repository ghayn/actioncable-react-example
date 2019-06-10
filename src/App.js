import React from 'react';
import { ActionCableContextProvider, ActionCableContextConsumer } from './context/ActionCableContext';
import ChatPanel from './components/ChatPanel';
import ServerMessages from './components/ServerMessages';
import { StoreContextConsumer } from './context/StoreContext';
import global from "./global";
import Setting from './components/Setting';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.initialize(props);
  }

  initialize = ({ dispatch }) => {
    global.dispatch = dispatch;
  }

  render() {
    return (
      <ActionCableContextProvider>
        <Setting />
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
      </ActionCableContextProvider>
    );

  }
}

export default App;
