import {
  getDateTransform,
  ISOStringToJavascriptDate,
} from '../../utils/dateUtils';

export const getDailiesState = (store) => store.dailies;
export const getDailiesDailies = (store) => getDailiesState(store).dailies;
export const getDailiesLoadingStatus = (store) =>
  getDailiesState(store).loading;
export const getDailiesDailiesCache = (store) =>
  getDailiesState(store).dailiesCache;
export const getDailiesDailiesCacheForDate = (store, date) =>
  getDailiesDailiesCache(store)[getDateTransform(date)] || [];
export const getDailiesDateRangeCache = (store) =>
  getDailiesState(store).dateRangeCache;
export const getDailiesError = (store) => getDailiesState(store).error;
export const getDailiesTodayDailyCache = (store) =>
  getDailiesState(store).todayDailyCache;
export const getDailiesYesterdayDailyCache = (store) =>
  getDailiesState(store).yesterdayDailyCache;

export const getTodosState = (store) => store.todos;
export const getTodosTodos = (store) => getTodosState(store).todos;
export const getTodosLoadingStatus = (store) => getTodosState(store).loading;
export const getTodosError = (store) => getTodosState(store).error;
export const getTodosCache = (store) => getTodosState(store).cache;

export const getDailiesHabits = (store) => getDailiesState(store).habits;
export const getDailiesHabitsCache = (store) =>
  getDailiesState(store).habitsCache;

export const getEarliestHabitDate = (store, today = new Date()) =>
  getDailiesDailies(store).reduce((acc, curr) => {
    if (!curr.habit) return acc;
    if (ISOStringToJavascriptDate(curr.habit.date_created) < acc) {
      return ISOStringToJavascriptDate(curr.habit.date_created);
    }
    return acc;
  }, today);
