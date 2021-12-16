import React, { createContext, useContext } from 'react';
import { useStore } from 'react-redux';
import type { Store } from 'redux';

import {
  injectReducer as injectReducerFn,
  ejectReducer as ejectReducerFn,
} from './reducerFunctions';
import { reducerObject } from './type';

type InjectReducerProps = {
  injectReducer: (store: Store, reducers: reducerObject) => void;
  ejectReducer: (store: Store, reducers: reducerObject) => void;
};

const InjectReducerContext = createContext<InjectReducerProps | undefined>(undefined);

type InjectReducerProviderProps = { children: React.ReactNode };

function InjectReducerProvider({ children }: InjectReducerProviderProps) {
  const store = useStore();

  const injectReducer = injectReducerFn.bind(this, store);
  const ejectReducer = ejectReducerFn.bind(this, store);

  return (
    <InjectReducerContext.Provider value={{ injectReducer, ejectReducer }}>
      {children}
    </InjectReducerContext.Provider>
  );
}

function useInjectReducer() {
  const context = useContext(InjectReducerContext);

  if (context === undefined) {
    throw new Error('Context has to be in a provider');
  }

  return context;
}

function withInjectReducer<P>(WrappedComponent: React.ComponentType<P>): React.ComponentType<P> {
  return function WithInjectReducer(props) {
    const store = useStore();

    const injectReducer = injectReducerFn.bind(this, store);
    const ejectReducer = ejectReducerFn.bind(this, store);

    return (
      <WrappedComponent
        {...(props as P)}
        injectReducer={injectReducer}
        ejectReducer={ejectReducer}
      />
    );
  };
}

export { useInjectReducer, InjectReducerProvider, withInjectReducer };
