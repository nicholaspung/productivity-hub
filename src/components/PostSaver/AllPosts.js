import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getPosts as getPostsAction,
  getRefreshedPosts as getRefreshedPostsAction,
} from "./redux/actions";
import { getPostsFetchedPosts, getPostsLoading } from "./redux/selectors";
import {
  FilledButton,
  smallerFilledButtonClassName,
  fixedDisplayContainer,
  overflowDisplayContainer,
} from "../BaseComponents";

const AllPosts = ({
  getPosts,
  postsObj,
  loading,
  getRefreshedPosts,
  classes,
}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className={`${fixedDisplayContainer} ${classes ? classes : ""}`}>
      <h1 className="text-2xl font-bold text-center">All Posts</h1>
      <FilledButton action={getRefreshedPosts}>Refresh Data</FilledButton>
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          <ul className={overflowDisplayContainer}>
            {postsObj.results.map((result) => (
              <li key={result.id} className="flex items-center p-2">
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={smallerFilledButtonClassName}
                  style={result.seen && { textDecoration: "line-through" }}
                >
                  Link
                </a>
                <span className="pl-1">{result.title}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-end">
            {postsObj.previous && (
              <FilledButton
                action={() => getPosts(postsObj.previous)}
                classes="mr-1"
              >
                Previous
              </FilledButton>
            )}
            {postsObj.next && (
              <FilledButton action={() => getPosts(postsObj.next)}>
                Next
              </FilledButton>
            )}
          </div>
        </>
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
