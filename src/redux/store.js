import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { createReducer } from "redux-orm";
import counterReducer from "../pages/counter/counterSlice";
import orm from "./models/orm";
import User from "./models/user/user";

orm.register(User);

export default configureStore({
  reducer: {
    orm: createReducer(orm),
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
