import * as selectors from '../habitTrackerSelectors';

describe('#HabitTrackerSelectors', () => {
  const state1 = {
    dailies: {
      dailies: [],
      dailiesCache: {},
      dateRangeCache: {},
      todayDailyCache: false,
      yesterdayDailyCache: false,
      habits: [],
      habitsCache: false,
      loading: false,
      error: {},
    },
    todos: {
      todos: [],
      cache: false,
      loading: false,
      error: {},
    },
  };
  const state2 = {
    dailies: {
      dailies: [
        { id: 1, habit: { date_created: new Date(2020, 5, 14).toISOString() } },
        { id: 2, habit: { date_created: new Date(2020, 5, 10).toISOString() } },
        { id: 3, habit: { date_created: new Date(2020, 5, 7).toISOString() } },
      ],
      dailiesCache: { '2020-10-02': [{ id: 1 }] },
      dateRangeCache: { WEEK: true },
      todayDailyCache: true,
      yesterdayDailyCache: true,
      habits: [],
      habitsCache: true,
      loading: false,
      error: {},
    },
    todos: {
      todos: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      cache: true,
      loading: false,
      error: { message: 'err' },
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
  it('#getDailiesError', () => {
    expect(selectors.getDailiesError(state1)).toEqual(state1.dailies.error);
    expect(selectors.getDailiesError(state2)).toEqual(state2.dailies.error);
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
  it('#getDailiesHabits', () => {
    expect(selectors.getDailiesHabits(state1)).toEqual(state1.dailies.habits);
    expect(selectors.getDailiesHabits(state2)).toEqual(state2.dailies.habits);
  });
  it('#getEarliestHabitDate', () => {
    const rightNow = new Date();
    expect(selectors.getEarliestHabitDate(state1, rightNow)).toEqual(rightNow);
    expect(selectors.getEarliestHabitDate(state2)).toEqual(
      new Date(2020, 5, 7),
    );
  });
  it('#getDailiesDailiesCacheForDate', () => {
    expect(selectors.getDailiesDailiesCacheForDate(state1, new Date())).toEqual(
      [],
    );
    expect(
      selectors.getDailiesDailiesCacheForDate(state2, new Date(2020, 9, 2)),
    ).toEqual(state2.dailies.dailiesCache['2020-10-02']);
  });
  it('#getDailiesTodayDailyCache', () => {
    expect(selectors.getDailiesTodayDailyCache(state1)).toEqual(false);
    expect(selectors.getDailiesTodayDailyCache(state2)).toEqual(true);
  });
  it('#getDailiesYesterdayDailyCache', () => {
    expect(selectors.getDailiesYesterdayDailyCache(state1)).toEqual(false);
    expect(selectors.getDailiesYesterdayDailyCache(state2)).toEqual(true);
  });
  it('#getTodosCache', () => {
    expect(selectors.getTodosCache(state1)).toEqual(false);
    expect(selectors.getTodosCache(state2)).toEqual(true);
  });
  it('#getDailiesHabitsCache', () => {
    expect(selectors.getDailiesHabitsCache(state1)).toEqual(false);
    expect(selectors.getDailiesHabitsCache(state2)).toEqual(true);
  });
});
