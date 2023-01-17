import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface ToasterState {
  value: string[];
}

const initialState: ToasterState = {
  value: [],
};

export const toastersSlice = createSlice({
  name: 'toasters',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.value.push(action.payload);
    },
  },
});

export const { add } = toastersSlice.actions;

export const selectToasters = (state: RootState) => state.toasters.value;

export default toastersSlice.reducer;
