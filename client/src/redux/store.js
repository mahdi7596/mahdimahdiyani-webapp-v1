import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/userSlice";
import themeReducer from "./theme/themeSlice";
import reservationsReducer from "./reservations/reservationsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  reservations: reservationsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }),
});

export const persistor = persistStore(store);
