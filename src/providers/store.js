import storage from "redux-persist/lib/storage";

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import rootReducer from "reducers";
import api from "api";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (defaultMiddleware) => [
    ...defaultMiddleware({
      serializableCheck: false,
    }),
    api.middleware,
  ],
  devTools: process.env.NODE_ENV !== "production",
});
const persistor = persistStore(store);

export { store, persistor };
