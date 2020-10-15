import React from 'react';
import PropTypes from 'prop-types';

const Feature = ({ name = '', children = '' }) => (
  <div className="md:w-5/12 md:p-2 pb-2 mt-2 md:px-2 w-full flex flex-col items-center md:block border-t-2 md:border-0">
    <h2 className="md:text-center text-xl font-semibold p-4">{name}</h2>
    <ul className="list-disc md:w-full w-10/12">{children}</ul>
  </div>
);
Feature.propTypes = {
  name: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]),
};

export default Feature;
