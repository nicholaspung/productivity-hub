import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserError } from '../../redux/selectors/userSelectors';
import { clearUserErrorMessage as clearUserErrorMessageAction } from '../../redux/actions/userActions';

const UserError = ({ error, clearUserErrorMessage }) => {
  if (!error.message) return null;

  return (
    <div className="w-full text-center font-bold p-2 bg-red-600 text-white">
      <div className="flex justify-center">
        <p>{error.message}</p>
        <button
          type="button"
          onClick={clearUserErrorMessage}
          className="font-bold ml-4 px-2 border-2 border-gray-200"
        >
          X
        </button>
      </div>
    </div>
  );
};

UserError.propTypes = {
  error: PropTypes.object.isRequired,
  clearUserErrorMessage: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    error: getUserError(state),
  }),
  { clearUserErrorMessage: clearUserErrorMessageAction },
)(UserError);
