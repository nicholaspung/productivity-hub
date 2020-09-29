import {
  POSTS_FETCHING,
  POSTS_FETCHING_DONE,
  POSTS_FETCHING_ERROR,
  POSTS_ADD_TO_CACHE_DONE,
} from '../actions';

const initialState = {
  fetchedPosts: {
    count: 0,
    next: '',
    previous: '',
    results: [],
  },
  posts: {},
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
        fetchedPosts: action.payload,
        error: {},
      };
    case POSTS_FETCHING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case POSTS_ADD_TO_CACHE_DONE:
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
}
