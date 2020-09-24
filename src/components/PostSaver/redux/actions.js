import {
  getPosts as getPostsAPI,
  getTitles as getTitlesAPI,
  addTitle as addTitleAPI,
  updateTitle as updateTitleAPI,
  deleteTitle as deleteTitleAPI,
  getSavedPosts as getSavedPostsAPI,
  updateSavedPost as updateSavedPostAPI,
} from "../api";

export const POSTS_FETCHING = "POSTS_FETCHING";
export const POSTS_FETCHING_DONE = "POSTS_FETCHING_DONE";
export const POSTS_FETCHING_ERROR = "POSTS_FETCHING_ERROR";
export const TITLES_FETCHING = "TITLES_FETCHING";
export const TITLES_FETCHING_DONE = "TITLES_FETCHING_DONE";
export const TITLES_FETCHING_ERROR = "TITLES_FETCHING_ERROR";
export const TITLES_ADDING = "TITLES_ADDING";
export const TITLES_ADDING_DONE = "TITLES_ADDING_DONE";
export const TITLES_ADDING_ERROR = "TITLES_ADDING_ERROR";
export const TITLES_UPDATING = "TITLES_UPDATING";
export const TITLES_UPDATING_DONE = "TITLES_UPDATING_DONE";
export const TITLES_UPDATING_ERROR = "TITLES_UPDATING_ERROR";
export const TITLES_DELETING = "TITLES_DELETING";
export const TITLES_DELETING_DONE = "TITLES_DELETING_DONE";
export const TITLES_DELETING_ERROR = "TITLES_DELETING_ERROR";
export const SAVED_POSTS_FETCHING = "SAVED_POSTS_FETCHING";
export const SAVED_POSTS_FETCHING_DONE = "SAVED_POSTS_FETCHING_DONE";
export const SAVED_POSTS_FETCHING_ERROR = "SAVED_POSTS_FETCHING_ERROR";
export const SAVED_POSTS_UPDATING = "SAVED_POSTS_UPDATING";
export const SAVED_POSTS_UPDATING_DONE = "SAVED_POSTS_UPDATING_DONE";
export const SAVED_POSTS_UPDATING_ERROR = "SAVED_POSTS_UPDATING_ERROR";

export const getPosts = () => async (dispatch) => {
  dispatch({ type: POSTS_FETCHING });
  try {
    const response = await getPostsAPI();
    return dispatch({ type: POSTS_FETCHING_DONE, payload: response });
  } catch (err) {
    return dispatch({ type: POSTS_FETCHING_ERROR, payload: err });
  }
};

export const getTitles = () => async (dispatch) => {
  dispatch({ type: TITLES_FETCHING });
  try {
    const response = await getTitlesAPI();
    return dispatch({ type: TITLES_FETCHING_DONE, payload: response });
  } catch (err) {
    return dispatch({ type: TITLES_FETCHING_ERROR, payload: err });
  }
};

export const addTitle = (title) => async (dispatch) => {
  dispatch({ type: TITLES_FETCHING });
  try {
    const response = await addTitleAPI(title);
    return dispatch({ type: TITLES_FETCHING_DONE, payload: response });
  } catch (err) {
    return dispatch({ type: TITLES_FETCHING_ERROR, payload: err });
  }
};

export const updateTitle = (id, title) => async (dispatch) => {
  dispatch({ type: TITLES_ADDING });
  try {
    const response = await updateTitleAPI(id, title);
    return dispatch({ type: TITLES_ADDING_DONE, payload: response });
  } catch (err) {
    return dispatch({ type: TITLES_ADDING_ERROR, payload: err });
  }
};

export const deleteTitle = (id) => async (dispatch) => {
  dispatch({ type: TITLES_DELETING });
  try {
    const response = await deleteTitleAPI(id);
    return dispatch({ type: TITLES_DELETING_DONE, payload: response });
  } catch (err) {
    return dispatch({ type: TITLES_DELETING_ERROR, payload: err });
  }
};

export const getSavedPosts = () => async (dispatch) => {
  dispatch({ type: SAVED_POSTS_FETCHING });
  try {
    const response = await getSavedPostsAPI();
    return dispatch({ type: SAVED_POSTS_FETCHING_DONE, payload: response });
  } catch (err) {
    return dispatch({ type: SAVED_POSTS_FETCHING_ERROR, payload: err });
  }
};

export const updateSavedPost = () => async (dispatch) => {
  dispatch({ type: SAVED_POSTS_UPDATING });
  try {
    const response = await updateSavedPostAPI();
    return dispatch({ type: SAVED_POSTS_UPDATING_DONE, payload: response });
  } catch (err) {
    return dispatch({ type: SAVED_POSTS_UPDATING_ERROR, payload: err });
  }
};
