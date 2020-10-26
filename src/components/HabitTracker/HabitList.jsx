import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ItemList from './ItemList';
import DailyItem from './DailyItem';
import EmptyItem from '../BaseComponents/EmptyItem';
import { Modal, smallerFilledButtonClassName } from '../BaseComponents';
import { ReactComponent as LoadingSVG } from '../../assets/icons/loading.svg';
import {
  getDailiesError,
  getDailiesLoadingStatus,
  getDailiesHabits,
} from './redux/selectors';
import { getHabits as getHabitsAction } from './redux/actions';

const HabitList = ({ loading, closeHabits, habits, error, getHabits }) => {
  useEffect(() => {
    if (!habits.length) {
      getHabits();
    }
    // eslint-disable-next-line
  }, [getHabits]);
  const transformedHabits = habits.map((habit) => ({ habit, id: habit.id }));
  return (
    <Modal>
      <div className="w-full text-center p-4">
        <div className="h-0 text-left">
          <button
            type="button"
            className={`${smallerFilledButtonClassName} relative`}
            onClick={closeHabits}
          >
            X
          </button>
        </div>
        <h1 className="text-2xl font-bold">All Habits</h1>
        {loading && (
          <div className="flex justify-center items-center p-8">
            <LoadingSVG className="w-6 h-auto animate-spin absolute" />
          </div>
        )}
        <div className="text-left p-4">
          <EmptyItem
            length={transformedHabits.length}
            loading={loading}
            error={error}
            message="You have no habits."
          />
          <h2 className="font-bold">Active</h2>
          <ItemList
            data={transformedHabits}
            Component={DailyItem}
            filterFunction={(habit) => !habit.archived}
            loading={loading}
            hideInput
          />
          <h2 className="font-bold">Archived</h2>
          <ItemList
            data={transformedHabits}
            Component={DailyItem}
            filterFunction={(habit) => habit.archived}
            loading={loading}
            hideInput
          />
        </div>
      </div>
    </Modal>
  );
};

HabitList.propTypes = {
  loading: PropTypes.bool,
  closeHabits: PropTypes.func.isRequired,
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