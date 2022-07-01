import { configureStore } from "@reduxjs/toolkit";
import { createReducer } from "redux-orm";
import User from "models/user/user";
import counterReducer from "features/counter/counterSlice";
import orm from "./orm";
import logger from "redux-logger";

orm.register(User);

export default configureStore({
  reducer: {
    orm: createReducer(orm),
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
