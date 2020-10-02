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
} from '../actions';

const initialState = {
  todos: [],
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
        error: {},
      };
    case TODOS_FETCHING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TODOS_ADDING_DONE:
      return {
        ...state,
        todos: action.payload,
        error: {},
      };
    case TODOS_ADDING_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case TODOS_EDITING_DONE:
      return {
        ...state,
        todos: action.payload,
        error: {},
      };
    case TODOS_EDITING_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case TODOS_REORDERING_DONE:
      return {
        ...state,
        todos: action.payload,
        error: {},
      };
    case TODOS_REORDERING_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case TODOS_DELETING_DONE:
      return {
        ...state,
        todos: action.payload,
        error: {},
      };
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
