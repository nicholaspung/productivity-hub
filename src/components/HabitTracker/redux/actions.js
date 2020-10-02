import {
  getDailiesForToday as getDailiesForTodayAPI,
  getTodos as getTodosAPI,
  addHabit as addHabitAPI,
  addTodo as addTodoAPI,
  editHabit as editHabitAPI,
  deleteHabit as deleteHabitAPI,
  reorderHabits as reorderHabitsAPI,
  editTodo as editTodoAPI,
  deleteTodo as deleteTodoAPI,
  reorderTodos as reorderTodosAPI,
  toggleDaily as toggleDailyAPI,
  createDailiesForToday as createDailiesForTodayAPI,
  getDailiesForWeek as getDailiesForWeekAPI,
  getDailiesForMonth as getDailiesForMonthAPI,
  getDailiesForYear as getDailiesForYearAPI,
} from '../api';

export const HABITS_UPDATING = 'HABITS_UPDATING';
export const HABITS_UPDATING_DONE = 'HABITS_UPDATING_DONE';
export const HABITS_UPDATING_ERROR = 'HABITS_UPDATING_ERROR';
export const HABITS_DELETING = 'HABITS_DELETING';
export const HABITS_DELETING_DONE = 'HABITS_DELETING_DONE';
export const HABITS_DELETING_ERROR = 'HABITS_DELETING_ERROR';
export const TODOS_FETCHING = 'TODOS_FETCHING';
export const TODOS_FETCHING_DONE = 'TODOS_FETCHING_DONE';
export const TODOS_FETCHING_ERROR = 'TODOS_FETCHING_ERROR';
export const TODOS_ADDING = 'TODOS_ADDING';
export const TODOS_ADDING_DONE = 'TODOS_ADDING_DONE';
export const TODOS_ADDING_ERROR = 'TODOS_ADDING_ERROR';
export const TODOS_EDITING = 'TODOS_EDITING';
export const TODOS_EDITING_DONE = 'TODOS_EDITING_DONE';
export const TODOS_EDITING_ERROR = 'TODOS_EDITING_ERROR';
export const TODOS_DELETING = 'TODOS_DELETING';
export const TODOS_DELETING_DONE = 'TODOS_DELETING_DONE';
export const TODOS_DELETING_ERROR = 'TODOS_DELETING_ERROR';
export const TODOS_REORDERING = 'TODOS_REORDERING';
export const TODOS_REORDERING_DONE = 'TODOS_REORDERING_DONE';
export const TODOS_REORDERING_ERROR = 'TODOS_REORDERING_ERROR';
export const DAILIES_FETCHING = 'DAILIES_FETCHING';
export const DAILIES_FETCHING_DONE = 'DAILIES_FETCHING_DONE';
export const DAILIES_FETCHING_ERROR = 'DAILIES_FETCHING_ERROR';
export const DAILIES_TOGGLE = 'DAILIES_TOGGLE';
export const DAILIES_TOGGLE_DONE = 'DAILIES_TOGGLE_DONE';
export const DAILIES_TOGGLE_ERROR = 'DAILIES_TOGGLE_ERROR';
export const DAILIES_CACHE_FETCHING = 'DAILIES_CACHE_FETCHING';
export const DAILIES_CACHE_DONE = 'DAILIES_CACHE_DONE';
export const DAILIES_CACHE_ERROR = 'DAILIES_CACHE_ERROR';
export const DAILIES_DATE_RANGE_FETCHING = 'DAILIES_DATE_RANGE_FETCHING';
export const DAILIES_DATE_RANGE_DONE = 'DAILIES_DATE_RANGE_DONE';

export const toggleDaily = (daily) => async (dispatch, getState) => {
  dispatch({ type: DAILIES_TOGGLE });
  const { dailies } = getState();
  const { dailies: dailiesDailies, dailiesCache } = dailies;
  const dailiesCopy = [...dailiesDailies];
  const dailiesCacheCopy = { ...dailiesCache };
  try {
    const { data } = await toggleDailyAPI(daily);
    dailiesCopy[dailiesDailies.findIndex((el) => el.id === data.id)] = data;
    const currentDate = dailiesCacheCopy[daily.date];
    currentDate[currentDate.findIndex((el) => el.id === daily.id)] = data;
    dailiesCacheCopy[daily.date] = currentDate;
    dispatch({ type: DAILIES_CACHE_DONE, payload: dailiesCacheCopy });
    return dispatch({ type: DAILIES_TOGGLE_DONE, payload: dailiesCopy });
  } catch (err) {
    return dispatch({ type: DAILIES_TOGGLE_ERROR, payload: err });
  }
};

export const createDailiesForToday = () => async (dispatch, getState) => {
  dispatch({ type: DAILIES_FETCHING });
  const { dailies } = getState();
  try {
    const { data } = await createDailiesForTodayAPI();

    if (!Object.keys(dailies.dailiesCache).length) {
      dispatch({ type: DAILIES_CACHE_FETCHING });
      const { dailiesCache: dateObj } = dailies;
      data.forEach((daily) => {
        if (dateObj[daily.date]) {
          if (
            dateObj[daily.date].findIndex((el) => el.id === daily.id) === -1
          ) {
            dateObj[daily.date].push(daily);
          }
        } else {
          dateObj[daily.date] = [daily];
        }
      });
      dispatch({ type: DAILIES_CACHE_DONE, payload: dateObj });
    }

    data.sort((a, b) => {
      if (a.habit.order > b.habit.order) return 1;
      if (a.habit.order < b.habit.order) return -1;
      return 0;
    });
    return dispatch({ type: DAILIES_FETCHING_DONE, payload: data });
  } catch (err) {
    return dispatch({ type: DAILIES_FETCHING_ERROR, payload: err });
  }
};

export const getDailiesForToday = () => async (dispatch, getState) => {
  dispatch({ type: DAILIES_FETCHING });
  const { dailies } = getState();
  try {
    const { data } = await getDailiesForTodayAPI();

    const { dailiesCache: dateObj } = dailies;
    data.forEach((daily) => {
      const index = dateObj[daily.date].findIndex((el) => el.id === daily.id);
      dateObj[daily.date][index] = daily;
    });
    dispatch({ type: DAILIES_CACHE_DONE, payload: dateObj });

    data.sort((a, b) => {
      if (a.habit.order > b.habit.order) return 1;
      if (a.habit.order < b.habit.order) return -1;
      return 0;
    });
    return dispatch({ type: DAILIES_FETCHING_DONE, payload: data });
  } catch (err) {
    return dispatch({ type: DAILIES_FETCHING_ERROR, payload: err });
  }
};

const DATE_RANGES = {
  WEEK: 'WEEK',
  MONTH: 'MONTH',
  YEAR: 'YEAR',
};
const getDailiesForDateRange = (apiCall, dateRange, date) => async (
  dispatch,
  getState,
) => {
  dispatch({ type: DAILIES_CACHE_FETCHING });
  const { dailies } = getState();
  try {
    let data;
    if (date) {
      const response = await apiCall(date);
      data = response.data;
    } else {
      const response = await apiCall();
      data = response.data;
    }
    const { dailiesCache: dateObj, dateRangeCache } = dailies;
    data.forEach((daily) => {
      if (dateObj[daily.date]) {
        if (dateObj[daily.date].findIndex((el) => el.id === daily.id) === -1) {
          dateObj[daily.date].push(daily);
        }
      } else {
        dateObj[daily.date] = [daily];
      }
    });

    if (dateRange) {
      dispatch({ type: DAILIES_DATE_RANGE_FETCHING });
      const fetchedDateRange = { ...dateRangeCache, [dateRange]: true };
      dispatch({ type: DAILIES_DATE_RANGE_DONE, payload: fetchedDateRange });
    }
    return dispatch({ type: DAILIES_CACHE_DONE, payload: dateObj });
  } catch (err) {
    return dispatch({ type: DAILIES_CACHE_ERROR, payload: err });
  }
};

export const getDailiesForWeek = (date) =>
  getDailiesForDateRange(getDailiesForWeekAPI, DATE_RANGES.WEEK, date);

export const getDailiesForMonth = (date) =>
  getDailiesForDateRange(getDailiesForMonthAPI, DATE_RANGES.MONTH, date);

export const getDailiesForYear = (date) =>
  getDailiesForDateRange(getDailiesForYearAPI, DATE_RANGES.YEAR, date);

export const addHabit = (habit) => async (dispatch) => {
  dispatch({ type: HABITS_UPDATING });
  try {
    await addHabitAPI(habit);
    dispatch({ type: HABITS_UPDATING_DONE });
    return dispatch(getDailiesForToday());
  } catch (err) {
    return dispatch({ type: HABITS_UPDATING_ERROR, payload: err });
  }
};

export const editHabit = (id, habit) => async (dispatch) => {
  dispatch({ type: HABITS_UPDATING });
  try {
    await editHabitAPI(id, habit);
    dispatch({ type: HABITS_UPDATING_DONE });
    return dispatch(getDailiesForToday());
  } catch (err) {
    return dispatch({ type: HABITS_UPDATING_ERROR, payload: err });
  }
};

export const reorderHabits = (firstId, secondId) => async (dispatch) => {
  dispatch({ type: HABITS_UPDATING });
  try {
    await reorderHabitsAPI(firstId, secondId);
    dispatch({ type: HABITS_UPDATING_DONE });
    return dispatch(getDailiesForToday());
  } catch (err) {
    return dispatch({ type: HABITS_UPDATING_ERROR, payload: err });
  }
};

export const deleteHabit = (id) => async (dispatch) => {
  dispatch({ type: HABITS_DELETING });
  try {
    await deleteHabitAPI(id);
    dispatch({ type: HABITS_UPDATING_DONE });
    return dispatch(getDailiesForToday());
  } catch (err) {
    return dispatch({ type: HABITS_DELETING_ERROR, payload: err });
  }
};

const todosSortFunction = (a, b) => {
  if (a.order > b.order) return 1;
  if (a.order < b.order) return -1;
  return 0;
};

export const getTodos = () => async (dispatch) => {
  dispatch({ type: TODOS_FETCHING });
  try {
    const { data } = await getTodosAPI();
    data.sort(todosSortFunction);
    return dispatch({ type: TODOS_FETCHING_DONE, payload: data });
  } catch (err) {
    return dispatch({ type: TODOS_FETCHING_ERROR, payload: err });
  }
};

export const addTodo = (todo) => async (dispatch, getState) => {
  dispatch({ type: TODOS_ADDING });
  const { todos } = getState();
  try {
    const { data } = await addTodoAPI(todo);
    return dispatch({
      type: TODOS_ADDING_DONE,
      payload: [...todos.todos, data],
    });
  } catch (err) {
    return dispatch({ type: TODOS_ADDING_ERROR, payload: err });
  }
};

export const editTodo = (id, todo) => async (dispatch, getState) => {
  dispatch({ type: TODOS_EDITING });
  const { todos } = getState();
  try {
    const { data } = await editTodoAPI(id, todo);
    const todosCopy = [...todos.todos];
    todosCopy[todos.todos.findIndex((el) => el.id === data.id)] = data;
    return dispatch({ type: TODOS_EDITING_DONE, payload: todosCopy });
  } catch (err) {
    return dispatch({ type: TODOS_EDITING_ERROR, payload: err });
  }
};

export const deleteTodo = (id) => async (dispatch, getState) => {
  dispatch({ type: TODOS_DELETING });
  const { todos } = getState();
  const idIndex = todos.todos.findIndex((el) => el.id === id);
  try {
    await deleteTodoAPI(id);
    const todosCopy = [...todos.todos];
    todosCopy.splice(idIndex, 1);
    return dispatch({ type: TODOS_DELETING_DONE, payload: todosCopy });
  } catch (err) {
    return dispatch({ type: TODOS_DELETING_ERROR });
  }
};

export const reorderTodos = (firstId, secondId) => async (
  dispatch,
  getState,
) => {
  dispatch({ type: TODOS_REORDERING });
  const { todos } = getState();
  try {
    const { data } = await reorderTodosAPI(firstId, secondId);
    const todosCopy = [...todos.todos];
    data.forEach((todo) => {
      const index = todosCopy.findIndex((el) => el.id === todo.id);
      todosCopy[index] = todo;
    });
    todosCopy.sort(todosSortFunction);
    return dispatch({ type: TODOS_REORDERING_DONE, payload: todosCopy });
  } catch (err) {
    return dispatch({ type: TODOS_REORDERING_ERROR, payload: err });
  }
};

export const HABIT_TRACKER_CLEAR = 'HABIT_TRACKER_CLEAR';
export const clearHabitTracker = () => ({ type: HABIT_TRACKER_CLEAR });
