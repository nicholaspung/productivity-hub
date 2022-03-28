import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TimeVisual from './TimeVisual';
import {
  getTrackTimes as getTrackTimesSelector,
  getTrackTimesLoading as getTrackTimesLoadingSelector,
} from '../../redux/selectors/timeTrackerSelectors';
import HeaderTitleWithLoadingAndButton from '../BaseComponents/HeaderTitleWithLoadingAndButton';

const TimeVisualListHeader = () => (
  <h2 className="font-bold underline text-center">Today</h2>
);

const TimeVisualList = ({ trackTimes, loading }) => {
  const hourlyTimeArray = () => {
    const times = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const amTimes = times.map((time) => `${time}AM`);
    const pmTimes = times.map((time) => `${time}PM`);
    return [...amTimes, '12PM', ...pmTimes];
  };
  const hourlyTimeBlockArray = Array(24)
    .fill(0)
    .map((_, i) => i);

  return (
    <div className="flex flex-col">
      <div className="p-4">
        <div className="my-4">
          <HeaderTitleWithLoadingAndButton
            loading={loading}
            HeaderComponent={TimeVisualListHeader}
          />
        </div>
        <div>
          {trackTimes.map((trackTime) => (
            <TimeVisual trackTime={trackTime} key={trackTime.id} />
          ))}
        </div>
        <div className="flex">
          <div className="px-2">
            <div className="w-full h-3" />
            {hourlyTimeArray().map((timeDescription) => (
              <div key={timeDescription} className="text-right">
                {timeDescription}
              </div>
            ))}
          </div>
          <div className="flex flex-col w-full">
            {hourlyTimeBlockArray.map((timeBlock) => (
              <div
                className="flex border-t-2 border-gray-500 last:border-b-2 h-6"
                key={timeBlock}
              >
                <div className="w-4" />
                <div
                  key={timeBlock}
                  className="w-full border-l-2 border-r-2 border-gray-500"
                />
                <div className="w-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

TimeVisualList.propTypes = {
  trackTimes: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect((state) => ({
  trackTimes: getTrackTimesSelector(state),
  loading: getTrackTimesLoadingSelector(state),
}))(TimeVisualList);
