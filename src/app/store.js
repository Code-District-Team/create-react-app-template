import { configureStore } from '@reduxjs/toolkit';
import { createReducer } from 'redux-orm';
import User from '../models/user/user';
import counterReducer from '../features/counter/counterSlice';
import orm from './orm';

orm.register(User); 

export default configureStore({
  reducer: {
    orm: createReducer(orm),
    counter: counterReducer,
  },
});
