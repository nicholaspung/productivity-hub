export const getPostsState = (store) => store.posts;
export const getPostsFetchedPosts = (store) =>
  getPostsState(store).fetchedPosts;
export const getPostsPosts = (store) => getPostsState(store).posts;
export const getPostsLoading = (store) => getPostsState(store).loading;
export const getPostsError = (store) => getPostsState(store).error;

export const getTitlesState = (store) => store.titles;
export const getTitlesTitles = (store) => getTitlesState(store).titles;
export const getTitlesLoading = (store) => getTitlesState(store).loading;
export const getTitlesError = (store) => getTitlesState(store).error;

export const getSavedPostsState = (store) => store.savedPosts;
export const getSavedPostsSavedPosts = (store) =>
  getSavedPostsState(store).savedPosts;
export const getSavedPostsLoading = (store) =>
  getSavedPostsState(store).loading;
export const getSavedPostsError = (store) => getSavedPostsState(store).error;
