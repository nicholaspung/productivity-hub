import reducer, { initialState } from '../trackTimeNames';

describe('#TrackTimeNamesReducer', () => {
  it('#TRACK_TIME_NAMES_FETCHING', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIME_NAMES_FETCHING',
      }),
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });
  it('#TRACK_TIME_NAMES_FETCHING_DONE', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIME_NAMES_FETCHING_DONE',
        payload: { name: 'hi' },
      }),
    ).toEqual({
      ...initialState,
      trackTimeNames: { name: 'hi' },
      loading: false,
    });
  });
  it('#TRACK_TIME_NAMES_FETCHING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIME_NAMES_FETCHING_ERROR',
        payload: 'hi',
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      error: 'hi',
    });
  });
  it('#TRACK_TIME_NAMES_ADDING', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIME_NAMES_ADDING',
      }),
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });
  it('#TRACK_TIME_NAMES_ADDING_DONE', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIME_NAMES_ADDING_DONE',
        payload: [],
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      trackTimeNames: [],
    });
  });
  it('#TRACK_TIME_NAMES_ADDING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIME_NAMES_ADDING_ERROR',
        payload: 'hi',
      }),
    ).toEqual({
      ...initialState,
      error: 'hi',
    });
  });
  it('#TRACK_TIME_NAMES_UPDATING', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIME_NAMES_UPDATING',
      }),
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });
  it('#TRACK_TIME_NAMES_UPDATING_DONE', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIME_NAMES_UPDATING_DONE',
        payload: [],
      }),
    ).toEqual({
      ...initialState,
      trackTimeNames: [],
    });
  });
  it('#TRACK_TIME_NAMES_UPDATING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIME_NAMES_UPDATING_ERROR',
        payload: 'hi',
      }),
    ).toEqual({
      ...initialState,
      error: 'hi',
    });
  });
  it('#TRACK_TIME_NAMES_DELETING', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIME_NAMES_DELETING',
      }),
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });
  it('#TRACK_TIME_NAMES_DELETING_DONE', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIME_NAMES_DELETING_DONE',
        payload: [],
      }),
    ).toEqual({
      ...initialState,
      loading: false,
    });
  });
  it('#TRACK_TIME_NAMES_DELETING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIME_NAMES_DELETING_ERROR',
        payload: 'hi',
      }),
    ).toEqual({
      ...initialState,
      error: 'hi',
    });
  });
  it('#TIME_TRACKER_CLEAR', () => {
    expect(reducer(initialState, { type: 'TIME_TRACKER_CLEAR' })).toEqual({
      ...initialState,
    });
  });
  it('#TRACK_TIME_NAME_SET_BREAK_TIME', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIME_NAME_SET_BREAK_TIME',
        payload: { name: 'break' },
      }),
    ).toEqual({
      ...initialState,
      breakTime: { name: 'break' },
    });
  });
});
