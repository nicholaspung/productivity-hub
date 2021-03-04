import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { VIEWS, getDayInfo } from '../../../utils/habitTrackerUtils';
import { getJavascriptDateTransform } from '../../../utils/dateUtils';
import {
  SHORT_MONTH_NAMES,
  displayColor,
} from '../../../constants/habitTrackerConstants';
import { getEarliestHabitDate } from '../../../redux/selectors/habitTrackerSelectors';
import PreviousDailies from './PreviousDailies';
import Modal from '../../BaseComponents/Modal';
import useDisableBodyScroll from '../../../hooks/useDisableBodyScroll';

const CalendarDay = ({
  dailiesCache,
  day,
  labelView = '',
  earliestHabitDate,
}) => {
  const modalChanges = useDisableBodyScroll();
  const [showDaily, setShowDaily] = useState(false);

  const [finishedLength, totalLength, percentageLabel] = getDayInfo(
    dailiesCache[day],
  );
  const dateObject = getJavascriptDateTransform(day);
  const isActiveHabit =
    dateObject < new Date() && dateObject > earliestHabitDate;

  return (
    <li className="m-2">
      <Modal
        isShowing={showDaily}
        toggle={() => {
          modalChanges(false);
          setShowDaily(false);
        }}
        Component={PreviousDailies}
        date={dateObject}
        data={dailiesCache[day]}
      />
      {labelView === VIEWS.WEEK.label && (
        <p className="text-center hidden sm:block">
          {`${SHORT_MONTH_NAMES[Number(day.slice(5, 7)) - 1]} ${Number(
            day.slice(8),
          )}`}
        </p>
      )}
      {totalLength ? (
        <button
          type="button"
          className={`w-8 h-8 sm:w-16 sm:h-16 sm:flex sm:flex-col sm:items-end sm:justify-end rounded-sm border-2 ${
            (isActiveHabit || totalLength) &&
            `${displayColor({ percentage: percentageLabel })[0]} cursor-pointer`
          }`}
          onClick={() => {
            modalChanges(true);
            setShowDaily(true);
          }}
        >
          {dailiesCache[day] && (
            <p className="text-xs text-right p-2 text-white font-bold">
              {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
              {finishedLength}/{totalLength}
            </p>
          )}
        </button>
      ) : (
        <div className="w-8 h-8 sm:w-16 sm:h-16 sm:flex sm:flex-col sm:items-end sm:justify-end rounded-sm border-2 bg-white" />
      )}
    </li>
  );
};

CalendarDay.propTypes = {
  dailiesCache: PropTypes.object.isRequired,
  day: PropTypes.string.isRequired,
  labelView: PropTypes.string,
  earliestHabitDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.number,
  ]).isRequired,
};

export default connect((state) => ({
  earliestHabitDate: getEarliestHabitDate(state),
}))(CalendarDay);
