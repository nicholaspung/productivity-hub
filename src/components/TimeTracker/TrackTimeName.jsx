import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ReactComponent as ArchiveSVG } from '../../assets/icons/archive.svg';
import { ReactComponent as PlaySVG } from '../../assets/icons/play.svg';
import { ReactComponent as EditSVG } from '../../assets/icons/edit.svg';
import { ReactComponent as DeleteSVG } from '../../assets/icons/delete.svg';
import useDisableBodyScroll from '../../hooks/useDisableBodyScroll';
import Modal from '../BaseComponents/Modal';
import EditTrackTimeName from './EditTrackTimeName';
import { hasCurrentTrackTime as hasCurrentTrackTimeSelector } from '../../redux/selectors/timeTrackerSelectors';
import {
  updateTrackTimeName as updateTrackTimeNameAction,
  deleteTrackTimeName as deleteTrackTimeNameAction,
  startTrackTimeTimer as startTrackTimeTimerAction,
} from '../../redux/actions/timeTrackerActions';
import { getDateTransform } from '../../utils/dateUtils';

const TrackTimeName = ({
  trackTimeName,
  hasCurrentTrackTime,
  updateTrackTimeName,
  deleteTrackTimeName,
  setShowCurrentTrackTimeModal,
  startTrackTimeTimer,
}) => {
  const { id } = trackTimeName;

  const modalChanges = useDisableBodyScroll();
  const [edit, setEdit] = useState(false);

  const startNewTrackTime = async () => {
    const today = new Date();
    await startTrackTimeTimer({
      track_time_name: id,
      start_time: today,
      date: getDateTransform(today),
    });
    setShowCurrentTrackTimeModal(true);
  };

  const onArchiveAction = () => {
    updateTrackTimeName(id, { archived: true });
  };
  const onDeleteAction = () => {
    deleteTrackTimeName(id);
  };

  return (
    <div className="p-1 border-t-2 border-gray-200 flex justify-between w-full">
      <p className="flex-1">{trackTimeName.name}</p>
      {!hasCurrentTrackTime ? (
        <div className="w-28 ml-2">
          <button onClick={() => setEdit(true)} type="button" className="px-1">
            <EditSVG className="w-4 h-auto" title="Edit topic" />
          </button>
          <button
            onClick={() => onArchiveAction()}
            type="button"
            className="px-1"
          >
            <ArchiveSVG className="w-4 h-auto" title="Archive topic" />
          </button>
          <button
            onClick={() => onDeleteAction()}
            type="button"
            className="px-1"
          >
            <DeleteSVG className="w-4 h-auto" title="Delete topic" />
          </button>
          <button
            type="button"
            onClick={() => startNewTrackTime()}
            className="px-1 ml-2"
          >
            <PlaySVG className="w-4 h-auto" title="Start tracking topic" />
          </button>
        </div>
      ) : null}
      <Modal
        isShowing={edit}
        toggle={() => {
          modalChanges(false);
          setEdit(false);
        }}
        Component={EditTrackTimeName}
        data={trackTimeName}
      />
    </div>
  );
};

TrackTimeName.propTypes = {
  trackTimeName: PropTypes.object.isRequired,
  hasCurrentTrackTime: PropTypes.bool.isRequired,
  updateTrackTimeName: PropTypes.func.isRequired,
  deleteTrackTimeName: PropTypes.func.isRequired,
  startTrackTimeTimer: PropTypes.func.isRequired,
  setShowCurrentTrackTimeModal: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    hasCurrentTrackTime: hasCurrentTrackTimeSelector(state),
  }),
  {
    deleteTrackTimeName: deleteTrackTimeNameAction,
    updateTrackTimeName: updateTrackTimeNameAction,
    startTrackTimeTimer: startTrackTimeTimerAction,
  },
)(TrackTimeName);
