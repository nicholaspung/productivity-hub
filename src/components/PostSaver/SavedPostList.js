import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getSavedPosts as getSavedPostsAction,
  updateSavedPost as updateSavedPostAction,
} from "./redux/actions";
import {
  getSavedPostsSavedPosts,
  getSavedPostsLoading,
} from "./redux/selectors";

const SavedPostList = ({
  savedPosts,
  loading,
  getSavedPosts,
  updateSavedPost,
}) => {
  useEffect(() => {
    getSavedPosts();
  }, [getSavedPosts]);
  return (
    <div>
      <h1>Saved Post List</h1>
      <button onClick={getSavedPosts}>Refresh Saved Posts</button>
      {loading && <div>Loading...</div>}
      {!loading && (
        <div>
          <ul>
            {savedPosts
              .sort((a, b) => {
                const aTitle = a.title.toLowerCase();
                const bTitle = b.title.toLowerCase();
                if (aTitle < bTitle) {
                  return -1;
                } else if (aTitle > bTitle) {
                  return 1;
                }
                return 0;
              })
              .map((savedPost) => (
                <li key={savedPost.id}>
                  <a
                    href={savedPost.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {savedPost.title}
                  </a>
                  <button onClick={() => updateSavedPost(savedPost.id)}>
                    X
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default connect(
  (state) => ({
    savedPosts: getSavedPostsSavedPosts(state),
    loading: getSavedPostsLoading(state),
  }),
  {
    getSavedPosts: getSavedPostsAction,
    updateSavedPost: updateSavedPostAction,
  }
)(SavedPostList);
