import React from 'react';
import PropTypes from 'prop-types';

const EmptyItem = ({
  length = 0,
  loading = false,
  error = {},
  message = 'Your data has loaded and there is nothing for you to see.',
}) => (
  <>
    {error.message && (
      <li className="list-none bg-red-600 text-white rounded-md">
        {error.message}
      </li>
    )}
    {!length && !loading && !Object.keys(error).length && (
      <li className="list-none">{message}</li>
    )}
  </>
);

EmptyItem.propTypes = {
  length: PropTypes.number,
  loading: PropTypes.bool,
  error: PropTypes.object,
  message: PropTypes.string,
};

export default EmptyItem;
