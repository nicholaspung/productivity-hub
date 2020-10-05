import React from 'react';
import DailyList from './DailyList';
import TodoList from './TodoList';
import Calendar from './Calendar';
import YesterdayDailies from './YesterdayDailies';
import Helmet from '../BaseComponents/Helmet';

const HabitTracker = () => (
  <>
    <Helmet
      title="Habit Tracker | myexperiment.life"
      name="Habit Tracker Page"
      content="This is where you track your habits and todos."
    />
    <YesterdayDailies />
    <h1 className="text-3xl font-bold text-center p-4">Habit Tracker</h1>
    <Calendar />
    <div className="flex flex-wrap justify-around">
      <DailyList classes="flex-1" />
      <TodoList classes="flex-1" />
    </div>
  </>
);

export default HabitTracker;
