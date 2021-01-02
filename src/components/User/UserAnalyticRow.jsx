import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ReactComponent as EditSVG } from '../../assets/icons/edit.svg';
import { ReactComponent as SaveSVG } from '../../assets/icons/save.svg';
import { ReactComponent as CancelSVG } from '../../assets/icons/cancel.svg';
import {
  updateViceThreshold as updateViceThresholdAction,
  createViceThreshold as createViceThresholdAction,
} from '../../redux/actions/userActions';

const UserAnalyticRow = ({
  analytic,
  updateViceThreshold,
  createViceThreshold,
}) => {
  const threshold = analytic.threshold || 0;

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(threshold);

  const onSubmitAction = (e) => {
    e.preventDefault();
    const intValue = parseInt(value, 10);
    if (analytic.threshold) {
      updateViceThreshold(analytic.thresholdId, intValue);
    } else {
      createViceThreshold(analytic.label, intValue);
    }
    setEdit(false);
  };
  const onInputChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue.replace(/\D*/gm, ''));
  };

  return (
    <tr>
      <td className="text-left py-1">{analytic.label}</td>
      {Object.keys(analytic.frequencies).map((frequencyObj) => (
        <td key={frequencyObj} className="text-center">
          {analytic.frequencies[frequencyObj]}
        </td>
      ))}
      <td className="text-center w-1/12">
        {!edit && (
          <>
            <span className="pr-4">{threshold}</span>
            <button type="button" onClick={() => setEdit(true)}>
              <EditSVG className="w-4 h-auto" title="Edit threshold" />
            </button>
          </>
        )}
        {edit && (
          <form autoComplete="off" onSubmit={(e) => onSubmitAction(e)}>
            <input
              type="text"
              value={value}
              onChange={(e) => onInputChange(e)}
              className="w-8 text-center appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-1 px-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
            <button type="button" onClick={(e) => onSubmitAction(e)}>
              <SaveSVG className="w-4 h-auto" title="Save threshold" />
            </button>
            <button type="button" onClick={() => setEdit(false)}>
              <CancelSVG className="w-4 h-auto" title="Cancel editing" />
            </button>
          </form>
        )}
      </td>
      <td className="text-center">{analytic.action}</td>
    </tr>
  );
};
UserAnalyticRow.propTypes = {
  analytic: PropTypes.object.isRequired,
  updateViceThreshold: PropTypes.func.isRequired,
  createViceThreshold: PropTypes.func.isRequired,
};

export default connect(null, {
  updateViceThreshold: updateViceThresholdAction,
  createViceThreshold: createViceThresholdAction,
})(UserAnalyticRow);
