import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserError } from '../../redux/selectors/userSelectors';

const UserError = ({ error }) => {
  if (!error.message) return null;

  return (
    <div className="w-full text-center font-bold p-2 bg-red-600 text-white">
      <p>{error.message}</p>
    </div>
  );
};

UserError.propTypes = {
  error: PropTypes.object.isRequired,
};

export default connect((state) => ({
  error: getUserError(state),
}))(UserError);
