import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getPosts as getPostsAction,
  getRefreshedPosts as getRefreshedPostsAction,
} from "./redux/actions";
import { getPostsFetchedPosts, getPostsLoading } from "./redux/selectors";

const AllPosts = ({ getPosts, postsObj, loading, getRefreshedPosts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div>
      <h1>All Posts</h1>
      <button onClick={getRefreshedPosts}>Refresh Data</button>
      {loading && <div>Loading...</div>}
      {!loading && (
        <div>
          <ul>
            {postsObj.results.map((result) => (
              <li key={result.id}>
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={result.seen && { textDecoration: "line-through" }}
                >
                  {result.title}
                </a>
              </li>
            ))}
          </ul>
          {postsObj.previous && (
            <button onClick={() => getPosts(postsObj.previous)}>
              Previous
            </button>
          )}
          {postsObj.next && (
            <button onClick={() => getPosts(postsObj.next)}>Next</button>
          )}
        </div>
      )}
    </div>
  );
};

export default connect(
  (state) => ({
    postsObj: getPostsFetchedPosts(state),
    loading: getPostsLoading(state),
  }),
  {
    getPosts: getPostsAction,
    getRefreshedPosts: getRefreshedPostsAction,
  }
)(AllPosts);
