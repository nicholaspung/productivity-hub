import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getTrackTimes as getTrackTimesSelector,
  getTrackTimesError as getTrackTimesErrorSelector,
  getTrackTimesLoading as getTrackTimesLoadingSelector,
} from '../../../redux/selectors/timeTrackerSelectors';
import TrackTimeItem from './TrackTimeItem';
import { displayHourMinSecTime, sortByTime } from '../../../utils/dateUtils';
import EmptyItem from '../../BaseComponents/EmptyItem';

const TrackTimesItemList = ({ trackTimes, error, loading }) => (
  <div className="p-4">
    <div className="border-2 border-gray-500 p-4 flex justify-between">
      <h2 className="font-bold underline">Total Time Tracked</h2>
      <p className="underline">
        {displayHourMinSecTime(
          trackTimes.reduce((acc, curr) => acc + curr.total_time, 0),
          false,
        )}
      </p>
    </div>
    {Object.keys(error).length ? (
      <div className="border-b-2 border-r-2 border-l-2 border-gray-500 w-full p-4">
        <EmptyItem length={trackTimes.length} error={error} loading={loading} />
      </div>
    ) : null}
    {trackTimes.sort(sortByTime).map((trackTime) => (
      <TrackTimeItem trackTime={trackTime} key={trackTime.id} />
    ))}
  </div>
);
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
