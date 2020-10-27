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
} from '../actions';

export const initialState = {
  dailies: [],
  dailiesCache: {},
  dateRangeCache: {},
  habits: [],
  loading: false,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DAILIES_FETCHING:
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
    case DAILIES_TOGGLE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case DAILIES_CACHE_FETCHING:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case DAILIES_CACHE_DONE:
      return {
        ...state,
        loading: false,
        dailiesCache: action.payload,
      };
    case DAILIES_CACHE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DAILIES_DATE_RANGE_DONE:
      return {
        ...state,
        dateRangeCache: action.payload,
      };
    case HABITS_FETCHING:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case HABITS_FETCHING_DONE:
      return {
        ...state,
        loading: false,
        habits: action.payload,
      };
    case HABITS_FETCHING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case HABITS_UPDATING:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case HABITS_UPDATING_DONE:
      return {
        ...state,
        habits: action.payload,
        loading: false,
      };
    case HABITS_UPDATING_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case HABITS_DELETING_DONE:
      return {
        ...state,
        habits: action.payload,
        loading: false,
      };
    case HABITS_DELETING_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case HABIT_TRACKER_CLEAR:
      return { ...initialState, dailiesCache: {} };
    default:
      return state;
  }
}
