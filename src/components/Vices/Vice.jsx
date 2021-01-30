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

const Vice = ({
  viceAnalytic,
  incrementFrequencyForViceAnalytic,
  deleteVice,
}) => {
  const viceVice = viceAnalytic.vice;
  const pastTime = Math.floor(
    (new Date() - new Date(viceAnalytic.last_updated)) / (1000 * 60 * 60),
  );
  const pastTimeText = (numOfHours) => {
    let hourText = 'hour';
    if (numOfHours > 1) {
      hourText = 'hours';
    }
    if (!numOfHours) {
      return `less than an ${hourText} ago`;
    } else {
      return `around ${numOfHours} ${hourText} ago`;
    }
  };
  const vicePastTimeText = pastTimeText(pastTime);
  const canClick =
    parseInt(viceAnalytic.vice.time_between.slice(0, 2)) > pastTime;
  const [edit, setEdit] = useState(false);

  const onLinkAction = () => {
    incrementFrequencyForViceAnalytic(viceAnalytic.id);
  };
  const onDeleteAction = () => {
    deleteVice(viceAnalytic.vice.id);
  };

  return (
    <>
      <div
        key={viceAnalytic.id}
        className="flex justify-between even:bg-gray-500 py-2"
      >
        {viceVice && (
          <a
            href={viceVice.link}
            className={`flex-1 text-center ${
              canClick ? 'line-through pointer-events-none' : ''
            }`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onLinkAction}
          >
            {viceVice.name}
          </a>
        )}
        <p
          className={`flex-1 text-center italic ${
            canClick ? 'line-through' : ''
          }`}
        >
          {vicePastTimeText}
        </p>
        <p className={`flex-1 text-center ${canClick ? 'line-through' : ''}`}>
          {viceAnalytic.frequency}
        </p>
        <div className="flex-1 text-center flex justify-around">
          <button type="button" onClick={() => setEdit(true)}>
            <EditSVG className="w-4 h-auto" title="Edit vice" />
          </button>
          <button onClick={onDeleteAction} type="button">
            <DeleteSVG className="w-4 h-auto" title="Delete todo" />
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
