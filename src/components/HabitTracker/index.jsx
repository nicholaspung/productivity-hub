import React from 'react';
import DailyList from './DailyList';
import TodoList from './TodoList';

const HabitTracker = () => (
  <div className="flex flex-wrap justify-around">
    <DailyList classes="flex-1" />
    <TodoList classes="flex-1" />
  </div>
);

export default HabitTracker;
