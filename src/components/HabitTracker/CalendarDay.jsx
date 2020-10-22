import React from 'react';
import PropTypes from 'prop-types';
import { VIEWS, getDayInfo, getJavascriptDateTransform } from './utils';
import { SHORT_MONTH_NAMES, displayColor } from './constants';

const CalendarDay = ({ dailiesCache, day, labelView = '' }) => {
  let finishedLength = 0;
  let totalLength = 0;
  let percentageLabel = 0;
  if (dailiesCache[day]) {
    [finishedLength, totalLength, percentageLabel] = getDayInfo(
      dailiesCache[day],
    );
  }
  const isPreviousDay = getJavascriptDateTransform(day) < new Date();
  return (
    <li className="m-2">
      {labelView === VIEWS.WEEK.label && (
        <p className="text-center hidden md:block">
          {`${SHORT_MONTH_NAMES[Number(day.slice(5, 7)) - 1]} ${Number(
            day.slice(8),
          )}`}
        </p>
      )}
      <div
        className={`w-8 h-8 md:w-16 md:h-16 md:flex md:flex-col md:items-end md:justify-end rounded-md border-2 ${
          // totalLength && displayColor({ percentage: percentageLabel })[0]
          (isPreviousDay || totalLength) &&
          displayColor({ percentage: percentageLabel })[0]
        }`}
      >
        {dailiesCache[day] && (
          <p className="text-xs text-right p-2 text-white font-bold">
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            {finishedLength}/{totalLength}
          </p>
        )}
      </div>
    </li>
  );
};

CalendarDay.propTypes = {
  dailiesCache: PropTypes.object.isRequired,
  day: PropTypes.string.isRequired,
  labelView: PropTypes.string,
};

export default CalendarDay;
