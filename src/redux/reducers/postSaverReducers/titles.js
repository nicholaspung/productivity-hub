import {
  TITLES_FETCHING,
  TITLES_FETCHING_DONE,
  TITLES_FETCHING_ERROR,
  TITLES_ADDING_DONE,
  TITLES_ADDING_ERROR,
  TITLES_UPDATING_DONE,
  TITLES_UPDATING_ERROR,
  TITLES_DELETING_DONE,
  TITLES_DELETING_ERROR,
  POST_SAVER_CLEAR,
} from '../../actions/postSaverActions';

export const initialState = {
  titles: [],
  loading: false,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TITLES_FETCHING:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case TITLES_FETCHING_DONE:
      return {
        ...state,
        loading: false,
        titles: action.payload,
      };
    case TITLES_FETCHING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TITLES_ADDING_DONE:
    case TITLES_UPDATING_DONE:
    case TITLES_DELETING_DONE:
      return {
        ...state,
        titles: action.payload,
        error: {},
      };
    case TITLES_ADDING_ERROR:
    case TITLES_UPDATING_ERROR:
    case TITLES_DELETING_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case POST_SAVER_CLEAR:
      return initialState;
    default:
      return state;
  }
}
