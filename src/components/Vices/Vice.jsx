import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ReactComponent as EditSVG } from '../../assets/icons/edit.svg';
import { ReactComponent as DeleteSVG } from '../../assets/icons/delete.svg';
import { ReactComponent as ArchiveSVG } from '../../assets/icons/archive.svg';
import Modal from '../BaseComponents/Modal';
import EditVice from './EditVice';
import {
  incrementFrequencyForViceAnalytic as incrementFrequencyForViceAnalyticAction,
  deleteVice as deleteViceAction,
  editVice as editViceAction,
} from '../../redux/actions/vicesActions';
import {
  lastAccessedText,
  getHoursLastAccessed,
  cantAccessFunction,
} from '../../utils/viceUtils';
import useDisableBodyScroll from '../../hooks/useDisableBodyScroll';

const Vice = ({
  viceAnalytic,
  incrementFrequencyForViceAnalytic,
  deleteVice,
  editVice,
}) => {
  const viceVice = viceAnalytic.vice;
  const lastAccessed = getHoursLastAccessed(viceAnalytic.last_updated);
  const vicePassedTimeText = lastAccessedText(lastAccessed);
  const cantAccess = cantAccessFunction(viceAnalytic);
  const modalChanges = useDisableBodyScroll();

  const [edit, setEdit] = useState(false);
  const [clicked, setClicked] = useState(false);

  const onLinkAction = () => {
    setClicked(true);
    incrementFrequencyForViceAnalytic(viceAnalytic.id, viceAnalytic.frequency);
  };
  const onDeleteAction = () => deleteVice(viceAnalytic.vice.id);
  const onArchiveAction = () =>
    editVice(viceAnalytic.vice.id, {
      archived: true,
    });

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
            } ${
              clicked
                ? 'text-gray-400 italic pointer-events-none cursor-not-allowed'
                : ''
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
          <button
            type="button"
            onClick={() => {
              modalChanges(true);
              setEdit(true);
            }}
          >
            <EditSVG className="w-4 h-auto" title="Edit vice" />
          </button>
          <button onClick={onArchiveAction} type="button">
            <ArchiveSVG className="w-4 h-auto" title="Archive vice" />
          </button>
          <button onClick={onDeleteAction} type="button">
            <DeleteSVG className="w-4 h-auto" title="Delete vice" />
          </button>
        </div>
      </div>
      <Modal
        isShowing={edit}
        toggle={() => {
          modalChanges(false);
          setEdit(false);
        }}
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
  editVice: PropTypes.func.isRequired,
};

export default connect(null, {
  incrementFrequencyForViceAnalytic: incrementFrequencyForViceAnalyticAction,
  deleteVice: deleteViceAction,
  editVice: editViceAction,
})(Vice);
