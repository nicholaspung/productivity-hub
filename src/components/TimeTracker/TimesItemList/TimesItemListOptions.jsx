import React, { memo } from 'react';
import PropTypes from 'prop-types';
import HeaderTitleWithLoadingAndButton from '../../BaseComponents/HeaderTitleWithLoadingAndButton';

const TimesItemListOptionsHeader = () => (
  <h2 className="mb-2 pl-10">Options:</h2>
);

const TimesItemListOptions = ({ loading, getTrackTimes, group, setGroup }) => (
  <div className="border-t-2 border-l-2 border-r-2 border-gray-500 p-4">
    <HeaderTitleWithLoadingAndButton
      onRefreshAction={getTrackTimes}
      loading={loading}
      HeaderComponent={TimesItemListOptionsHeader}
    />
    <div className="flex items-center">
      <label
        htmlFor="group-times"
        className="mr-4 border-2 border-gray-500 flex items-center px-2"
      >
        <input
          type="checkbox"
          id="group-times"
          className="form-checkbox mr-2"
          value={group}
          onChange={(event) => setGroup(event.target.checked)}
        />
        <span>Group</span>
      </label>
    </div>
  </div>
);

TimesItemListOptions.propTypes = {
  loading: PropTypes.bool.isRequired,
  getTrackTimes: PropTypes.func.isRequired,
  group: PropTypes.bool.isRequired,
  setGroup: PropTypes.func.isRequired,
};

export default memo(TimesItemListOptions);
