import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ItemList from './ItemList';
import DailyItem from './DailyItem';
import EmptyItem from '../BaseComponents/EmptyItem';
import { smallerFilledButtonClassName } from '../BaseComponents';
import { ReactComponent as LoadingSVG } from '../../assets/icons/loading.svg';
import {
  getDailiesError,
  getDailiesLoadingStatus,
  getDailiesHabits,
} from '../../redux/selectors/habitTrackerSelectors';
import { getHabits as getHabitsAction } from '../../redux/actions/habitTrackerActions';

const HabitList = ({
  loading = false,
  toggle,
  habits = [],
  error,
  getHabits,
}) => {
  useEffect(() => {
    if (!habits.length) {
      getHabits();
    }
  }, [getHabits, habits]);

  const transformedHabits = habits.map((habit) => ({ habit, id: habit.id }));

  return (
    <div className="w-full text-center p-4">
      <div className="h-0 text-right">
        <button
          type="button"
          className={`${smallerFilledButtonClassName} relative`}
          onClick={toggle}
        >
          X
        </button>
      </div>
      {loading && (
        <div className="h-0">
          <div className="relative top-1 left-6">
            <LoadingSVG className="w-6 h-auto animate-spin absolute" />
          </div>
        </div>
      )}
      <h1 className="text-2xl font-bold">All Habits</h1>
      <div className="text-left p-4">
        <EmptyItem
          length={transformedHabits.length}
          loading={loading}
          error={error}
          message="You have no habits."
        />
        {habits.length ? (
          <>
            <h2 className="font-bold">Active</h2>
            <ItemList
              data={transformedHabits}
              Component={DailyItem}
              filterFunction={(data) => !data.habit.archived}
              loading={loading}
              hideInput
            />
            <h2 className="font-bold">Archived</h2>
            <ItemList
              data={transformedHabits}
              Component={DailyItem}
              filterFunction={(data) => data.habit.archived}
              loading={loading}
              hideInput
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

HabitList.propTypes = {
  loading: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
  habits: PropTypes.array.isRequired,
  error: PropTypes.object.isRequired,
  getHabits: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    habits: getDailiesHabits(state),
    loading: getDailiesLoadingStatus(state),
    error: getDailiesError(state),
  }),
  { getHabits: getHabitsAction },
)(HabitList);
