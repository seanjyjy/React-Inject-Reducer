import type { Reducer, Store, StoreCreator } from 'redux';

export type reducerObject = {
  [name: string]: Reducer<any>;
};

export type reducerMapType = {
  [name: string]: number;
};

export type injectReducer = {
  store: Store;
  reducers: reducerObject;
};

export type ejectReducer = {
  store: Store;
  reducers: reducerObject;
};

export type initializeStore = StoreCreator;

export type InjectReducerProvider = {
  children: React.ReactNode;
};
