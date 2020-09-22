import React from "react";
import { connect } from "react-redux";
import {
  editHabit as editHabitAction,
  reorderHabits as reorderHabitsAction,
  deleteHabit as deleteHabitAction,
  toggleDaily as toggleDailyAction,
} from "./redux/actions";
import { getDailiesDailies } from "./redux/selectors";
import ItemAction from "./ItemAction";
import { DIRECTIONS } from "./constants";

const DailyItem = ({
  data,
  editHabit,
  reorderHabits,
  deleteHabit,
  dailies,
  toggleDaily,
}) => {
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
      if (currentIdx + 1 > filteredDailies.length) return;
      reorderHabits(data.habit.id, filteredDailies[currentIdx + 1].habit.id);
    }
  };
  const onDeleteHabit = () => {
    deleteHabit(data.habit.id);
  };

  const labelId = data.habit.name.replace(/ /, "");

  return (
    <li>
      <div>
        <input
          id={labelId}
          type="checkbox"
          checked={data.finished}
          onChange={onCheckedChange}
        />
        <label htmlFor={labelId}>
          <span>{data.habit.name}</span>
          <span>{data.habit.description}</span>
        </label>
      </div>
      <div>
        <button>Edit Habit</button>
        <button onClick={onArchiveHabit}>Archive Habit</button>
        <button onClick={onUnarchiveHabit}>Unarchive Habit</button>
        <button onClick={() => onReorderHabits(DIRECTIONS.UP)}>Move Up</button>
        <button onClick={() => onReorderHabits(DIRECTIONS.DOWN)}>
          Move Down
        </button>
        <button onClick={onDeleteHabit}>Delete Habit</button>
      </div>
      <ItemAction
        data={data.habit}
        labelName={"Edit Habit"}
        actionFunction={editHabit}
      />
    </li>
  );
};

export default connect((state) => ({ dailies: getDailiesDailies(state) }), {
  editHabit: editHabitAction,
  reorderHabits: reorderHabitsAction,
  deleteHabit: deleteHabitAction,
  toggleDaily: toggleDailyAction,
})(DailyItem);
