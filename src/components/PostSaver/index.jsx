import React from 'react';
import AllPosts from './AllPosts';
import TitleList from './TitleList';
import SavedPostList from './SavedPostList';

const PostSaver = () => (
  <>
    <h1 className="text-3xl font-bold text-center p-4">Post Saver</h1>
    <div className="flex flex-wrap justify-around">
      <SavedPostList classes="max-w-md mx-4" />
      <TitleList classes="max-w-md mx-4" />
      <AllPosts classes="max-w-md mx-4" />
    </div>
  </>
);

export default PostSaver;
