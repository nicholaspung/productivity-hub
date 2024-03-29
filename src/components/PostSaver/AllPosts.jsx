import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getPosts as getPostsAction,
  getRefreshedPosts as getRefreshedPostsAction,
} from '../../redux/actions/postSaverActions';
import {
  getPostsFetchedPosts,
  getPostsLoading,
  getPostsError,
} from '../../redux/selectors/postSaverSelectors';
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
import { ReactComponent as ExternalLinkSVG } from '../../assets/icons/externallink.svg';
import { ReactComponent as ArrowLeftSVG } from '../../assets/icons/arrowleft.svg';
import { ReactComponent as ArrowRightSVG } from '../../assets/icons/arrowright.svg';

const AllPosts = ({
  getPosts,
  postsObj = {},
  loading = false,
  getRefreshedPosts,
  classes = '',
  error,
}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const postObjLength = postsObj.results ? postsObj.results.length : 0;

  const trackAllPostTitle = (e) => {
    e.persist();
    if (e.type === 'click' || e.type === 'contextmenu') {
      let url = e.target.href;
      let { target } = e.target;
      if (e.target.nodeName === 'svg') {
        url = e.target.parentNode.href;
        target = e.target.parentNode.target;
      }
      e.preventDefault();
      window.open(url, target);
      return false;
    }
    return trackSpecificEventsFromUser(userAnalyticLabels.ALL_POST_TITLE);
  };
  const onRefreshAction = () => {
    getRefreshedPosts();
    return trackSpecificEventsFromUser(userAnalyticLabels.ALL_POST_REFRESH);
  };

  return (
    <div className={`${classes || ''}`}>
      <div className="h-0 text-right">
        <FilledButton action={onRefreshAction}>
          <RefreshSVG className="w-4 h-auto" />
        </FilledButton>
      </div>
      {loading && <LoadingSVG className="w-6 h-auto animate-spin absolute" />}
      <h1 className="text-2xl font-bold text-center">All Posts</h1>
      <ul className={overflowDisplayContainer}>
        <EmptyItem length={postObjLength} loading={loading} error={error} />
        {postObjLength
          ? postsObj.results.map((result) => (
              <li key={result.id} className="flex p-2">
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${smallerFilledButtonClassName} flex`}
                  onClick={(e) => trackAllPostTitle(e)}
                  onContextMenu={(e) => trackAllPostTitle(e)}
                >
                  <ExternalLinkSVG className="w-4 h-auto" title="Link" />
                </a>
                <span className="pl-1">{result.title}</span>
              </li>
            ))
          : null}
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
