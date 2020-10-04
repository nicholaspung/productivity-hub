import {
  helperReplaceObjectInArray,
  helperRemoveObjectFromArray,
} from '../../../utils';
import {
  getPosts as getPostsAPI,
  getTitles as getTitlesAPI,
  addTitle as addTitleAPI,
  updateTitle as updateTitleAPI,
  deleteTitle as deleteTitleAPI,
  getSavedPosts as getSavedPostsAPI,
  updateSavedPost as updateSavedPostAPI,
} from '../api';

export const POSTS_FETCHING = 'POSTS_FETCHING';
export const POSTS_FETCHING_DONE = 'POSTS_FETCHING_DONE';
export const POSTS_FETCHING_ERROR = 'POSTS_FETCHING_ERROR';
export const POSTS_ADD_TO_CACHE = 'POSTS_ADD_TO_CACHE';
export const POSTS_ADD_TO_CACHE_DONE = 'POSTS_ADD_TO_CACHE_DONE';
export const TITLES_FETCHING = 'TITLES_FETCHING';
export const TITLES_FETCHING_DONE = 'TITLES_FETCHING_DONE';
export const TITLES_FETCHING_ERROR = 'TITLES_FETCHING_ERROR';
export const TITLES_ADDING = 'TITLES_ADDING';
export const TITLES_ADDING_DONE = 'TITLES_ADDING_DONE';
export const TITLES_ADDING_ERROR = 'TITLES_ADDING_ERROR';
export const TITLES_UPDATING = 'TITLES_UPDATING';
export const TITLES_UPDATING_DONE = 'TITLES_UPDATING_DONE';
export const TITLES_UPDATING_ERROR = 'TITLES_UPDATING_ERROR';
export const TITLES_DELETING = 'TITLES_DELETING';
export const TITLES_DELETING_DONE = 'TITLES_DELETING_DONE';
export const TITLES_DELETING_ERROR = 'TITLES_DELETING_ERROR';
export const SAVED_POSTS_FETCHING = 'SAVED_POSTS_FETCHING';
export const SAVED_POSTS_FETCHING_DONE = 'SAVED_POSTS_FETCHING_DONE';
export const SAVED_POSTS_FETCHING_ERROR = 'SAVED_POSTS_FETCHING_ERROR';
export const SAVED_POSTS_UPDATING = 'SAVED_POSTS_UPDATING';
export const SAVED_POSTS_UPDATING_DONE = 'SAVED_POSTS_UPDATING_DONE';
export const SAVED_POSTS_UPDATING_ERROR = 'SAVED_POSTS_UPDATING_ERROR';

export const getPosts = (newUrl) => async (dispatch, getState) => {
  let lastTwoStrings;
  let url;
  if (newUrl) {
    url = newUrl;
  }
  if (url) {
    lastTwoStrings = url.slice(url.length - 2, url.length);
  } else {
    lastTwoStrings = 's/';
  }
  const { posts } = getState();
  // If cached
  if (posts.posts[lastTwoStrings]) {
    return dispatch({
      type: POSTS_FETCHING_DONE,
      payload: posts.posts[lastTwoStrings],
    });
  }
  dispatch({ type: POSTS_FETCHING });
  try {
    const { data } = await getPostsAPI(url);
    dispatch({ type: POSTS_ADD_TO_CACHE });
    posts.posts[lastTwoStrings] = data;
    dispatch({ type: POSTS_ADD_TO_CACHE_DONE, payload: posts.posts });
    return dispatch({ type: POSTS_FETCHING_DONE, payload: data });
  } catch (err) {
    return dispatch({ type: POSTS_FETCHING_ERROR, payload: err });
  }
};
export const getRefreshedPosts = () => async (dispatch) => {
  dispatch({ type: POSTS_FETCHING });
  try {
    const { data } = await getPostsAPI();
    const posts = {
      's/': data,
    };
    dispatch({ type: POSTS_ADD_TO_CACHE_DONE, payload: posts });
    return dispatch({ type: POSTS_FETCHING_DONE, payload: data });
  } catch (err) {
    return dispatch({ type: POSTS_FETCHING_ERROR, payload: err });
  }
};
export const getTitles = () => async (dispatch) => {
  dispatch({ type: TITLES_FETCHING });
  try {
    const { data } = await getTitlesAPI();
    return dispatch({ type: TITLES_FETCHING_DONE, payload: data });
  } catch (err) {
    return dispatch({ type: TITLES_FETCHING_ERROR, payload: err });
  }
};
export const addTitle = (title) => async (dispatch, getState) => {
  dispatch({ type: TITLES_ADDING });
  try {
    const { data } = await addTitleAPI(title);
    const { titles } = getState();
    return dispatch({
      type: TITLES_ADDING_DONE,
      payload: [...titles.titles, data],
    });
  } catch (err) {
    return dispatch({ type: TITLES_ADDING_ERROR, payload: err });
  }
};
export const updateTitle = (id, title) => async (dispatch, getState) => {
  dispatch({ type: TITLES_UPDATING });
  try {
    const { data } = await updateTitleAPI(id, title);
    const { titles } = getState();
    const titlesCopy = helperReplaceObjectInArray(titles, 'titles', data);
    return dispatch({ type: TITLES_UPDATING_DONE, payload: titlesCopy });
  } catch (err) {
    return dispatch({ type: TITLES_UPDATING_ERROR, payload: err });
  }
};
export const deleteTitle = (id) => async (dispatch, getState) => {
  dispatch({ type: TITLES_DELETING });
  try {
    await deleteTitleAPI(id);
    const { titles } = getState();
    const idIndex = titles.titles.findIndex((el) => el.id === id);
    const titlesCopy = helperRemoveObjectFromArray(titles.titles, idIndex);
    return dispatch({ type: TITLES_DELETING_DONE, payload: titlesCopy });
  } catch (err) {
    return dispatch({ type: TITLES_DELETING_ERROR, payload: err });
  }
};
export const getSavedPosts = () => async (dispatch) => {
  dispatch({ type: SAVED_POSTS_FETCHING });
  try {
    const { data } = await getSavedPostsAPI();
    data.sort((a, b) => a.title > b.title);
    return dispatch({ type: SAVED_POSTS_FETCHING_DONE, payload: data });
  } catch (err) {
    return dispatch({ type: SAVED_POSTS_FETCHING_ERROR, payload: err });
  }
};
// Removes the saved post from being displayed
export const updateSavedPost = (id) => async (dispatch, getState) => {
  dispatch({ type: SAVED_POSTS_UPDATING });
  try {
    await updateSavedPostAPI(id);
    const { savedPosts } = getState();
    const idIndex = savedPosts.savedPosts.findIndex((el) => el.id === id);
    const savedPostsCopy = helperRemoveObjectFromArray(
      savedPosts.savedPosts,
      idIndex,
    );
    return dispatch({
      type: SAVED_POSTS_UPDATING_DONE,
      payload: savedPostsCopy,
    });
  } catch (err) {
    return dispatch({ type: SAVED_POSTS_UPDATING_ERROR, payload: err });
  }
};
export const POST_SAVER_CLEAR = 'POST_SAVER_CLEAR';
export const clearPostSaver = () => ({ type: POST_SAVER_CLEAR });
