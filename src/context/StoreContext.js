import React, { PureComponent } from 'react';
import models from "./models";

const StoreContext = React.createContext();
const StoreContextConsumer = StoreContext.Consumer;

const generateNamespaceReducerName = (namespace, reducerName) => (`${namespace}/${reducerName}`);
const splitNamespaceAndReducer = (name) => (name.split('/'));

const splitStateAndReducers = () => {
  const state = {};
  const reducers = {};

  models.forEach(model => {
    state[model.namespace] = model.state;
    Object.keys(model.reducers).forEach(reducerKey => {
      reducers[generateNamespaceReducerName(model.namespace, reducerKey)] = model.reducers[reducerKey];
    });
  });

  return {
    state,
    reducers,
  };
}

class StoreContextProvider extends PureComponent {
  constructor(props) {
    super(props);

    const { state, reducers } = splitStateAndReducers();

    this.state = state;

    this.reducers = reducers;
  }

  updateStore = (key, value) => {
    this.setState((prevState, _) => ({
      [key]: {
        ...prevState,
        ...value,
      },
    }));
  }

  dispatch = (reducer, payload) => {
    const [namespace] = splitNamespaceAndReducer(reducer);

    this.setState((prevState) => {
      const prevNamespaceStates = prevState[namespace];
      const fn = (payload) => this.reducers[reducer](prevNamespaceStates, payload);

      return {
        [namespace]: {
          ...prevNamespaceStates,
          ...fn(payload),
        },
      };
    });
  }

  render() {
    const { children } = this.props;

    return (
      <StoreContext.Provider
        value={{
          ...this.state,
          updateStore: this.updateStore,
          dispatch: this.dispatch,
        }}
      >
        {children}
      </StoreContext.Provider>
    );
  }
}

export {
  StoreContextConsumer,
  StoreContextProvider,
};

export default {
  Consumer: StoreContextConsumer,
  Provider: StoreContextProvider,
};
