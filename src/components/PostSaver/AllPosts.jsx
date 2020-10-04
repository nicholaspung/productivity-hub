import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getPosts as getPostsAction,
  getRefreshedPosts as getRefreshedPostsAction,
} from './redux/actions';
import {
  getPostsFetchedPosts,
  getPostsLoading,
  getPostsError,
} from './redux/selectors';
import {
  FilledButton,
  smallerFilledButtonClassName,
  fixedDisplayContainer,
  overflowDisplayContainer,
} from '../BaseComponents';
import EmptyItem from '../BaseComponents/EmptyItem';
import { ReactComponent as LoadingSVG } from '../../assets/icons/loading.svg';
import { ReactComponent as RefreshSVG } from '../../assets/icons/refresh.svg';
import { ReactComponent as ExternalLinkSVG } from '../../assets/icons/externallink.svg';
import { ReactComponent as ArrowLeftSVG } from '../../assets/icons/arrowleft.svg';
import { ReactComponent as ArrowRightSVG } from '../../assets/icons/arrowright.svg';

const AllPosts = ({
  getPosts,
  postsObj,
  loading,
  getRefreshedPosts,
  classes,
  error,
}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className={`${fixedDisplayContainer} ${classes || ''}`}>
      <div className="h-0 text-right">
        <FilledButton action={getRefreshedPosts}>
          <RefreshSVG className="w-4 h-auto" />
        </FilledButton>
      </div>
      {loading && <LoadingSVG className="w-6 h-auto animate-spin absolute" />}
      <h1 className="text-2xl font-bold text-center">All Posts</h1>
      <ul className={`${overflowDisplayContainer} h-screen`}>
        <EmptyItem
          length={postsObj.results.length}
          loading={loading}
          error={error}
        />
        {postsObj.results.map((result) => (
          <li key={result.id} className="flex items-center p-2">
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className={smallerFilledButtonClassName}
            >
              <ExternalLinkSVG className="w-4 h-auto" title="Link" />
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
            <ArrowLeftSVG className="w-4 h-auto" title="Previous" />
          </FilledButton>
        )}
        {postsObj.next && (
          <FilledButton action={() => getPosts(postsObj.next)}>
            <ArrowRightSVG className="w-4 h-auto" title="Next" />
          </FilledButton>
        )}
      </div>
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
  postsObj: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  getRefreshedPosts: PropTypes.func.isRequired,
  classes: PropTypes.string,
  error: PropTypes.object.isRequired,
};

AllPosts.defaultProps = {
  classes: '',
  loading: false,
};

export default connect(
  (state) => ({
    postsObj: getPostsFetchedPosts(state),
    loading: getPostsLoading(state),
    error: getPostsError(state),
  }),
  {
    getPosts: getPostsAction,
    getRefreshedPosts: getRefreshedPostsAction,
  },
)(AllPosts);
