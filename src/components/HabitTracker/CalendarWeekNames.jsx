import React from 'react';
import { SHORT_WEEK_NAMES } from './constants';

const CalendarWeekNames = () => (
  <div className="flex justify-around w-full max-w-xl">
    {SHORT_WEEK_NAMES.map((name) => (
      <p
        className="text-center border-2 border-gray-200 rounded-md w-8 text-xs md:w-16 md:h-auto md:text-base m-2"
        key={name}
      >
        {name}
      </p>
    ))}
  </div>
);

export default CalendarWeekNames;
