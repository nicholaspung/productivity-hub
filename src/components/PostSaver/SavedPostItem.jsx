import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateSavedPost as updateSavedPostAction } from '../../redux/actions/postSaverActions';
import { ReactComponent as CancelSVG } from '../../assets/icons/cancel.svg';
import { trackSpecificEventsFromUser } from '../../api/baseApi';
import { userAnalyticLabels } from '../../constants/baseConstants';
import { smallerFilledButtonClassName } from '../BaseComponents';

const SavedPostItem = ({ savedPost, updateSavedPost }) => {
  const [clicked, setClicked] = useState(false);

  const trackSavedPostTitle = (e) => {
    e.persist();
    if (e.type === 'click' || e.type === 'contextmenu') {
      const url = e.target.href;
      const { target } = e.target;
      e.preventDefault();
      setClicked(true);
      window.open(url, target);
      updateSavedPost(savedPost.id);
      return false;
    }
    return trackSpecificEventsFromUser(userAnalyticLabels.SAVED_POST_TITLE);
  };
  const removeSavedPost = () => {
    setClicked(true);
    updateSavedPost(savedPost.id);
  };

  return (
    <li className="flex justify-between p-2">
      <a
        href={savedPost.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex visited:text-red-600 ${
          clicked && 'opacity-50 pointer-events-none'
        }`}
        onClick={(e) => trackSavedPostTitle(e, savedPost)}
        onContextMenu={(e) => trackSavedPostTitle(e, savedPost)}
      >
        {savedPost.title}
      </a>
      <button
        className={`${smallerFilledButtonClassName} ml-1`}
        onClick={removeSavedPost}
        type="button"
      >
        <CancelSVG className="w-4 h-auto" title="Remove" />
      </button>
    </li>
  );
};

SavedPostItem.propTypes = {
  savedPost: PropTypes.object.isRequired,
  updateSavedPost: PropTypes.func.isRequired,
};

export default connect(null, { updateSavedPost: updateSavedPostAction })(
  SavedPostItem,
);
