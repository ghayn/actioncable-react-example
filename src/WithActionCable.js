import React from 'react';
import actioncable from 'actioncable';
import PropTypes from 'prop-types';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function omitObjectKeys(object, keys = []) {
  const result = [];

  Object.keys(object)
    .filter(objKey => !keys.includes(objKey))
    .forEach(objKey => {
      result[objKey] = object[objKey];
    })

  return result;
}

function withActionCable({ url }) {
  return (WrappedComponent) => {
    class WithActionCable extends React.Component {
      static propTypes = {
        url: PropTypes.string,
      };

      cable = actioncable.createConsumer(url);

      componentWillUnmount() {
        this.cable && this.cable.disconnect();
      }

      render() {
        return <WrappedComponent {...omitObjectKeys(this.props, ['url'])} cable={this.cable}/>
      }
    }
    WithActionCable.displayName = `withActionCable(${getDisplayName(WrappedComponent)})`
    return WithActionCable;
  }
}

function withSubscriptions({ cable, channels, onReceived, onInitialized, onConnected, onDisconnected, onRejected }) {
  return (WrappedComponent) => {

    class WithSubscriptions extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          subscriptions: {},
        }
      }

      createSubscriptions = () => {
        const subscriptions = {};

        channels.forEach(
          channel => {
            subscriptions[channel] = cable.subscriptions.create(channel,
              {
                received: (...args) => onReceived && onReceived(channel, ...args),
                initialized: (...args) => onInitialized && onInitialized(channel, args),
                connected: (...args) => onConnected && onConnected(channel, args),
                disconnected: (...args) => onDisconnected && onDisconnected(channel, args),
                rejected: (...args) => onRejected && onRejected(channel, args),
              }
            );
          }
        );

        return subscriptions;
      }

      componentDidMount() {
        this.setState({
          subscriptions: this.createSubscriptions(),
        })
      }

      componentWillUnmount() {
        cable.subscriptions.remove(cable);
      }

      render() {
        const { subscriptions } = this.state;
        return (
          <WrappedComponent
            {...this.props}
            subscriptions={subscriptions}
          />);
      }
    }

    WithSubscriptions.displayName = `withSubscriptions(${getDisplayName(WrappedComponent)})`
    return WithSubscriptions;
  }
}

withActionCable.withSubscriptions = withSubscriptions;

export default withActionCable;

export {
  withSubscriptions,
};
