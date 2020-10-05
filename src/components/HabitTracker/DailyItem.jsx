import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  editHabit as editHabitAction,
  reorderHabits as reorderHabitsAction,
  deleteHabit as deleteHabitAction,
  toggleDaily as toggleDailyAction,
} from './redux/actions';
import { getDailiesDailies } from './redux/selectors';
import ItemAction from './ItemAction';
import { DIRECTIONS } from './constants';
import { ReactComponent as EditSVG } from '../../assets/icons/edit.svg';
import { ReactComponent as ArchiveSVG } from '../../assets/icons/archive.svg';
import { ReactComponent as ArrowUpSVG } from '../../assets/icons/arrowup.svg';
import { ReactComponent as ArrowDownSVG } from '../../assets/icons/arrowdown.svg';
import { ReactComponent as UnarchiveSVG } from '../../assets/icons/unarchive.svg';
import { ReactComponent as DeleteSVG } from '../../assets/icons/delete.svg';

const DailyItem = ({
  data,
  editHabit,
  reorderHabits,
  deleteHabit,
  dailies,
  toggleDaily,
  hideOptions,
}) => {
  const [edit, setEdit] = useState(false);
  const onCheckedChange = () => {
    toggleDaily(data);
  };
  const onArchiveHabit = () => {
    editHabit(data.habit.id, { archived: true, name: data.habit.name });
  };
  const onUnarchiveHabit = () => {
    editHabit(data.habit.id, { archived: false, name: data.habit.name });
  };
  const onReorderHabits = (direction) => {
    const filteredDailies = dailies.filter((item) => !item.habit.archived);
    const currentIdx = filteredDailies.findIndex((el) => el.id === data.id);
    if (direction === DIRECTIONS.UP) {
      if (currentIdx - 1 < 0) return;
      reorderHabits(data.habit.id, filteredDailies[currentIdx - 1].habit.id);
    } else {
      if (currentIdx + 1 > filteredDailies.length - 1) return;
      reorderHabits(data.habit.id, filteredDailies[currentIdx + 1].habit.id);
    }
  };
  const onDeleteHabit = () => {
    deleteHabit(data.habit.id);
  };

  const labelId = data.habit.name.replace(/ /, '');

  return (
    <li className="p-1 border-t-2 border-gray-200 flex justify-between items-center">
      <div>
        <label htmlFor={labelId} className="flex items-center">
          <div className="flex items-center p-4 border border-transparent rounded-md bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
            <input
              id={labelId}
              type="checkbox"
              checked={data.finished}
              onChange={onCheckedChange}
              className="form-checkbox text-indigo-600 w-6 h-6"
            />
          </div>
          <div className="flex flex-col px-4">
            <span className="font-semibold">{data.habit.name}</span>
            {!hideOptions && (
              <span className="text-xs">{data.habit.description}</span>
            )}
          </div>
        </label>
      </div>
      {!hideOptions && (
        <div className="flex flex-col items-end w-16">
          <button onClick={() => setEdit(true)} type="button">
            <EditSVG className="w-4 h-auto" title="Edit habit" />
          </button>
          {edit && (
            <ItemAction
              data={data.habit}
              labelName="Edit Habit"
              actionFunction={editHabit}
              displayFunction={() => setEdit(!edit)}
            />
          )}
          {!data.habit.archived && (
            <button onClick={onArchiveHabit} type="button">
              <ArchiveSVG className="w-4 h-auto" title="Archive habit" />
            </button>
          )}
          {data.habit.archived && (
            <button onClick={onUnarchiveHabit} type="button">
              <UnarchiveSVG className="w-4 h-auto" title="Unarchive habit" />
            </button>
          )}
          <div>
            <button
              onClick={() => onReorderHabits(DIRECTIONS.UP)}
              type="button"
            >
              <ArrowUpSVG className="w-4 h-auto" title="Move habit up" />
            </button>
            <button
              onClick={() => onReorderHabits(DIRECTIONS.DOWN)}
              type="button"
            >
              <ArrowDownSVG className="w-4 h-auto" title="Move habit down" />
            </button>
          </div>
          <button onClick={onDeleteHabit} type="button">
            <DeleteSVG className="w-4 h-auto" title="Delete habit" />
          </button>
        </div>
      )}
    </li>
  );
};

DailyItem.propTypes = {
  data: PropTypes.object.isRequired,
  editHabit: PropTypes.func.isRequired,
  reorderHabits: PropTypes.func.isRequired,
  deleteHabit: PropTypes.func.isRequired,
  dailies: PropTypes.array.isRequired,
  toggleDaily: PropTypes.func.isRequired,
  hideOptions: PropTypes.bool,
};
DailyItem.defaultProps = {
  hideOptions: false,
};

export default connect((state) => ({ dailies: getDailiesDailies(state) }), {
  editHabit: editHabitAction,
  reorderHabits: reorderHabitsAction,
  deleteHabit: deleteHabitAction,
  toggleDaily: toggleDailyAction,
})(DailyItem);
