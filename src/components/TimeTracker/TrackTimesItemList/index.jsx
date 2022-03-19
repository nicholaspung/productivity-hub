import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getTrackTimes as getTrackTimesSelector,
  getTrackTimesError as getTrackTimesErrorSelector,
  getTrackTimesLoading as getTrackTimesLoadingSelector,
} from '../../../redux/selectors/timeTrackerSelectors';
import { displayHourMinSecTime, sortByTime } from '../../../utils/dateUtils';
import EmptyItem from '../../BaseComponents/EmptyItem';
import TimeItemList from './TimeItemList';
import TimeItemGroupList from './TimeItemGroupList';

const TrackTimesItemList = ({ trackTimes, error, loading }) => {
  const [group, setGroup] = useState(false);
  const sortedData = trackTimes.sort(sortByTime);

  return (
    <div className="p-4">
      <div className="border-2 border-gray-500 p-4 flex justify-between">
        <h2 className="font-bold underline">Total Time Tracked</h2>
        <div className="flex items-center">
          <label
            htmlFor="group-times"
            className="mr-4 border-2 border-gray-500 flex items-center px-4"
          >
            <input
              type="checkbox"
              id="group-times"
              className="form-checkbox mr-2"
              value={group}
              onChange={(event) => setGroup(event.target.checked)}
            />
            <span>Group</span>
          </label>
          <p className="underline">
            {displayHourMinSecTime(
              trackTimes.reduce((acc, curr) => acc + curr.total_time, 0),
              false,
            )}
          </p>
        </div>
      </div>
      {Object.keys(error).length ? (
        <div className="border-b-2 border-r-2 border-l-2 border-gray-500 w-full p-4">
          <EmptyItem
            length={trackTimes.length}
            error={error}
            loading={loading}
          />
        </div>
      ) : null}
      {group ? (
        <TimeItemGroupList data={sortedData} />
      ) : (
        <TimeItemList data={sortedData} />
      )}
    </div>
  );
};
TrackTimesItemList.propTypes = {
  trackTimes: PropTypes.array.isRequired,
  error: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect((state) => ({
  trackTimes: getTrackTimesSelector(state),
  error: getTrackTimesErrorSelector(state),
  loading: getTrackTimesLoadingSelector(state),
}))(TrackTimesItemList);
