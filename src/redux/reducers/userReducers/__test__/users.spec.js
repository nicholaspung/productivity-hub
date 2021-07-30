import {
  USER_LOGGED_IN,
  USER_LOADING_ERROR,
  USER_LOADING,
  USER_LOGGED_OUT,
  USER_DELETING_DONE,
  USER_DELETING_ERROR,
  APPS_UPDATING_DONE,
  APPS_UPDATING_ERROR,
  USER_ANALYTICS_DONE,
  USER_ANALYTICS_ERROR,
  UPDATE_USER_ANALYTIC_THRESHOLD_DONE,
  UPDATE_USER_ANALYTIC_THRESHOLD_ERROR,
  CREATE_USER_ANALYTIC_THRESHOLD_DONE,
  CREATE_USER_ANALYTIC_THRESHOLD_ERROR,
} from '../../../actions/userActions';
import reducer, { initialState } from '../users';

describe('#UsersReducer', () => {
  it('#USER_LOGGED_IN', () => {
    expect(
      reducer(initialState, { type: USER_LOGGED_IN, payload: { uid: 'hi' } }),
    ).toEqual({ ...initialState, info: { uid: 'hi' }, loading: false });
  });
  it('#USER_LOADING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: USER_LOADING_ERROR,
        payload: { message: 'err' },
      }),
    ).toEqual({ ...initialState, loading: false, error: { message: 'err' } });
  });
  it('#USER_LOADING', () => {
    expect(reducer(initialState, { type: USER_LOADING })).toEqual({
      ...initialState,
      loading: true,
      error: {},
    });
  });
  it('#USER_LOGGED_OUT', () => {
    expect(reducer(initialState, { type: USER_LOGGED_OUT })).toEqual({
      ...initialState,
      loading: false,
    });
  });
  it('#USER_DELETING_DONE', () => {
    expect(reducer(initialState, { type: USER_DELETING_DONE })).toEqual({
      ...initialState,
    });
  });
  it('#USER_DELETING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: USER_DELETING_ERROR,
        payload: { message: 'err' },
      }),
    ).toEqual({ ...initialState, loading: false, error: { message: 'err' } });
  });
  it('#APPS_UPDATING_DONE', () => {
    expect(
      reducer(initialState, {
        type: APPS_UPDATING_DONE,
        payload: [1, 2],
      }),
    ).toEqual({ ...initialState, apps: [1, 2] });
  });
  it('#APPS_UPDATING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: APPS_UPDATING_ERROR,
        payload: { message: 'err' },
      }),
    ).toEqual({ ...initialState, error: { message: 'err' } });
  });
  it('#USER_ANALYTICS_DONE', () => {
    expect(
      reducer(initialState, {
        type: USER_ANALYTICS_DONE,
        payload: [{ id: 1 }],
      }),
    ).toEqual({ ...initialState, userAnalytics: [{ id: 1 }], error: {} });
  });
  it('#USER_ANALYTICS_ERROR', () => {
    expect(
      reducer(initialState, {
        type: USER_ANALYTICS_ERROR,
        payload: { message: 'err' },
      }),
    ).toEqual({ ...initialState, error: { message: 'err' } });
  });
  it('#UPDATE_USER_ANALYTIC_THRESHOLD_DONE', () => {
    expect(
      reducer(initialState, {
        type: UPDATE_USER_ANALYTIC_THRESHOLD_DONE,
        payload: [{ id: 1 }],
      }),
    ).toEqual({ ...initialState, userAnalytics: [{ id: 1 }], error: {} });
  });
  it('#UPDATE_USER_ANALYTIC_THRESHOLD_ERROR', () => {
    expect(
      reducer(initialState, {
        type: UPDATE_USER_ANALYTIC_THRESHOLD_ERROR,
        payload: { message: 'err' },
      }),
    ).toEqual({ ...initialState, error: { message: 'err' } });
  });
  it('#CREATE_USER_ANALYTIC_THRESHOLD_DONE', () => {
    expect(
      reducer(initialState, {
        type: CREATE_USER_ANALYTIC_THRESHOLD_DONE,
        payload: [{ id: 1 }],
      }),
    ).toEqual({ ...initialState, userAnalytics: [{ id: 1 }], error: {} });
  });
  it('#CREATE_USER_ANALYTIC_THRESHOLD_ERROR', () => {
    expect(
      reducer(initialState, {
        type: CREATE_USER_ANALYTIC_THRESHOLD_ERROR,
        payload: { message: 'err' },
      }),
    ).toEqual({ ...initialState, error: { message: 'err' } });
  });
  it('#CLEAR_USER_ERROR_MESSAGE', () => {
    expect(
      reducer(initialState, {
        type: 'CLEAR_USER_ERROR_MESSAGE',
        payload: undefined,
      }),
    ).toEqual({
      ...initialState,
      error: {},
    });
  });
  it('#APP_PREFERENCES_UPDATING_DONE', () => {
    expect(
      reducer(initialState, {
        type: 'APP_PREFERENCES_UPDATING_DONE',
        payload: undefined,
      }),
    ).toEqual({
      ...initialState,
      appPreferences: undefined,
    });
  });
});
