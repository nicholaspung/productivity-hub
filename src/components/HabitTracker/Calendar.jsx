import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDailiesForWeek as getDailiesForWeekAction } from './redux/actions';
import {
  getDailiesDailiesCache,
  getDailiesDateRangeCache,
  getDailiesLoadingStatus,
} from './redux/selectors';
import CalendarHeader from './CalendarHeader';
import { VIEWS, getArrayWithDates } from './utils';
import CalendarWeek from './CalendarWeek';
import CalendarMonth from './CalendarMonth';
import CalendarYear from './CalendarYear';
import { ReactComponent as LoadingSVG } from '../../assets/icons/loading.svg';

const Calendar = ({
  dailiesCache,
  getDailiesForWeek,
  dateRangeCache,
  loading,
}) => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(VIEWS.WEEK);
  const display = getArrayWithDates(
    date,
    view.arrayFunction,
    view.firstDayFunction,
  );
  useEffect(() => {
    if (!dateRangeCache[VIEWS.WEEK.label]) {
      getDailiesForWeek();
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="p-4 flex flex-col items-center mb-4">
      {!loading ? (
        <>
          <CalendarHeader
            date={date}
            setDate={setDate}
            view={view}
            setView={setView}
          />
          {view.label === VIEWS.WEEK.label && (
            <CalendarWeek
              dailiesCache={dailiesCache}
              display={display}
              labelView={view.label}
            />
          )}
          {view.label === VIEWS.MONTH.label && (
            <CalendarMonth dailiesCache={dailiesCache} display={display} />
          )}
          {view.label === VIEWS.YEAR.label && (
            <CalendarYear dailiesCache={dailiesCache} display={display} />
          )}
        </>
      ) : (
        <LoadingSVG className="w-16 h-auto animate-spin absolute" />
      )}
    </div>
  );
};

Calendar.propTypes = {
  dailiesCache: PropTypes.object.isRequired,
  dateRangeCache: PropTypes.object.isRequired,
  getDailiesForWeek: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    dailiesCache: getDailiesDailiesCache(state),
    dateRangeCache: getDailiesDateRangeCache(state),
    loading: getDailiesLoadingStatus(state),
  }),
  {
    getDailiesForWeek: getDailiesForWeekAction,
  },
)(Calendar);