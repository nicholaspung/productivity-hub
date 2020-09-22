import {
  DAILIES_FETCHING,
  DAILIES_FETCHING_DONE,
  DAILIES_FETCHING_ERROR,
  HABITS_DELETING_ERROR,
  HABITS_UPDATING_ERROR,
} from "../actions";

const initialState = {
  dailies: [],
  loading: false,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DAILIES_FETCHING:
      return {
        ...state,
        loading: true,
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
