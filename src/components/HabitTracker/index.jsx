import React from 'react';
import DailyList from './DailyList';
import TodoList from './TodoList';
import Calendar from './Calendar';

const HabitTracker = () => (
  <>
    <h1 className="text-3xl font-bold text-center p-4">Habit Tracker</h1>
    <Calendar />
    <div className="flex flex-wrap justify-around">
      <DailyList classes="flex-1" />
      <TodoList classes="flex-1" />
    </div>
  </>
);

export default HabitTracker;
