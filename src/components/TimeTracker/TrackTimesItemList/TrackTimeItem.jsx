import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  displayHourMinSecTime,
  simplifyDisplayTime,
} from '../../../utils/dateUtils';
import useDisableBodyScroll from '../../../hooks/useDisableBodyScroll';
import { ReactComponent as EditSVG } from '../../../assets/icons/edit.svg';
import Modal from '../../BaseComponents/Modal';
import { ReactComponent as DeleteSVG } from '../../../assets/icons/delete.svg';
import { TrackTimesAddTimes } from '../TrackTimesAddTimes';
import {
  deleteTrackTime as deleteTrackTimeAction,
  updateTrackTime as updateTrackTimeAction,
} from '../../../redux/actions/timeTrackerActions';

const ConnectedTrackTimesAddTimes = connect(null, {
  actionFunction: updateTrackTimeAction,
})(TrackTimesAddTimes);

const TrackTimeItem = ({ trackTime, deleteTrackTime }) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const modalChanges = useDisableBodyScroll();

  const onDelete = () => {
    deleteTrackTime(trackTime.id);
  };

  return (
    <div className="flex flex-col border-b-2 border-r-2 border-l-2 border-gray-500 w-full">
      <button
        type="button"
        className="w-full p-4"
        onClick={() => setOpen(!open)}
      >
        <div className="flex justify-between">
          <p>{trackTime.track_time_name.name}</p>
          <p>{displayHourMinSecTime(trackTime.total_time, false)}</p>
        </div>
      </button>
      {open && (
        <div className="flex p-4 bg-gray-200 items-center justify-between">
          <p className="text-xs">
            {simplifyDisplayTime(trackTime.start_time)} -{' '}
            {simplifyDisplayTime(trackTime.end_time)}
          </p>
          <div>
            <Modal
              isShowing={edit}
              toggle={() => {
                modalChanges(false);
                setEdit(false);
              }}
              Component={ConnectedTrackTimesAddTimes}
              data={trackTime}
              labelTitle="Edit Time"
            />
            <button
              onClick={() => {
                modalChanges(true);
                setEdit(true);
              }}
              type="button"
              className="mr-2"
            >
              <EditSVG className="w-3 h-auto" title="Edit track time" />
            </button>
            <button onClick={onDelete} type="button">
              <DeleteSVG className="w-3 h-auto" title="Delete track time" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
TrackTimeItem.propTypes = {
  trackTime: PropTypes.object.isRequired,
  deleteTrackTime: PropTypes.func.isRequired,
};

export default connect(null, {
  deleteTrackTime: deleteTrackTimeAction,
})(TrackTimeItem);
