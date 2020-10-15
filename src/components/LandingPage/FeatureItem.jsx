import React from 'react';
import PropTypes from 'prop-types';

const FeatureItem = ({ children = '' }) => <li className="p-2">{children}</li>;

FeatureItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.element,
  ]),
};

export default FeatureItem;
