import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateSavedPost as updateSavedPostAction } from '../../redux/actions/postSaverActions';
import { ReactComponent as CancelSVG } from '../../assets/icons/cancel.svg';
import { trackSpecificEventsFromUser } from '../../api/baseApi';
import { userAnalyticLabels } from '../../constants/baseConstants';
import { smallerFilledButtonClassName } from '../BaseComponents';
import { getUserAnalyticLabelFrequencyAndThreshold } from '../../redux/selectors/userSelectors';

const SavedPostItem = ({
  savedPost,
  savedPostTitleAnalyticFrequencyAndThreshold,
  updateSavedPost,
  setThresholdFunction,
  setSeeThreshold,
}) => {
  const trackSavedPostTitle = (e) => {
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

  return (
    <li className="flex justify-between p-2">
      <a
        href={savedPost.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex visited:text-red-600"
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
  );
};

SavedPostItem.propTypes = {
  savedPost: PropTypes.object.isRequired,
  savedPostTitleAnalyticFrequencyAndThreshold: PropTypes.object.isRequired,
  updateSavedPost: PropTypes.func.isRequired,
  setThresholdFunction: PropTypes.func.isRequired,
  setSeeThreshold: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    savedPostTitleAnalyticFrequencyAndThreshold: getUserAnalyticLabelFrequencyAndThreshold(
      state,
      userAnalyticLabels.SAVED_POST_TITLE,
    ),
  }),
  {
    updateSavedPost: updateSavedPostAction,
  },
)(SavedPostItem);
