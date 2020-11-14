import reducer, { initialState } from '../posts';

describe('#PostsReducer', () => {
  it('#POSTS_FETCHING', () => {
    expect(reducer(initialState, { type: 'POSTS_FETCHING' })).toEqual({
      ...initialState,
      loading: true,
    });
  });
  it('#POSTS_FETCHING_DONE', () => {
    expect(
      reducer(initialState, {
        type: 'POSTS_FETCHING_DONE',
        payload: { this: 'hi' },
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      fetchedPosts: { this: 'hi' },
      error: {},
    });
  });
  it('#POSTS_FETCHING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'POSTS_FETCHING_ERROR',
        payload: { message: 'err' },
      }),
    ).toEqual({ ...initialState, loading: false, error: { message: 'err' } });
  });
  it('#POSTS_ADD_TO_CACHE_DONE', () => {
    expect(
      reducer(initialState, {
        type: 'POSTS_ADD_TO_CACHE_DONE',
        payload: ['hi'],
      }),
    ).toEqual({ ...initialState, posts: ['hi'] });
  });
  it('#POST_SAVER_CLEAR', () => {
    expect(reducer(initialState, { type: 'POST_SAVER_CLEAR' })).toEqual({
      ...initialState,
    });
  });
});
