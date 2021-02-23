import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ItemList from './SharedComponents/ItemList';
import DailyItem from './DailyItem';
import HabitList from './HabitList';
import AddItem from '../BaseComponents/AddItem';
import {
  addHabit as addHabitAction,
  createDailiesForDay as createDailiesForDayAction,
} from '../../redux/actions/habitTrackerActions';
import {
  getDailiesDailies,
  getDailiesLoadingStatus,
  getDailiesError,
  getDailiesTodayDailyCache,
} from '../../redux/selectors/habitTrackerSelectors';
import { smallerFilledButtonClassName } from '../BaseComponents';
import { FILTERS } from '../../constants/habitTrackerConstants';
import EmptyItem from '../BaseComponents/EmptyItem';
import Modal from '../BaseComponents/Modal';
import ListLoading from './SharedComponents/ListLoading';
import ListRefresh from './SharedComponents/ListRefresh';

const filterCategories = {
  [FILTERS.UNFINISHED]: {
    func: (item) => !item.habit.archived && !item.finished,
    label: 'You have finished all dailies for today. Congrats!',
  },
  [FILTERS.FINISHED]: {
    func: (item) => !item.habit.archived && item.finished,
    label: "You haven't finished any dailies today. Get to it you monster.",
  },
  [FILTERS.ALL]: {
    func: (item) => !item.habit.archived,
    label:
      'You have no dailies. Add a habit as a daily to make less decisions while improving your day.',
  },
};

const DailyList = ({
  dailies = [],
  loading = false,
  addHabit,
  createDailiesForDay,
  classes = '',
  error,
  cache,
}) => {
  const [filter, setFilter] = useState(FILTERS.UNFINISHED);
  const [showHabits, setShowHabits] = useState(false);

  useEffect(() => {
    if (!cache) {
      createDailiesForDay();
    }
  }, [createDailiesForDay, cache]);

  return (
    <div className={classes || ''}>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl px-5 font-bold">Dailies</h1>
        <div>
          <button
            className={`${filter === FILTERS.ALL ? 'underline' : ''} px-2`}
            onClick={() => setFilter(FILTERS.ALL)}
            type="button"
          >
            All
          </button>
          <button
            className={`${
              filter === FILTERS.UNFINISHED ? 'underline' : ''
            } px-2`}
            onClick={() => setFilter(FILTERS.UNFINISHED)}
            type="button"
          >
            Due
          </button>
          <button
            className={`${filter === FILTERS.FINISHED ? 'underline' : ''} px-2`}
            onClick={() => setFilter(FILTERS.FINISHED)}
            type="button"
          >
            Finished
          </button>
        </div>
      </div>
      <Modal
        isShowing={showHabits}
        toggle={() => setShowHabits(false)}
        Component={HabitList}
      />
      <div className="p-4 rounded-md border-2 border-gray-200 bg-white">
        {!loading && (
          <div className="h-0">
            <button
              type="button"
              onClick={() => setShowHabits(true)}
              className={`${smallerFilledButtonClassName} relative bottom-3 right-3`}
            >
              See Habits
            </button>
          </div>
        )}
        {loading && <ListLoading />}
        {!loading && <ListRefresh action={createDailiesForDay} />}
        <AddItem
          addItem={addHabit}
          labelTitle="Add a habit"
          labelButton="Add New Habit"
          placeholder="Add..."
          property="name"
          classes="mt-2"
        />
        <EmptyItem
          length={dailies.filter(filterCategories[filter].func).length}
          loading={loading}
          error={error}
          message={
            dailies.length
              ? filterCategories[filter].label
              : filterCategories[FILTERS.ALL].label
          }
        />
        <ItemList
          data={dailies}
          Component={DailyItem}
          filterFunction={filterCategories[filter].func}
          loading={loading}
        />
      </div>
    </div>
  );
};

DailyList.propTypes = {
  dailies: PropTypes.array,
  loading: PropTypes.bool,
  addHabit: PropTypes.func.isRequired,
  createDailiesForDay: PropTypes.func.isRequired,
  classes: PropTypes.string,
  error: PropTypes.object.isRequired,
  cache: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({
    dailies: getDailiesDailies(state),
    cache: getDailiesTodayDailyCache(state),
    loading: getDailiesLoadingStatus(state),
    error: getDailiesError(state),
  }),
  {
    addHabit: addHabitAction,
    createDailiesForDay: createDailiesForDayAction,
  },
)(DailyList);
