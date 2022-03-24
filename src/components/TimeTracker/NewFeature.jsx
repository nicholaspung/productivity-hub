import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTrackTimes as getTrackTimesSelector } from '../../redux/selectors/timeTrackerSelectors';

const NewFeature = ({ trackTimes }) => {
  console.log(trackTimes);
  return <div>Hi</div>;
};

NewFeature.propTypes = {
  trackTimes: PropTypes.array.isRequired,
};

export default connect(
  (state) => ({
    trackTimes: getTrackTimesSelector(state),
  }),
  {},
)(memo(NewFeature));
