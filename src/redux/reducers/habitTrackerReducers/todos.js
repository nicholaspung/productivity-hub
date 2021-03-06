import {
  TODOS_FETCHING,
  TODOS_FETCHING_DONE,
  TODOS_FETCHING_ERROR,
  TODOS_DELETING_DONE,
  TODOS_DELETING_ERROR,
  TODOS_ADDING_ERROR,
  TODOS_ADDING_DONE,
  TODOS_EDITING_DONE,
  TODOS_EDITING_ERROR,
  TODOS_REORDERING_DONE,
  TODOS_REORDERING_ERROR,
  HABIT_TRACKER_CLEAR,
} from '../../actions/habitTrackerActions';

export const initialState = {
  todos: [],
  cache: false,
  loading: false,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TODOS_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case TODOS_FETCHING_DONE:
      return {
        ...state,
        todos: action.payload,
        loading: false,
        cache: true,
        error: {},
      };
    case TODOS_FETCHING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TODOS_ADDING_DONE:
    case TODOS_EDITING_DONE:
    case TODOS_REORDERING_DONE:
    case TODOS_DELETING_DONE:
      return {
        ...state,
        todos: action.payload,
        error: {},
      };
    case TODOS_ADDING_ERROR:
    case TODOS_EDITING_ERROR:
    case TODOS_REORDERING_ERROR:
    case TODOS_DELETING_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case HABIT_TRACKER_CLEAR:
      return initialState;
    default:
      return state;
  }
}
