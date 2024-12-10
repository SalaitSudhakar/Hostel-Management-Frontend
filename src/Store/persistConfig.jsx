// src/store/persistConfig.js

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const createPersistedReducer = (key, reducer) => {
  if (typeof reducer !== "function") {
    throw new Error(`Expected a reducer function, but got ${typeof reducer}`);
  }
  const persistConfig = {
    key,
    storage,
  };
  return persistReducer(persistConfig, reducer);
};

// Create and export persistor function
export const createPersistor = (store) => persistStore(store);
