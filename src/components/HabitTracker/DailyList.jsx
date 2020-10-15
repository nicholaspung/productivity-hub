import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ItemList from './ItemList';
import DailyItem from './DailyItem';
import AddItem from '../BaseComponents/AddItem';
import {
  addHabit as addHabitAction,
  createDailiesForToday as createDailiesForTodayAction,
} from './redux/actions';
import {
  getDailiesDailies,
  getDailiesLoadingStatus,
  getDailiesError,
} from './redux/selectors';
import { DisplayContainer, DisplayContainerCard } from '../BaseComponents';
import { FILTERS } from './constants';
import { ReactComponent as LoadingSVG } from '../../assets/icons/loading.svg';
import EmptyItem from '../BaseComponents/EmptyItem';

const getFilterFunction = (filter) => {
  if (filter === FILTERS.UNFINISHED) {
    return (item) => !item.archived && !item.finished;
  }
  if (filter === FILTERS.FINISHED) {
    return (item) => !item.archived && item.finished;
  }
  return (item) => !item.archived;
};

const DailyList = ({
  dailies = [],
  loading = false,
  addHabit,
  createDailiesForToday,
  classes = '',
  error,
}) => {
  const [filter, setFilter] = useState(FILTERS.UNFINISHED);
  useEffect(() => {
    if (!dailies.length) {
      createDailiesForToday();
    }
    // eslint-disable-next-line
  }, [createDailiesForToday]);
  return (
    <DisplayContainer classes={classes || ''}>
      <div className="flex justify-between items-end">
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

      <DisplayContainerCard>
        {loading && <LoadingSVG className="w-6 h-auto animate-spin absolute" />}
        <AddItem
          addItem={addHabit}
          labelTitle="Add a habit"
          labelButton="Add New Habit"
          placeholder="Add..."
          property="name"
          classes="mt-2"
        />
        <EmptyItem
          length={dailies.filter(getFilterFunction(filter)).length}
          loading={loading}
          error={error}
          message="You have no habits for this category."
        />
        <ItemList
          data={dailies}
          Component={DailyItem}
          filterFunction={getFilterFunction(filter)}
          loading={loading}
        />
      </DisplayContainerCard>
    </DisplayContainer>
  );
};

DailyList.propTypes = {
  dailies: PropTypes.array,
  loading: PropTypes.bool,
  addHabit: PropTypes.func.isRequired,
  createDailiesForToday: PropTypes.func.isRequired,
  classes: PropTypes.string,
  error: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    dailies: getDailiesDailies(state),
    loading: getDailiesLoadingStatus(state),
    error: getDailiesError(state),
  }),
  {
    addHabit: addHabitAction,
    createDailiesForToday: createDailiesForTodayAction,
  },
)(DailyList);
