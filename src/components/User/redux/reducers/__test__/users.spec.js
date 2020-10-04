import reducer, { initialState } from '../users';

describe('#UsersReducers', () => {
  it('#USER_LOGGED_IN', () => {
    expect(
      reducer(initialState, { type: 'USER_LOGGED_IN', payload: { uid: 'hi' } }),
    ).toEqual({ ...initialState, info: { uid: 'hi' }, loading: false });
  });
  it('#USER_LOADING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'USER_LOADING_ERROR',
        payload: { message: 'err' },
      }),
    ).toEqual({ ...initialState, loading: false, error: { message: 'err' } });
  });
  it('#USER_LOADING', () => {
    expect(reducer(initialState, { type: 'USER_LOADING' })).toEqual({
      ...initialState,
      loading: true,
    });
  });
  it('#USER_LOGGED_OUT', () => {
    expect(reducer(initialState, { type: 'USER_LOGGED_OUT' })).toEqual({
      ...initialState,
      loading: false,
    });
  });
  it('#USER_DELETING_DONE', () => {
    expect(reducer(initialState, { type: 'USER_DELETING_DONE' })).toEqual({
      ...initialState,
    });
  });
  // it('#USER_DELETING_ERROR', () => {
  //   expect(
  //     reducer(initialState, {
  //       type: 'USER_DELETING_ERROR',
  //       payload: { message: 'err' },
  //     }),
  //   ).toEqual({ ...initialState, error: { message: 'err' } });
  // });
  it('#APPS_UPDATING_DONE', () => {
    expect(
      reducer(initialState, {
        type: 'APPS_UPDATING_DONE',
        payload: 'HABIT_TRACKER',
      }),
    ).toEqual({ ...initialState, apps: 'HABIT_TRACKER' });
  });
  it('#APPS_UPDATING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'APPS_UPDATING_ERROR',
        payload: { message: 'err' },
      }),
    ).toEqual({ ...initialState, error: { message: 'err' } });
  });
});
