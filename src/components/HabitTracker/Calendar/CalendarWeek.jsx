import React from 'react';
import PropTypes from 'prop-types';
import CalendarDay from './CalendarDay';
import CalendarWeekNames from './CalendarWeekNames';

const CalendarWeek = ({ display, dailiesCache, labelView }) => (
  <div className="flex flex-row flex-wrap sm:max-w-xl w-full">
    <CalendarWeekNames />
    <ul className="flex justify-around w-full">
      {display.map((day) => (
        <CalendarDay
          dailiesCache={dailiesCache}
          labelView={labelView}
          day={day}
          key={day}
        />
      ))}
    </ul>
  </div>
);

CalendarWeek.propTypes = {
  display: PropTypes.array.isRequired,
  dailiesCache: PropTypes.object.isRequired,
  labelView: PropTypes.string.isRequired,
};

export default CalendarWeek;
