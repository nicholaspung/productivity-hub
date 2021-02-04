import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as LoadingSVG } from '../../assets/icons/loading.svg';

const AppTitleWithLoading = ({ title, loading }) => (
  <div className="m-auto max-w-xl">
    {loading && (
      <div className="relative top-5 left-5">
        <LoadingSVG className="w-8 h-auto animate-spin absolute" />
      </div>
    )}
    <h1 className="text-3xl font-bold text-center p-4">{title}</h1>
  </div>
);

AppTitleWithLoading.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default AppTitleWithLoading;
