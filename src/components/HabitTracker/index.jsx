import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DailyList from './DailyList';
import TodoList from './TodoList';
import Calendar from './Calendar';
import YesterdayDailies from './YesterdayDailies';
import Helmet from '../BaseComponents/Helmet';
import { ReactComponent as LoadingSVG } from '../../assets/icons/loading.svg';
import { getDailiesLoadingStatus } from './redux/selectors';

const HabitTracker = ({ loading }) => (
  <>
    <Helmet
      title="Habit Tracker | myexperiment.life"
      name="Habit Tracker Page"
      content="This is where you track your habits and todos."
    />
    <YesterdayDailies />
    <div className="m-auto max-w-xl">
      {loading && (
        <div className="relative top-5 left-5">
          <LoadingSVG className="w-8 h-auto animate-spin absolute" />
        </div>
      )}
      <h1 className="text-3xl font-bold text-center pt-4">Habit Tracker</h1>
    </div>
    <Calendar />
    <div className="flex flex-wrap md:flex-no-wrap justify-around">
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
