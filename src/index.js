import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StoreContextProvider, StoreContextConsumer } from './context/StoreContext';

ReactDOM.render(
  <StoreContextProvider>
    <StoreContextConsumer>
      {({ dispatch }) => <App dispatch={dispatch} />}
    </StoreContextConsumer>
  </StoreContextProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
