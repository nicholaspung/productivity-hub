import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSavedPosts as getSavedPostsAction } from '../../redux/actions/postSaverActions';
import {
  getSavedPostsSavedPosts,
  getSavedPostsLoading,
  getSavedPostsError,
} from '../../redux/selectors/postSaverSelectors';
import { FilledButton, overflowDisplayContainer } from '../BaseComponents';
import EmptyItem from '../BaseComponents/EmptyItem';
import { trackSpecificEventsFromUser } from '../../api/baseApi';
import { userAnalyticLabels } from '../../constants/baseConstants';
import { ReactComponent as LoadingSVG } from '../../assets/icons/loading.svg';
import { ReactComponent as RefreshSVG } from '../../assets/icons/refresh.svg';
import SavedPostItem from './SavedPostItem';
import { sortSavedPostTitles } from '../../utils/savedPostUtils';

const SavedPostList = ({
  savedPosts = [],
  loading = false,
  getSavedPosts,
  classes = '',
  error,
}) => {
  useEffect(() => {
    getSavedPosts();
    trackSpecificEventsFromUser(userAnalyticLabels.SAVED_POST_REFRESH);
    // eslint-disable-next-line
  }, [getSavedPosts]);

  const onRefreshAction = () => {
    getSavedPosts();
    return trackSpecificEventsFromUser(userAnalyticLabels.SAVED_POST_REFRESH);
  };

  return (
    <div className={`${classes || ''}`}>
      <div className="h-0 text-right">
        <FilledButton action={onRefreshAction}>
          <RefreshSVG className="w-4 h-auto" />
        </FilledButton>
      </div>
      {loading && <LoadingSVG className="w-6 h-auto animate-spin absolute" />}
      <h1 className="text-2xl font-bold text-center">Saved Post List</h1>
      <ul className={overflowDisplayContainer}>
        <EmptyItem length={savedPosts.length} loading={loading} error={error} />
        {savedPosts.length
          ? savedPosts
              .sort(sortSavedPostTitles)
              .map((savedPost) => (
                <SavedPostItem savedPost={savedPost} key={savedPost.id} />
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
  classes: PropTypes.string,
  error: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    savedPosts: getSavedPostsSavedPosts(state),
    loading: getSavedPostsLoading(state),
    error: getSavedPostsError(state),
  }),
  { getSavedPosts: getSavedPostsAction },
)(SavedPostList);
