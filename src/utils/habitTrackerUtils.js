import { DIRECTIONS, PRIORITIES } from '../constants/habitTrackerConstants';
import { getDateTransform } from './dateUtils';

// Calendar Utils
export const getDaysInMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
export const isLeapYear = (year) => {
  if (year % 100 === 0 && year % 400 !== 0) return false;
  return year % 4 === 0;
};
export const getDaysInYear = (date) => {
  const leapYear = isLeapYear(date.getFullYear());
  return leapYear ? 366 : 365;
};

export const weekArray = () => Array(7).fill(0);
export const monthArray = (date) => Array(getDaysInMonth(date)).fill(0);
export const yearArray = (date) => Array(getDaysInYear(date)).fill(0);

export const getFirstDateInWeek = (date) => {
  const daysToSunday = date.getDay();
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - daysToSunday,
  );
};
export const getFirstDateInMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);
export const getFirstDateInYear = (date) => new Date(date.getFullYear(), 0, 1);

export const VIEWS = {
  WEEK: {
    label: 'WEEK',
    arrayFunction: weekArray,
    firstDayFunction: getFirstDateInWeek,
  },
  MONTH: {
    label: 'MONTH',
    arrayFunction: monthArray,
    firstDayFunction: getFirstDateInMonth,
  },
  YEAR: {
    label: 'YEAR',
    arrayFunction: yearArray,
    firstDayFunction: getFirstDateInYear,
  },
};

export const changeDate = (date, view, direction) => {
  if (view === VIEWS.WEEK.label) {
    let day = date.getDate() + 7;
    if (direction === DIRECTIONS.DOWN) {
      day = date.getDate() - 7;
    }
    return new Date(date.getFullYear(), date.getMonth(), day);
  }
  if (view === VIEWS.MONTH.label) {
    let month = date.getMonth() + 1;
    if (direction === DIRECTIONS.DOWN) {
      month = date.getMonth() - 1;
    }
    return new Date(date.getFullYear(), month, date.getDate());
  }
  let year = date.getFullYear() + 1;
  if (direction === DIRECTIONS.DOWN) {
    year = date.getFullYear() - 1;
  }
  return new Date(year, date.getMonth(), date.getDate());
};

export const getDayInfo = (array) => {
  if (!array || !array.length) {
    return [0, 0, 0];
  }

  const finishedLength = array.filter(
    (day) => day.finished && !day.habit.archived,
  ).length;
  const unarchivedTotalLength = array.filter((day) => !day.habit.archived)
    .length;
  return [
    finishedLength,
    unarchivedTotalLength,
    finishedLength / unarchivedTotalLength,
  ];
};

export const createFrontEmptyDates = (pythonDate) => {
  const date = new Date(
    pythonDate.slice(0, 4),
    pythonDate.slice(5, 7) - 1,
    pythonDate.slice(8, 10),
  );
  const firstDay = getFirstDateInMonth(date);
  const numOfEmptyDates = firstDay.getDay();
  return Array(numOfEmptyDates).fill(0);
};

export const createBackEmptyDates = (pythonDate) => {
  const date = new Date(pythonDate.slice(0, 4), pythonDate.slice(5, 7), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
  const numOfEmptyDates = 6 - lastDay.getDay();
  return Array(numOfEmptyDates).fill(0);
};

export const getArrayWithDates = (date, arrayFunc, firstDateFunc) => {
  const dayObj = firstDateFunc(date);
  const day = dayObj.getDate();
  const month = dayObj.getMonth();
  const year = dayObj.getFullYear();
  return arrayFunc(date).map((_, i) =>
    getDateTransform(new Date(year, month, day + i)),
  );
};

export const getIdxOfFirstDayForMonthsForYear = (display) => {
  const jan = 31;
  const feb = isLeapYear(display[0].slice(0, 4)) ? jan + 29 : jan + 28;
  const mar = feb + 31;
  const apr = mar + 30;
  const may = apr + 31;
  const jun = may + 30;
  const jul = jun + 31;
  const aug = jul + 31;
  const sep = aug + 30;
  const oct = sep + 31;
  const nov = oct + 30;
  const dec = nov + 31;
  return [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec];
};

// Dailies utils
export const sortTodosOrHabits = (a, b) => {
  if (a.order > b.order) return 1;
  if (a.order < b.order) return -1;
  return 0;
};
export const sortDailies = (a, b) => {
  if (a.habit.order > b.habit.order) return 1;
  if (a.habit.order < b.habit.order) return -1;
  return 0;
};
export const transformDailiesForCache = (dateObj, data) => {
  const dateObjCopy = { ...dateObj };
  data.forEach((daily) => {
    if (dateObjCopy[daily.date]) {
      const index = dateObjCopy[daily.date].findIndex(
        (el) => el.id === daily.id,
      );
      if (index === -1) {
        dateObjCopy[daily.date].push(daily);
      } else {
        dateObjCopy[daily.date][index] = daily;
      }
    } else {
      dateObjCopy[daily.date] = [daily];
    }
  });
  return dateObjCopy;
};
export const reorderHabitsUtil = (
  data,
  dailies,
  habits,
  direction,
  apiCall,
) => {
  const isDaily = Boolean(data.date);
  const getHabitObj = (obj) => (isDaily ? obj.habit : obj);
  const dataList = isDaily ? dailies : habits;
  const filteredDataList = dataList.filter(
    (item) => !getHabitObj(item).archived,
  );
  const currentIdx = filteredDataList.findIndex(
    (el) => getHabitObj(el).id === getHabitObj(data).id,
  );
  if (direction === DIRECTIONS.UP) {
    if (currentIdx - 1 < 0) return;
    apiCall(
      getHabitObj(data).id,
      getHabitObj(filteredDataList[currentIdx - 1]).id,
    );
  } else {
    if (currentIdx + 1 > filteredDataList.length - 1) return;
    apiCall(
      getHabitObj(data).id,
      getHabitObj(filteredDataList[currentIdx + 1]).id,
    );
  }
};
export const chosenWeekdays = (weekday, weekdays) => {
  const weekdayIdx = weekdays.findIndex((el) => el === weekday);
  const weekdaysCopy = [...weekdays];
  if (weekdayIdx !== -1) {
    weekdaysCopy.splice(weekdayIdx, 1);
  } else {
    weekdaysCopy.push(weekday);
  }
  return weekdaysCopy;
};
export const reorderTodosUtil = (data, todos, direction, apiCall) => {
  const filteredTodos = todos.filter(
    (item) => !item.finished && item.priority === data.priority,
  );
  const currentIdx = filteredTodos.findIndex((el) => el.id === data.id);
  if (direction === DIRECTIONS.UP) {
    if (currentIdx - 1 < 0) return;
    apiCall(data.id, filteredTodos[currentIdx - 1].id);
  } else {
    if (currentIdx + 1 > filteredTodos.length - 1) return;
    apiCall(data.id, filteredTodos[currentIdx + 1].id);
  }
};
export const sortedTodosForPriorityUtil = (todosArray) => {
  const lowPriority = [];
  const noPriority = [];
  const highPriority = [];
  todosArray.forEach((todo) => {
    if (todo.priority === PRIORITIES.LOW) {
      lowPriority.push(todo);
    } else if (todo.priority === PRIORITIES.NONE) {
      noPriority.push(todo);
    } else {
      highPriority.push(todo);
    }
  });
  return [highPriority, noPriority, lowPriority];
};
