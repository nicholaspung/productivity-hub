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
import {
  FilledButton,
  smallerFilledButtonClassName,
  fixedDisplayContainer,
  overflowDisplayContainer,
} from "../BaseComponents";

const SavedPostList = ({
  savedPosts,
  loading,
  getSavedPosts,
  updateSavedPost,
  classes,
}) => {
  useEffect(() => {
    if (!savedPosts.length) {
      getSavedPosts();
    }
  }, [getSavedPosts]);
  return (
    <div className={`${fixedDisplayContainer} ${classes ? classes : ""}`}>
      <h1 className="text-2xl font-bold text-center">Saved Post List</h1>
      <FilledButton action={getSavedPosts}>Refresh Saved Posts</FilledButton>
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          <ul className={overflowDisplayContainer}>
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
                <li
                  key={savedPost.id}
                  className="flex justify-between items-center p-2"
                >
                  <a
                    href={savedPost.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => updateSavedPost(savedPost.id)}
                  >
                    {savedPost.title}
                  </a>
                  <button
                    className={smallerFilledButtonClassName}
                    onClick={() => updateSavedPost(savedPost.id)}
                  >
                    x
                  </button>
                </li>
              ))}
          </ul>
        </>
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
