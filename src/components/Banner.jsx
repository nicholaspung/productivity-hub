import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserError } from './User/redux/selectors';

const Banner = ({ error }) => (
  <div
    className={`w-full text-center p-2 font-bold ${
      error.message && 'bg-red-600 text-white'
    }`}
  >
    <p>{error.message && error.message}</p>
  </div>
);

Banner.propTypes = {
  error: PropTypes.object.isRequired,
};

export default connect((state) => ({
  error: getUserError(state),
}))(Banner);
