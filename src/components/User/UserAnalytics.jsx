import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  userAnalyticDates,
  userAnalyticsWithFrequenciesForDate,
  displayDateTransform,
} from '../../utils/userUtils';
import { getUserAnalytics as getUserAnalyticsAction } from '../../redux/actions/userActions';
import { getUserAnalytics as getUserAnalyticsSelector } from '../../redux/selectors/userSelectors';
import UserAnalyticRow from './UserAnalyticRow';

const UserAnalytics = ({ userAnalytics, getUserAnalytics }) => {
  useEffect(() => {
    getUserAnalytics();
  }, [getUserAnalytics]);

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-left underline">Label/Date</th>
          {userAnalyticDates(userAnalytics).map((date) => (
            <th key={date} className="text-center underline">
              {displayDateTransform(date)}
            </th>
          ))}
          <th className="text-center underline w-1/12">Threshold</th>
          <th className="text-center underline">Action</th>
        </tr>
      </thead>
      <tbody>
        {userAnalyticsWithFrequenciesForDate(userAnalytics).map((analytic) => (
          <UserAnalyticRow key={analytic.id} analytic={analytic} />
        ))}
      </tbody>
    </table>
  );
};

UserAnalytics.propTypes = {
  userAnalytics: PropTypes.array.isRequired,
  getUserAnalytics: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({ userAnalytics: getUserAnalyticsSelector(state) }),
  { getUserAnalytics: getUserAnalyticsAction },
)(UserAnalytics);
