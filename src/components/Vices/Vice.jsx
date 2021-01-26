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
  const viceLastAccessed = new Date(
    viceAnalytic.last_updated,
  ).toLocaleTimeString();

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
            className="flex-1 text-center"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onLinkAction}
          >
            {viceVice.name}
          </a>
        )}
        <p className="flex-1 text-center">{viceLastAccessed}</p>
        <p className="flex-1 text-center">{viceAnalytic.frequency}</p>
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
