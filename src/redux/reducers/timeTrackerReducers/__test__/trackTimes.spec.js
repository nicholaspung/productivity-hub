import reducer, { initialState } from '../trackTimes';

describe('#TrackTimesReducer', () => {
  it('#TRACK_TIMES_FETCHING', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIMES_FETCHING',
      }),
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });
  it('#TRACK_TIMES_FETCHING_DONE', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIMES_FETCHING_DONE',
        payload: [],
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      trackTimes: [],
    });
  });
  it('#TRACK_TIMES_FETCHING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIMES_FETCHING_ERROR',
        payload: 'hi',
      }),
    ).toEqual({
      ...initialState,
      error: 'hi',
      loading: false,
    });
  });
  it('#TRACK_TIMES_ADDING', () => {
    expect(reducer(initialState, { type: 'TRACK_TIMES_ADDING' })).toEqual({
      ...initialState,
      loading: true,
    });
  });
  it('#TRACK_TIMES_ADDING_DONE', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIMES_ADDING_DONE',
        payload: [],
      }),
    ).toEqual({
      ...initialState,
      trackTimes: [],
    });
  });
  it('#TRACK_TIMES_ADDING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIMES_ADDING_ERROR',
        payload: 'hi',
      }),
    ).toEqual({
      ...initialState,
      error: 'hi',
    });
  });
  it('#TRACK_TIMES_UPDATING', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIMES_UPDATING',
      }),
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });
  it('#TRACK_TIMES_UPDATING_DONE', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIMES_UPDATING_DONE',
        payload: [],
      }),
    ).toEqual({
      ...initialState,
      trackTimes: [],
    });
  });
  it('#TRACK_TIMES_UPDATING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIMES_UPDATING_ERROR',
        payload: 'hi',
      }),
    ).toEqual({
      ...initialState,
      error: 'hi',
    });
  });
  it('#TRACK_TIMES_DELETING', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIMES_DELETING',
      }),
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });
  it('#TRACK_TIMES_DELETING_DONE', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIMES_DELETING_DONE',
        payload: [],
      }),
    ).toEqual({
      ...initialState,
      trackTimes: [],
    });
  });
  it('#TRACK_TIMES_DELETING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIMES_DELETING_ERROR',
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
  it('#TRACK_TIMES_START_TIMER', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIMES_START_TIMER',
      }),
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });
  it('#TRACK_TIMES_START_TIMER_DONE', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIMES_START_TIMER_DONE',
        payload: { name: 'current track time' },
      }),
    ).toEqual({
      ...initialState,
      currentTrackTime: { name: 'current track time' },
    });
  });
  it('#TRACK_TIMES_START_TIMER_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIMES_START_TIMER_ERROR',
        payload: 'hi',
      }),
    ).toEqual({
      ...initialState,
      error: 'hi',
    });
  });
  it('#TRACK_TIMES_END_TIMER', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIMES_END_TIMER',
      }),
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });
  it('#TRACK_TIMES_END_TIMER_DONE', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIMES_END_TIMER_DONE',
        payload: [],
      }),
    ).toEqual({
      ...initialState,
      currentTrackTime: {},
      loading: false,
      trackTimes: [],
    });
  });
  it('#TRACK_TIMES_END_TIMER_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIMES_END_TIMER_ERROR',
        payload: 'hi',
      }),
    ).toEqual({
      ...initialState,
      error: 'hi',
    });
  });
  it('#TRACK_TIMES_SET_CURRENT_TRACK_TIME', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIMES_SET_CURRENT_TRACK_TIME',
        payload: { name: 'current track time' },
      }),
    ).toEqual({
      ...initialState,
      currentTrackTime: { name: 'current track time' },
    });
  });
  it('#TRACK_TIMES_BULK_UPDATE', () => {
    expect(
      reducer(initialState, {
        type: 'TRACK_TIMES_BULK_UPDATE',
        payload: [],
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      trackTimes: [],
    });
  });
});
