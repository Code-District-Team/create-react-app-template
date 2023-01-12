import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "features/counter/counterSlice";
import logger from "redux-logger";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
