import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ItemList from './SharedComponents/ItemList';
import DailyItem from './DailyItem';
import EmptyItem from '../BaseComponents/EmptyItem';
import { FilledButton } from '../BaseComponents';
import Modal from '../BaseComponents/Modal';
import {
  getDailiesDailiesCacheForDate,
  getDailiesLoadingStatus,
  getDailiesError,
} from '../../redux/selectors/habitTrackerSelectors';
import { createDailiesForDay as createDailiesForDayAction } from '../../redux/actions/habitTrackerActions';
import { sortDailies } from '../../utils/habitTrackerUtils';
import { getYesterday } from '../../utils/dateUtils';
import { ReactComponent as LoadingSVG } from '../../assets/icons/loading.svg';

const YesterdayDailiesContent = ({
  yesterday,
  createDailiesForDay,
  loading,
  error,
  isShowing,
  toggle,
}) => {
  useEffect(() => {
    if (isShowing) {
      createDailiesForDay(getYesterday());
    }
  }, [createDailiesForDay, isShowing]);

  const visibleFilter = (item) => !item.archived;
  yesterday.sort(sortDailies);

  return (
    <div className="w-full text-center p-4">
      <h1 className="text-2xl font-bold">Welcome back!</h1>
      <p>
        Check and see if you forgot to complete any habits from the previous
        day.
      </p>
      {loading && (
        <div className="flex justify-center items-center p-8">
          <LoadingSVG className="w-6 h-auto animate-spin absolute" />
        </div>
      )}
      <div className="text-left p-4">
        <EmptyItem
          length={yesterday.filter(visibleFilter).length}
          loading={loading}
          error={error}
          message="You have no habits."
        />
        <ItemList
          data={yesterday}
          Component={DailyItem}
          filterFunction={visibleFilter}
          loading={loading}
          hideOptions
        />
      </div>
      <FilledButton action={toggle}>Start a new day!</FilledButton>
    </div>
  );
};

YesterdayDailiesContent.propTypes = {
  yesterday: PropTypes.array.isRequired,
  createDailiesForDay: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  isShowing: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

const ConnectedYesterdayDailiesContent = connect(
  (state) => ({
    yesterday: getDailiesDailiesCacheForDate(state, getYesterday()),
    loading: getDailiesLoadingStatus(state),
    error: getDailiesError(state),
  }),
  { createDailiesForDay: createDailiesForDayAction },
)(YesterdayDailiesContent);

const YesterdayDailies = () => {
  const todayString = new Date().toLocaleDateString();
  const [showYesterday, setShowYesterday] = useState(
    localStorage.getItem('first-load-of-day') !== todayString,
  );

  const closePreviousDayDailies = () => {
    localStorage.setItem('first-load-of-day', todayString);
    setShowYesterday(false);
  };

  return (
    <Modal
      isShowing={showYesterday}
      toggle={closePreviousDayDailies}
      Component={ConnectedYesterdayDailiesContent}
    />
  );
};

export default YesterdayDailies;
