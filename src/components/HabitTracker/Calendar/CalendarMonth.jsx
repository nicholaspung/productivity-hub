import React from 'react';
import PropTypes from 'prop-types';
import { LONG_MONTH_NAMES } from '../../../constants/habitTrackerConstants';
import {
  createFrontEmptyDates,
  createBackEmptyDates,
} from '../../../utils/habitTrackerUtils';
import CalendarEmptyDates from './CalendarEmptyDates';
import CalendarDay from './CalendarDay';
import CalendarWeekNames from './CalendarWeekNames';

const CalendarMonth = ({ dailiesCache, display }) => (
  <div className="flex flex-row flex-wrap max-w-xl justify-center">
    <p className="text-xl font-bold m-4 w-full text-center">
      {LONG_MONTH_NAMES[Number(display[0].slice(5, 7)) - 1]}
    </p>
    <CalendarWeekNames />
    <ul className="flex justify-around w-full flex-wrap">
      {createFrontEmptyDates(display[0]).map((day, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <CalendarEmptyDates key={`${day}${idx}`} />
      ))}
      {display.map((day) => (
        <CalendarDay dailiesCache={dailiesCache} day={day} key={day} />
      ))}
      {createBackEmptyDates(display[display.length - 1]).map((day, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <CalendarEmptyDates key={`${day}${idx}`} />
      ))}
    </ul>
  </div>
);

CalendarMonth.propTypes = {
  dailiesCache: PropTypes.object.isRequired,
  display: PropTypes.array.isRequired,
};

export default CalendarMonth;
