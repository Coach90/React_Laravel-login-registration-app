import { configureStore } from '@reduxjs/toolkit';
import login  from '../features/Login';

export const store = configureStore({
  reducer: {
    loginDetail:login
  },
});
