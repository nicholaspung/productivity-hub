import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getSavedPosts as getSavedPostsAction,
  updateSavedPost as updateSavedPostAction,
} from './redux/actions';
import {
  getSavedPostsSavedPosts,
  getSavedPostsLoading,
  getSavedPostsError,
} from './redux/selectors';
import {
  FilledButton,
  smallerFilledButtonClassName,
  overflowDisplayContainer,
} from '../BaseComponents';
import EmptyItem from '../BaseComponents/EmptyItem';
import { trackSpecificEventsFromUser } from '../../api';
import { userAnalyticLabels } from '../constants';
import { ReactComponent as LoadingSVG } from '../../assets/icons/loading.svg';
import { ReactComponent as RefreshSVG } from '../../assets/icons/refresh.svg';
import { ReactComponent as CancelSVG } from '../../assets/icons/cancel.svg';

const SavedPostList = ({
  savedPosts = [],
  loading = false,
  getSavedPosts,
  updateSavedPost,
  classes = '',
  error,
}) => {
  useEffect(() => {
    if (!savedPosts.length) {
      getSavedPosts();
    }
    // eslint-disable-next-line
  }, [getSavedPosts]);

  const trackSavedPostTitle = (e, savedPost) => {
    if (e.type === 'click') {
      updateSavedPost(savedPost.id);
    }
    trackSpecificEventsFromUser(userAnalyticLabels.SAVED_POST_TITLE);
  };

  return (
    <div className={`${classes || ''}`}>
      <div className="h-0 text-right">
        <FilledButton
          action={() => {
            getSavedPosts();
            trackSpecificEventsFromUser(userAnalyticLabels.SAVED_POST_REFRESH);
          }}
        >
          <RefreshSVG className="w-4 h-auto" />
        </FilledButton>
      </div>
      {loading && <LoadingSVG className="w-6 h-auto animate-spin absolute" />}
      <h1 className="text-2xl font-bold text-center">Saved Post List</h1>
      <ul className={overflowDisplayContainer}>
        <EmptyItem length={savedPosts.length} loading={loading} error={error} />
        {savedPosts.length
          ? savedPosts
              .sort((a, b) => {
                const aTitle = a.title.toLowerCase();
                const bTitle = b.title.toLowerCase();
                if (aTitle < bTitle) {
                  return -1;
                }
                if (aTitle > bTitle) {
                  return 1;
                }
                return 0;
              })
              .map((savedPost) => (
                <li
                  key={savedPost.id}
                  className="flex justify-between items-center p-2"
                >
                  <a
                    href={savedPost.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => trackSavedPostTitle(e, savedPost)}
                    onContextMenu={(e) => trackSavedPostTitle(e, savedPost)}
                  >
                    {savedPost.title}
                  </a>
                  <button
                    className={smallerFilledButtonClassName}
                    onClick={() => updateSavedPost(savedPost.id)}
                    type="button"
                  >
                    <CancelSVG className="w-4 h-auto" title="Remove" />
                  </button>
                </li>
              ))
          : null}
      </ul>
      <p className="py-4">
        <strong>Note:</strong>
        All relevant posts are have found when you first load the page. If you
        find yourself looking for more to distract yourself, you are doing
        something wrong.
      </p>
    </div>
  );
};

SavedPostList.propTypes = {
  savedPosts: PropTypes.array,
  loading: PropTypes.bool,
  getSavedPosts: PropTypes.func.isRequired,
  updateSavedPost: PropTypes.func.isRequired,
  classes: PropTypes.string,
  error: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    savedPosts: getSavedPostsSavedPosts(state),
    loading: getSavedPostsLoading(state),
    error: getSavedPostsError(state),
  }),
  {
    getSavedPosts: getSavedPostsAction,
    updateSavedPost: updateSavedPostAction,
  },
)(SavedPostList);
