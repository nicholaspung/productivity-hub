import React from 'react';
import UserError from './UserError';
import AnonymousUserMessage from './AnonymousUserMessage';

const Banner = () => (
  <>
    <UserError />
    <AnonymousUserMessage />
  </>
);

export default Banner;
