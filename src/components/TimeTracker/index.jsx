import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from '../BaseComponents/Helmet';
import { getTrackTimeCurrentTrackTime as getTrackTimeCurrentTrackTimeSelector } from '../../redux/selectors/timeTrackerSelectors';
import {
  getTrackTimeNames as getTrackTimeNamesAction,
  getTrackTimes as getTrackTimesAction,
} from '../../redux/actions/timeTrackerActions';
import TrackTimesAddName from './TrackTimesAddName';
import TabsBox from './TabsBox';
import TrackTimesVisualList from './TrackTimesVisualList';
import CurrentTrackTime from './CurrentTrackTime';
import ConnectedTrackTimesAddTimes from './TrackTimesAddTimes';
import TrackTimesItemList from './TrackTimesItemList';

const TimeTracker = ({
  currentTrackTime,
  getTrackTimeNames,
  getTrackTimes,
}) => {
  const [showCurrentTrackTimeModal, setShowCurrentTrackTimeModal] = useState(
    false,
  );
  const [showCurrentTrackTimeBox, setShowCurrentTrackTimeBox] = useState(false);

  useEffect(() => {
    getTrackTimeNames();
    getTrackTimes();
    if (currentTrackTime.id) {
      setShowCurrentTrackTimeModal(true);
    }
  }, [currentTrackTime]);

  return (
    <>
      <Helmet
        title="Time Tracker | myexperiment.life"
        name="Time Tracker Page"
        content="This is where you track your time spent."
      />
      <h1 className="text-3xl font-bold text-center p-4">Time Tracker</h1>
      <CurrentTrackTime
        showCurrentTrackTimeModal={showCurrentTrackTimeModal}
        setShowCurrentTrackTimeModal={setShowCurrentTrackTimeModal}
        setShowCurrentTrackTimeBox={setShowCurrentTrackTimeBox}
        showCurrentTrackTimeBox={showCurrentTrackTimeBox}
      />
      <div className="flex flex-wrap justify-around mb-4 mx-4">
        <TabsBox
          tabs={[
            {
              id: 1,
              component: TrackTimesAddName,
              name: 'Track',
              componentProps: { setShowCurrentTrackTimeModal },
            },
            {
              id: 2,
              component: ConnectedTrackTimesAddTimes,
              name: 'Add Time',
            },
          ]}
        />
        <TabsBox
          tabs={[
            {
              id: 1,
              component: TrackTimesVisualList,
              name: 'Visual',
            },
            {
              id: 2,
              component: TrackTimesItemList,
              name: 'List',
            },
          ]}
        />
      </div>
    </>
  );
};

TimeTracker.propTypes = {
  currentTrackTime: PropTypes.object.isRequired,
  getTrackTimeNames: PropTypes.func.isRequired,
  getTrackTimes: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    currentTrackTime: getTrackTimeCurrentTrackTimeSelector(state),
  }),
  {
    getTrackTimeNames: getTrackTimeNamesAction,
    getTrackTimes: getTrackTimesAction,
  },
)(TimeTracker);
