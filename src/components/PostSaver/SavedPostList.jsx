import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getSavedPosts as getSavedPostsAction,
  updateSavedPost as updateSavedPostAction,
} from '../../redux/actions/postSaverActions';
import {
  getSavedPostsSavedPosts,
  getSavedPostsLoading,
  getSavedPostsError,
} from '../../redux/selectors/postSaverSelectors';
import { getUserAnalyticLabelFrequencyAndThreshold } from '../../redux/selectors/userSelectors';
import {
  FilledButton,
  smallerFilledButtonClassName,
  overflowDisplayContainer,
} from '../BaseComponents';
import EmptyItem from '../BaseComponents/EmptyItem';
import { trackSpecificEventsFromUser } from '../../api/baseApi';
import { userAnalyticLabels } from '../../constants/baseConstants';
import { ReactComponent as LoadingSVG } from '../../assets/icons/loading.svg';
import { ReactComponent as RefreshSVG } from '../../assets/icons/refresh.svg';
import { ReactComponent as CancelSVG } from '../../assets/icons/cancel.svg';
import NotFocusedModal from '../BaseComponents/NotFocusedModal';

const SavedPostList = ({
  savedPosts = [],
  loading = false,
  getSavedPosts,
  updateSavedPost,
  classes = '',
  error,
  savedPostRefreshAnalyticFrequencyAndThreshold,
  savedPostTitleAnalyticFrequencyAndThreshold,
}) => {
  const emptyFunction = () => () => {};
  const [seeThreshold, setSeeThreshold] = useState(false);
  const [thresholdFunction, setThresholdFunction] = useState(emptyFunction);

  useEffect(() => {
    if (!savedPosts.length) {
      getSavedPosts();
      trackSpecificEventsFromUser(userAnalyticLabels.SAVED_POST_REFRESH);
    }
    // eslint-disable-next-line
  }, [getSavedPosts]);

  const trackSavedPostTitle = (e, savedPost) => {
    e.persist();
    if (e.type === 'click' || e.type === 'contextmenu') {
      if (
        savedPostTitleAnalyticFrequencyAndThreshold.frequency >=
        savedPostTitleAnalyticFrequencyAndThreshold.threshold
      ) {
        const url = e.target.href;
        const { target } = e.target;
        e.preventDefault();
        setThresholdFunction(() => (use) => {
          if (use) {
            window.open(url, target);
            updateSavedPost(savedPost.id);
          }
        });
        setSeeThreshold(true);
        return false;
      }
      updateSavedPost(savedPost.id);
    }
    return trackSpecificEventsFromUser(userAnalyticLabels.SAVED_POST_TITLE);
  };
  const onRefreshAction = () => {
    if (
      savedPostRefreshAnalyticFrequencyAndThreshold.frequency >=
      savedPostRefreshAnalyticFrequencyAndThreshold.threshold
    ) {
      setThresholdFunction(() => () => getSavedPosts());
      setSeeThreshold(true);
      return false;
    }
    getSavedPosts();
    return trackSpecificEventsFromUser(userAnalyticLabels.SAVED_POST_REFRESH);
  };

  return (
    <div className={`${classes || ''}`}>
      <div className="h-0 text-right">
        <FilledButton action={onRefreshAction}>
          <RefreshSVG className="w-4 h-auto" />
        </FilledButton>
        {seeThreshold && (
          <NotFocusedModal
            displayFunction={(use) => {
              thresholdFunction(use);
              setSeeThreshold(false);
              setThresholdFunction(emptyFunction);
            }}
          />
        )}
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
                <li key={savedPost.id} className="flex justify-between p-2">
                  <a
                    href={savedPost.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex"
                    onClick={(e) => trackSavedPostTitle(e, savedPost)}
                    onContextMenu={(e) => trackSavedPostTitle(e, savedPost)}
                  >
                    {savedPost.title}
                  </a>
                  <button
                    className={`${smallerFilledButtonClassName} ml-1`}
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
  savedPostRefreshAnalyticFrequencyAndThreshold: PropTypes.object.isRequired,
  savedPostTitleAnalyticFrequencyAndThreshold: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    savedPosts: getSavedPostsSavedPosts(state),
    loading: getSavedPostsLoading(state),
    error: getSavedPostsError(state),
    savedPostRefreshAnalyticFrequencyAndThreshold: getUserAnalyticLabelFrequencyAndThreshold(
      state,
      userAnalyticLabels.SAVED_POST_REFRESH,
    ),
    savedPostTitleAnalyticFrequencyAndThreshold: getUserAnalyticLabelFrequencyAndThreshold(
      state,
      userAnalyticLabels.SAVED_POST_TITLE,
    ),
  }),
  {
    getSavedPosts: getSavedPostsAction,
    updateSavedPost: updateSavedPostAction,
  },
)(SavedPostList);
