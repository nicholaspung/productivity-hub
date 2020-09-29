import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getPosts as getPostsAction,
  getRefreshedPosts as getRefreshedPostsAction,
} from './redux/actions';
import { getPostsFetchedPosts, getPostsLoading } from './redux/selectors';
import {
  FilledButton,
  smallerFilledButtonClassName,
  fixedDisplayContainer,
  overflowDisplayContainer,
} from '../BaseComponents';

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
    <div className={`${fixedDisplayContainer} ${classes || ''}`}>
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
      <p className="py-4">
        <strong>Note:</strong>
        All posts are gathering on the current day. If you find yourself looking
        for more to distract yourself, you are doing something wrong.
      </p>
    </div>
  );
};

AllPosts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  postsObj: PropTypes.objectOf({
    results: PropTypes.arrayOf({
      id: PropTypes.number,
      url: PropTypes.string,
      title: PropTypes.string,
    }),
    previous: PropTypes.string,
    next: PropTypes.string,
  }).isRequired,
  loading: PropTypes.bool,
  getRefreshedPosts: PropTypes.func.isRequired,
  classes: PropTypes.string,
};

AllPosts.defaultProps = {
  classes: '',
  loading: false,
};

export default connect(
  (state) => ({
    postsObj: getPostsFetchedPosts(state),
    loading: getPostsLoading(state),
  }),
  {
    getPosts: getPostsAction,
    getRefreshedPosts: getRefreshedPostsAction,
  },
)(AllPosts);
