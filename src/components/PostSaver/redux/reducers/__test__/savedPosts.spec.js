import reducer, { initialState } from '../savedPosts';

describe('#SavedPostsReducer', () => {
  it('#SAVED_POSTS_FETCHING', () => {
    expect(reducer(initialState, { type: 'SAVED_POSTS_FETCHING' })).toEqual({
      ...initialState,
      loading: true,
    });
  });
  it('#SAVED_POSTS_FETCHING_DONE', () => {
    expect(
      reducer(initialState, {
        type: 'SAVED_POSTS_FETCHING_DONE',
        payload: ['hi'],
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      savedPosts: ['hi'],
      error: {},
    });
  });
  it('#SAVED_POSTS_FETCHING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'SAVED_POSTS_FETCHING_ERROR',
        payload: { message: 'err' },
      }),
    ).toEqual({
      ...initialState,
      error: { message: 'err' },
    });
  });
  it('#SAVED_POSTS_UPDATING_DONE', () => {
    expect(
      reducer(initialState, {
        type: 'SAVED_POSTS_UPDATING_DONE',
        payload: ['hi'],
      }),
    ).toEqual({
      ...initialState,
      savedPosts: ['hi'],
      error: {},
    });
  });
  it('#SAVED_POSTS_UPDATING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'SAVED_POSTS_UPDATING_ERROR',
        payload: { message: 'err' },
      }),
    ).toEqual({
      ...initialState,
      error: { message: 'err' },
    });
  });
  it('#POST_SAVER_CLEAR', () => {
    expect(reducer(initialState, { type: 'POST_SAVER_CLEAR' })).toEqual({
      ...initialState,
    });
  });
});
