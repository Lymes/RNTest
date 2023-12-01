import {configureStore} from '@reduxjs/toolkit';
import {loginMethodSlice} from './LoginMethodSlice';

export const store = configureStore({
  reducer: {
    loginMethod: loginMethodSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
