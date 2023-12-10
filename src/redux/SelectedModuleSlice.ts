import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define a type for the slice state
export interface SelectedModuleState {
  id?: string;
}

// Define the initial state using that type
const initialState: SelectedModuleState = {
  id: undefined,
};

export const selectedModuleSlice = createSlice({
  name: 'selectedModule',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSelectedModule: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const {setSelectedModule} = selectedModuleSlice.actions;
export default selectedModuleSlice.reducer;
