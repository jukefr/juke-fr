import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getRandomShader from '../shaders/index';
import type { RootState } from './store';

interface FragmentShaderState {
  // fargmentShaderValue, hasMuchMotion
  value: string;
}

const initialState: FragmentShaderState = {
  value: getRandomShader('', true),
};

export const fragmentShaderSlice = createSlice({
  name: 'fragmentShader',
  initialState,
  reducers: {
    updateFragmentShader: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { updateFragmentShader } = fragmentShaderSlice.actions;

export const selectFragmentShader = (state: RootState) =>
  state.fragmentShader.value;

export default fragmentShaderSlice.reducer;
