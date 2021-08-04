import { configureStore } from '@reduxjs/toolkit';
import { coursesReducer } from './courses/courses.slice';

export const store = configureStore({
  reducer: {
    courses: coursesReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// Inferred type: {courses:CoursesState}
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


