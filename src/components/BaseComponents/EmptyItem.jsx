import React from 'react';
import PropTypes from 'prop-types';

const EmptyItem = ({ length, loading }) =>
  !length &&
  !loading && (
    <li>Your data has loaded and there is nothing for you to see.</li>
  );

EmptyItem.propTypes = {
  length: PropTypes.number,
  loading: PropTypes.bool,
};
EmptyItem.defaultProps = {
  length: 0,
  loading: false,
};

export default EmptyItem;
