import * as selectors from '../selectors';

describe('#HabitTrackerSelectors', () => {
  const state1 = {
    dailies: {
      dailies: [],
      dailiesCache: {},
      dateRangeCache: {},
      loading: false,
      error: {},
    },
    todos: {
      todos: [],
      loading: false,
      error: {},
    },
  };
  const state2 = {
    dailies: {
      dailies: [{ id: 1 }, { id: 2 }, { id: 3 }],
      dailiesCache: { '2020-10-02': [{ id: 1 }] },
      dateRangeCache: { WEEK: true },
      loading: false,
      error: {},
    },
    todos: {
      todos: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      loading: false,
      error: {},
    },
  };
  it('#getDailiesState', () => {
    expect(selectors.getDailiesState(state1)).toEqual(state1.dailies);
    expect(selectors.getDailiesState(state2)).toEqual(state2.dailies);
  });
  it('#getDailiesDailies', () => {
    expect(selectors.getDailiesDailies(state1)).toEqual(state1.dailies.dailies);
    expect(selectors.getDailiesDailies(state2)).toEqual(state2.dailies.dailies);
  });
  it('#getDailiesLoadingStatus', () => {
    expect(selectors.getDailiesLoadingStatus(state1)).toEqual(
      state1.dailies.loading,
    );
    expect(selectors.getDailiesLoadingStatus(state2)).toEqual(
      state2.dailies.loading,
    );
  });
  it('#getDailiesDailiesCache', () => {
    expect(selectors.getDailiesDailiesCache(state1)).toEqual(
      state1.dailies.dailiesCache,
    );
    expect(selectors.getDailiesDailiesCache(state2)).toEqual(
      state2.dailies.dailiesCache,
    );
  });
  it('#getDailiesDateRangeCache', () => {
    expect(selectors.getDailiesDateRangeCache(state1)).toEqual(
      state1.dailies.dateRangeCache,
    );
    expect(selectors.getDailiesDateRangeCache(state2)).toEqual(
      state2.dailies.dateRangeCache,
    );
  });
  it('#getTodosState', () => {
    expect(selectors.getTodosState(state1)).toEqual(state1.todos);
    expect(selectors.getTodosState(state2)).toEqual(state2.todos);
  });
  it('#getTodosTodos', () => {
    expect(selectors.getTodosTodos(state1)).toEqual(state1.todos.todos);
    expect(selectors.getTodosTodos(state2)).toEqual(state2.todos.todos);
  });
  it('#getTodosLoadingStatus', () => {
    expect(selectors.getTodosLoadingStatus(state1)).toEqual(
      state1.todos.loading,
    );
    expect(selectors.getTodosLoadingStatus(state2)).toEqual(
      state2.todos.loading,
    );
  });
  it('#getTodosError', () => {
    expect(selectors.getTodosError(state1)).toEqual(state1.todos.error);
    expect(selectors.getTodosError(state2)).toEqual(state2.todos.error);
  });
});
