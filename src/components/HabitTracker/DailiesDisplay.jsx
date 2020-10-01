import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getDailiesForWeek as getDailiesForWeekAction,
  getDailiesForMonth as getDailiesForMonthAction,
  getDailiesForYear as getDailiesForYearAction,
} from './redux/actions';
import { getDailiesDailiesCache } from './redux/selectors';
import {
  smallerFilledButtonClassName,
  smallerButtonClassName,
} from '../BaseComponents';
import { ReactComponent as ArrowLeftSVG } from '../../assets/icons/arrowleft.svg';
import { ReactComponent as ArrowRightSVG } from '../../assets/icons/arrowright.svg';

const getDaysInMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const getDaysInYear = (date) => {
  const isLeapYear =
    date.getFullYear() % 400 === 0 ||
    date.getFullYear() % 100 === 0 ||
    date.getFullYear() % 4 === 0;
  return isLeapYear ? 366 : 365;
};

const getFirstDateInWeek = (date) => {
  const daysToSunday = date.getDay();
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - daysToSunday,
  );
};
const getFirstDateInMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);
const getFirstDateInYear = (date) => new Date(date.getFullYear(), 0, 1);

const getDateTransform = (date) => {
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

const weekArray = () => Array(7).fill(0);
const monthArray = (date) => Array(getDaysInMonth(date)).fill(0);
const yearArray = (date) => Array(getDaysInYear(date)).fill(0);

const getArrayWithDates = (date, arrayFunction, firstDateFunction) => {
  const day = firstDateFunction(date);
  return arrayFunction(date).map((x, i) =>
    getDateTransform(
      new Date(day.getFullYear(), day.getMonth(), day.getDate() + i),
    ),
  );
};

const getDayInfo = (array) => {
  const finishedLength = array.filter((day) => day.habit.finished).length;
  return [finishedLength, array.length, finishedLength / array.length];
};

const VIEWS = {
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

const DIRECTIONS = {
  UP: 'UP',
  DOWN: 'DOWN',
};

const changeDate = (date, view, direction) => {
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
      month = date.getDate() - 1;
    }
    return new Date(date.getFullYear(), month, date.getDate());
  }
  let year = date.getFullYear() + 1;
  if (direction === DIRECTIONS.DOWN) {
    year = date.getFullYear() - 1;
  }
  return new Date(year, date.getMonth(), date.getDate());
};

const DailiesDisplay = ({
  getDailiesForWeek,
  dailiesCache,
  getDailiesForMonth,
  getDailiesForYear,
}) => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(VIEWS.WEEK);
  const [display, setDisplay] = useState(
    getArrayWithDates(date, view.arrayFunction, view.firstDayFunction),
  );
  useEffect(() => {
    getDailiesForWeek();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setDisplay(
      getArrayWithDates(date, view.arrayFunction, view.firstDayFunction),
    );
  }, [date, view]);
  return (
    <div className="p-4 flex flex-col items-center">
      <div className="flex p-4 items-center">
        <button
          type="button"
          onClick={() => setDate(changeDate(date, view.label, DIRECTIONS.DOWN))}
          className={`${smallerFilledButtonClassName} mx-2`}
        >
          <ArrowLeftSVG className="w-4 h-auto" />
        </button>
        <span className="text-3xl px-5 font-bold">{date.toDateString()}</span>
        <button
          type="button"
          onClick={() => setDate(changeDate(date, view.label, DIRECTIONS.UP))}
          className={`${smallerFilledButtonClassName} mx-2`}
        >
          <ArrowRightSVG className="w-4 h-auto" />
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => setView(VIEWS.WEEK)}
          className={`${
            view.label === VIEWS.WEEK.label
              ? smallerFilledButtonClassName
              : smallerButtonClassName
          } mx-2`}
        >
          Week View
        </button>
        <button
          type="button"
          onClick={async () => {
            if (!dailiesCache[getDateTransform(getFirstDateInMonth(date))]) {
              await getDailiesForMonth();
            }
            setView(VIEWS.MONTH);
          }}
          className={`${
            view.label === VIEWS.MONTH.label
              ? smallerFilledButtonClassName
              : smallerButtonClassName
          } mx-2`}
        >
          Month View
        </button>
        <button
          type="button"
          onClick={async () => {
            if (!dailiesCache[getDateTransform(getFirstDateInYear(date))]) {
              await getDailiesForYear();
            }
            setView(VIEWS.YEAR);
          }}
          className={`${
            view.label === VIEWS.YEAR.label
              ? smallerFilledButtonClassName
              : smallerButtonClassName
          } mx-2`}
        >
          Year View
        </button>
      </div>
      <ul className="flex flex-row">
        {display.map((day) => {
          let finishedLength = 0;
          let totalLength = 0;
          let percentageLabel = 'No habits were found.';
          if (dailiesCache[day]) {
            const dayInfo = getDayInfo(dailiesCache[day]);
            [finishedLength, totalLength, percentageLabel] = dayInfo;
          }
          return (
            <li key={day}>
              <p>{`${Number(day.slice(5, 7))}-${Number(day.slice(8))}`}</p>
              <p>{percentageLabel}</p>
              {dailiesCache[day] && (
                <p>
                  {finishedLength}/{totalLength}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default connect(
  (state) => ({ dailiesCache: getDailiesDailiesCache(state) }),
  {
    getDailiesForWeek: getDailiesForWeekAction,
    getDailiesForMonth: getDailiesForMonthAction,
    getDailiesForYear: getDailiesForYearAction,
  },
)(DailiesDisplay);
