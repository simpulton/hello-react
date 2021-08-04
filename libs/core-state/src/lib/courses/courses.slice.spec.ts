import { fetchCourses, coursesAdapter, coursesReducer } from './courses.slice';

describe('courses reducer', () => {
  it('should handle initial state', () => {
    const expected = coursesAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(coursesReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchCoursess', () => {
    let state = coursesReducer(undefined, fetchCourses.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = coursesReducer(
      state,
      fetchCourses.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = coursesReducer(
      state,
      fetchCourses.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
