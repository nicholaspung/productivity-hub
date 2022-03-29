import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTrackTimes as getTrackTimesSelector } from '../../redux/selectors/timeTrackerSelectors';
import { displayHourMinSecTime } from '../../utils/dateUtils';

const getGroupedTotalTimeTracked = (timeItemArr) =>
  timeItemArr.reduce((acc, curr) => {
    const accCopy = { ...acc };
    const name = curr.track_time_name && curr.track_time_name.name;
    if (accCopy[name]) {
      accCopy[name] += curr.total_time;
    } else {
      accCopy[name] = curr.total_time;
    }
    return accCopy;
  }, {});

const getTimeUntracked = (groupedTotalTimeTracked) => {
  const timeTracked = Object.keys(groupedTotalTimeTracked).reduce(
    (acc, curr) => acc + groupedTotalTimeTracked[curr],
    0,
  );
  const totalTimeForDay = 60 * 60 * 24;
  const timeUntracked = totalTimeForDay - timeTracked;
  return {
    timeTracked,
    timeUntracked,
  };
};

const NewFeature = ({ trackTimes }) => {
  const groupedTotalTimeTracked = getGroupedTotalTimeTracked(trackTimes);
  const { timeTracked, timeUntracked } = getTimeUntracked(
    groupedTotalTimeTracked,
  );

  return (
    <div>
      {Object.keys(groupedTotalTimeTracked).map((item) => (
        <div key={item}>
          <span>{item}</span>
          {displayHourMinSecTime(groupedTotalTimeTracked[item], false)}
        </div>
      ))}
      <div>
        <span>Total time tracked: </span>
        {displayHourMinSecTime(timeTracked, false)}
      </div>
      <div>
        <span>Time untracked: </span>
        {displayHourMinSecTime(timeUntracked, false)}
      </div>
    </div>
  );
};

NewFeature.propTypes = {
  trackTimes: PropTypes.array.isRequired,
};

export default connect(
  (state) => ({
    trackTimes: getTrackTimesSelector(state),
  }),
  {},
)(memo(NewFeature));
