import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface ShowEditorState {
  value: boolean;
}

const initialState: ShowEditorState = {
  value: false,
};

export const showEditorSlice = createSlice({
  name: 'showEditor',
  initialState,
  reducers: {
    toggleEditor: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleEditor } = showEditorSlice.actions;

export const selectShowEditor = (state: RootState) => state.showEditor.value;

export default showEditorSlice.reducer;
