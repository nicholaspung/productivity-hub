import React from 'react';
import PropTypes from 'prop-types';
import { smallerFilledButtonClassName } from '../../BaseComponents';
import { ReactComponent as RefreshSVG } from '../../../assets/icons/refresh.svg';

const ListRefresh = ({ action }) => (
  <div className="h-0 flex justify-end items-start">
    <button
      type="button"
      className={`${smallerFilledButtonClassName} relative bottom-3 left-3 height-8`}
      onClick={() => action()}
    >
      <RefreshSVG className="w-4 h-auto py-1" />
    </button>
  </div>
);

ListRefresh.propTypes = {
  action: PropTypes.func.isRequired,
};

export default ListRefresh;
