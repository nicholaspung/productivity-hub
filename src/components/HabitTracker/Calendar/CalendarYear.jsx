import React from 'react';
import PropTypes from 'prop-types';
import CalendarMonth from './CalendarMonth';
import { getNumOfDaysForMonthForYear } from '../../../utils/habitTrackerUtils';

const CalendarYear = ({ dailiesCache, display }) => {
  const [
    jan,
    feb,
    mar,
    apr,
    may,
    jun,
    jul,
    aug,
    sep,
    oct,
    nov,
    dec,
  ] = getNumOfDaysForMonthForYear(display);

  return (
    <>
      <p className="text-xl font-bold m-4 w-full text-center">
        {display[0].slice(0, 4)}
      </p>
      <div className="flex flex-wrap justify-around items-start">
        <CalendarMonth
          display={display.slice(0, jan)}
          dailiesCache={dailiesCache}
        />
        <CalendarMonth
          display={display.slice(jan, feb)}
          dailiesCache={dailiesCache}
        />
        <CalendarMonth
          display={display.slice(feb, mar)}
          dailiesCache={dailiesCache}
        />
        <CalendarMonth
          display={display.slice(mar, apr)}
          dailiesCache={dailiesCache}
        />
        <CalendarMonth
          display={display.slice(apr, may)}
          dailiesCache={dailiesCache}
        />
        <CalendarMonth
          display={display.slice(may, jun)}
          dailiesCache={dailiesCache}
        />
        <CalendarMonth
          display={display.slice(jun, jul)}
          dailiesCache={dailiesCache}
        />
        <CalendarMonth
          display={display.slice(jul, aug)}
          dailiesCache={dailiesCache}
        />
        <CalendarMonth
          display={display.slice(aug, sep)}
          dailiesCache={dailiesCache}
        />
        <CalendarMonth
          display={display.slice(sep, oct)}
          dailiesCache={dailiesCache}
        />
        <CalendarMonth
          display={display.slice(oct, nov)}
          dailiesCache={dailiesCache}
        />
        <CalendarMonth
          display={display.slice(nov, dec)}
          dailiesCache={dailiesCache}
        />
      </div>
    </>
  );
};

CalendarYear.propTypes = {
  dailiesCache: PropTypes.object.isRequired,
  display: PropTypes.array.isRequired,
};

export default CalendarYear;
