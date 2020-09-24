import React from "react";
import AllPosts from "./AllPosts";
import TitleList from "./TitleList";
import SavedPostList from "./SavedPostList";

const PostSaver = () => (
  <div>
    <TitleList />
    <SavedPostList />
    <AllPosts />
  </div>
);

export default PostSaver;
