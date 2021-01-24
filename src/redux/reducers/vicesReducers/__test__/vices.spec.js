import {
  VICE_ANALYTICS_FETCHING,
  VICE_ANALYTICS_FETCHING_DONE,
  VICE_ANALYTICS_FETCHING_ERROR,
  VICE_ANALYTICS_INCREASE,
  VICE_ANALYTICS_INCREASE_DONE,
  VICE_ANALYTICS_INCREASE_ERROR,
  VICES_ADDING,
  VICES_ADDING_DONE,
  VICES_ADDING_ERROR,
  VICES_EDITING,
  VICES_EDITING_DONE,
  VICES_EDITING_ERROR,
  VICES_DELETING,
  VICES_DELETING_DONE,
  VICES_DELETING_ERROR,
} from '../../../actions/vicesActions';
import reducer, { initialState } from '../vices';

describe('#Vices', () => {
  it('#VICE_ANALYTICS_FETCHING', () => {
    expect(reducer(initialState, { type: VICE_ANALYTICS_FETCHING })).toEqual({
      ...initialState,
      loading: true,
      error: {},
    });
  });
  it('#VICE_ANALYTICS_FETCHING_DONE', () => {
    expect(
      reducer(
        { ...initialState },
        {
          type: VICE_ANALYTICS_FETCHING_DONE,
          payload: [{ id: 1 }],
        },
      ),
    ).toEqual({ ...initialState, viceAnalytics: [{ id: 1 }], loading: false });
  });
  it('#VICE_ANALYTICS_FETCHING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: VICE_ANALYTICS_FETCHING_ERROR,
        payload: { message: 'hi' },
      }),
    ).toEqual({ ...initialState, error: { message: 'hi' }, loading: false });
  });
  it('#VICE_ANALYTICS_INCREASE', () => {
    expect(reducer(initialState, { type: VICE_ANALYTICS_INCREASE })).toEqual({
      ...initialState,
      loading: true,
      error: {},
    });
  });
  it('#VICE_ANALYTICS_INCREASE_DONE', () => {
    expect(
      reducer(initialState, {
        type: VICE_ANALYTICS_INCREASE_DONE,
        payload: [{ id: 1 }],
      }),
    ).toEqual({ ...initialState, viceAnalytics: [{ id: 1 }], loading: false });
  });
  it('#VICE_ANALYTICS_INCREASE_ERROR', () => {
    expect(
      reducer(initialState, {
        type: VICE_ANALYTICS_INCREASE_ERROR,
        payload: { message: 'hi' },
      }),
    ).toEqual({ ...initialState, error: { message: 'hi' }, loading: false });
  });
  it('#VICES_ADDING', () => {
    expect(reducer({ ...initialState }, { type: VICES_ADDING })).toEqual({
      ...initialState,
      loading: true,
      error: {},
    });
  });
  it('#VICES_ADDING_DONE', () => {
    expect(
      reducer(initialState, {
        type: VICES_ADDING_DONE,
        payload: [{ id: 1 }],
      }),
    ).toEqual({ ...initialState, viceAnalytics: [{ id: 1 }], loading: false });
  });
  it('#VICES_ADDING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: VICES_ADDING_ERROR,
        payload: { message: 'hi' },
      }),
    ).toEqual({ ...initialState, error: { message: 'hi' }, loading: false });
  });
  it('#VICES_EDITING', () => {
    expect(reducer({ ...initialState }, { type: VICES_EDITING })).toEqual({
      ...initialState,
      loading: true,
      error: {},
    });
  });
  it('#VICES_EDITING_DONE', () => {
    expect(
      reducer(initialState, {
        type: VICES_EDITING_DONE,
        payload: [{ id: 1 }],
      }),
    ).toEqual({ ...initialState, viceAnalytics: [{ id: 1 }], loading: false });
  });
  it('#VICES_EDITING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: VICES_EDITING_ERROR,
        payload: { message: 'hi' },
      }),
    ).toEqual({ ...initialState, error: { message: 'hi' }, loading: false });
  });
  it('#VICES_DELETING', () => {
    expect(reducer({ ...initialState }, { type: VICES_DELETING })).toEqual({
      ...initialState,
      loading: true,
      error: {},
    });
  });
  it('#VICES_DELETING_DONE', () => {
    expect(
      reducer(initialState, {
        type: VICES_DELETING_DONE,
        payload: [{ id: 1 }],
      }),
    ).toEqual({ ...initialState, viceAnalytics: [{ id: 1 }], loading: false });
  });
  it('#VICES_DELETING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: VICES_DELETING_ERROR,
        payload: { message: 'hi' },
      }),
    ).toEqual({ ...initialState, error: { message: 'hi' }, loading: false });
  });
});
