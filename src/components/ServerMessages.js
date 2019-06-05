import React, { useState } from 'react';

const ServerMessages = ({ messages }) => {
  const [serverMessageVisible, setSeverMessageVisible] = useState(true);
  return (
    <fieldset>
      <legend>Server Messages</legend>
      <input
        type="checkbox"
        onChange={() => setSeverMessageVisible(!serverMessageVisible)}
        checked={serverMessageVisible} /><span>Show Server Messages</span>
      {
        serverMessageVisible &&
        <ul>
          {messages.map((message, index) => {
            return <li key={index}>{message}</li>
          })}
        </ul>
      }
    </fieldset>
  );
}

export default ServerMessages;
