import React from 'react';
import AllPosts from './AllPosts';
import TitleList from './TitleList';
import SavedPostList from './SavedPostList';
import Helmet from '../BaseComponents/Helmet';

const PostSaver = () => (
  <>
    <Helmet
      title="Post Saver | myexperiment.life"
      name="Post Saver Page"
      content="This is where you see your saved posts."
    />
    <h1 className="text-3xl font-bold text-center p-4">Post Saver</h1>
    <div className="flex flex-wrap justify-around mb-4 mx-4 rounded-md border-2 border-gray-200">
      <SavedPostList classes="lg:flex-1 w-full md:px-4 p-4 border-b-2 lg:border-b-0 lg:border-r-2 border-gray-200" />
      <TitleList classes="lg:flex-1 w-full md:px-4 p-4 border-b-2 lg:border-b-0 lg:border-r-2 border-gray-200" />
      <AllPosts classes="lg:flex-1 w-full md:px-4 p-4 border-b-2 lg:border-b-0 lg:border-r-2 border-gray-200 last:border-b-0 last:border-r-0" />
    </div>
  </>
);

export default PostSaver;
