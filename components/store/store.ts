import { configureStore } from '@reduxjs/toolkit';
import fragmentShaderReducer from './fragmentShader';
import prefersReducedMotionReducer from './prefersReducedMotion';
import showEditorReducer from './showEditor';
import timerReducer from './timer';
import toastersReducer from './toasters';

export const store = configureStore({
  reducer: {
    showEditor: showEditorReducer,
    fragmentShader: fragmentShaderReducer,
    toasters: toastersReducer,
    timer: timerReducer,
    prefersReducedMotion: prefersReducedMotionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
