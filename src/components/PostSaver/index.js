import React from 'react';
import AllPosts from './AllPosts';
import TitleList from './TitleList';
import SavedPostList from './SavedPostList';

const PostSaver = () => (
  <>
    <h1 className="text-3xl font-bold text-center p-4">Post Saver</h1>
    <div className="flex flex-wrap justify-around">
      <SavedPostList classes="flex-1 w-full sm:w-4/12 sm:mx-4" />
      <TitleList classes="flex-1 sm:mx-4" />
      <AllPosts classes="flex-1 sm:mx-4" />
    </div>
  </>
);

export default PostSaver;
