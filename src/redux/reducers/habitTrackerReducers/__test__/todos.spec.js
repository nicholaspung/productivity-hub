import reducer, { initialState } from '../todos';

describe('#TodosReducer', () => {
  it('#TODOS_FETCHING', () => {
    expect(reducer(initialState, { type: 'TODOS_FETCHING' })).toEqual({
      ...initialState,
      loading: true,
    });
  });
  it('#TODOS_FETCHING_DONE', () => {
    expect(
      reducer(initialState, { type: 'TODOS_FETCHING_DONE', payload: ['hi'] }),
    ).toEqual({
      ...initialState,
      loading: false,
      error: {},
      todos: ['hi'],
    });
  });
  it('#TODOS_FETCHING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'TODOS_FETCHING_ERROR',
        payload: { message: 'err' },
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      error: { message: 'err' },
    });
  });
  it('#TODOS_DELETING_DONE', () => {
    expect(
      reducer(initialState, { type: 'TODOS_DELETING_DONE', payload: ['hi'] }),
    ).toEqual({
      ...initialState,
      error: {},
      todos: ['hi'],
    });
  });
  it('#TODOS_DELETING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'TODOS_DELETING_ERROR',
        payload: { message: 'err' },
      }),
    ).toEqual({
      ...initialState,
      error: { message: 'err' },
    });
  });
  it('#TODOS_ADDING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'TODOS_ADDING_ERROR',
        payload: { message: 'err' },
      }),
    ).toEqual({
      ...initialState,
      error: { message: 'err' },
    });
  });
  it('#TODOS_ADDING_DONE', () => {
    expect(
      reducer(initialState, { type: 'TODOS_ADDING_DONE', payload: ['hi'] }),
    ).toEqual({
      ...initialState,
      todos: ['hi'],
      error: {},
    });
  });
  it('#TODOS_EDITING_DONE', () => {
    expect(
      reducer(initialState, { type: 'TODOS_EDITING_DONE', payload: ['hi'] }),
    ).toEqual({
      ...initialState,
      error: {},
      todos: ['hi'],
    });
  });
  it('#TODOS_EDITING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'TODOS_EDITING_ERROR',
        payload: { message: 'err' },
      }),
    ).toEqual({
      ...initialState,
      error: { message: 'err' },
    });
  });
  it('#TODOS_REORDERING_DONE', () => {
    expect(
      reducer(initialState, { type: 'TODOS_REORDERING_DONE', payload: ['hi'] }),
    ).toEqual({
      ...initialState,
      error: {},
      todos: ['hi'],
    });
  });
  it('#TODOS_REORDERING_ERROR', () => {
    expect(
      reducer(initialState, {
        type: 'TODOS_REORDERING_ERROR',
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
    });
  });
});
