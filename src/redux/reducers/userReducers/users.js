import {
  USER_LOGGED_IN,
  USER_LOADING_ERROR,
  USER_LOADING,
  USER_LOGGED_OUT,
  USER_DELETING_DONE,
  USER_DELETING_ERROR,
  APPS_UPDATING_DONE,
  APPS_UPDATING_ERROR,
  USER_ANALYTICS_DONE,
  USER_ANALYTICS_ERROR,
  UPDATE_USER_ANALYTIC_THRESHOLD_DONE,
  UPDATE_USER_ANALYTIC_THRESHOLD_ERROR,
  CREATE_USER_ANALYTIC_THRESHOLD_DONE,
  CREATE_USER_ANALYTIC_THRESHOLD_ERROR,
  CLEAR_USER_ERROR_MESSAGE,
  APP_PREFERENCES_UPDATING_DONE,
} from '../../actions/userActions';

export const initialState = {
  info: {
    uid: '',
    isAnonymous: false,
    userId: undefined,
  },
  apps: [],
  appPreferences: {},
  userAnalytics: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    // User Status
    case USER_LOGGED_IN:
      return {
        ...state,
        info: action.payload,
        loading: false,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case USER_LOGGED_OUT:
      return { ...initialState, loading: false };
    case USER_LOADING_ERROR:
      return {
        ...state,
        info: initialState.info,
        loading: false,
        error: action.payload,
      };
    case USER_DELETING_DONE:
      return {
        ...state,
        info: initialState.info,
        error: initialState.error,
      };
    case USER_DELETING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case APPS_UPDATING_DONE:
      return {
        ...state,
        apps: action.payload,
      };
    case APP_PREFERENCES_UPDATING_DONE:
      return {
        ...state,
        appPreferences: action.payload,
      };
    case USER_ANALYTICS_DONE:
    case CREATE_USER_ANALYTIC_THRESHOLD_DONE:
    case UPDATE_USER_ANALYTIC_THRESHOLD_DONE:
      return {
        ...state,
        userAnalytics: action.payload,
        error: {},
      };
    case APPS_UPDATING_ERROR:
    case USER_ANALYTICS_ERROR:
    case CREATE_USER_ANALYTIC_THRESHOLD_ERROR:
    case UPDATE_USER_ANALYTIC_THRESHOLD_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_USER_ERROR_MESSAGE:
      return {
        ...state,
        error: initialState.error,
      };
    default:
      return state;
  }
}
