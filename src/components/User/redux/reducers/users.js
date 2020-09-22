import {
  USER_LOGGED_IN,
  USER_LOADING_ERROR,
  USER_LOADING,
  USER_LOGGED_OUT,
  APPS_UPDATED,
} from "../actions";

const initialState = {
  info: {
    uid: "",
    isAnonymous: false,
    userId: undefined,
  },
  apps: "",
  loading: false,
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
      };
    case USER_LOGGED_OUT:
      return {
        ...state,
        info: initialState.info,
        loading: initialState.loading,
      };
    case USER_LOADING_ERROR:
      return {
        ...state,
        info: initialState.info,
        loading: initialState.loading,
        error: action.payload,
      };
    // App Status
    case APPS_UPDATED:
      return {
        ...state,
        apps: action.payload,
      };
    default:
      return state;
  }
}
