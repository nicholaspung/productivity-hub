import React from 'react';
import Feature from '../Feature';
import FeatureItem from '../FeatureItem';
import { ReactComponent as PostSaverSVG } from '../../../assets/icons/postsaver.svg';

const FeaturePostSaver = () => (
  <Feature name="Post Saver">
    <PostSaverSVG className="h-48 w-auto p-10 mx-auto hidden md:block" />
    <FeatureItem>
      <p>
        Grabs and saves posts so you don&apos;t have to! This aggregates all the
        websites that you frequent to allow a one-stop shop of viewing the posts
        that you find interesting.
      </p>
    </FeatureItem>
    <FeatureItem>
      <p>
        Allows you to save keywords that are used to generate a list of posts
        that have been found for future reading.
      </p>
    </FeatureItem>
  </Feature>
);

export default FeaturePostSaver;
