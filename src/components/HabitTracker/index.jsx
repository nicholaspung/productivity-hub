import React from 'react';
import DailyList from './DailyList';
import TodoList from './TodoList';
import DailiesDisplay from './DailiesDisplay';

const HabitTracker = () => (
  <>
    <DailiesDisplay />
    <div className="flex flex-wrap justify-around">
      <DailyList classes="flex-1" />
      <TodoList classes="flex-1" />
    </div>
  </>
);

export default HabitTracker;
