import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  smallerFilledButtonClassName,
  smallerButtonClassName,
  FilledButton,
} from '../../BaseComponents';
import {
  getDailiesForMonth as getDailiesForMonthAction,
  getDailiesForYear as getDailiesForYearAction,
  getDailiesForWeek as getDailiesForWeekAction,
} from '../../../redux/actions/habitTrackerActions';
import { getDailiesDateRangeCache } from '../../../redux/selectors/habitTrackerSelectors';
import { ReactComponent as ArrowLeftSVG } from '../../../assets/icons/arrowleft.svg';
import { ReactComponent as ArrowRightSVG } from '../../../assets/icons/arrowright.svg';
import { VIEWS, changeDate } from '../../../utils/habitTrackerUtils';
import { DIRECTIONS } from '../../../constants/habitTrackerConstants';

const CalendarHeader = ({
  date,
  setDate,
  view,
  setView,
  dateRangeCache,
  getDailiesForMonth,
  getDailiesForYear,
  getDailiesForWeek,
}) => (
  <>
    <div className="flex p-4 items-center">
      <button
        type="button"
        onClick={async () => {
          const newDate = changeDate(date, view.label, DIRECTIONS.DOWN);
          if (view.label === VIEWS.WEEK.label) {
            await getDailiesForWeek(newDate);
          }
          if (view.label === VIEWS.MONTH.label) {
            await getDailiesForMonth(newDate);
          }
          if (view.label === VIEWS.YEAR.label) {
            await getDailiesForYear(newDate);
          }
          setDate(newDate);
        }}
        className={`${smallerFilledButtonClassName} mx-2`}
      >
        <ArrowLeftSVG className="w-4 h-auto" />
      </button>
      <span className="text-3xl px-5 font-bold text-center">
        {date.toDateString()}
      </span>
      <button
        type="button"
        onClick={async () => {
          const newDate = changeDate(date, view.label, DIRECTIONS.UP);
          if (view.label === VIEWS.WEEK.label) {
            await getDailiesForWeek(newDate);
          }
          if (view.label === VIEWS.MONTH.label) {
            await getDailiesForMonth(newDate);
          }
          if (view.label === VIEWS.YEAR.label) {
            await getDailiesForYear(newDate);
          }
          setDate(newDate);
        }}
        className={`${smallerFilledButtonClassName} mx-2`}
      >
        <ArrowRightSVG className="w-4 h-auto" />
      </button>
    </div>
    <FilledButton action={() => setDate(new Date())}>Today</FilledButton>
    <div className="p-2">
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
          if (!dateRangeCache[VIEWS.MONTH.label]) {
            await getDailiesForMonth(date);
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
          if (!dateRangeCache[VIEWS.YEAR.label]) {
            await getDailiesForYear(date);
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
  </>
);

CalendarHeader.propTypes = {
  date: PropTypes.object.isRequired,
  setDate: PropTypes.func.isRequired,
  view: PropTypes.object.isRequired,
  dateRangeCache: PropTypes.object.isRequired,
  setView: PropTypes.func.isRequired,
  getDailiesForMonth: PropTypes.func.isRequired,
  getDailiesForYear: PropTypes.func.isRequired,
  getDailiesForWeek: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    dateRangeCache: getDailiesDateRangeCache(state),
  }),
  {
    getDailiesForMonth: getDailiesForMonthAction,
    getDailiesForYear: getDailiesForYearAction,
    getDailiesForWeek: getDailiesForWeekAction,
  },
)(CalendarHeader);
