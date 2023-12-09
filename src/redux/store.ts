import {configureStore} from '@reduxjs/toolkit';
import {loginMethodSlice} from './LoginMethodSlice';
import {selectedModuleSlice} from './SelectedModuleSlice';

export const store = configureStore({
  reducer: {
    loginMethod: loginMethodSlice.reducer,
    selectedModule: selectedModuleSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
