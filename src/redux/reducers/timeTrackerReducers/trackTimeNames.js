import {
  TRACK_TIME_NAMES_FETCHING,
  TRACK_TIME_NAMES_FETCHING_DONE,
  TRACK_TIME_NAMES_FETCHING_ERROR,
  TRACK_TIME_NAMES_ADDING,
  TRACK_TIME_NAMES_ADDING_DONE,
  TRACK_TIME_NAMES_ADDING_ERROR,
  TRACK_TIME_NAMES_UPDATING,
  TRACK_TIME_NAMES_UPDATING_DONE,
  TRACK_TIME_NAMES_UPDATING_ERROR,
  TRACK_TIME_NAMES_DELETING,
  TRACK_TIME_NAMES_DELETING_DONE,
  TRACK_TIME_NAMES_DELETING_ERROR,
  TIME_TRACKER_CLEAR,
  TRACK_TIME_NAME_SET_BREAK_TIME,
} from '../../actions/timeTrackerActions';

export const initialState = {
  trackTimeNames: [],
  breakTime: {},
  loading: false,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TRACK_TIME_NAMES_FETCHING:
    case TRACK_TIME_NAMES_ADDING:
    case TRACK_TIME_NAMES_UPDATING:
    case TRACK_TIME_NAMES_DELETING:
      return {
        ...state,
        loading: true,
        error: initialState.error,
      };
    case TRACK_TIME_NAMES_FETCHING_DONE:
    case TRACK_TIME_NAMES_ADDING_DONE:
    case TRACK_TIME_NAMES_UPDATING_DONE:
    case TRACK_TIME_NAMES_DELETING_DONE:
      return {
        ...state,
        loading: false,
        trackTimeNames: action.payload,
      };
    case TRACK_TIME_NAMES_FETCHING_ERROR:
    case TRACK_TIME_NAMES_ADDING_ERROR:
    case TRACK_TIME_NAMES_UPDATING_ERROR:
    case TRACK_TIME_NAMES_DELETING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TRACK_TIME_NAME_SET_BREAK_TIME:
      return {
        ...state,
        breakTime: action.payload,
      };
    case TIME_TRACKER_CLEAR:
      return initialState;
    default:
      return state;
  }
}
