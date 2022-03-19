import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { groupByTimeItem } from '../../../utils/dateUtils';
import TimeItemGroup from './TimeItemGroup';

const TimeItemGroupList = ({ data }) => {
  const groupedTimeItems = groupByTimeItem(data);

  return (
    <>
      {groupedTimeItems.map((timeItemGroup) => (
        <TimeItemGroup data={timeItemGroup} key={timeItemGroup[0].id} />
      ))}
    </>
  );
};

TimeItemGroupList.propTypes = {
  data: PropTypes.array.isRequired,
};
export default memo(TimeItemGroupList);
