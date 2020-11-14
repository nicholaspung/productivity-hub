import reducer, { initialState } from '../titles';

describe('#TitlesReducer', () => {
  it('#TITLES_FETCHING', () => {
    expect(reducer(initialState, { type: 'TITLES_FETCHING' })).toEqual({
      ...initialState,
      loading: true,
    });
  });
  it('#TITLES_FETCHING_DONE', () => {
    expect(
      reducer(initialState, { type: 'TITLES_FETCHING_DONE', payload: ['hi'] }),
    ).toEqual({
      ...initialState,
      loading: false,
      error: {},
      titles: ['hi'],
    });
  });
  it('#TITLES_FETCHING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'TITLES_FETCHING_ERROR',
        payload: { message: 'err' },
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      error: { message: 'err' },
    });
  });
  it('#TITLES_ADDING_DONE', () => {
    expect(
      reducer(initialState, { type: 'TITLES_ADDING_DONE', payload: ['hi'] }),
    ).toEqual({
      ...initialState,
      error: {},
      titles: ['hi'],
    });
  });
  it('#TITLES_ADDING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'TITLES_ADDING_ERROR',
        payload: { message: 'err' },
      }),
    ).toEqual({
      ...initialState,
      error: { message: 'err' },
    });
  });
  it('#TITLES_UPDATING_DONE', () => {
    expect(
      reducer(initialState, { type: 'TITLES_UPDATING_DONE', payload: ['hi'] }),
    ).toEqual({
      ...initialState,
      error: {},
      titles: ['hi'],
    });
  });
  it('#TITLES_UPDATING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'TITLES_UPDATING_ERROR',
        payload: { message: 'err' },
      }),
    ).toEqual({
      ...initialState,
      error: { message: 'err' },
    });
  });
  it('#TITLES_DELETING_DONE', () => {
    expect(
      reducer(initialState, { type: 'TITLES_DELETING_DONE', payload: ['hi'] }),
    ).toEqual({
      ...initialState,
      error: {},
      titles: ['hi'],
    });
  });
  it('#TITLES_DELETING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'TITLES_DELETING_ERROR',
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
