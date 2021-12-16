import type { Store } from 'redux';
import { combineReducers, createStore } from 'redux';

import type { reducerObject, reducerMapType } from './type';

const asyncReducers: reducerObject = {};
const reducerMap: reducerMapType = {};

function inject(reducers: reducerObject) {
  for (const [key, reducer] of Object.entries(reducers)) {
    // if more than one component decide to inject this reducer, then when ejecting, we want count to be 0
    // to ensure that we dont accidentally remove this reducer while still using it
    const count = (reducerMap[key] ?? 0) + 1;
    reducerMap[key] = count;
    asyncReducers[key] = reducer;
  }
}

export function initializeStore(reducers: reducerObject, preloadedState: any, enhancer: any) {
  const root = combineReducers(reducers);

  inject(reducers);

  return createStore(root, preloadedState, enhancer);
}

export function injectReducer(store: Store, reducers: reducerObject) {
  inject(reducers);

  store.replaceReducer(combineReducers(asyncReducers));
}

export function ejectReducer(store: Store, reducers: reducerObject) {
  for (const key in reducers) {
    if (asyncReducers[key] && reducerMap[key] && --reducerMap[key] === 0) {
      delete asyncReducers[key];
      delete reducerMap[key];
    }
  }

  setTimeout(() => {
    store.replaceReducer(combineReducers(asyncReducers));
  }, 100);
}
