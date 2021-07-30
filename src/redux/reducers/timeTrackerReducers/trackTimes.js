import {
  TRACK_TIMES_FETCHING,
  TRACK_TIMES_FETCHING_DONE,
  TRACK_TIMES_FETCHING_ERROR,
  TRACK_TIMES_ADDING,
  TRACK_TIMES_ADDING_DONE,
  TRACK_TIMES_ADDING_ERROR,
  TRACK_TIMES_UPDATING,
  TRACK_TIMES_UPDATING_DONE,
  TRACK_TIMES_UPDATING_ERROR,
  TRACK_TIMES_DELETING,
  TRACK_TIMES_DELETING_DONE,
  TRACK_TIMES_DELETING_ERROR,
  TIME_TRACKER_CLEAR,
  TRACK_TIMES_START_TIMER,
  TRACK_TIMES_START_TIMER_DONE,
  TRACK_TIMES_START_TIMER_ERROR,
  TRACK_TIMES_END_TIMER,
  TRACK_TIMES_END_TIMER_DONE,
  TRACK_TIMES_END_TIMER_ERROR,
  TRACK_TIMES_SET_CURRENT_TRACK_TIME,
} from '../../actions/timeTrackerActions';

export const initialState = {
  currentTrackTime: {},
  trackTimes: [],
  loading: false,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TRACK_TIMES_FETCHING:
    case TRACK_TIMES_ADDING:
    case TRACK_TIMES_UPDATING:
    case TRACK_TIMES_DELETING:
    case TRACK_TIMES_START_TIMER:
    case TRACK_TIMES_END_TIMER:
      return {
        ...state,
        loading: true,
        error: initialState.error,
      };
    case TRACK_TIMES_FETCHING_DONE:
    case TRACK_TIMES_ADDING_DONE:
    case TRACK_TIMES_UPDATING_DONE:
    case TRACK_TIMES_DELETING_DONE:
      return {
        ...state,
        loading: false,
        trackTimes: action.payload,
      };
    case TRACK_TIMES_FETCHING_ERROR:
    case TRACK_TIMES_ADDING_ERROR:
    case TRACK_TIMES_UPDATING_ERROR:
    case TRACK_TIMES_DELETING_ERROR:
    case TRACK_TIMES_START_TIMER_ERROR:
    case TRACK_TIMES_END_TIMER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TRACK_TIMES_START_TIMER_DONE:
      return {
        ...state,
        currentTrackTime: action.payload,
        loading: false,
      };
    case TRACK_TIMES_END_TIMER_DONE:
      return {
        ...state,
        currentTrackTime: initialState.currentTrackTime,
        trackTimes: action.payload,
        loading: false,
      };
    case TRACK_TIMES_SET_CURRENT_TRACK_TIME:
      return {
        ...state,
        currentTrackTime: action.payload,
      };
    case TIME_TRACKER_CLEAR:
      return initialState;
    default:
      return state;
  }
}
