import {
  DAILIES_FETCHING,
  DAILIES_FETCHING_DONE,
  DAILIES_FETCHING_ERROR,
  DAILIES_TOGGLE_DONE,
  DAILIES_TOGGLE_ERROR,
  DAILIES_CACHE_FETCHING,
  DAILIES_CACHE_DONE,
  DAILIES_CACHE_ERROR,
  DAILIES_DATE_RANGE_DONE,
  HABITS_FETCHING,
  HABITS_FETCHING_DONE,
  HABITS_FETCHING_ERROR,
  HABITS_DELETING_DONE,
  HABITS_DELETING_ERROR,
  HABITS_UPDATING,
  HABITS_UPDATING_DONE,
  HABITS_UPDATING_ERROR,
  HABIT_TRACKER_CLEAR,
  TODAY_DAILY_CACHE,
  YESTERDAY_DAILY_CACHE,
} from '../../actions/habitTrackerActions';

export const initialState = {
  dailies: [],
  dailiesCache: {},
  dateRangeCache: {},
  todayDailyCache: false,
  yesterdayDailyCache: false,
  habits: [],
  habitsCache: false,
  loading: false,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TODAY_DAILY_CACHE:
      return { ...state, todayDailyCache: true };
    case YESTERDAY_DAILY_CACHE:
      return { ...state, yesterdayDailyCache: true };
    case DAILIES_FETCHING:
    case DAILIES_CACHE_FETCHING:
    case HABITS_FETCHING:
    case HABITS_UPDATING:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case DAILIES_FETCHING_DONE:
      return {
        ...state,
        dailies: action.payload,
        loading: false,
      };
    case DAILIES_FETCHING_ERROR:
    case DAILIES_CACHE_ERROR:
    case HABITS_FETCHING_ERROR:
    case DAILIES_TOGGLE_ERROR:
    case HABITS_DELETING_ERROR:
    case HABITS_UPDATING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DAILIES_TOGGLE_DONE:
      return {
        ...state,
        dailies: action.payload,
        error: {},
      };
    case DAILIES_CACHE_DONE:
      return {
        ...state,
        loading: false,
        dailiesCache: action.payload,
      };
    case DAILIES_DATE_RANGE_DONE:
      return {
        ...state,
        dateRangeCache: action.payload,
      };
    case HABITS_FETCHING_DONE:
    case HABITS_UPDATING_DONE:
    case HABITS_DELETING_DONE:
      return {
        ...state,
        habits: action.payload,
        habitsCache: true,
        loading: false,
      };
    case HABIT_TRACKER_CLEAR:
      return initialState;
    default:
      return state;
  }
}
