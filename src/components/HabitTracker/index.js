import React from "react";
import {
  getTodos,
  getHabits,
  getDailiesForToday,
  addHabit,
  editHabit,
  deleteHabit,
  reorderHabits,
  addTodo,
  editTodo,
  reorderTodos,
  deleteTodo,
  getDailiesForWeek,
  getDailiesForMonth,
  getDailiesForYear,
  toggleDailies,
} from "./api";

const HabitTracker = () => {
  return (
    <div>
      <p>Habit Tracker</p>
      <div>
        <button onClick={getTodos}>Todos</button>
        <button
          onClick={() => {
            addTodo({ name: "new todo" });
          }}
        >
          Add Todo
        </button>
        <button
          onClick={() => {
            editTodo(2, { name: "new todo 2", finished: true });
          }}
        >
          Edit Todo
        </button>
        <button
          onClick={() => {
            deleteTodo(1);
          }}
        >
          Delete Todo
        </button>
        <button onClick={() => reorderTodos(2, 3)}>Reorder Todo</button>
      </div>
      <div>
        <button onClick={getHabits}>Habits</button>
        <button
          onClick={() => {
            addHabit({ name: "new habit" });
          }}
        >
          Add Habit
        </button>
        <button
          onClick={() => {
            editHabit(2, { name: "new habit 2", archived: false });
          }}
        >
          Edit Habit
        </button>
        <button
          onClick={() => {
            deleteHabit(1);
          }}
        >
          Delete Habit
        </button>
        <button onClick={() => reorderHabits(2, 3)}>Reorder Habit</button>
      </div>
      <div>
        <button onClick={getDailiesForToday}>Dailies For Today</button>
        <button onClick={() => getDailiesForWeek()}>Dailies For Week</button>
        <button onClick={() => getDailiesForMonth()}>Dailies For Month</button>
        <button onClick={() => getDailiesForYear()}>Dailies For Year</button>
        <button
          onClick={() => {
            toggleDailies(1, { finished: true });
          }}
        >
          Toggle Dailies
        </button>
      </div>
    </div>
  );
};

export default HabitTracker;
