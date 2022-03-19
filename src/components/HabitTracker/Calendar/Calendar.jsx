import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDailiesForWeek as getDailiesForWeekAction } from '../../../redux/actions/habitTrackerActions';
import {
  getDailiesDailiesCache,
  getDailiesDateRangeCache,
} from '../../../redux/selectors/habitTrackerSelectors';
import CalendarHeader from './CalendarHeader';
import { VIEWS, getArrayWithDates } from '../../../utils/habitTrackerUtils';
import CalendarWeek from './CalendarWeek';
import CalendarMonth from './CalendarMonth';
import CalendarYear from './CalendarYear';
import { ReactComponent as ArrowCircleDown } from '../../../assets/icons/arrowCircleDown.svg';
import { ReactComponent as ArrowCircleUp } from '../../../assets/icons/arrowCircleUp.svg';

const Calendar = ({ dailiesCache, getDailiesForWeek, dateRangeCache }) => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(VIEWS.WEEK);

  useEffect(() => {
    if (!dateRangeCache[VIEWS.WEEK.label]) {
      getDailiesForWeek();
    }
  }, [getDailiesForWeek, dateRangeCache]);

  const display = getArrayWithDates(
    date,
    view.arrayFunction,
    view.firstDayFunction,
  );

  return (
    <>
      {view === VIEWS.YEAR && (
        <div className="fixed bottom-0 right-0 flex p-8">
          <a href="/habit-tracker#top-of-calendar">
            <ArrowCircleUp
              className="w-12 h-auto bg-white rounded-3xl"
              title="Unarchive habit"
            />
          </a>
          <a href="/habit-tracker#top-of-habits">
            <ArrowCircleDown
              className="w-12 h-auto bg-white rounded-3xl"
              title="Unarchive habit"
            />
          </a>
        </div>
      )}
      <div className="p-4 flex flex-col items-center mb-4" id="top-of-calendar">
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
      </div>
    </>
  );
};

Calendar.propTypes = {
  dailiesCache: PropTypes.object.isRequired,
  dateRangeCache: PropTypes.object.isRequired,
  getDailiesForWeek: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    dailiesCache: getDailiesDailiesCache(state),
    dateRangeCache: getDailiesDateRangeCache(state),
  }),
  { getDailiesForWeek: getDailiesForWeekAction },
)(memo(Calendar));
