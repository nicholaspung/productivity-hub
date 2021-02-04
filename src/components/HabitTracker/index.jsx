import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DailyList from './DailyList';
import TodoList from './TodoList';
import Calendar from './Calendar/Calendar';
import YesterdayDailies from './YesterdayDailies';
import Helmet from '../BaseComponents/Helmet';
import { getDailiesLoadingStatus } from '../../redux/selectors/habitTrackerSelectors';
import AppTitleWithLoading from '../BaseComponents/AppTitleWithLoading';

const HabitTracker = ({ loading }) => (
  <>
    <Helmet
      title="Habit Tracker | myexperiment.life"
      name="Habit Tracker Page"
      content="This is where you track your habits and todos."
    />
    <YesterdayDailies />
    <AppTitleWithLoading loading={loading} title="Habit Tracker" />
    <Calendar />
    <div
      className="flex flex-wrap md:flex-no-wrap justify-around"
      id="top-of-habits"
    >
      <DailyList classes="md:flex-1 w-full px-4 mb-4" />
      <TodoList classes="md:flex-1 w-full px-4 mb-4" />
    </div>
  </>
);

HabitTracker.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default connect((state) => ({
  loading: getDailiesLoadingStatus(state),
}))(HabitTracker);
