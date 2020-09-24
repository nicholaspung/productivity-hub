import postsReducer from "./posts";
import savedPostsReducer from "./savedPosts";
import titlesReducer from "./titles";

export default {
  titles: titlesReducer,
  posts: postsReducer,
  savedPosts: savedPostsReducer,
};
