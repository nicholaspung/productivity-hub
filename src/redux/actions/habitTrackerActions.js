import { DATE_RANGES } from '../../constants/habitTrackerConstants';
import {
  helperReplaceObjectInArray,
  helperRemoveObjectFromArray,
} from '../../utils/baseUtils';
import {
  sortTodosOrHabits,
  sortDailies,
  transformDailiesForCache,
} from '../../utils/habitTrackerUtils';
import {
  getDailiesForDay as getDailiesForDayAPI,
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
  createDailiesForDay as createDailiesForDayAPI,
  getDailiesForWeek as getDailiesForWeekAPI,
  getDailiesForMonth as getDailiesForMonthAPI,
  getDailiesForYear as getDailiesForYearAPI,
  getHabits as getHabitsAPI,
} from '../../api/habitTrackerApi';
import { getYesterday } from '../../utils/dateUtils';

export const HABITS_FETCHING = 'HABITS_FETCHING';
export const HABITS_FETCHING_DONE = 'HABITS_FETCHING_DONE';
export const HABITS_FETCHING_ERROR = 'HABITS_FETCHING_ERROR';
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
export const HABIT_TRACKER_CLEAR = 'HABIT_TRACKER_CLEAR';
export const TODAY_DAILY_CACHE = 'TODAY_DAILY_CACHE';
export const YESTERDAY_DAILY_CACHE = 'YESTERDAY_DAILY_CACHE';

export const toggleDaily = (daily) => async (dispatch, getState) => {
  dispatch({ type: DAILIES_TOGGLE });
  try {
    const { data } = await toggleDailyAPI(daily);
    const { dailies } = getState();
    const dailiesCacheCopy = { ...dailies.dailiesCache };
    const currentDate = dailiesCacheCopy[daily.date];
    currentDate[currentDate.findIndex((el) => el.id === daily.id)] = data;
    dailiesCacheCopy[daily.date] = currentDate;
    dispatch({ type: DAILIES_CACHE_DONE, payload: dailiesCacheCopy });
    const dailiesCopy = helperReplaceObjectInArray(dailies, 'dailies', data);
    return dispatch({ type: DAILIES_TOGGLE_DONE, payload: dailiesCopy });
  } catch (err) {
    return dispatch({ type: DAILIES_TOGGLE_ERROR, payload: err });
  }
};
const fetchDailiesForDay = (apiCall, date = new Date()) => async (
  dispatch,
  getState,
) => {
  dispatch({ type: DAILIES_FETCHING });
  try {
    const { data } = await apiCall(date);
    const { dailies } = getState();
    const { dailiesCache: dateObj } = dailies;
    dispatch({
      type: DAILIES_CACHE_DONE,
      payload: transformDailiesForCache(dateObj, data),
    });
    data.sort(sortDailies);
    if (date.toLocaleDateString() === new Date().toLocaleDateString()) {
      dispatch({ type: TODAY_DAILY_CACHE });
    } else if (
      date.toLocaleDateString() === getYesterday().toLocaleDateString()
    ) {
      dispatch({ type: YESTERDAY_DAILY_CACHE });
    }
    return dispatch({ type: DAILIES_FETCHING_DONE, payload: data });
  } catch (err) {
    return dispatch({ type: DAILIES_FETCHING_ERROR, payload: err });
  }
};
export const getDailiesForToday = () => fetchDailiesForDay(getDailiesForDayAPI);
export const createDailiesForDay = (date = new Date()) =>
  fetchDailiesForDay(createDailiesForDayAPI, date);
const fetchDailiesForDateRange = (
  apiCall,
  dateRange,
  date = new Date(),
) => async (dispatch, getState) => {
  dispatch({ type: DAILIES_FETCHING });
  try {
    const { data } = await apiCall(date);
    const { dailies } = getState();
    const { dailiesCache: dateObj, dateRangeCache } = dailies;
    dispatch({ type: DAILIES_CACHE_FETCHING });
    data.sort(sortDailies);
    if (dateRange) {
      dispatch({ type: DAILIES_DATE_RANGE_FETCHING });
      const fetchedDateRange = { ...dateRangeCache, [dateRange]: true };
      dispatch({ type: DAILIES_DATE_RANGE_DONE, payload: fetchedDateRange });
    }
    return dispatch({
      type: DAILIES_CACHE_DONE,
      payload: transformDailiesForCache(dateObj, data),
    });
  } catch (err) {
    return dispatch({ type: DAILIES_CACHE_ERROR, payload: err });
  }
};
export const getDailiesForWeek = (date) =>
  fetchDailiesForDateRange(getDailiesForWeekAPI, DATE_RANGES.WEEK, date);
export const getDailiesForMonth = (date) =>
  fetchDailiesForDateRange(getDailiesForMonthAPI, DATE_RANGES.MONTH, date);
export const getDailiesForYear = (date) =>
  fetchDailiesForDateRange(getDailiesForYearAPI, DATE_RANGES.YEAR, date);
export const getHabits = () => async (dispatch) => {
  dispatch({ type: HABITS_FETCHING });
  try {
    const { data } = await getHabitsAPI();
    data.sort(sortTodosOrHabits);
    return dispatch({ type: HABITS_FETCHING_DONE, payload: data });
  } catch (err) {
    return dispatch({ type: HABITS_FETCHING_ERROR, payload: err });
  }
};
export const addHabit = (habit) => async (dispatch, getState) => {
  dispatch({ type: HABITS_UPDATING });
  const {
    dailies: { habits },
  } = getState();
  try {
    const { data } = await addHabitAPI(habit);
    if (habits.length) {
      dispatch({ type: HABITS_UPDATING_DONE, payload: [...habits, data] });
    }
    return dispatch(createDailiesForDay());
  } catch (err) {
    return dispatch({ type: HABITS_UPDATING_ERROR, payload: err });
  }
};
export const editHabit = (id, habit) => async (dispatch, getState) => {
  dispatch({ type: HABITS_UPDATING });
  const { dailies } = getState();
  try {
    const { data } = await editHabitAPI(id, habit);
    if (dailies.habits.length) {
      const habitsCopy = helperReplaceObjectInArray(dailies, 'habits', data);
      dispatch({ type: HABITS_UPDATING_DONE, payload: habitsCopy });
    }
    return dispatch(getDailiesForToday());
  } catch (err) {
    return dispatch({ type: HABITS_UPDATING_ERROR, payload: err });
  }
};
export const reorderHabits = (firstId, secondId) => async (
  dispatch,
  getState,
) => {
  dispatch({ type: HABITS_UPDATING });
  try {
    const { data } = await reorderHabitsAPI(firstId, secondId);
    const {
      dailies: { habits },
    } = getState();
    if (habits.length) {
      const habitsCopy = [...habits];
      data.forEach((habit) => {
        const index = habitsCopy.findIndex((el) => el.id === habit.id);
        habitsCopy[index] = habit;
      });
      habitsCopy.sort(sortTodosOrHabits);
      dispatch({ type: HABITS_UPDATING_DONE, payload: habitsCopy });
    }
    return dispatch(getDailiesForToday());
  } catch (err) {
    return dispatch({ type: HABITS_UPDATING_ERROR, payload: err });
  }
};
export const deleteHabit = (id) => async (dispatch, getState) => {
  dispatch({ type: HABITS_DELETING });
  try {
    await deleteHabitAPI(id);
    const {
      dailies: { habits },
    } = getState();
    if (habits.length) {
      const idIndex = habits.findIndex((el) => el.id === id);
      const habitsCopy = helperRemoveObjectFromArray(habits, idIndex);
      dispatch({ type: HABITS_DELETING_DONE, payload: habitsCopy });
    }
    return dispatch(createDailiesForDay());
  } catch (err) {
    return dispatch({ type: HABITS_DELETING_ERROR, payload: err });
  }
};
export const getTodos = () => async (dispatch) => {
  dispatch({ type: TODOS_FETCHING });
  try {
    const { data } = await getTodosAPI();
    data.sort(sortTodosOrHabits);
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
    const todosCopy = helperReplaceObjectInArray(todos, 'todos', data);
    return dispatch({ type: TODOS_EDITING_DONE, payload: todosCopy });
  } catch (err) {
    return dispatch({ type: TODOS_EDITING_ERROR, payload: err });
  }
};
export const reorderTodos = (firstId, secondId) => async (
  dispatch,
  getState,
) => {
  dispatch({ type: TODOS_REORDERING });
  try {
    const { data } = await reorderTodosAPI(firstId, secondId);
    const { todos } = getState();
    const todosCopy = [...todos.todos];
    data.forEach((todo) => {
      const index = todosCopy.findIndex((el) => el.id === todo.id);
      todosCopy[index] = todo;
    });
    todosCopy.sort(sortTodosOrHabits);
    return dispatch({ type: TODOS_REORDERING_DONE, payload: todosCopy });
  } catch (err) {
    return dispatch({ type: TODOS_REORDERING_ERROR, payload: err });
  }
};
export const deleteTodo = (id) => async (dispatch, getState) => {
  dispatch({ type: TODOS_DELETING });
  try {
    await deleteTodoAPI(id);
    const { todos } = getState();
    const idIndex = todos.todos.findIndex((el) => el.id === id);
    const todosCopy = helperRemoveObjectFromArray(todos.todos, idIndex);
    return dispatch({ type: TODOS_DELETING_DONE, payload: todosCopy });
  } catch (err) {
    return dispatch({ type: TODOS_DELETING_ERROR, payload: err });
  }
};
export const clearHabitTracker = () => ({ type: HABIT_TRACKER_CLEAR });
