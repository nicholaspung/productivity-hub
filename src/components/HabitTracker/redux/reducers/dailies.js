import {
  DAILIES_FETCHING,
  DAILIES_FETCHING_DONE,
  DAILIES_FETCHING_ERROR,
  DAILIES_TOGGLE_DONE,
  DAILIES_TOGGLE_ERROR,
  DAILIES_CACHE_FETCHING,
  DAILIES_CACHE_DONE,
  DAILIES_CACHE_ERROR,
  HABITS_DELETING_ERROR,
  HABITS_UPDATING_ERROR,
} from '../actions';

const initialState = {
  dailies: [],
  dailiesCache: {},
  dateRange: {},
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
        dailiesCache: action.payload[0],
        dateRange: action.payload[1],
      };
    case DAILIES_CACHE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DAILIES_TOGGLE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case HABITS_UPDATING_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case HABITS_DELETING_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
