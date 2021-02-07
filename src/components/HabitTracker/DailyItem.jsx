import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  editHabit as editHabitAction,
  reorderHabits as reorderHabitsAction,
  deleteHabit as deleteHabitAction,
  toggleDaily as toggleDailyAction,
} from '../../redux/actions/habitTrackerActions';
import {
  getDailiesDailies,
  getDailiesHabits,
} from '../../redux/selectors/habitTrackerSelectors';
import ItemAction from './SharedComponents/ItemAction';
import {
  DIRECTIONS,
  displayColor,
} from '../../constants/habitTrackerConstants';
import { ReactComponent as EditSVG } from '../../assets/icons/edit.svg';
import { ReactComponent as ArchiveSVG } from '../../assets/icons/archive.svg';
import { ReactComponent as ArrowUpSVG } from '../../assets/icons/arrowup.svg';
import { ReactComponent as ArrowDownSVG } from '../../assets/icons/arrowdown.svg';
import { ReactComponent as UnarchiveSVG } from '../../assets/icons/unarchive.svg';
import { ReactComponent as DeleteSVG } from '../../assets/icons/delete.svg';
import Modal from '../BaseComponents/Modal';
import HabitDelete from './HabitDelete';
import { reorderHabitsUtil } from '../../utils/habitTrackerUtils';

const DailyItem = ({
  data,
  editHabit,
  reorderHabits,
  deleteHabit,
  dailies,
  habits,
  toggleDaily,
  hideOptions = false,
  hideInput = false,
  disableInput = false,
  firstItem,
  lastItem,
}) => {
  const [edit, setEdit] = useState(false);
  const [willDelete, setWillDelete] = useState(false);

  const onCheckedChange = () => toggleDaily(data);
  const onArchiveHabit = () =>
    editHabit(data.habit.id, { archived: true, name: data.habit.name });
  const onUnarchiveHabit = () =>
    editHabit(data.habit.id, { archived: false, name: data.habit.name });
  const onReorderHabits = (direction) =>
    reorderHabitsUtil(data, dailies, habits, direction, reorderHabits);
  const onDeleteHabit = () => deleteHabit(data.habit.id);

  const labelId = data.habit.name.replace(/ /, '');
  const disabledInputClass = !disableInput ? 'cursor-pointer' : '';

  return (
    <li className="p-1 border-t-2 border-gray-200 flex justify-between items-center">
      <div>
        <div className="flex items-center">
          <label
            htmlFor={labelId}
            className={`flex items-center p-4 border border-transparent rounded-md transition ease-in-out duration-150 ${disabledInputClass} ${displayColor(
              { archived: data.habit.archived },
            )}`}
          >
            {!hideInput && (
              <input
                id={labelId}
                type="checkbox"
                checked={data.finished}
                onChange={onCheckedChange}
                disabled={disableInput}
                className={`form-checkbox text-indigo-600 w-6 h-6 ${disabledInputClass}`}
              />
            )}
            {hideInput && !data.habit.archived && (
              <button onClick={onArchiveHabit} type="button">
                <ArchiveSVG
                  className="w-4 h-auto text-white"
                  title="Archive habit"
                />
              </button>
            )}
            {hideInput && data.habit.archived && (
              <button onClick={onUnarchiveHabit} type="button">
                <UnarchiveSVG
                  className="w-4 h-auto text-white"
                  title="Unarchive habit"
                />
              </button>
            )}
          </label>
          <div className="flex flex-col px-4">
            <span className="font-semibold">{data.habit.name}</span>
            {!hideOptions && (
              <span
                className="text-xs whitespace-pre-line"
                style={{ wordBreak: 'break-word' }}
              >
                {data.habit.description}
              </span>
            )}
          </div>
        </div>
      </div>
      {!hideOptions && (
        <div className="flex flex-col items-end w-16">
          <button onClick={() => setEdit(true)} type="button">
            <EditSVG className="w-4 h-auto" title="Edit habit" />
          </button>
          <Modal
            isShowing={edit}
            toggle={() => setEdit(!edit)}
            Component={ItemAction}
            data={data.habit}
            actionFunction={editHabit}
            labelName="Edit Habit"
          />
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
            {!firstItem && (
              <button
                onClick={() => onReorderHabits(DIRECTIONS.UP)}
                type="button"
              >
                <ArrowUpSVG className="w-4 h-auto" title="Move habit up" />
              </button>
            )}
            {!lastItem && (
              <button
                onClick={() => onReorderHabits(DIRECTIONS.DOWN)}
                type="button"
              >
                <ArrowDownSVG className="w-4 h-auto" title="Move habit down" />
              </button>
            )}
          </div>
          <button onClick={() => setWillDelete(true)} type="button">
            <DeleteSVG className="w-4 h-auto" title="Delete habit" />
          </button>
          <Modal
            isShowing={willDelete}
            toggle={() => setWillDelete(!willDelete)}
            Component={HabitDelete}
            actionFunction={onDeleteHabit}
            backupFunction={onArchiveHabit}
          />
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
  habits: PropTypes.array.isRequired,
  toggleDaily: PropTypes.func.isRequired,
  hideOptions: PropTypes.bool,
  hideInput: PropTypes.bool,
  firstItem: PropTypes.bool.isRequired,
  lastItem: PropTypes.bool.isRequired,
  disableInput: PropTypes.bool,
};

export default connect(
  (state) => ({
    dailies: getDailiesDailies(state),
    habits: getDailiesHabits(state),
  }),
  {
    editHabit: editHabitAction,
    reorderHabits: reorderHabitsAction,
    deleteHabit: deleteHabitAction,
    toggleDaily: toggleDailyAction,
  },
)(DailyItem);
