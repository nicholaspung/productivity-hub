import React from 'react';
import PropTypes from 'prop-types';

const TrackTime = ({ trackTime }) => {
  const heightOfTimeChart = 24 * 24;
  const secondsInTheDay = 60 * 60 * 24;
  const getNumberOfSecondsInDate = (date) =>
    date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds();
  const height = (heightOfTimeChart * trackTime.total_time) / secondsInTheDay;
  const positionOfTime =
    (getNumberOfSecondsInDate(new Date(trackTime.start_time)) /
      secondsInTheDay) *
    heightOfTimeChart;

  return (
    <div className="h-0">
      <div
        className="relative w-full flex"
        style={{
          height,
          top: `${positionOfTime}px`,
        }}
      >
        <span className="w-20"> </span>
        <div className="bg-green-300 hover:bg-green-200 border-green-500 border-2 w-full mr-2 rounded-md" />
      </div>
    </div>
  );
};
TrackTime.propTypes = {
  trackTime: PropTypes.object.isRequired,
};

export default TrackTime;
