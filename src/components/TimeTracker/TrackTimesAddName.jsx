import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddItem from '../BaseComponents/AddItem';
import {
  addTrackTimeName as addTrackTimeNameAction,
  getTrackTimeNames as getTrackTimeNamesAction,
  createTrackTimeNameAndStartTrackTimeTimer as createTrackTimeNameAndStartTrackTimeTimerAction,
} from '../../redux/actions/timeTrackerActions';
import {
  getTrackTimeNames as getTrackTimeNamesSelector,
  getTrackTimeCurrentTrackTime as getTrackTimeCurrentTrackTimeSelector,
  getTrackTimeNamesLoading as getTrackTimeNamesLoadingSelector,
  getTrackTimeNamesError as getTrackTimeNamesErrorSelector,
} from '../../redux/selectors/timeTrackerSelectors';
import TrackTimeName from './TrackTimeName';
import { ReactComponent as PlaySVG } from '../../assets/icons/play.svg';
import EmptyItem from '../BaseComponents/EmptyItem';

const TrackTimesAddName = ({
  trackTimeNames,
  setShowCurrentTrackTimeModal,
  createTrackTimeNameAndStartTrackTimeTimer,
  error,
  loading,
}) => {
  const [outsideState, setOutsideState] = useState('');

  return (
    <div className="flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center">Start Tracking!</h1>
        <AddItem
          addItem={createTrackTimeNameAndStartTrackTimeTimer}
          labelTitle="Choose a name and track!"
          labelButton="Start"
          placeholder="Track..."
          property="name"
          classes="mt-2"
          MobileIconOverride={PlaySVG}
          setOutsideState={setOutsideState}
          callback={() => setShowCurrentTrackTimeModal(true)}
        />
        <div className="flex flex-col align-start">
          <EmptyItem
            length={trackTimeNames.length}
            error={error}
            loading={loading}
          />
          {trackTimeNames
            .filter(
              (trackTimeName) =>
                !trackTimeName.archived &&
                (outsideState
                  ? trackTimeName.name.includes(outsideState)
                  : true),
            )
            .map((trackTimeName) => (
              <TrackTimeName
                trackTimeName={trackTimeName}
                setShowCurrentTrackTimeModal={setShowCurrentTrackTimeModal}
                key={trackTimeName.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

TrackTimesAddName.propTypes = {
  trackTimeNames: PropTypes.array.isRequired,
  setShowCurrentTrackTimeModal: PropTypes.func.isRequired,
  createTrackTimeNameAndStartTrackTimeTimer: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    currentTrackTime: getTrackTimeCurrentTrackTimeSelector(state),
    trackTimeNames: getTrackTimeNamesSelector(state),
    error: getTrackTimeNamesErrorSelector(state),
    loading: getTrackTimeNamesLoadingSelector(state),
  }),
  {
    addTrackTimeName: addTrackTimeNameAction,
    getTrackTimeNames: getTrackTimeNamesAction,
    createTrackTimeNameAndStartTrackTimeTimer: createTrackTimeNameAndStartTrackTimeTimerAction,
  },
)(TrackTimesAddName);
