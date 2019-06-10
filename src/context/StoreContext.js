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

  dispatch = (type, payload) => {
    const [namespace] = splitNamespaceAndReducer(type);
    const reducer = this.reducers[type];
    if (reducer === undefined || reducer === null) throw new Error(`Cant find reducer ${type}`);

    this.setState((prevState) => {
      const prevNamespaceStates = prevState[namespace];
      const fn = (payload) => reducer(prevNamespaceStates, payload);
      const newStates = fn(payload);

      if (newStates === undefined || newStates === null || Object.keys(newStates).length === 0) return null;

      return {
        [namespace]: {
          ...prevNamespaceStates,
          ...newStates,
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
