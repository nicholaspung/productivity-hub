import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TrackTimeVisual from './TrackTimeVisual';
import { getTrackTimes as getTrackTimesSelector } from '../../redux/selectors/timeTrackerSelectors';

const TrackTimesVisualList = ({ trackTimes }) => {
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
        <div>
          {trackTimes.map((trackTime) => (
            <TrackTimeVisual trackTime={trackTime} key={trackTime.id} />
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

TrackTimesVisualList.propTypes = {
  trackTimes: PropTypes.array.isRequired,
};

export default connect((state) => ({
  trackTimes: getTrackTimesSelector(state),
}))(TrackTimesVisualList);
