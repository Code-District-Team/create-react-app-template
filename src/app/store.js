import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "redux/counter/counterSlice";
import logger from "redux-logger";
import userSlice from "redux/user/userSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userSlice
  },

  // everytime when we dispatch an action, this line will console 
  // the previous state, action with payload and updated state
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
