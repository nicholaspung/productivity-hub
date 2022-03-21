import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import TimeItemList from './TimeItemList';
import { displayHourMinSecTime } from '../../../utils/dateUtils';

const TimeItemGroup = ({ data }) => {
  const [expand, setExpand] = useState(false);

  const timeItemName = data[0].track_time_name.name;
  const totalTime = data.reduce((acc, curr) => acc + curr.total_time, 0);
  const numOfTimeItems = data.length;

  // if the array is > 1, then do the grouping
  // else, just display the TimeItem
  return (
    <div className="flex flex-col border-b-2 border-r-2 border-l-2 border-gray-500 w-full">
      <button
        type="button"
        className="w-full p-4"
        onClick={() => setExpand(!expand)}
      >
        <div className="flex justify-between">
          <div className="flex">
            <p className="border-2 border-gray-500 px-2 w-8">
              {numOfTimeItems}
            </p>
            <p className="pl-4 text-left">{timeItemName}</p>
          </div>
          <p>{displayHourMinSecTime(totalTime, false)}</p>
        </div>
      </button>
      {expand ? (
        <div className="border-t-2 border-gray-500">
          <TimeItemList data={data} key={JSON.stringify(data)} />
        </div>
      ) : null}
    </div>
  );
};

TimeItemGroup.propTypes = {
  data: PropTypes.array.isRequired,
};

export default memo(TimeItemGroup);
