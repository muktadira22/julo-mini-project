import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import favoriteReducer from "./favorite/slice";
import locationReducer from "./location/slice";
import weatherReducer from "./weather/slice";

const reducers = combineReducers({
  favorite: favoriteReducer,
  location: locationReducer,
  weather: weatherReducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
