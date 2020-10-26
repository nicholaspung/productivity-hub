import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ItemList from './ItemList';
import DailyItem from './DailyItem';
import EmptyItem from '../BaseComponents/EmptyItem';
import { Modal, FilledButton } from '../BaseComponents';
import {
  getDailiesDailiesCacheForDate,
  getDailiesLoadingStatus,
  getDailiesError,
} from './redux/selectors';
import { createDailiesForDay as createDailiesForDayAction } from './redux/actions';
import { getYesterday } from './utils';
import { ReactComponent as LoadingSVG } from '../../assets/icons/loading.svg';

const YesterdayDailies = ({
  yesterday,
  createDailiesForDay,
  loading,
  error,
}) => {
  const todayString = new Date().toLocaleDateString();
  const [showYesterday, setShowYesterday] = useState(
    localStorage.getItem('first-load-of-day') !== todayString,
  );

  useEffect(() => {
    createDailiesForDay(getYesterday());
    // eslint-disable-next-line
  }, []);

  const visibleFilter = (item) => !item.archived;
  const closePreviousDayDailies = () => {
    localStorage.setItem('first-load-of-day', todayString);
    setShowYesterday(false);
  };
  return (
    showYesterday && (
      <Modal>
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
          <FilledButton action={closePreviousDayDailies}>
            Start a new day!
          </FilledButton>
        </div>
      </Modal>
    )
  );
};

YesterdayDailies.propTypes = {
  yesterday: PropTypes.array.isRequired,
  createDailiesForDay: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    yesterday: getDailiesDailiesCacheForDate(state, getYesterday()),
    loading: getDailiesLoadingStatus(state),
    error: getDailiesError(state),
  }),
  {
    createDailiesForDay: createDailiesForDayAction,
  },
)(YesterdayDailies);
