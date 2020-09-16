import {
  LOGGED_IN,
  LOADING_USER_ERROR,
  LOADING_USER_STATUS,
  LOGGED_OUT,
  UPDATE_APPS,
} from "../actions";

const initialState = {
  info: {
    uid: "",
    isAnonymous: false,
  },
  apps: {},
  loading: false,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    // User Status
    case LOGGED_IN:
      return {
        ...state,
        info: action.payload,
        loading: false,
      };
    case LOADING_USER_STATUS:
      return {
        ...state,
        loading: true,
      };
    case LOGGED_OUT:
      return {
        ...state,
        info: initialState.info,
        loading: initialState.loading,
      };
    case LOADING_USER_ERROR:
      return {
        ...state,
        info: initialState.info,
        loading: initialState.loading,
        error: action.payload,
      };
    // App Status
    case UPDATE_APPS:
      return {
        ...state,
        apps: action.payload,
      };
    default:
      return state;
  }
}
