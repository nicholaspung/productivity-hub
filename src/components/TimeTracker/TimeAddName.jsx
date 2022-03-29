import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddItem from '../BaseComponents/AddItem';
import {
  addTrackTimeName as addTrackTimeNameAction,
  createTrackTimeNameAndStartTrackTimeTimer as createTrackTimeNameAndStartTrackTimeTimerAction,
  getTrackTimeNames as getTrackTimeNamesAction,
} from '../../redux/actions/timeTrackerActions';
import {
  getTrackTimeNames as getTrackTimeNamesSelector,
  getTrackTimeNamesLoading as getTrackTimeNamesLoadingSelector,
  getTrackTimeNamesError as getTrackTimeNamesErrorSelector,
  hasCurrentTrackTime as hasCurrentTrackTimeSelector,
} from '../../redux/selectors/timeTrackerSelectors';
import TimeName from './TimeName';
import { ReactComponent as PlaySVG } from '../../assets/icons/play.svg';
import EmptyItem from '../BaseComponents/EmptyItem';
import HeaderTitleWithLoadingAndButton from '../BaseComponents/HeaderTitleWithLoadingAndButton';

const TimeAddName = ({
  trackTimeNames,
  hasCurrentTrackTime,
  setShowCurrentTrackTimeModal,
  createTrackTimeNameAndStartTrackTimeTimer,
  addTrackTimeName,
  error,
  loading,
  getTrackTimeNames,
}) => {
  const [outsideState, setOutsideState] = useState('');

  const onRefreshAction = async () => {
    await getTrackTimeNames();
  };

  return (
    <div className="flex flex-col">
      <div className="p-4">
        <HeaderTitleWithLoadingAndButton
          onRefreshAction={onRefreshAction}
          loading={loading}
          title="Start Tracking!"
        />
        <AddItem
          addItem={createTrackTimeNameAndStartTrackTimeTimer}
          addItem2={addTrackTimeName}
          labelTitle="Choose a name and track!"
          labelButton="Start"
          labelButton2="Save"
          placeholder="Track..."
          property="name"
          classes="mt-2"
          secondButton
          disable={hasCurrentTrackTime}
          MobileIconOverride={PlaySVG}
          setOutsideState={setOutsideState}
          callback={() => setShowCurrentTrackTimeModal(true)}
        />
        <div className="flex flex-col align-start">
          <EmptyItem
            length={trackTimeNames.length}
            error={error}
            loading={loading}
            message={"You haven't added anything to track yet. Let's start!"}
          />
          {trackTimeNames
            .filter(
              (trackTimeName) =>
                !trackTimeName.archived &&
                (outsideState
                  ? trackTimeName.name
                      .toLowerCase()
                      .includes(outsideState.toLowerCase())
                  : true),
            )
            .map((trackTimeName) => (
              <TimeName
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

TimeAddName.propTypes = {
  trackTimeNames: PropTypes.array.isRequired,
  setShowCurrentTrackTimeModal: PropTypes.func.isRequired,
  createTrackTimeNameAndStartTrackTimeTimer: PropTypes.func.isRequired,
  hasCurrentTrackTime: PropTypes.bool.isRequired,
  addTrackTimeName: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  getTrackTimeNames: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    trackTimeNames: getTrackTimeNamesSelector(state),
    hasCurrentTrackTime: hasCurrentTrackTimeSelector(state),
    error: getTrackTimeNamesErrorSelector(state),
    loading: getTrackTimeNamesLoadingSelector(state),
  }),
  {
    addTrackTimeName: addTrackTimeNameAction,
    createTrackTimeNameAndStartTrackTimeTimer: createTrackTimeNameAndStartTrackTimeTimerAction,
    getTrackTimeNames: getTrackTimeNamesAction,
  },
)(TimeAddName);
