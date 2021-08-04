import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Course } from '@slvd/api-interfaces';
import { coursesApi } from '@slvd/core-data';
import { RootState } from '../core-state.store';

export const COURSES_FEATURE_KEY = 'courses';

export interface CoursesState extends EntityState<Course> {
  selectedId: string | null;
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string | null | undefined;
}

export const coursesAdapter = createEntityAdapter<Course>();

export const initialCoursesState: CoursesState = coursesAdapter.getInitialState(
  {
    selectedId: null,
    loadingStatus: 'not loaded',
    error: null,
  }
);

// -------------------------------------------------------------------
// EFFECTS
// -------------------------------------------------------------------

export const fetchCourses = createAsyncThunk(
  'courses/load',
  async (_, thunkAPI) => {
    const response = await coursesApi.load();
    return response.data;
  }
);

export const findCourse = createAsyncThunk(
  'courses/find',
  async (id: string, thunkAPI) => {
    const response = await coursesApi.find(id);
    return response.data;
  }
);

export const createRemoteCourse = createAsyncThunk(
  'courses/create',
  async (course: Course, { dispatch }) => {
    const response = await coursesApi.create(course);
    dispatch(fetchCourses());
    return response.data;
  }
);

export const updateRemoteCourse = createAsyncThunk(
  'courses/update',
  async (course: Course, { dispatch }) => {
    const response = await coursesApi.update(course);
    dispatch(fetchCourses());
    return response.data;
  }
);

export const removeRemoteCourse = createAsyncThunk(
  'courses/remove',
  async (id: string | null, { dispatch }) => {
    const response = await coursesApi.remove(id);
    dispatch(fetchCourses());
    return response.data;
  }
);

// -------------------------------------------------------------------
// REDUCER
// -------------------------------------------------------------------

export const coursesSlice = createSlice({
  name: COURSES_FEATURE_KEY,
  initialState: initialCoursesState,
  reducers: {
    loadCourses: coursesAdapter.addMany,
    addCourse: coursesAdapter.addOne,
    updateCourse: coursesAdapter.updateOne,
    removeCourse: coursesAdapter.removeOne,
    setCurrentCourse: (state, action: PayloadAction<string | null>) => {
      state.selectedId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state: CoursesState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchCourses.fulfilled,
        (state: CoursesState, action: PayloadAction<Course[]>) => {
          coursesAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchCourses.rejected, (state: CoursesState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      })
      .addMatcher(
        isAnyOf(
          createRemoteCourse.pending,
          updateRemoteCourse.pending,
          removeRemoteCourse.pending
        ),
        (state, { payload: any }) => {
          state.loadingStatus = 'loading';
        }
      )
      .addMatcher(
        isAnyOf(
          createRemoteCourse.rejected,
          updateRemoteCourse.rejected,
          removeRemoteCourse.rejected
        ),
        (state: CoursesState, action) => {
          state.loadingStatus = 'error';
          state.error = action.error.message;
        }
      )
      ;
  },
});

/*
 * Export reducer for store configuration.
 */
export const coursesReducer = coursesSlice.reducer;

// -------------------------------------------------------------------
// ACTIONS
// -------------------------------------------------------------------

export const {
  loadCourses,
  addCourse,
  updateCourse,
  removeCourse,
  setCurrentCourse,
} = coursesSlice.actions;

// -------------------------------------------------------------------
// SELECTORS
// -------------------------------------------------------------------

export const {
  selectById,
  selectAll: selectAllCourses,
  selectEntities: selectCoursesEntities,
} = coursesAdapter.getSelectors<RootState>((state) => state.courses);

export const getCoursesState = (rootState: any): CoursesState =>
  rootState[COURSES_FEATURE_KEY];

export const selectCurrentCourseId = createSelector(
  getCoursesState,
  (state) => state.selectedId || null
);

const emptyCourse: Course = {
  id: null,
  title: '',
  description: '',
};

export const selectCurrentCourse = createSelector(
  selectCoursesEntities,
  selectCurrentCourseId,
  (entities, id): Course => (id ? (entities[id] as Course) : emptyCourse)
);
