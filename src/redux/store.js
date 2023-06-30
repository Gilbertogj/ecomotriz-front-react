import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/userSlice";
import inblockUserReducer from "./inblock/user/userSlice";

const persistConfig = {
  key: "user",
  storage,
};
const inblockPersistConfig = {
  key: "inblock",
  storage,
};

const persistUserReducer = persistReducer(persistConfig, userReducer);
const inblockPersistUserReducer = persistReducer(
  inblockPersistConfig,
  inblockUserReducer
);

export const store = configureStore({
  reducer: {
    user: persistUserReducer,
    inblock: inblockPersistUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
