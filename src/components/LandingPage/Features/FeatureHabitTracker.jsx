import React from 'react';
import Feature from '../Feature';
import FeatureItem from '../FeatureItem';
import Bubble from '../Bubble';
import { ReactComponent as TodoListSVG } from '../../../assets/icons/todolist.svg';

const FeatureHabitTracker = () => (
  <Feature name="Habit Tracker">
    <TodoListSVG className="h-48 w-auto p-10 mx-auto hidden md:block" />
    <FeatureItem>
      <p>Helps manage and track the habits you are trying to build.</p>
      <Bubble>
        Studies show that it takes on average 66 days to build a habit, but
        that&apos;s just an average. It may take 2 days to maybe never. Use this
        to visually track the habit you are trying to build, or make it a
        practice you strive to achieve every day.
      </Bubble>
    </FeatureItem>
    <FeatureItem>
      <p>
        Includes a todo list with prioritization. It&apos;s one step better than
        a regular old todo list with a little more effort.
      </p>
    </FeatureItem>
  </Feature>
);

export default FeatureHabitTracker;
