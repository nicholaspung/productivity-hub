import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserError } from '../redux/selectors/userSelectors';

const Banner = ({ error }) => (
  <div
    className={`w-full text-center font-bold ${
      error.message ? 'p-2 bg-red-600 text-white' : 'h-0'
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
