import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Clock } from 'three';
import type { RootState } from './store';

interface TimerState {
  value: Clock;
}

const initialState: TimerState = {
  value: new Clock(),
};

// TODO: make this proper eventually someday
export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Clock>) => {
      state.value = action.payload;
    },
  },
});

export const { update } = timerSlice.actions;

export const selectTimer = (state: RootState) => state.timer.value;

export default timerSlice.reducer;
