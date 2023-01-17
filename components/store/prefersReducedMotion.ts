import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface PrefersReducedMotionState {
  value: boolean;
}

const initialState: PrefersReducedMotionState = {
  value: true,
};

export const prefersReducedMotionSlice = createSlice({
  name: 'prefersReducedMotion',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { update } = prefersReducedMotionSlice.actions;

export const selectPrefersReducedMotion = (state: RootState) =>
  state.prefersReducedMotion.value;

export default prefersReducedMotionSlice.reducer;
