import React from 'react';
import PropTypes from 'prop-types';

const Bubble = ({ children }) => (
  <div className="p-2 bg-gray-200 rounded-md m-4">
    <p className="text-gray-600 text-sm">{children}</p>
  </div>
);

Bubble.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.element,
  ]),
};
Bubble.defaultProps = { children: '' };
export default Bubble;
