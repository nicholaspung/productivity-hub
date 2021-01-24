import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getVicesViceAnalytics } from '../../redux/selectors/vicesSelectors';
import { createViceAnalytics as createViceAnalyticsAction } from '../../redux/actions/vicesActions';
import Vice from './Vice';

const ViceList = ({ viceAnalytics, createViceAnalytics }) => {
  useEffect(() => {
    createViceAnalytics();
  }, [createViceAnalytics]);

  return (
    <div className="flex flex-col flex-1 border-r-2 border-gray-200">
      <div className="flex justify-between">
        <p className="flex-1 text-center underline">Name</p>
        <p className="flex-1 text-center underline">Last Accessed</p>
        <p className="flex-1 text-center underline">Accessed Today</p>
        <p className="flex-1" />
      </div>
      {viceAnalytics.map((viceAnalytic) => (
        <Vice key={viceAnalytic.id} viceAnalytic={viceAnalytic} />
      ))}
    </div>
  );
};

ViceList.propTypes = {
  viceAnalytics: PropTypes.array.isRequired,
  createViceAnalytics: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    viceAnalytics: getVicesViceAnalytics(state),
  }),
  {
    createViceAnalytics: createViceAnalyticsAction,
  },
)(ViceList);
