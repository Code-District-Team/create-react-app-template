import { configureStore } from '@reduxjs/toolkit';
import { ORM, createReducer } from 'redux-orm';
import User from '../models/user/user';
import counterReducer from '../features/counter/counterSlice';

export const orm = new ORM({
  stateSelector: state => state.orm
});

orm.register(User); 

export default configureStore({
  reducer: {
    orm: createReducer(orm),
    counter: counterReducer,
  },
});
