import {
  SAVED_POSTS_FETCHING,
  SAVED_POSTS_FETCHING_DONE,
  SAVED_POSTS_FETCHING_ERROR,
  SAVED_POSTS_UPDATING_DONE,
  SAVED_POSTS_UPDATING_ERROR,
} from "../actions";

const initialState = {
  savedPosts: [],
  loading: false,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SAVED_POSTS_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case SAVED_POSTS_FETCHING_DONE:
      return {
        ...state,
        loading: false,
        saved_posts: action.payload,
        error: {},
      };
    case SAVED_POSTS_FETCHING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SAVED_POSTS_UPDATING_DONE:
      return {
        ...state,
        savedPosts: action.payload,
        error: {},
      };
    case SAVED_POSTS_UPDATING_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
