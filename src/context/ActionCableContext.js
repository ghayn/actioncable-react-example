import React, { PureComponent } from 'react';
import actioncable from 'actioncable';
import objectOmitKeys from '../utils/omit';
import { token, cableUrl } from "../config";

const ActionCableContext = React.createContext();

const ActionCableContextConsumer = ActionCableContext.Consumer;

const connectUri = `${cableUrl}?http_authorization=${token}`

const shelterFn = (fn, channel, args) => {
  if (fn) fn(channel, [...args]);
}

const createSubscription = (cable, { channel, onReceived, onInitialized, onConnected, onDisconnected, onRejected }) => {
  return cable.subscriptions.create(
    channel,
    {
      initialized: (...args) => shelterFn(onInitialized, channel, args),
      received: (...args) => shelterFn(onReceived, channel, args),
      connected: (...args) => shelterFn(onConnected, channel, args),
      disconnected: (...args) => shelterFn(onDisconnected, channel, args),
      rejected: (...args) => shelterFn(onRejected, channel, args),
    }
  )
}

class ActionCableContextProvider extends PureComponent {
  state = {
    cable: actioncable.createConsumer(connectUri),
    subscriptions: {},
  }

  componentWillUnmount() {
    this.disconnect();
  }

  subscribe = ({ channel, ...restPayload }) => {
    const { cable } = this.state;

    this.setState((prevState) => (
      {
        subscriptions: {
          ...prevState.subscriptions,
          [channel]: createSubscription(cable, { channel, ...restPayload }),
        }
      }
    ));
  }

  batchSubscribe = (batchPayload = []) => {
    const { cable } = this.state;

    const newSubscriptions = batchPayload.reduce(
      (result, currentPayload) => {
        return {
          ...result,
          [currentPayload.channel]: createSubscription(cable, currentPayload),
        };
      }, {}
    );

    this.setState((prevState) => (
      {
        subscriptions: {
          ...prevState.subscriptions,
          ...newSubscriptions,
        },
      }
    ));
  }

  unSubscribe = (channel) => {
    const { subscriptions } = this.state;
    subscriptions[channel].unsubscribe();
    this.setState({
      subscriptions: objectOmitKeys(subscriptions, channel),
    })
  }

  disconnect = () => {
    const { cable } = this.state;
    cable.disconnect();
    this.setState({
      cable: null,
    });
  }

  render() {
    return (
      <ActionCableContext.Provider
        value={{
          ...this.state,
          subscribe: this.subscribe,
          batchSubscribe: this.batchSubscribe,
          unSubscribe: this.unSubscribe,
        }}
      >
        {this.props.children}
      </ActionCableContext.Provider>
    );
  }
}

export {
  ActionCableContextConsumer,
  ActionCableContextProvider,
}

export default {
  Consumer: ActionCableContextConsumer,
  Provider: ActionCableContextProvider,
}
