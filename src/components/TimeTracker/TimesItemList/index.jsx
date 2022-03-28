import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getTrackTimes as getTrackTimesSelector,
  getTrackTimesError as getTrackTimesErrorSelector,
  getTrackTimesLoading as getTrackTimesLoadingSelector,
} from '../../../redux/selectors/timeTrackerSelectors';
import { getTrackTimes as getTrackTimesAction } from '../../../redux/actions/timeTrackerActions';
import { displayHourMinSecTime, sortByTime } from '../../../utils/dateUtils';
import EmptyItem from '../../BaseComponents/EmptyItem';
import TimeItemList from './TimeItemList';
import TimeItemGroupList from './TimeItemGroupList';
import TimesItemListOptions from './TimesItemListOptions';

const TimesItemList = ({ trackTimes, error, loading, getTrackTimes }) => {
  const [group, setGroup] = useState(false);
  const sortedData = trackTimes.sort(sortByTime);

  return (
    <div className="p-4">
      <TimesItemListOptions
        loading={loading}
        getTrackTimes={getTrackTimes}
        group={group}
        setGroup={setGroup}
      />
      <div className="border-2 border-gray-500 p-4 flex justify-between">
        <h2 className="font-bold underline">Total Time Tracked</h2>
        <p className="underline">
          {displayHourMinSecTime(
            trackTimes.reduce((acc, curr) => acc + curr.total_time, 0),
            false,
          )}
        </p>
      </div>
      <EmptyItem
        length={trackTimes.length}
        error={error}
        loading={loading}
        message={"You haven't tracked anything yet. Let's start!"}
      />
      {group ? (
        <TimeItemGroupList data={sortedData} />
      ) : (
        <TimeItemList data={sortedData} />
      )}
    </div>
  );
};
TimesItemList.propTypes = {
  trackTimes: PropTypes.array.isRequired,
  error: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  getTrackTimes: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    trackTimes: getTrackTimesSelector(state),
    error: getTrackTimesErrorSelector(state),
    loading: getTrackTimesLoadingSelector(state),
  }),
  {
    getTrackTimes: getTrackTimesAction,
  },
)(TimesItemList);
