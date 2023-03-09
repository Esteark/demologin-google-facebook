import { configureStore } from "@reduxjs/toolkit";
import { loadingReducer } from "../reducers/loadingReducer";

import { userReducer } from "../reducers/userReducers";

const reducer = {
  user: userReducer,
  loading: loadingReducer,
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
