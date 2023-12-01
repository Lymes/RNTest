import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export enum LoginMethod {
  MANUAL = 'manual',
  CLOUD = 'cloud',
  DISCOVERY = 'discovery',
}

// Define a type for the slice state
export interface LoginMethodState {
  value: LoginMethod;
  ipAddress: string | undefined;
  isScanning: boolean;
}

// Define the initial state using that type
const initialState: LoginMethodState = {
  value: LoginMethod.MANUAL,
  ipAddress: undefined,
  isScanning: false,
};

export const loginMethodSlice = createSlice({
  name: 'loginMethod',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setManual: (state, action: PayloadAction<string>) => {
      state.value = LoginMethod.MANUAL;
      state.ipAddress = action.payload;
      state.isScanning = false;
    },
    setCloud: state => {
      state.value = LoginMethod.CLOUD;
      state.ipAddress = 'cloud.youus.it';
      state.isScanning = false;
    },
    setDiscovery: state => {
      state.value = LoginMethod.DISCOVERY;
      state.ipAddress = undefined;
      state.isScanning = true;
    },
    setDiscoveredAddress: (state, action: PayloadAction<string>) => {
      if (state.value === LoginMethod.DISCOVERY) {
        state.ipAddress = action.payload;
        state.isScanning = false;
      }
    },
  },
});

export const {setManual, setCloud, setDiscovery, setDiscoveredAddress} =
  loginMethodSlice.actions;
export default loginMethodSlice.reducer;
