import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import api from "./api/api";
import misSlice from "./reducers/mis";
import chatSlice from "./reducers/chat";
// import {  } from "../redux/reducers/auth ";
const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [misSlice.name]: misSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (mid) => [...mid(), api.middleware],
});

export default store;
