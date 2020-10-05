import { DIRECTIONS } from './constants';

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
  const finishedLength = array.filter((day) => day.finished).length;
  return [finishedLength, array.length, finishedLength / array.length];
};

export const getDateTransform = (date) => {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (String(month).length === 1) {
    month = `0${month}`;
  }
  if (String(day).length === 1) {
    day = `0${day}`;
  }
  return `${date.getFullYear()}-${month}-${day}`;
};

export const getArrayWithDates = (date, arrayFunction, firstDateFunction) => {
  const day = firstDateFunction(date);
  return arrayFunction(date).map((x, i) =>
    getDateTransform(
      new Date(day.getFullYear(), day.getMonth(), day.getDate() + i),
    ),
  );
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

export const getYesterday = () => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
};
