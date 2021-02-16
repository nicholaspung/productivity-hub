import reducer, { initialState } from '../dailies';

describe('#DailiesReducer', () => {
  it('#DAILIES_FETCHING', () => {
    expect(reducer(initialState, { type: 'DAILIES_FETCHING' })).toEqual({
      ...initialState,
      loading: true,
      error: {},
    });
  });
  it('#DAILIES_FETCHING_DONE', () => {
    expect(
      reducer(initialState, { type: 'DAILIES_FETCHING_DONE', payload: ['hi'] }),
    ).toEqual({
      ...initialState,
      loading: false,
      dailies: ['hi'],
    });
  });
  it('#DAILIES_FETCHING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'DAILIES_FETCHING_ERROR',
        payload: { message: 'err' },
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      error: { message: 'err' },
    });
  });
  it('#DAILIES_TOGGLE_DONE', () => {
    expect(
      reducer(initialState, { type: 'DAILIES_TOGGLE_DONE', payload: ['hi'] }),
    ).toEqual({
      ...initialState,
      error: {},
      dailies: ['hi'],
    });
  });
  it('#DAILIES_TOGGLE_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'DAILIES_TOGGLE_ERROR',
        payload: { message: 'err' },
      }),
    ).toEqual({
      ...initialState,
      error: { message: 'err' },
    });
  });
  it('#DAILIES_CACHE_FETCHING', () => {
    expect(reducer(initialState, { type: 'DAILIES_CACHE_FETCHING' })).toEqual({
      ...initialState,
      loading: true,
      error: {},
    });
  });
  it('#DAILIES_CACHE_DONE', () => {
    expect(
      reducer(initialState, {
        type: 'DAILIES_CACHE_DONE',
        payload: { there: 'is' },
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      dailiesCache: { there: 'is' },
    });
  });
  it('#DAILIES_CACHE_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'DAILIES_CACHE_ERROR',
        payload: { message: 'err' },
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      error: { message: 'err' },
    });
  });
  it('#DAILIES_DATE_RANGE_DONE', () => {
    expect(
      reducer(initialState, {
        type: 'DAILIES_DATE_RANGE_DONE',
        payload: { there: 'is' },
      }),
    ).toEqual({
      ...initialState,
      dateRangeCache: { there: 'is' },
    });
  });
  it('#HABITS_DELETING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'HABITS_DELETING_ERROR',
        payload: { message: 'err' },
      }),
    ).toEqual({
      ...initialState,
      error: { message: 'err' },
    });
  });
  it('#HABITS_UPDATING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'HABITS_UPDATING_ERROR',
        payload: { message: 'err' },
      }),
    ).toEqual({
      ...initialState,
      error: { message: 'err' },
    });
  });
  it('#HABIT_TRACKER_CLEAR', () => {
    expect(reducer(initialState, { type: 'HABIT_TRACKER_CLEAR' })).toEqual({
      ...initialState,
      dailiesCache: {},
    });
  });
  it('#HABITS_FETCHING', () => {
    expect(reducer(initialState, { type: 'HABITS_FETCHING' })).toEqual({
      ...initialState,
      loading: true,
    });
  });
  it('#HABITS_FETCHING_DONE', () => {
    expect(
      reducer(initialState, { type: 'HABITS_FETCHING_DONE', payload: ['hi'] }),
    ).toEqual({
      ...initialState,
      habits: ['hi'],
      loading: false,
    });
  });
  it('#HABITS_FETCHING_ERROR', () => {
    expect(
      reducer(initialState, { type: 'HABITS_FETCHING_ERROR', payload: 'hi' }),
    ).toEqual({
      ...initialState,
      error: 'hi',
    });
  });
  it('#HABITS_DELETING_DONE', () => {
    expect(
      reducer(initialState, { type: 'HABITS_DELETING_DONE', payload: ['hi'] }),
    ).toEqual({
      ...initialState,
      habits: ['hi'],
      loading: false,
    });
  });
  it('#HABITS_UPDATING', () => {
    expect(reducer(initialState, { type: 'HABITS_UPDATING' })).toEqual({
      ...initialState,
      loading: true,
    });
  });
  it('#HABITS_UPDATING_DONE', () => {
    expect(
      reducer(initialState, { type: 'HABITS_UPDATING_DONE', payload: ['hi'] }),
    ).toEqual({
      ...initialState,
      habits: ['hi'],
    });
  });
});
