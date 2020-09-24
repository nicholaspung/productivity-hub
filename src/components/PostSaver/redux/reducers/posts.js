import {
  POSTS_FETCHING,
  POSTS_FETCHING_DONE,
  POSTS_FETCHING_ERROR,
} from "../actions";

const initialState = {
  posts: {
    count: 0,
    next: "",
    previous: "",
    results: [],
  },
  loading: false,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POSTS_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case POSTS_FETCHING_DONE:
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: {},
      };
    case POSTS_FETCHING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
