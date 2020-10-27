export const DIRECTIONS = {
  UP: 'UP',
  DOWN: 'DOWN',
};

export const PRIORITIES = {
  HIGH: 'HIGH',
  NONE: 'NONE',
  LOW: 'LOW',
};

export const FILTERS = {
  ALL: 'ALL',
  ARCHIVED: 'ARCHIVED',
  UNARCHIVED: 'UNARCHIVED',
  FINISHED: 'FINISHED',
  UNFINISHED: 'UNFINISHED',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
};

export const SHORT_MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const LONG_MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const SHORT_WEEK_NAMES = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

export const DATE_RANGES = {
  WEEK: 'WEEK',
  MONTH: 'MONTH',
  YEAR: 'YEAR',
};

export const displayColor = ({ priority, percentage, archived }) => {
  if (priority === PRIORITIES.HIGH || percentage <= 0.7) {
    return [
      'bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700',
      'text-red-600',
    ];
  }
  if (priority === PRIORITIES.LOW || percentage <= 0.9) {
    return [
      'bg-green-600 hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700',
      'text-green-600',
    ];
  }
  if (archived) {
    return [
      'bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700',
      'text-gray-600',
    ];
  }
  return [
    'bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700',
    'text-indigo-600',
  ];
};
