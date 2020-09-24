import { StaticRouter } from "react-router-dom";

export const getPostsState = (store) => store.posts;
export const getPostsPosts = (store) => getPostsState(store).posts;
export const getPostsLoading = (store) => getPostsState(store).loading;
export const getPostsError = (store) => getPostsState(store).error;
