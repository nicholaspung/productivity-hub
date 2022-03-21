import React, { memo } from 'react';
import PropTypes from 'prop-types';
import TimeItem from './TimeItem';

const TimeItemList = ({ data }) => (
  <>
    {data.map((trackTime) => (
      <TimeItem trackTime={trackTime} key={trackTime.id} />
    ))}
  </>
);

TimeItemList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default memo(TimeItemList);
