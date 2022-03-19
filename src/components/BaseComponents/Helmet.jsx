import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const HelmetComponent = ({ name = '', content = '', title }) => (
  <Helmet>
    <meta charSet="utf-8" name={name} content={content} />
    <title>{title}</title>
  </Helmet>
);

HelmetComponent.propTypes = {
  name: PropTypes.string,
  content: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default memo(HelmetComponent);
