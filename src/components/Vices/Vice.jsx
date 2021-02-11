import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ReactComponent as EditSVG } from '../../assets/icons/edit.svg';
import { ReactComponent as DeleteSVG } from '../../assets/icons/delete.svg';
import Modal from '../BaseComponents/Modal';
import EditVice from './EditVice';
import {
  incrementFrequencyForViceAnalytic as incrementFrequencyForViceAnalyticAction,
  deleteVice as deleteViceAction,
} from '../../redux/actions/vicesActions';
import {
  lastAccessedText,
  getHoursLastAccessed,
  timeBetweenIsOverBlocker,
} from '../../utils/viceUtils';

const Vice = ({
  viceAnalytic,
  incrementFrequencyForViceAnalytic,
  deleteVice,
}) => {
  const viceVice = viceAnalytic.vice;
  const lastAccessed = getHoursLastAccessed(viceAnalytic.last_updated);
  const vicePassedTimeText = lastAccessedText(lastAccessed);
  const cantAccessFunction = (analytic) => {
    if (analytic.frequency === 0) return false;
    return timeBetweenIsOverBlocker(analytic.vice.time_between, lastAccessed);
  };
  const cantAccess = cantAccessFunction(viceAnalytic);

  const [edit, setEdit] = useState(false);

  const onLinkAction = () =>
    incrementFrequencyForViceAnalytic(viceAnalytic.id, viceAnalytic.frequency);
  const onDeleteAction = () => deleteVice(viceAnalytic.vice.id);

  const frequencyBackgroundColor = (frequency) => {
    if (frequency <= 2) return 'bg-indigo-600';
    return 'bg-red-600';
  };

  return (
    <>
      <div
        key={viceAnalytic.id}
        className="flex justify-between even:bg-gray-500 py-2 items-center"
      >
        {viceVice && (
          <a
            href={viceVice.link}
            className={`flex-1 text-center ${
              cantAccess ? 'line-through pointer-events-none' : ''
            }`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onLinkAction}
            onContextMenu={onLinkAction}
          >
            {viceVice.name}
          </a>
        )}
        <p
          className={`flex-1 text-center italic ${
            cantAccess ? 'line-through' : ''
          }`}
        >
          {vicePassedTimeText}
        </p>
        <p
          className={`flex-1 text-center rounded-md text-white ${frequencyBackgroundColor(
            viceAnalytic.frequency,
          )}`}
        >
          {viceAnalytic.frequency}
        </p>
        <div className="flex-1 text-center flex justify-around">
          <button type="button" onClick={() => setEdit(true)}>
            <EditSVG className="w-4 h-auto" title="Edit vice" />
          </button>
          <button onClick={onDeleteAction} type="button">
            <DeleteSVG className="w-4 h-auto" title="Delete vice" />
          </button>
        </div>
      </div>
      <Modal
        isShowing={edit}
        toggle={() => setEdit(false)}
        Component={EditVice}
        data={viceAnalytic}
      />
    </>
  );
};

Vice.propTypes = {
  viceAnalytic: PropTypes.object.isRequired,
  incrementFrequencyForViceAnalytic: PropTypes.func.isRequired,
  deleteVice: PropTypes.func.isRequired,
};

export default connect(null, {
  incrementFrequencyForViceAnalytic: incrementFrequencyForViceAnalyticAction,
  deleteVice: deleteViceAction,
})(Vice);
