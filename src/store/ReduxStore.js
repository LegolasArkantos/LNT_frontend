import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth';
import userReducer from '../features/userProfile';

export const ReduxStore = configureStore({
  reducer: {
    auth: authReducer, userProfile: userReducer
  },
})
