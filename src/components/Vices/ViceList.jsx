import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getVicesViceAnalytics,
  getVicesError,
  getVicesLoading,
} from '../../redux/selectors/vicesSelectors';
import { createViceAnalytics as createViceAnalyticsAction } from '../../redux/actions/vicesActions';
import Vice from './Vice';
import { sortViceAnalytics } from '../../utils/viceUtils';
import { ReactComponent as RefreshSVG } from '../../assets/icons/refresh.svg';
import EmptyItem from '../BaseComponents/EmptyItem';

const ViceList = ({ viceAnalytics, createViceAnalytics, error, loading }) => {
  useEffect(() => {
    createViceAnalytics();
  }, [createViceAnalytics]);

  return (
    <div className="flex flex-col flex-1 md:border-r-2 border-b-2 md:border-b-0 border-gray-200">
      <div className="flex justify-between">
        <p className="flex-1 text-center underline">Name</p>
        <p className="flex-1 text-center underline">Last Accessed</p>
        <p className="flex-1 text-center underline">Accessed Today</p>
        <button type="button" className="flex-1" onClick={createViceAnalytics}>
          <div className="flex justify-center">
            <RefreshSVG className="w-4 h-auto py-1" />
          </div>
        </button>
      </div>
      <EmptyItem
        length={viceAnalytics.length}
        error={error}
        loading={loading}
      />
      {viceAnalytics.sort(sortViceAnalytics).map((viceAnalytic) => (
        <Vice key={viceAnalytic.id} viceAnalytic={viceAnalytic} />
      ))}
    </div>
  );
};

ViceList.propTypes = {
  viceAnalytics: PropTypes.array.isRequired,
  createViceAnalytics: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    viceAnalytics: getVicesViceAnalytics(state),
    error: getVicesError(state),
    loading: getVicesLoading(state),
  }),
  { createViceAnalytics: createViceAnalyticsAction },
)(ViceList);
