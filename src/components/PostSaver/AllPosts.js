import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPosts as getPostsAction } from "./redux/actions";

const AllPosts = ({ getPosts }) => {
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      <h1>All Posts</h1>
    </div>
  );
};

export default connect(null, {
  getPosts: getPostsAction,
})(AllPosts);
