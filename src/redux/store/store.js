import { configureStore } from "@reduxjs/toolkit";
import { loadingReducer } from "../reducers/loadingReducer";
import { modalReducer } from "../reducers/modalReducer";
import { taskReducer } from "../reducers/taskReducer";
import { userReducer } from "../reducers/userReducers";

const reducer = {
  user: userReducer,
  loading: loadingReducer,
  modal: modalReducer,
  task: taskReducer,
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
