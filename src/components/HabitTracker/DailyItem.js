import React, { useState } from "react";
import { connect } from "react-redux";
import {
  editHabit as editHabitAction,
  reorderHabits as reorderHabitsAction,
  deleteHabit as deleteHabitAction,
} from "./redux/actions";
import ItemAction from "./ItemAction";

const DailyItem = ({ data, editHabit, reorderHabits, deleteHabit }) => {
  const [finished, setFinished] = useState(data.finished);
  const onCheckedChange = (event) => {
    setFinished(event.target.checked);
  };
  const onArchiveHabit = () => {
    editHabit(data.habit.id, { archived: true });
  };
  const onUnarchiveHabit = () => {
    editHabit(data.habit.id, { archived: false });
  };
  const onReorderHabits = () => {};
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
          checked={finished}
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
        <button>Move Up</button>
        <button>Move Down</button>
        <button onClick={onDeleteHabit}>Delete Habit</button>
      </div>
      <ItemAction
        data={data}
        labelName={"Edit Habit"}
        actionFunction={editHabit}
      />
    </li>
  );
};

export default connect(null, {
  editHabit: editHabitAction,
  reorderHabits: reorderHabitsAction,
  deleteHabit: deleteHabitAction,
})(DailyItem);
