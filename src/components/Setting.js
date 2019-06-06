import React from 'react';
import { token, tokenKey } from "../config";

function persistTokenToLocalStorage(token) {
  localStorage.setItem(tokenKey, token);
  window.location.reload();
}

function clearToken() {
  localStorage.removeItem(tokenKey);
  window.location.reload();
}


class Setting extends React.PureComponent {
  state = {
    currentToken: token || '',
  };

  render() {
    const { currentToken } = this.state;

    return (
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
    );
  }
}

export default Setting;
